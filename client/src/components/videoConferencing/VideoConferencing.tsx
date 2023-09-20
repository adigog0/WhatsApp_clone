import { useEffect, useRef, useState } from "react";
import MicOn from "../../assets/icons/mic_on.svg";
import MicOff from "../../assets/icons/mic_off.svg";
import VideoOn from "../../assets/icons/videocam_on.svg";
import VideoOff from "../../assets/icons/videocam_off.svg";
import CallEnd from "../../assets/icons/callend.svg";
import { io } from "socket.io-client";
import AvatarWithName from "../avatarWithName/AvatarWithName";
import { IlocalStorageData } from "../../Interface/Interface";

const socket = io("http://localhost:3001");

const servers = {
    // for generating ice candidates
    iceServers: [
        {
            urls: [
                "stun:stun.l.google.com:19302",
                "stun:stun1.l.google.com:19302",
                "stun:stun2.l.google.com:19302",
            ],
        },
    ],
};

const VideoConferencing = () => {
    const [micOn, setMicOn] = useState<boolean>(false);
    const [videoCamOn, setVideoCamOn] = useState<boolean>(false);
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null); //local video ref
    const remoteRef = useRef<HTMLVideoElement>(null);
    const remoteStream = useRef(new MediaStream()); //remote stream

    const peer = useRef<RTCPeerConnection>(new RTCPeerConnection(servers));

    const { user_email, user_picture, username } = JSON.parse(
        localStorage.getItem("loginUserInfo") ?? "null"
    );

    const peerConnection = () => {
        localStream
            ?.getTracks()
            .forEach((track) => peer.current?.addTrack(track, localStream));

        peer.current.ontrack = (event) => {
            event.streams[0]
                .getTracks()
                .forEach((track) => remoteStream.current?.addTrack(track));
        };
        peer.current.onicecandidate = (e) => {
            socket.emit("candidate", e.candidate);
        };
    };

    const createOffer = async () => {
        const offer = await peer.current.createOffer();
        peerConnection();
        await peer.current.setLocalDescription(offer);
        //send sdp to server
        socket.emit("sdp", {
            offer,
        });
    };

    const createAnswer = async () => {
        const answer = await peer.current.createAnswer();
        await peer.current.setLocalDescription(answer);

        //send the answer sdp to offering peer
        socket.emit("sdp", {
            answer,
        });
    };

    const addCandidate = (candidates: RTCIceCandidate) => {
        peer.current.addIceCandidate(candidates);
    };

    function toggleMic() {
        let audio = localStream
            ?.getTracks()
            .find((track) => track.kind === "audio");
        if (audio === undefined) return;
        if (audio.enabled) {
            audio.enabled = false;
            setMicOn(false);
        } else {
            audio.enabled = true;
            setMicOn(true);
        }
    }

    function toggleVideoCam() {
        let video = localStream
            ?.getTracks()
            .find((track) => track.kind === "video");
        if (video === undefined) return;

        if (video.enabled) {
            video.enabled = false;
            setVideoCamOn(false);
            // video.stop();
        } else {
            video.enabled = true;
            setVideoCamOn(true);
        }
    }

    async function init() {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
        }
        if (remoteRef.current) {
            remoteRef.current.srcObject = remoteStream.current;
        }
        setMicOn(true);
        setVideoCamOn(true);
        setLocalStream(stream);
    }

    useEffect(() => {
        init();
    }, []);

    useEffect(() => {
        socket.emit("user");
        socket.on("connection-success", (success) => {
           
        });

        socket.on("sdp", (data) => {
            console.log("sdp to peer", data);
        });

        socket.on("candidate", (candidates) => {
            addCandidate(candidates);
        });

        return () => {
            socket.off("closed");
        };
    }, []);

    return (
        <div className="bg-slate-100 w-screen h-screen p-7 flex flex-col gap-4">
            <div className=" bg-black h-5/6 w-full flex gap-6 p-4">
                <div className="bg-zinc-400 w-[50%]">
                    <AvatarWithName
                        avatar={user_picture}
                        name={username}
                        email={user_email}
                    />
                    <video ref={videoRef} className="width-[100%]" autoPlay muted />
                </div>
                <div className="bg-slate-500 flex-1">
                    <video ref={remoteRef} autoPlay muted />
                </div>
            </div>

            <div className=" p-3 flex gap-4 justify-center">
                <button
                    className="bg-slate-300 p-2 rounded-full"
                    onClick={toggleMic}
                >
                    {micOn ? (
                        <img src={MicOn} alt="mic-on" />
                    ) : (
                        <img src={MicOff} alt="mic-off" />
                    )}
                </button>

                <button className="bg-red-400 p-2 rounded-full">
                    <img src={CallEnd} alt="video-cam-on" />
                </button>

                <button
                    className="bg-slate-300 p-2 rounded-full"
                    onClick={toggleVideoCam}
                >
                    {videoCamOn ? (
                        <img src={VideoOn} alt="video-cam-on" />
                    ) : (
                        <img src={VideoOff} alt="video-cam-off" />
                    )}
                </button>
            </div>
        </div>
    );
};
export default VideoConferencing;

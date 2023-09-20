import { useGoogleLogin } from "@react-oauth/google";
import GoogleIcon from "../../assets/images/GoogleIcon.png";
import { googleLogIn } from "../../apis/userdata";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";


const SignIn = () => {
    const { enqueueSnackbar } = useSnackbar();
    const responseMessage = async (response: any) => {
        try {
            let token = response.access_token;
            const res = await googleLogIn(token);
            localStorage.setItem("token",token);
            localStorage.setItem("loginUserInfo", JSON.stringify(res.data));
            enqueueSnackbar("Request Successful!", {
                variant: "success",
            });
            window.location.replace("/whatsAppWeb");

        } catch (err: any) {
            enqueueSnackbar(`${err.response.status}! ${err.response.data.message}`, {
                variant: "error",
            });
        }
    };
    const errorMessage = (error: any) => {
        console.log("error", error);
    };
    const login = useGoogleLogin({
        onSuccess: responseMessage,
        onError: errorMessage,
    });

    return (
        <div className="h-screen w-screen bg-slate-50 relative font-sans">
            <div className="bg-white border-slate-300 rounded-2xl absolute w-[25%] h-[70%] border-2 left-[37%] top-[15%] flex flex-col p-8 gap-4">
                <div className="h-16 font-bold gap-3 flex flex-col items-center justify-center text-slate-700 font-sans ">
                    <span className="text-4xl">Sign In </span>
                </div>
                <div className="flex flex-col gap-3 text-slate-500">
                    <div className="font-normal text-slate-400 flex justify-center ">
                        Sign In here! Let's get started now
                    </div>

                    <button
                        onClick={() => login()}
                        className="flex justify-center items-center rounded-2xl border-2 hover:bg-slate-300 p-1 gap-2"
                    >
                        <img src={GoogleIcon} alt="" className="h-11" />
                        <span className="text-gray-700 font-medium">
                            Sign In with google
                        </span>
                    </button>
                </div>

                <Link className="cursor-pointer ml-auto mt-auto" to={`/signup`}>
                    <button className="border-2 rounded-lg hover:bg-slate-300 p-4 text-gray-700 font-medium ">
                        SignUp
                    </button>
                </Link>
            </div>
        </div>
    );
};
export default SignIn;

import { useGoogleLogin } from "@react-oauth/google";
import GoogleIcon from "../../assets/images/GoogleIcon.png";
import { googleLogin } from "../../apis/userdata";

const SignIn = () => {
    const responseMessage = async (response: any) => {
        try {
            let token = response.access_token;
            const res = await googleLogin(token);
            localStorage.setItem("loginUserInfo", JSON.stringify(res.data));
            window.location.replace("/whatsAppWeb");
        } catch(err) {
            console.log("google login error in fe ",err)
        }
    };
    const errorMessage = (error: any) => {
        console.log("error",error);
    };
    const login = useGoogleLogin({
        onSuccess: responseMessage,
        onError: errorMessage,
    });

    return (
        <div className="h-screen w-screen bg-slate-50 relative font-sans">
            <div className="bg-white border-slate-300 rounded-2xl absolute w-[25%] h-[70%] border-2 left-[37%] top-[15%] flex flex-col p-8 gap-4">
                <div className="h-16 font-bold gap-3 flex flex-col items-center justify-center text-slate-700 font-sans ">
                    <span className="text-4xl">Welcome! </span>
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
                            Sign up with google
                        </span>
                    </button>

                    <div className="mt-3 flex justify-center p-2 font-medium">
                        or
                    </div>
                </div>

                <form className="flex flex-col gap-4 py-4">
                    <label
                        htmlFor="contact"
                        className="min-w-fit font-sans font-medium text-slate-500 "
                    >
                        Phone number:
                    </label>
                    <input
                        type="text"
                        name="contact"
                        placeholder="type your number"
                        className="border-2 p-3 border-slate-300 rounded-2xl"
                    />
                    <button className="border-2 rounded-lg hover:bg-slate-300 p-4 text-gray-700 font-medium ">
                        SignUp
                    </button>
                </form>
            </div>
        </div>
    );
};
export default SignIn;

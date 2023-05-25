
interface IProps {
    children: JSX.Element | JSX.Element[];
}


const MainLayout = ({children}:IProps)=>{
    return(
        <div className="w-screen h-screen flex flex-col relative ">
            <div  className="bg-teal-700 w-full h-60" ></div>
            <div className="bg-rose-50 flex-1"></div>
            {children}
        </div>
    );

}

export default MainLayout;
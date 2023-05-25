
interface IProps{
    children:JSX.Element | JSX.Element[];
}
const CardLayout = ({children}:IProps) => {
    return (
        <div className="fixed w-[85%] h-[90%] border-2 left-[7.5%] top-[5%] bg-stone-100 rounded-lg">
            {children}
        </div>
    );
};
export default CardLayout;

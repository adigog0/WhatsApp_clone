interface Iprops {
    avatar: string;
    name: string;
    email:string;
}

const AvatarWithName = ({ avatar, name  }: Iprops) => {
    return (
        <div className="flex items-center gap-4 p-4 bg-black">
            <img src={avatar} alt="user-avatar" className="rounded-full h-12" />
            <span className="text-white font-medium">{name}</span>
        </div>
    );
};
export default AvatarWithName;

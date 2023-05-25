interface Iprops{
    
}


const OptionMenu =({}:Iprops)=>{

    return(
        <div className="absolute top-12 p-2 right-5 bg-white text-cyan-950 h-32 w-40 rounded-sm " >
          <p> Block User</p> 
          <p> Mute</p>
          <p> Delete Chat</p> 
          <p> Add to a group</p>
          <p> Setting</p>
        </div>
    );
}
export default OptionMenu;
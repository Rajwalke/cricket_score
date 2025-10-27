const Bowlerlist=(props)=>{
    const {allbowlerinfo,setBowlerPopup,setCurrentbowlerInfo,srNoOfBalls}=props;
    console.log("AllowBolwers",allbowlerinfo,srNoOfBalls)
    function passInfo(info){
        setCurrentbowlerInfo(info);
        setBowlerPopup(false);
    }
    return(
        <div className="flex flex-col gap-2">
            {allbowlerinfo.info.map((bowlerinfo,index)=>(
                <div className="flex justify-between items-center border-2 border-black"
                key={bowlerinfo.id}
                onClick={()=>passInfo(bowlerinfo)}
                >
                    <p>{bowlerinfo.playerName}</p>
                    <p>{bowlerinfo.over}</p>
                    <p>{bowlerinfo.wicket}</p>
                </div>
            ))}
        </div>
        // <h1>BowlerList</h1>
    )
};
export default Bowlerlist;
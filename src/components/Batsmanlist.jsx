import { useDispatch, useSelector } from "react-redux";
import { updateCurrentBatballStatus } from "../utils/teaminfoslice";

const Batsmanlist=(porps)=>{
    const {batsmanInfo,setbatsman1,setbatsman2,setBatsmanPopup,batsman1,batsman2}=porps;
    const dispatch=useDispatch();
        console.log("Info is ",batsmanInfo);
        const batsmanslect=(info)=>{
            console.log("im called")
            if(batsman1){
                setbatsman2(info)
            }else{
                setbatsman1(info);
            }
        }
    const checkallOutOrNot=batsmanInfo.filter((info)=>{
        if(info.out===false) return info
    });
    return(
        <div>
            <h1>Select 2 Batsman</h1>
            {
                batsmanInfo.map((info,index)=>(
                    <div className={`flex justify-between px-10 border-2 border-black
                        ${info.out?'bg-red-300 cursor-not-allowed'
                            :(info===batsman1 || info===batsman2)?
                            'bg-sky-300 cursor-not-allowed': 
                            'bg-white cursor-pointer'}
                        `}  key={index}
                    onClick={()=>{
                        if(info.out===false && info!==batsman1 && info!==batsman2)batsmanslect(info);
                    }}
                    >
                        <p>{info.playerName}</p>
                        <p>{info.runs}</p>
                    </div>
                   

                ))
            }
            {
                (checkallOutOrNot.length===1) ?
                <button className="bg-amber-300 p-2 "
                onClick={()=>{
                    dispatch(updateCurrentBatballStatus());
                }}
                >Next Inning</button>:
                (batsman1==='' || batsman2==='')?<p>Please slect two batsman</p>:
                <button onClick={setBatsmanPopup}>Selected</button>
                // <button onClick={setBatsmanPopup}>Selected</button>
            }
            
            
        </div>
    )
};
export default Batsmanlist
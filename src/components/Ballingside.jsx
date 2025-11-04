import { useEffect, useState } from "react";
import Bowlerlist from "./Bowlerlist";
import Currentball from "./Currentball";
import { useDispatch, useSelector, useStore } from "react-redux";
import Abc from "./Abc";
import { updateInningScore1 } from "../utils/teaminfoslice";

const Ballingside=(props)=>{
    // console.log(props)
    const dispatch=useDispatch();
    const [bowlerPopup,setBowlerPopup]=useState(false);
    const [currentBowlerInfo,setCurrentbowlerInfo]=useState('');
    const overs=useSelector((store)=>store.Info.toss.overs);
    const [currentOver,setCurrentOver]=useState(0);
    const currentballs=useSelector((store)=>store.Info.currentBowlerScore);
    const [enableAddBowlerButton,setEnableAddBowlerbutton]=useState(true);
    const filterTheTotoalBalls=currentballs.filter((ball)=>{
        // console.log("Over is complete");
        if(ball!=="WD" && ball!=="NO"){
            return ball;
        }
    });

    const current_totoalRun=currentballs.reduce((acc,curr)=>{
        if(curr==='WD' || curr==='NO'){
            acc=acc+1;
        }
        else if(curr==='WK'){
            acc
        }
        else {
            acc=acc+Number(curr)
        }
        return acc;
    },0);

    const current_Wicket=currentballs.filter((ball)=>{
        if(ball==='WK') return ball;
    })


    useEffect(()=>{
        if(filterTheTotoalBalls.length===6){
            setEnableAddBowlerbutton(true);
            
            // setCurrentOver(currentOver-1);
        }
    },[filterTheTotoalBalls]);
     dispatch(updateInningScore1({parameter:'overs',value:currentOver}));
    return(
        <div>
            <h1>Balling side</h1>

            <div>
                {
                    (enableAddBowlerButton && currentOver!==overs )?
                    <button className="border-l-indigo-300 p-3 cursor-pointer"
                        onClick={()=>{
                            setBowlerPopup(true);
                            
                        }}
                        >ADD BOWLER +</button>:(currentOver!==overs)?
                    <button className="bg-yellow-300 text-md text-black py-1 px-2 rounded-md cursor-pointer">ADD BOWLER🚫</button>:<button className="bg-yellow-300 text-md text-black py-1 px-2 rounded-md cursor-pointer">next inning</button>
                }
                
            </div>
            <div>
                {/* select bowler info */}
                {bowlerPopup && <Bowlerlist setCurrentOver={()=>setCurrentOver(currentOver+1)} allbowlerinfo={props} setEnableAddBowlerbutton={setEnableAddBowlerbutton} setBowlerPopup={setBowlerPopup} setCurrentbowlerInfo={setCurrentbowlerInfo} />}
            </div>
            <div>{
                (currentOver<=overs)?<p>{currentOver}/{overs} Over remaining.</p>:<p>Overs Complete</p>
                }
                
            </div>
            <div>
                {/* new over */}
                {currentBowlerInfo &&
                <section className="flex justify-between items-start">
                    <p>{currentBowlerInfo?.playerName}</p>
                    <div className="flex flex-col justify-center items-center gap-2">
                        
                       <div>
                        {
                        (filterTheTotoalBalls.length!==6)?
                        <div className="flex gap-2">
                        {currentballs.map((info,index)=>(
                            <Currentball key={index} index={index} currentpalyerId={currentBowlerInfo.id} ballLength={filterTheTotoalBalls.length}/>
                        ))}
                        </div>
                        :
                        // <h1>Over is complete please slect the nextn bowler</h1>
                        <Abc setCurrentOver={()=>setCurrentOver(currentOver+1)}/>
                       }
                       </div>
                       
                        <p>{6-filterTheTotoalBalls.length} Balls Left</p>
                    </div>
                    <p>{currentBowlerInfo.over+1}</p>
                    <p>{currentBowlerInfo.wicket}</p>
                    <p>{current_totoalRun}</p>
                </section>
                }
            </div>
            <div>
                {
                    (currentOver===0)?<button>Second Inning</button>:<p></p>
                }
                
            </div>
            <div>
                {/* History */}

            </div>
           
        </div>
    )
};
export default Ballingside;
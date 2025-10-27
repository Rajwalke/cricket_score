import { useState } from "react";
import Bowlerlist from "./Bowlerlist";
import Currentball from "./Currentball";
import { useSelector, useStore } from "react-redux";

const Ballingside=(props)=>{
    // console.log(props)
    let srno=0;
    const [bowlerPopup,setBowlerPopup]=useState(false);
    const [currentBowlerInfo,setCurrentbowlerInfo]=useState('');
    const [countofball,setCountofball]=useState(1);
    // console.log("Current bowler",currentBowlerInfo);
    const currentballs=useSelector((store)=>store.Info.currentBowlerScore);
    const filterTheTotoalBalls=currentballs.filter((ball)=>{
        console.log("Over is complete");
        if(ball!=="WD" && ball!=="NO"){
            return ball;
        }
    });
    if(filterTheTotoalBalls.length===6){
        console.log("Over is complete");
    }
    // console.log("setBowlerPopup",bowlerPopup);
    return(
        <div>
            <h1>Balling side</h1>

            <div>
                <button className="bg-amber-50 p-3 cursor-pointer"
                onClick={()=>{
                    setBowlerPopup(true);
                }}
                >ADD BOWLER + </button>
            </div>
             <div>
                {/* select bowler info */}
                {bowlerPopup && <Bowlerlist allbowlerinfo={props} setBowlerPopup={setBowlerPopup} setCurrentbowlerInfo={setCurrentbowlerInfo} />}
            </div>
            <div>
                {/* new over */}
                {currentBowlerInfo &&
                <section className="flex justify-between items-start">
                    <p>{currentBowlerInfo?.playerName}</p>
                    <div className="flex">
                       {
                        currentballs.map((info,index)=>(
                        <Currentball key={index} srNoOfBalls={srno++}/>

                        ))
                       }
                    </div>
                    <p>{currentBowlerInfo?.over}</p>
                    <p>{currentBowlerInfo?.wicket}</p>
                    <p>{currentBowlerInfo?.bowlingruns}</p>
                </section>
                }
            </div>
            <div>
                {/* History */}
            </div>
           
        </div>
    )
};
export default Ballingside;
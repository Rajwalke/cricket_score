import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TotalscoreInning2=(props)=>{
    const inningScore=useSelector((store)=>store.Info.inning2Score);
    const [inning2Score,setinning2Score]=useState(0);
    const {setBattingTeamWon,SetBowlingTeamWon,bowlingTeamName,battingTeamName}=props;
    const totoalWickets=useSelector((store)=>store.Info.team1Info);
    
    useEffect(()=>{
         setinning2Score(inningScore);
    },[inningScore]);
    
    useEffect(()=>{
        if(inning2Score?.runsRequired<=0){
            setBattingTeamWon(true); 
        }else if(inning2Score?.ballRenmaining===0 || inning2Score?.wicket===totoalWickets.length-1 ){
            SetBowlingTeamWon(true);
        }
    },[inning2Score])
    
    const totalOvers=useSelector((store)=>store.Info.toss);
   
    return(
        <div className="w-fit border-1-black flex justify-center items-center flex-col border-2 border-black rounded-md p-2 mt-2">
            <p>hello</p>
            <p className="text-xl ">{battingTeamName}:{inning2Score?.runs}/{inning2Score?.wicket}</p>
            <p className="text-xl ">Overs:{`${inning2Score?.overs}.${inning2Score?.balls}`}/{totalOvers.overs}</p>
            <p className="text-xl">{inning2Score?.runsRequired} runs required in {inning2Score?.ballRenmaining} balls</p>
        </div>
    )
};
export default TotalscoreInning2;
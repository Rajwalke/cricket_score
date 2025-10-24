import { useEffect, useState } from "react";
import Scoreteam1 from "./Scoreteam1";
import Scoreteam2 from "./Scoreteam2";
import { useSelector } from "react-redux";

const Score=()=>{
    const toss=useSelector((store)=>store.Info.toss);
    const [chooseTeam,setChooseTeam]=useState(false);
    const team1=useSelector((store)=>store.Info.team1Info);
    const team2=useSelector((store)=>store.Info.team2Info);
    //team1-true team2-false
    useEffect(()=>{
    if(toss.team==='team1' && toss.chossto==='bat'){
        setChooseTeam(true);
    }else if(toss.team==='team1' && toss.chossto==='ball'){
         setChooseTeam(false);
    }else if(toss.team==='team2' && toss.chossto==='bat'){
         setChooseTeam(false);
    }else{
        setChooseTeam(true);
    }
    },[chooseTeam])
    return(
        <div>
            <h1>Score Page</h1>
           {(chooseTeam)? <Scoreteam1 chooseTo={chooseTeam} teamInfo={team1} />:<Scoreteam2 teamInfo={team2} chooseTo={chooseTeam}/>}
        </div>
    )
};
export default Score;
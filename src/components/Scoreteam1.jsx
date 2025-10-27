import { useEffect, useState } from "react";
import Ballingside from "./Ballingside";

const Scoreteam1=(props)=>{
    console.log("Props are",props);
    const toss=props.toss;
    const[battingTeam,setBattingTeam]=useState([]);
    const[ballingTeam,setBowllingteam]=useState([]);
    useEffect(()=>{
        battingAndBallingTeam();
    },[]);
    const battingAndBallingTeam=()=>{
        if(toss.team ==='team1' && toss.chossto === 'bat'){
            setBattingTeam(props.teamInfo[0]);
            setBowllingteam(props.teamInfo[1])
        }
        else if(toss.team === 'team2' && toss.chossto ===' bat'){
            setBattingTeam(props.teamInfo[1]);
            setBowllingteam(props.teamInfo[0])
        }
        else if(toss.team==='team1' && toss.chossto==='ball'){
             setBattingTeam(props.teamInfo[1]);
            setBowllingteam(props.teamInfo[0])
        }else {
            setBattingTeam(props.teamInfo[0]);
            setBowllingteam(props.teamInfo[1])
        }
    }
    // console.log("Bating Info",battingTeam);
    // console.log("Balling Info",ballingTeam);
    
    return(
        <div>
            <h1>Team1 Batting</h1>
            <div>
                <p>Batsman section</p>
            </div>
            <div>
                <Ballingside info={ballingTeam} />
            </div>
        </div>
    )
};
export default Scoreteam1;
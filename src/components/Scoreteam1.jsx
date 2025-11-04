import { useEffect, useState } from "react";
import Ballingside from "./Ballingside";
import { useDispatch, useSelector } from "react-redux";
import { updatecurrentBatBallStatus } from "../utils/teaminfoslice";
import Battingside from "./Battingside";
import Totalscore from "./TotalScore";

const Scoreteam1=()=>{
    // console.log("Props are",props);
    // const toss=props.toss;
    const[battingTeam,setBattingTeam]=useState([]);
    const[ballingTeam,setBowllingteam]=useState([]);
    const toss=useSelector((store)=>store.Info.toss);
    const team1=useSelector((store)=>store.Info.team1Info);
    const team2=useSelector((store)=>store.Info.team2info);
    const dispatch=useDispatch();
    const currentBatBallStatus=useSelector((store)=>store.Info.currentBatBallStatus);
    useEffect(()=>{
        battingAndBallingTeam();
    },[team1,team2]);
    // console.log("Toss is",toss)
    const battingAndBallingTeam=()=>{
       if((toss.team === 'team2' && toss.chossto ==='bat') || (toss.team==='team1' && toss.chossto==='ball')){
        // console.log("if");
            setBattingTeam(team2);
            setBowllingteam(team1);
            dispatch(updatecurrentBatBallStatus({bat:'team2',ball:'team1'}));
        }
        else {
            // console.log("else");
            setBattingTeam(team1);
            setBowllingteam(team2);
            dispatch(updatecurrentBatBallStatus({bat:'team1',ball:'team2'}));
        }
    }
    // console.log("Bating Info",battingTeam);
    // console.log("Balling Info",ballingTeam);
    useEffect(()=>{
        if(currentBatBallStatus.batting==='team1'){
             setBattingTeam(team1);
            setBowllingteam(team2);
        }else{
            setBattingTeam(team2);
            setBowllingteam(team1);
        }
    },[currentBatBallStatus]);
    
    return(
        <div>
            <div>
                <Totalscore/>
            </div>
            <h1>Team1 Batting</h1>
            <div>
                <Battingside info={battingTeam}/>
            </div>
            <div>
                <Ballingside info={ballingTeam} />
            </div>
        </div>
    )
};
export default Scoreteam1;
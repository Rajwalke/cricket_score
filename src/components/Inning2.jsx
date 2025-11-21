import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Battingside from "./Battingside";
import Ballingside from "./Ballingside";
import TotalscoreInning2 from "./TotalscoreInning2";

const Inning2=()=>{
    const currentBatBallStatus=useSelector((store)=>store.Info.currentBatBallStatus);
    const team1=useSelector((store)=>store.Info.team1Info);
    const team2=useSelector((store)=>store.Info.team2info);
    const [battingTeam,setBattingteam]=useState('');
    const [bowlingTeam,setBowlingteam]=useState('');
    const teamName=useSelector((store)=>store.Info.TeamName);
    const [battingTeamWon,setBattingTeamWon]=useState(false);
    const [bowlingTeamWon,SetBowlingTeamWon]=useState(false);
    const battingTeamName=(currentBatBallStatus.batting==='team1')? teamName.team1 : teamName.team2;
    const bowlingTeamName=(currentBatBallStatus.bowling==='team1')? teamName.team1 : teamName.team2;
        
    useEffect(()=>{
        if(currentBatBallStatus.batting==="team1"){
            setBattingteam(team1);
            setBowlingteam(team2);
        }else{
            setBattingteam(team2);
            setBowlingteam(team1);
        }
    },[currentBatBallStatus,team1,team2]);

    if(battingTeam==='' && bowlingTeam===''){
       return <h1>Waiting for loading</h1>
    }
    console.log("Inning2 BattingTeam",battingTeam);
    console.log("Inning2 bowlingteam",bowlingTeam);
    return(
        <div>
            <h1>Inning 2</h1>
            <div className="flex justify-center items-center">
                <TotalscoreInning2 setBattingTeamWon={setBattingTeamWon} bowlingTeamName={bowlingTeamName} battingTeamName={battingTeamName} SetBowlingTeamWon={SetBowlingTeamWon}/>
            </div>
            <h1>Team1 Batting</h1>
            <div>
                <Battingside info={battingTeam} battingTeamName={battingTeamName} />
            </div>
            <div>
                <Ballingside info={bowlingTeam} bowlingTeamName={bowlingTeamName} />
            </div>
            <div>
            {(battingTeamWon || bowlingTeamWon)&&
                <div className="resultModal">
                    {(battingTeamWon)?<h1>{battingTeamName} Won The Match</h1>:(bowlingTeamWon)?<h1>{bowlingTeamName} Team Won The Match</h1>:<h1></h1>}
                </div>
            }
            </div>
        </div>
    )
};
export default Inning2;
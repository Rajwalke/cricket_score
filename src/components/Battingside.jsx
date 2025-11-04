import { useEffect, useState } from "react";
import Batsmanlist from "./Batsmanlist";
import { useDispatch, useSelector } from "react-redux";
import { updateBatsmanRun } from "../utils/teaminfoslice";

const Battingside=(props)=>{
    const {info}=props;
    const [batsmanpopup,setBatsmanPopup]=useState(true);
    const [batsman1,setbatsman1]=useState('');
    const [batsman2,setbatsman2]=useState('');
    const [strikerBatsman,setstrikerBatsman]=useState(1);
    const team1=useSelector((store)=>store.Info.team1Info);//-------
    const team2=useSelector((store)=>store.Info.team2info);  //-------
    const dispatch=useDispatch();
    const currentBowlerScore=useSelector((store)=>store.Info.currentBowlerScore);
    const currentBatBallStatus=useSelector((store)=>store.Info.currentBatBallStatus);
    useEffect(()=>{
        
        const currentBallRun=currentBowlerScore[currentBowlerScore.length-2];
        if(currentBallRun!=='WD' && currentBallRun!=='NO'){
            console.log("currentBallRun:",currentBallRun)
            if(strikerBatsman===1){
                const batsmanId=batsman1?.id;
                // console.log("stiker batsman is ",batsmanId,currentBowlerScore[currentBowlerScore.length-2]);
                dispatch(updateBatsmanRun({id:batsmanId,value:currentBallRun}));
                // setbatsman1();
            }else{
                const batsmanId=batsman2?.id;
                // console.log("stiker batsman is ",batsmanId,currentBowlerScore[currentBowlerScore.length-2]);
                dispatch(updateBatsmanRun({id:batsmanId,value:currentBallRun}));
                // setbatsman2();
            }
        }

        if(currentBallRun==='WK'){
            if(strikerBatsman===1){
                setbatsman1('');
                setBatsmanPopup(true);
            }else{
                setbatsman2('');
                setBatsmanPopup(true);
            }
             
        }
       
    },[currentBowlerScore]);
   console.log("batsman1,batsman2");

   useEffect(()=>{
     const currentBallRun=currentBowlerScore[currentBowlerScore.length-2];
    if(currentBallRun!=='WK'){
            
            const id1=batsman1.id;
            const id2=batsman2.id;
    // console.log("Id1 is",id1);
    // console.log("Id2 is",id2);
        if(currentBatBallStatus.batting==='team1'){
            const playerInfo1=team1.find((p)=>p.id===id1);
            const playerInfo2=team1.find((p)=>p.id===id2);
            console.log(playerInfo1,playerInfo2)
            setbatsman1(playerInfo1);
            setbatsman2(playerInfo2);
        }else{
            const playerInfo1=team2.find((p)=>p.id===id1);
            const playerInfo2=team2.find((p)=>p.id===id2);
            setbatsman1(playerInfo1);
            setbatsman2(playerInfo2);
        }
        }
   },[team1,team2]);
    return(
        <div>
            <h1>Batting Teams</h1>
            {
                batsmanpopup&&
                <Batsmanlist setBatsmanPopup={()=>setBatsmanPopup(false)} setbatsman1={setbatsman1} setbatsman2={setbatsman2} batsmanInfo={info} batsman1={batsman1} batsman2={batsman2}/>
            }
            <div>
                {/* selected batsman come here  */}
                <div 
                className={`p-2 flex justify-between text-black ${strikerBatsman === 1 ? 'bg-blue-500 text-white' : 'bg-white'}`}
                onClick={()=>setstrikerBatsman(1)}
                >
                    {
                        (strikerBatsman===1)?
                        <p>Striker</p>:
                        <p>No</p>
                    }
                    
                   <p>{(batsman1?.playerName!=='')?batsman1?.playerName:'--'}</p> 
                   <p>{batsman1?.four}</p>
                   <p>{batsman1?.six}</p>
                   <p>{batsman1?.runs}</p>
                </div>
                <div 
                className={`p-2 flex justify-between text-black ${strikerBatsman === 2 ? 'bg-blue-500 text-white' : 'bg-white'}`}
                onClick={()=>setstrikerBatsman(2)}
                >
                    {
                        (strikerBatsman===2)?
                        <p>Striker</p>:
                        <p>No</p>
                    }
                   <p>{(batsman2?.playerName!=='')?batsman2?.playerName : '--'}</p> 
                   <p>{batsman2?.four}</p>
                   <p>{batsman2?.six}</p>
                   <p>{batsman2?.runs}</p>
                </div>
 
                
            </div>

        </div>
    )
};
export default Battingside;
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateToss } from "../utils/teaminfoslice";

const Teamtoss=()=>{
    const [tossWinTeam,setTossWinTeam]=useState('');
    const [chooseto,setChooseto]=useState('');
    console.log("toss:",tossWinTeam,"elect:",chooseto);
    const tossinfo=useSelector((store)=>store.Info.toss);
    const dispatch=useDispatch();
    return(
        <div>
            <section>
                <p>Which Team Won the TOSS ? </p>
                <div>
                    <button
                    onClick={()=>{
                        // setTossWinTeam('team1');
                        dispatch(updateToss({key:'team',value:'team1'}))
                    }}
                    >Team1</button>

                    <button
                    onClick={()=>{
                         dispatch(updateToss({key:'team',value:'team2'}))
                    }}
                    >Team2</button>
                </div>
            </section>
            <section>
                <p>Choose to : </p>
                <button
                    onClick={()=>{
                        // setChooseto('bat');
                         dispatch(updateToss({key:'chossto',value:'bat'}))
                    }}
                >Bat</button>

                <button 
                    onClick={()=>{
                         dispatch(updateToss({key:'chossto',value:'ball'}))
                    }}
                >Ball</button>
            </section>

            <section>
                {(tossinfo.team!=='' && tossinfo.chossto!=='')?<Link to="/score"><p>NEXT</p></Link>:<p></p>}
            </section>

        </div>
    )
};
export default Teamtoss
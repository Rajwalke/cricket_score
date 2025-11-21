import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateToss } from "../utils/teaminfoslice";

const Teamtoss=()=>{
    const [tossWinTeam,setTossWinTeam]=useState('');
    const [chooseto,setChooseto]=useState('');
    // console.log("toss:",tossWinTeam,"elect:",chooseto);
    const tossinfo=useSelector((store)=>store.Info.toss);
    const dispatch=useDispatch();
    const teamName=useSelector((store)=>store.Info.TeamName);
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
                    >{teamName.team1}</button>


                    <button
                    onClick={()=>{
                         dispatch(updateToss({key:'team',value:'team2'}))
                    }}
                    >{teamName.team2}</button>
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
                <label>How Many Overs</label>
                <select
                onChange={(e)=>{
                    dispatch(updateToss({key:'overs',value:Number(e.target.value)}))
                }} >
                    <option disabled selected>select the over</option>
                   <option value="2">2</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="30">30</option>
                    <option value="50">35</option>
                    <option value="90">90</option>
                </select>
            </section>

            <section>
                {(tossinfo.team!=='' && tossinfo.chossto!=='' && tossinfo.overs!==0)?<Link to="/inning1"><p>NEXT</p></Link>:<p></p>}
            </section>

        </div>
    )
};
export default Teamtoss
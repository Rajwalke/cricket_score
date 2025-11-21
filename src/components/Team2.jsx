import { useDispatch, useSelector } from "react-redux";
import { addteam2, updateTeamName, updateuserName, updateuserNameteam2 } from "../utils/teaminfoslice";

const Team2=()=>{
    const dispatch=useDispatch();
    const playerQuanity=useSelector((store)=>store.Info.team2info);
    const team2Name=useSelector((store)=>store.Info.TeamName.team2)
    return(
        <div>
            <h1>Team-2</h1>
            {/* <select onChange={(e)=>{
                dispatch(addteam2(e.target.value));
            }}>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
            </select> */}
            <div>
                
                <div>
                {
                (playerQuanity>='5')&&
                    <>
                    <div>
                        <input type="text" placeholder="Enter Your Name"
                        value={team2Name}
                        onChange={(e)=>dispatch(updateTeamName({id:2,value:e.target.value}))}
                    />
                    </div>
                    {playerQuanity.map((info,index)=>(
                        <input key={index} placeholder="player name" 
                        value={info.playerName}
                        onChange={(e)=>{
                            dispatch(updateuserNameteam2({index:index,value:e.target.value}))
                        }}
                        />
                    ))}

                    </>
                }
                </div>
            </div>

        </div>
    )
};

export default Team2;
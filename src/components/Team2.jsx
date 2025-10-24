import { useDispatch, useSelector } from "react-redux";
import { addteam2, updateuserName, updateuserNameteam2 } from "../utils/teaminfoslice";

const Team2=()=>{
    const dispatch=useDispatch();
    const playerQuanity=useSelector((store)=>store.Info.team2info);
    return(
        <div>
            <h1>Team-2</h1>
            <select onChange={(e)=>{
                dispatch(addteam2(e.target.value));
            }}>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
            </select>
            <div>
                {
                    playerQuanity.map((info,index)=>(
                        <input key={index} placeholder="player name" 
                        value={info.playerName}
                        onChange={(e)=>{
                            dispatch(updateuserNameteam2({index:index,value:e.target.value}))
                        }}
                        />
                    ))
                }
            </div>

        </div>
    )
};

export default Team2;
import { useDispatch, useSelector } from "react-redux";
import { addteam1, updateuserName } from "../utils/teaminfoslice";
const Team1=()=>{
    // const [playerQuanity,setPlayerQuantity]=useState(11);
    const dispatch=useDispatch();
    const playerQuanity=useSelector((store)=>store.Info.team1Info);
    // const [userName,setUsername]=useState('');
    return(
        <div>
            <h1>Team1</h1>
            {/* <select onChange={(e)=>{
                // setPlayerQuantity(e.target.value);
                dispatch(addteam1(e.target.value));
            }}>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11" selected>11</option>
            </select> */}

            <div>
                {
                    playerQuanity.map((info,index)=>(
                     <input key={index} type="text" placeholder="enter player name "
                     value={info.playerName}
                     onChange={(e)=>{
                        dispatch(updateuserName({index:index,value:e.target.value}));
                     }}
                     />
                    ))
                }
            </div>
        </div>
    )
};
export default Team1;
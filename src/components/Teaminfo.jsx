import { Link } from "react-router-dom";
import Team1 from "./Team1";
import Team2 from "./Team2";
import { useDispatch } from "react-redux";
import { addteam1, addteam2 } from "../utils/teaminfoslice";

const Teamnfo=()=>{
    const dispatch=useDispatch();
    return(
        <div className="flex flex-col justify-center items-center gap-10">
            <select onChange={(e)=>{
                    // setPlayerQuantity(e.target.value);
                    dispatch(addteam1(e.target.value));
                    dispatch(addteam2(e.target.value));
                }}>
                <option disabled selected >Select the Over</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
            </select>
            <div>
                <Team1/>
                <Team2/>
            </div>
            <div>
               <Link to="/toss"><button className="" >Next</button></Link> 
            </div>
            
            
        </div>
    )
};
export default Teamnfo;
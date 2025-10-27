import { useDispatch } from "react-redux";
import { updateCurrentBowler } from "../utils/teaminfoslice";

const Currentball=(props)=>{
    // const {setCountofball}=props;
    const dispatch=useDispatch();
    return(
        <select className="bg-red-500 px-2  py-1 rounded-full"
                        onChange={(e)=>{
                            dispatch(updateCurrentBowler(e.target.value));
                            // setCountofball();
                        }}
                        >
                            <option value="+" selected disabled>+</option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="WK">WK</option>
                            <option value="WD">WD</option>
                            <option value="NO">NO</option>
        </select>
    )
};
export default Currentball;
import { useDispatch, useSelector } from "react-redux";
import { updateballinginfo, updateCurrentBowler, updateInning2RunsAndBalls, updateInningScore1 } from "../utils/teaminfoslice";
import { useState } from "react";

const Currentball=(props)=>{
    // const {setCountofball}=props;
    const {index,ballLength,currentpalyerId}=props;
    const dispatch=useDispatch();
    // console.log("ballLength",ballLength);
    const [enabaleBtn,setEnableBtn]=useState(true);
    const[currentValue,setCurrentValue]=useState(0);
    const currentInning=useSelector((store)=>store.Info.currentInning);
    return(
        (enabaleBtn)?(
            <select className="bg-red-500 text-white px-2 py-1 rounded-full cursor-pointer"
                        onChange={(e)=>{
                            dispatch(updateCurrentBowler({index:index,value:e.target.value}));
                            dispatch(updateballinginfo({id:currentpalyerId,value:e.target.value}));
                            dispatch(updateInningScore1({parameter:'runs',value:e.target.value}));
                            setCurrentValue(e.target.value);
                            setEnableBtn(false);
                            dispatch(updateInning2RunsAndBalls(e.target.value));
                            
                            // setCountofball();
                        }}
                        > <option selected disabled>+</option>
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
        ):(
            <h1 className="bg-red-400 p-2 ">{currentValue}</h1>
        )
        
         )
};
export default Currentball;
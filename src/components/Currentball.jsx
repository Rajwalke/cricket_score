import { useDispatch, useSelector } from "react-redux";
import { updateballinginfo, updateCurrentBowler, updateCurrentBowlerRuns, updateInning2RunsAndBalls, updateInningScore1 } from "../utils/teaminfoslice";
import { useRef, useState } from "react";

const Currentball = (props) => {
    const { index, ballLength, currentpalyerId } = props;
    const dispatch = useDispatch();
    const [enabaleBtn, setEnableBtn] = useState(true);
    const [currentValue, setCurrentValue] = useState(0);
    const currentInning = useSelector((store) => store.Info.currentInning);
    const [popup,setPopup]=useState(false);
    const currentBall=useRef('');
    
    const getBallColor = (value) => {
        if (value === 'WK') return 'bg-red-600 text-white';
        if (value === 'WD' || value === 'NO') return 'bg-yellow-500 text-white';
        if (value === '4') return 'bg-blue-600 text-white';
        if (value === '6') return 'bg-purple-600 text-white';
        if (value === '0') return 'bg-gray-600 text-white';
        return 'bg-green-600 text-white';
    };

    return (
        <>
        {
        enabaleBtn ? (
            <select
                className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-2 rounded-lg cursor-pointer font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-200 shadow-md"
                onChange={(e) => {
                    if(e.target.value==="NO" || e.target.value==="WD"){
                        currentBall.current=e.target.value;
                        setPopup(true);
                    }
                    else{

                        dispatch(updateCurrentBowler({ index: index, value: e.target.value }));
                        dispatch(updateballinginfo({ id: currentpalyerId, value: e.target.value }));
                        dispatch(updateInningScore1({ parameter: 'runs', value: e.target.value }));
                        setCurrentValue(e.target.value);
                        setEnableBtn(false);
                        dispatch(updateInning2RunsAndBalls(e.target.value));
                        if(e.target.value!=="WK")dispatch(updateCurrentBowlerRuns(Number(e.target.value)));
                        
                    }
                    
                }}
            >
                <option selected disabled>+</option>
                <option className="text-black" value="0">0</option>
                <option className="text-black" value="1">1</option>
                <option className="text-black" value="2">2</option>
                <option className="text-black" value="3">3</option>
                <option className="text-black" value="4">4</option>
                <option className="text-black" value="5">5</option>
                <option className="text-black" value="6">6</option>
                <option className="text-black" value="WK">Wicket</option>
                <option className="text-black" value="WD">Wide</option>
                <option className="text-black" value="NO">No Ball</option>
            </select>
        ) : (
            <div className={`${getBallColor(currentValue)} px-4 py-2 rounded-lg font-bold text-center min-w-[60px] shadow-md`}>
                {currentValue}
            </div>
        )
        }

        {
            popup &&
            (
                <select  
                onChange={(e)=>{
                    console.log("Extra Runs Are ",e.target.value);
                        dispatch(updateCurrentBowler({ index: index, value: currentBall.current, extraRuns:e.target.value }));
                        dispatch(updateballinginfo({ id: currentpalyerId, value: currentBall.current,extraRuns:e.target.value }));
                        dispatch(updateInningScore1({ parameter: 'runs', value: currentBall.current,extraRuns:e.target.value}));
                        setCurrentValue(currentBall.current);
                        dispatch(updateCurrentBowlerRuns(Number(e.target.value)+1));
                        setEnableBtn(false);
                        dispatch(updateInning2RunsAndBalls({runs:currentBall.current , extraRuns: e.target.value}));
                        setPopup(false);
                }}
                >
                    <option selected disabled> + Runs</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
            )
        }
        </>
    );
};
export default Currentball;
import { useDispatch, useSelector } from "react-redux";
import { updateballinginfo, updateCurrentBowler, updateInning2RunsAndBalls, updateInningScore1 } from "../utils/teaminfoslice";
import { useState } from "react";

const Currentball = (props) => {
    const { index, ballLength, currentpalyerId } = props;
    const dispatch = useDispatch();
    const [enabaleBtn, setEnableBtn] = useState(true);
    const [currentValue, setCurrentValue] = useState(0);
    const currentInning = useSelector((store) => store.Info.currentInning);

    const getBallColor = (value) => {
        if (value === 'WK') return 'bg-red-600 text-white';
        if (value === 'WD' || value === 'NO') return 'bg-yellow-500 text-white';
        if (value === '4') return 'bg-blue-600 text-white';
        if (value === '6') return 'bg-purple-600 text-white';
        if (value === '0') return 'bg-gray-600 text-white';
        return 'bg-green-600 text-white';
    };

    return (
        enabaleBtn ? (
            <select
                className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-2 rounded-lg cursor-pointer font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-200 shadow-md"
                onChange={(e) => {
                    dispatch(updateCurrentBowler({ index: index, value: e.target.value }));
                    dispatch(updateballinginfo({ id: currentpalyerId, value: e.target.value }));
                    dispatch(updateInningScore1({ parameter: 'runs', value: e.target.value }));
                    setCurrentValue(e.target.value);
                    setEnableBtn(false);
                    dispatch(updateInning2RunsAndBalls(e.target.value));
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
    );
};
export default Currentball;
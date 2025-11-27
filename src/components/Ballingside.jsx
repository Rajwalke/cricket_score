import { useEffect, useState } from "react";
import Bowlerlist from "./Bowlerlist";
import Currentball from "./Currentball";
import { useDispatch, useSelector } from "react-redux";
import Abc from "./Abc";
import { updateCurrentBatballStatus, updatecurrentBatBallStatus, updateCurrentInning, updateInningScore1, updateSecondInningchasseScore } from "../utils/teaminfoslice";
import { Link } from "react-router-dom";
import { Target, Plus, ArrowRight, AlertCircle } from "lucide-react";

const Ballingside = (props) => {
    const { bowlingTeamName } = props;
    const dispatch = useDispatch();
    const [bowlerPopup, setBowlerPopup] = useState(false);
    const [currentBowlerInfo, setCurrentbowlerInfo] = useState('');
    const overs = useSelector((store) => store.Info.toss.overs);
    const [currentOver, setCurrentOver] = useState(0);
    const currentballs = useSelector((store) => store.Info.currentBowlerScore);
    const [enableAddBowlerButton, setEnableAddBowlerbutton] = useState(true);

    const filterTheTotoalBalls = currentballs.filter((ball) => {
        if (ball !== "WD" && ball !== "NO") {
            return ball;
        }
    });

    const current_totoalRun = currentballs.reduce((acc, curr) => {
        if (curr === 'WD' || curr === 'NO') {
            acc = acc + 1;
        }
        else if (curr === 'WK') {
            acc;
        }
        else {
            acc = acc + Number(curr);
        }
        return acc;
    }, 0);

    const current_Wicket = currentballs.filter((ball) => {
        if (ball === 'WK') return ball;
    });

    useEffect(() => {
        if (filterTheTotoalBalls.length === 6) {
            setEnableAddBowlerbutton(true);
        }
    }, [filterTheTotoalBalls]);

    dispatch(updateInningScore1({ parameter: 'overs', value: currentOver }));

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5">
            {/* Header */}
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                        <Target className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Bowling Team - <span className="text-gray-600">{bowlingTeamName}</span></h2>
                       
                    </div>
                </div>
            </div>

            {/* Add Bowler Button */}
            <div className="mb-6">
                {(enableAddBowlerButton && currentOver !== overs) ? (
                    <button
                        className="w-full cursor-pointer bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
                        onClick={() => {
                            setBowlerPopup(true);
                        }}
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Add Bowler
                    </button>
                ) : (currentOver !== overs) ? (
                    <button
                        disabled
                        className="w-full bg-gray-200 text-gray-500 px-6 py-3 rounded-xl font-semibold cursor-not-allowed flex items-center justify-center"
                    >
                        <AlertCircle className="w-5 h-5 mr-2" />
                        Complete Current Over First
                    </button>
                ) : (
                    <Link to="/inning2">
                        <button
                            className="w-full cursor-pointer bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                            onClick={() => {
                                dispatch(updateCurrentBatballStatus());
                                dispatch(updateCurrentInning());
                                dispatch(updateSecondInningchasseScore());
                            }}
                        >
                            Next Inning
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </button>
                    </Link>
                )}
            </div>

            {/* Bowler Popup */}
            {bowlerPopup && (
                <Bowlerlist
                    setCurrentOver={() => setCurrentOver(currentOver + 1)}
                    allbowlerinfo={props}
                    setEnableAddBowlerbutton={setEnableAddBowlerbutton}
                    setBowlerPopup={setBowlerPopup}
                    setCurrentbowlerInfo={setCurrentbowlerInfo}
                />
            )}

            {/* Overs Info */}
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                {(currentOver <= overs) ? (
                    <div className="flex items-center justify-between">
                        <span className="text-gray-700 font-medium">Overs Remaining:</span>
                        <span className="text-2xl font-bold text-blue-600">{currentOver}/{overs}</span>
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="text-lg font-bold text-green-600">Overs Complete</p>
                    </div>
                )}
            </div>

            {/* Current Bowler Stats */}
            {currentBowlerInfo && (
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Current Bowler</p>
                            <p className="text-lg font-bold text-gray-900">{currentBowlerInfo?.playerName}</p>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <p className="text-xs text-gray-600">Overs</p>
                                <p className="text-lg font-bold text-gray-900">{currentBowlerInfo.over + 1}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-600">Wickets</p>
                                <p className="text-lg font-bold text-red-600">{currentBowlerInfo.wicket}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-600">Runs</p>
                                <p className="text-lg font-bold text-blue-600">{current_totoalRun}</p>
                            </div>
                        </div>
                    </div>

                    {/* Current Over Balls */}
                    <div>
                        {(filterTheTotoalBalls.length !== 6) ? (
                            <div>
                                <p className="text-sm font-semibold text-gray-700 mb-3">Current Over:</p>
                                <div className="flex gap-2 flex-wrap mb-3">
                                    {currentballs.map((info, index) => (
                                        <Currentball
                                            key={index}
                                            index={index}
                                            currentpalyerId={currentBowlerInfo.id}
                                            ballLength={filterTheTotoalBalls.length}
                                        />
                                    ))}
                                </div>
                                <div className="text-center mt-3">
                                    <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
                                        {6 - filterTheTotoalBalls.length} Balls Left
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <Abc setCurrentOver={() => setCurrentOver(currentOver + 1)} />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
export default Ballingside;

import { useEffect, useState } from "react";
import Batsmanlist from "./Batsmanlist";
import { useDispatch, useSelector } from "react-redux";
import { updateBatsmanRun } from "../utils/teaminfoslice";
import { Users, Star } from "lucide-react";

const Battingside = (props) => {
    const { info, battingTeamName } = props;
    const [batsmanpopup, setBatsmanPopup] = useState(true);
    const [batsman1, setbatsman1] = useState('');
    const [batsman2, setbatsman2] = useState('');
    const [strikerBatsman, setstrikerBatsman] = useState(1);
    const team1 = useSelector((store) => store.Info.team1Info);
    const team2 = useSelector((store) => store.Info.team2info);
    const dispatch = useDispatch();
    const currentBowlerScore = useSelector((store) => store.Info.currentBowlerScore);
    const currentBatBallStatus = useSelector((store) => store.Info.currentBatBallStatus);

    useEffect(() => {
        const currentBallRun = currentBowlerScore[currentBowlerScore.length - 2];
        if (currentBallRun !== 'WD' && currentBallRun !== 'NO') {
            if (strikerBatsman === 1) {
                const batsmanId = batsman1?.id;
                dispatch(updateBatsmanRun({ id: batsmanId, value: currentBallRun }));
            } else {
                const batsmanId = batsman2?.id;
                dispatch(updateBatsmanRun({ id: batsmanId, value: currentBallRun }));
            }
        }

        if (currentBallRun === 'WK') {
            if (strikerBatsman === 1) {
                setbatsman1('');
                setBatsmanPopup(true);
            } else {
                setbatsman2('');
                setBatsmanPopup(true);
            }
        }
    }, [currentBowlerScore]);

    useEffect(() => {
        const currentBallRun = currentBowlerScore[currentBowlerScore.length - 2];
        if (currentBallRun !== 'WK') {
            const id1 = batsman1.id;
            const id2 = batsman2.id;

            if (currentBatBallStatus.batting === 'team1') {
                const playerInfo1 = team1.find((p) => p.id === id1);
                const playerInfo2 = team1.find((p) => p.id === id2);
                setbatsman1(playerInfo1);
                setbatsman2(playerInfo2);
            } else {
                const playerInfo1 = team2.find((p) => p.id === id1);
                const playerInfo2 = team2.find((p) => p.id === id2);
                setbatsman1(playerInfo1);
                setbatsman2(playerInfo2);
            }
        }
    }, [team1, team2]);

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5">
            {/* Header */}
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                    <div className="bg-emerald-100 p-2 rounded-lg">
                        <Users className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Batting Team -<span className="text-gray-600"> {battingTeamName}</span></h2>
                        
                    </div>
                </div>
            </div>

            {/* Popup for Batsman Selection */}
            {batsmanpopup && (
                <Batsmanlist 
                    setBatsmanPopup={() => setBatsmanPopup(false)} 
                    setbatsman1={setbatsman1} 
                    setbatsman2={setbatsman2} 
                    batsmanInfo={info} 
                    batsman1={batsman1} 
                    batsman2={batsman2} 
                />
            )}

            {/* Stats Header */}
            <div className="grid grid-cols-6 gap-2 px-4 py-2 bg-gray-50 rounded-lg mb-3 text-xs font-semibold text-gray-600">
                <div className="col-span-2">Batsman</div>
                <div className="text-center">4s</div>
                <div className="text-center">6s</div>
                <div className="text-center">Balls</div>
                <div className="text-center">Runs</div>
            </div>

            {/* Batsman Cards */}
            <div className="space-y-3">
                {/* Batsman 1 */}
                <div
                    className={`relative px-4 py-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                        strikerBatsman === 1
                            ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white border-emerald-600 shadow-lg'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50'
                    }`}
                    onClick={() => setstrikerBatsman(1)}
                >
                    {strikerBatsman === 1 && (
                        <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-md">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            STRIKER
                        </div>
                    )}
                    <div className="grid grid-cols-6 gap-2 items-center">
                        <div className="col-span-2 font-semibold">
                            {(batsman1?.playerName !== '') ? batsman1?.playerName : '--'}
                        </div>
                        <div className="text-center">{batsman1?.four || 0}</div>
                        <div className="text-center">{batsman1?.six || 0}</div>
                        <div className="text-center">{batsman1?.ballPlayed || 0}</div>
                        <div className="text-center font-bold text-lg">{batsman1?.runs || 0}</div>
                    </div>
                </div>

                {/* Batsman 2 */}
                <div
                    className={`relative px-4 py-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                        strikerBatsman === 2
                            ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white border-emerald-600 shadow-lg'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50'
                    }`}
                    onClick={() => setstrikerBatsman(2)}
                >
                    {strikerBatsman === 2 && (
                        <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-md">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            STRIKER
                        </div>
                    )}
                    <div className="grid grid-cols-6 gap-2 items-center">
                        <div className="col-span-2 font-semibold">
                            {(batsman2?.playerName !== '') ? batsman2?.playerName : '--'}
                        </div>
                        <div className="text-center">{batsman2?.four || 0}</div>
                        <div className="text-center">{batsman2?.six || 0}</div>
                        <div className="text-center">{batsman2?.ballPlayed || 0}</div>
                        <div className="text-center font-bold text-lg">{batsman2?.runs || 0}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Battingside;


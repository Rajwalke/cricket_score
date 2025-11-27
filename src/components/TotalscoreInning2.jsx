import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Trophy, Target, TrendingUp, Clock } from "lucide-react";

const TotalscoreInning2 = (props) => {
    const inningScore = useSelector((store) => store.Info.inning2Score);
    const [inning2Score, setinning2Score] = useState(0);
    const { setWicketRemaning, setRunremaning, setBattingTeamWon, SetBowlingTeamWon, bowlingTeamName, battingTeamName } = props;
    const totoalWickets = useSelector((store) => store.Info.team1Info);

    useEffect(() => {
        setinning2Score(inningScore);
    }, [inningScore]);

    useEffect(() => {
        if (inning2Score?.runsRequired <= 0) {
            setBattingTeamWon(true);
            setWicketRemaning(inning2Score?.wicket);
        } else if (inning2Score?.ballRenmaining === 0 || inning2Score?.wicket === totoalWickets.length - 1) {
            SetBowlingTeamWon(true);
            setRunremaning(inning2Score?.runsRequired);
        }
    }, [inning2Score]);

    const totalOvers = useSelector((store) => store.Info.toss);

    return (
        <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl shadow-2xl p-8 text-white min-w-[400px]">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <Trophy className="w-6 h-6" />
                    <span className="text-sm font-medium text-purple-100">Live Score - Chase</span>
                </div>
                <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-purple-100" />
                </div>
            </div>

            <div className="mb-6">
                <p className="text-purple-100 text-sm mb-2">{battingTeamName}</p>
                <p className="text-5xl font-bold mb-1">
                    {inning2Score?.runs}
                    <span className="text-3xl text-purple-200">/{inning2Score?.wicket}</span>
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-purple-400 mb-4">
                <div>
                    <p className="text-purple-100 text-xs mb-1">Overs</p>
                    <p className="text-2xl font-bold">{`${inning2Score?.overs}.${inning2Score?.balls}`}/{totalOvers.overs}</p>
                </div>
                <div className="text-right">
                    <p className="text-purple-100 text-xs mb-1">Bowling</p>
                    <p className="text-lg font-semibold">{bowlingTeamName}</p>
                </div>
            </div>

            {/* Target Info */}
            <div className="bg-[#48bb61b8] bg-opacity-20 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Target className="w-5 h-5" />
                        <span className="text-sm font-medium">Required</span>
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-bold">
                            {(inning2Score?.runsRequired > 0) ? inning2Score?.runsRequired : 0}
                        </p>
                        <p className="text-xs text-purple-100 flex items-center justify-end mt-1">
                            <Clock className="w-3 h-3 mr-1" />
                            {inning2Score?.ballRenmaining} balls left
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default TotalscoreInning2;
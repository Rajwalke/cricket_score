import { useSelector } from "react-redux";
import { Trophy, Target } from "lucide-react";

const TotalscoreInning1 = (props) => {
    const inning1Score = useSelector((store) => store.Info.inning1Score);
    const totalOvers = useSelector((store) => store.Info.toss);
    const { bowlingTeamName, battingTeamName } = props;

    return (
        <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl shadow-2xl p-5 text-white min-w-[300px]">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <Trophy className="w-6 h-6" />
                    <span className="text-sm font-medium text-emerald-100">Live Score</span>
                </div>
                <div className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-emerald-100" />
                </div>
            </div>
            
            <div className="mb-3">
                <p className="text-emerald-100 text-sm mb-2">{battingTeamName}</p>
                <p className="text-4xl font-bold mb-1">
                    {inning1Score.runs}
                    <span className="text-2xl text-emerald-200">/{inning1Score.wicket}</span>
                </p>
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-emerald-400">
                <div>
                    <p className="text-emerald-100 text-xs mb-1">Overs</p>
                    <p className="text-xl font-bold">{`${inning1Score.overs}.${inning1Score.balls}`}/{totalOvers.overs}</p>
                </div>
                <div className="text-right">
                    <p className="text-emerald-100 text-xs mb-1">Bowling</p>
                    <p className="text-xl font-semibold">{bowlingTeamName}</p>
                </div>
            </div>
        </div>
    );
};
export default TotalscoreInning1;

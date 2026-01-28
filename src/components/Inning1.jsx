import { useEffect, useState } from "react";
import Ballingside from "./Ballingside";
import { useDispatch, useSelector } from "react-redux";
import { updatecurrentBatBallStatus } from "../utils/teaminfoslice";
import Battingside from "./Battingside";
import TotalscoreInning1 from "./TotalscoreInning1";
import { Activity } from "lucide-react";

const Inning1 = () => {
    const teamName = useSelector((store) => store.Info.TeamName);
    const [battingTeam, setBattingTeam] = useState([]);
    const [ballingTeam, setBowllingteam] = useState([]);
    const toss = useSelector((store) => store.Info.toss);
    const team1 = useSelector((store) => store.Info.team1Info);
    const team2 = useSelector((store) => store.Info.team2info);
    const dispatch = useDispatch();
    const currentBatBallStatus = useSelector((store) => store.Info.currentBatBallStatus);
    const battingTeamName = (currentBatBallStatus.batting === 'team1') ? teamName.team1 : teamName.team2;
    const bowlingTeamName = (currentBatBallStatus.bowling === 'team1') ? teamName.team1 : teamName.team2;

    useEffect(() => {
        battingAndBallingTeam();
    }, [team1, team2]);

    const battingAndBallingTeam = () => {
        if ((toss.team === 'team2' && toss.chossto === 'bat') || (toss.team === 'team1' && toss.chossto === 'ball')) {
            setBattingTeam(team2);
            setBowllingteam(team1);
            dispatch(updatecurrentBatBallStatus({ bat: 'team2', ball: 'team1' }));
        }
        else {
            setBattingTeam(team1);
            setBowllingteam(team2);
            dispatch(updatecurrentBatBallStatus({ bat: 'team1', ball: 'team2' }));
        }
    }

    useEffect(() => {
        if (currentBatBallStatus.batting === 'team1') {
            setBattingTeam(team1);
            setBowllingteam(team2);
        } else {
            setBattingTeam(team2);
            setBowllingteam(team1);
        }
    }, [currentBatBallStatus]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-emerald-100">
                <div className="max-w-7xl mx-auto px-6 py-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="bg-gradient-to-br from-emerald-600 to-green-700 p-2 rounded-lg">
                                <Activity className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-gray-900">First Innings</h1>
                                <p className="text-sm text-gray-600">Live Match Scoring</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Score Display */}
                <div className="flex justify-center items-center mb-8">
                    <TotalscoreInning1 bowlingTeamName={bowlingTeamName} battingTeamName={battingTeamName} />
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-6">
                    <Battingside info={battingTeam} battingTeamName={battingTeamName} />
                    <Ballingside info={ballingTeam} bowlingTeamName={bowlingTeamName} />
                </div>
            </div>
        </div>
    );
};
export default Inning1;
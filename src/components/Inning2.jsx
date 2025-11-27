import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Battingside from "./Battingside";
import Ballingside from "./Ballingside";
import TotalscoreInning2 from "./TotalscoreInning2";
import Resultmodal from "./Resultmodal";
import { Activity, Clock } from "lucide-react";

const Inning2 = () => {
    const currentBatBallStatus = useSelector((store) => store.Info.currentBatBallStatus);
    const team1 = useSelector((store) => store.Info.team1Info);
    const team2 = useSelector((store) => store.Info.team2info);
    const [battingTeam, setBattingteam] = useState('');
    const [bowlingTeam, setBowlingteam] = useState('');
    const teamName = useSelector((store) => store.Info.TeamName);
    const [battingTeamWon, setBattingTeamWon] = useState(false);
    const [bowlingTeamWon, SetBowlingTeamWon] = useState(false);
    const [runRemaning, setRunremaning] = useState(0);
    const [wicketRemaning, setWicketRemaning] = useState(0);
    const battingTeamName = (currentBatBallStatus.batting === 'team1') ? teamName.team1 : teamName.team2;
    const bowlingTeamName = (currentBatBallStatus.bowling === 'team1') ? teamName.team1 : teamName.team2;

    useEffect(() => {
        if (currentBatBallStatus.batting === "team1") {
            setBattingteam(team1);
            setBowlingteam(team2);
        } else {
            setBattingteam(team2);
            setBowlingteam(team1);
        }
    }, [currentBatBallStatus, team1, team2]);

    if (battingTeam === '' && bowlingTeam === '') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                    <Clock className="w-16 h-16 text-emerald-600 mx-auto mb-4 animate-spin" />
                    <h1 className="text-2xl font-bold text-gray-900">Loading Second Innings...</h1>
                    <p className="text-gray-600 mt-2">Please wait</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-emerald-100">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="bg-gradient-to-br from-emerald-600 to-green-700 p-2 rounded-lg">
                                <Activity className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Second Innings</h1>
                                <p className="text-sm text-gray-600">Chase in Progress</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Score Display */}
                <div className="flex justify-center items-center mb-8">
                    <TotalscoreInning2
                        setRunremaning={setRunremaning}
                        setWicketRemaning={setWicketRemaning}
                        setBattingTeamWon={setBattingTeamWon}
                        bowlingTeamName={bowlingTeamName}
                        battingTeamName={battingTeamName}
                        SetBowlingTeamWon={SetBowlingTeamWon}
                    />
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-6">
                    <Battingside info={battingTeam} battingTeamName={battingTeamName} />
                    <Ballingside info={bowlingTeam} bowlingTeamName={bowlingTeamName} />
                </div>
            </div>

            {/* Result Modal */}
            {(battingTeamWon || bowlingTeamWon) && (
                <Resultmodal
                    battingTeamWon={battingTeamWon}
                    battingTeamName={battingTeamName}
                    bowlingTeamWon={bowlingTeamWon}
                    bowlingTeamName={bowlingTeamName}
                    runRemaning={runRemaning}
                    wicketRemaning={team1.length - wicketRemaning}
                />
            )}
        </div>
    );
};
export default Inning2;
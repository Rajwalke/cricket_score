import { useState } from "react";
import { useSelector } from "react-redux";
import { Trophy, Award, X, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const Resultmodal = (props) => {
    const { battingTeamWon, battingTeamName, bowlingTeamName, bowlingTeamWon, runRemaning, wicketRemaning } = props;
    const team1Info = useSelector((store) => store.Info.team1Info);
    const team2Info = useSelector((store) => store.Info.team2info);
    const teamName = useSelector((store) => store.Info.TeamName);
    const [team1Switch, setteam1Switch] = useState(true);
    let i=1;
    const [summeryPopup,setSummeryPopup]=useState(false);
    function popupShow(){
        setSummeryPopup(true);
        setTimeout(() => {
            setSummeryPopup(false);
        }, 3000);
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            {
            <p className={`fixed top-10 right-10 z-50 bg-green-400 border border-black rounded-xl p-4 shadow-lg transition-all duration-500 ease-out ${
                summeryPopup 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-full opacity-0 pointer-events-none'
            }`}>
    Match Summary With AI Section is Under Progress
</p>
            }
            <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full h-[90vh] flex flex-col overflow-hidden">
                {/* Winner Header - Reduced Height */}
                <div className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 p-4 text-center relative overflow-hidden flex-shrink-0">
                    
                    
                    <div className="relative z-10">
                        <Trophy className="w-12 h-12 text-white mx-auto mb-2" />
                        <h1 className="text-2xl font-bold text-white mb-2">Match Result</h1>
                        
                        {/* Winner Announcement - Compact */}
                        <div className=" bg-opacity-20 backdrop-blur-md rounded-xl p-3">
                            {(battingTeamWon) ? (
                                <div>
                                    <p className="text-xl font-bold text-white mb-1">🎉 {battingTeamName} Wins! 🎉</p>
                                    <p className="text-sm text-yellow-100">
                                     {battingTeamName} Won by <span className="font-bold">{wicketRemaning}</span> wicket{wicketRemaning !== 1 ? 's' : ''}
                                    </p>
                                </div>
                            ) : (bowlingTeamWon) ? (
                                <div>
                                    <p className="text-xl font-bold text-white mb-1">🎉 {bowlingTeamName} Wins! 🎉</p>
                                    <p className="text-sm text-yellow-100">
                                    {bowlingTeamName} Won by <span className="font-bold">{runRemaning}</span> run{runRemaning !== 1 ? 's' : ''}
                                    </p>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>

                {/* Match Statistics - Scrollable Middle Section */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="flex items-center justify-center space-x-3 mb-4">
                        <BarChart3 className="w-5 h-5 text-gray-700" />
                        <h2 className="text-xl font-bold text-gray-900">Match Statistics</h2>
                    </div>

                    {/* Team Tabs */}
                    <div className="flex gap-3 mb-4 ">
                        <button
                            className={`cursor-pointer flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                team1Switch
                                    ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                            onClick={() => setteam1Switch(true)}
                        >
                            {teamName.team1}
                        </button>
                        <button
                            className={`cursor-pointer flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                !team1Switch
                                    ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                            onClick={() => setteam1Switch(false)}
                        >
                            {teamName.team2}
                        </button>
                    </div>

                    {/* Stats Table Header */}
                    <p className="text-xl font-bold text-gray-900">Batting Team {team1Switch ? teamName.team1 : teamName.team2}</p>
                    <div className="grid grid-cols-7 gap-3 px-4 py-2 bg-gray-100 rounded-xl mb-2 text-sm font-bold text-gray-700">
                        <div className="col-span-2">Player</div>
                        <div className="text-center">4s</div>
                        <div className="text-center">6s</div>
                        <div className="text-center">WicketTakenby</div>
                        <div className="text-center">Runs</div>
                        <div className="text-center">Balls</div>
                    </div>

                    {/* Team 1 Stats */}
                    {(team1Switch) && (
                        <div className="space-y-2">
                            {team1Info.map((info, index) => (
                                <div
                                    key={info.id}
                                    className={`grid grid-cols-7 gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                                        index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                    } hover:bg-emerald-50 border border-gray-200`}
                                >
                                    <div className="col-span-2 font-semibold text-gray-900 flex items-center">
                                        <span className="w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-bold mr-3">
                                            {index + 1}
                                        </span>
                                        {info.playerName}
                                    </div>
                                    <div className="text-center font-medium text-blue-600">{info.four}</div>
                                    <div className="text-center font-medium text-purple-600">{info.six}</div>
                                    <div className="text-center text-red-600">{(info.wicketTakenBy)?info.wicketTakenBy:'Not out'}</div>
                                    <div className="text-center font-bold text-gray-900">{info.runs}</div>
                                    <div className="text-center text-gray-600">{info.ballPlayed}</div>
                                   
                                </div>
                            ))}
                            <div>
                                <p>Bowling Team - {team1Switch ? teamName.team2 : teamName.team1}</p>
                                <div className="grid grid-cols-6 gap-3 px-4 py-2 bg-gray-100 rounded-xl mb-2 text-sm font-bold text-gray-700">
                                    <div className="col-span-2">Player</div>
                                    <div className="text-center">Overs</div>
                                    <div className="text-center">Wicket</div>
                                    <div className="text-center">Runs</div>
                                    <div className="text-center">Economy</div>
                                </div>
                                {
                                    
                                    team2Info.map((info,index)=>
                                        info.over>=1 &&(
                                            <div
                                                key={info.id}
                                                className={`grid grid-cols-6 gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                                                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                                } hover:bg-emerald-50 border border-gray-200`}
                                            >
                                            <div className="col-span-2 font-semibold text-gray-900 flex items-center">
                                                <span className="w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-bold mr-3">
                                                    {i++}
                                                </span>
                                                {info.playerName}
                                            </div>
                                            <div className="text-center font-medium text-blue-600">{info.over}</div>
                                            <div className="text-center font-medium text-purple-600">{info.wicket}</div>
                                            <div className="text-center font-bold text-gray-900">{info.bowlingruns}</div>
                                            <div className="text-center text-gray-600">{info.bowlingruns/info.over}</div>
                                            </div>
                                        )
                                       
                                    )
                                }
                            </div>

                        </div>
                


                    )}

                    {/* Team 2 Stats */}
                    {(!team1Switch) && (
                        <div className="space-y-2">
                            {team2Info.map((info, index) => (
                                <div
                                    key={info.id}
                                    className={`grid grid-cols-7 gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                                        index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                    } hover:bg-emerald-50 border border-gray-200`}
                                >
                                    <div className="col-span-2 font-semibold text-gray-900 flex items-center">
                                        <span className="w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold mr-3">
                                            {index + 1}
                                        </span>
                                        {info.playerName}
                                    </div>
                                    <div className="text-center font-medium text-blue-600">{info.four}</div>
                                    <div className="text-center font-medium text-purple-600">{info.six}</div>
                                    <div className="text-center text-red-600">{(info.wicketTakenBy)?info.wicketTakenBy:'Not out'}</div>
                                    <div className="text-center font-bold text-gray-900">{info.runs}</div>
                                    <div className="text-center text-gray-600">{info.ballPlayed}</div>
                                </div>
                            ))}

                            <div>
                                <p className="text-xl font-bold text-gray-900">Bowling Team - {team1Switch ? teamName.team2 : teamName.team1}</p>
                                <div className="grid grid-cols-6 gap-3 px-4 py-2 bg-gray-100 rounded-xl mb-2 text-sm font-bold text-gray-700">
                                    <div className="col-span-2">Player</div>
                                    <div className="text-center">Overs</div>
                                    <div className="text-center">Wicket</div>
                                    <div className="text-center">Runs</div>
                                    <div className="text-center">Economy</div>
                                </div>
                                {
                                    
                                    team1Info.map((info,index)=>
                                        info.over>=1 &&(
                                            <div
                                                key={info.id}
                                                className={`grid grid-cols-6 gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                                                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                                } hover:bg-emerald-50 border border-gray-200`}
                                            >
                                            <div className="col-span-2 font-semibold text-gray-900 flex items-center">
                                                <span className="w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-bold mr-3">
                                                    {i++}
                                                </span>
                                                {info.playerName}
                                            </div>
                                            <div className="text-center font-medium text-blue-600">{info.over}</div>
                                            <div className="text-center font-medium text-purple-600">{info.wicket}</div>
                                            <div className="text-center font-bold text-gray-900">{info.bowlingruns}</div>
                                            <div className="text-center text-gray-600">{info.bowlingruns/info.over}</div>
                                            </div>
                                        )
                                       
                                    )
                                }
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Actions - Fixed at Bottom */}
                <div className="p-4 bg-gray-50 border-t border-gray-200 flex gap-4 ">
                    <Link to="/" className="flex-1">
                        <button className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-lg">
                            New Match
                        </button>
                    </Link>
                    <Link to="/matchsummery" className="flex-1">
                    <button 
                        onClick={()=>popupShow()}
                        className="w-full flex-1 bg-white text-gray-700 px-6 py-3 rounded-xl font-semibold border-2 border-gray-300 hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-300"
                    >
                        Match Summery AI
                    </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default Resultmodal;
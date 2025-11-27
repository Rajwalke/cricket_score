import { useDispatch, useSelector } from "react-redux";
import { addteam2, updateTeamName, updateuserNameteam2 } from "../utils/teaminfoslice";
import { Shield } from "lucide-react";

const Team2 = () => {
    const dispatch = useDispatch();
    const playerQuanity = useSelector((store) => store.Info.team2info);
    const team2Name = useSelector((store) => store.Info.TeamName.team2);

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
            {/* Team Header */}
            <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-200">
                <div className="bg-gradient-to-br from-green-600 to-emerald-700 p-2.5 rounded-lg">
                    <Shield className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Team 2</h2>
            </div>

            <div>
                {(playerQuanity >= '5') && (
                    <div className="space-y-4">
                        {/* Team Name Input */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Team Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Team Name"
                                value={team2Name}
                                onChange={(e) => dispatch(updateTeamName({ id: 2, value: e.target.value }))}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 font-medium"
                            />
                        </div>

                        {/* Players List */}
                        <div className="space-y-3">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Players
                            </label>
                            {playerQuanity.map((info, index) => (
                                <div key={index} className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-green-100 text-green-700 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">
                                        {index + 1}
                                    </div>
                                    <input
                                        required
                                        type="text"
                                        placeholder={`Player ${index + 1} Name`}
                                        value={info.playerName}
                                        onChange={(e) => {
                                            dispatch(updateuserNameteam2({ index: index, value: e.target.value }));
                                        }}
                                        className="w-full pl-14 pr-4 py-3 border-2 border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Team2;
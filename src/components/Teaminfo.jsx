// Teaminfo.jsx
import { Link } from "react-router-dom";
import Team1 from "./Team1";
import Team2 from "./Team2";
import { useDispatch } from "react-redux";
import { addteam1, addteam2 } from "../utils/teaminfoslice";
import { Users, ArrowRight } from "lucide-react";

const Teamnfo = () => {
    const dispatch = useDispatch();
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-emerald-100">
                <div className="max-w-full mx-auto px-6 py-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-br from-emerald-600 to-green-700 p-2 rounded-lg">
                            <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Team Information</h1>
                            <p className="text-sm text-gray-600">Set up your teams and select match format</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-10">
                {/* Over Selection Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Match Format (Number of Players)
                    </label>
                    <select 
                        required
                        onChange={(e) => {
                            dispatch(addteam1(e.target.value));
                            dispatch(addteam2(e.target.value));
                        }}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-700 font-medium focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 cursor-pointer bg-white hover:border-emerald-300"
                    >
                        <option disabled selected>Select the Number of Players</option>
                        <option value="5">5 Players</option>
                        <option value="6">6 Players</option>
                        <option value="7">7 Players</option>
                        <option value="8">8 Players</option>
                        <option value="9">9 Players</option>
                        <option value="10">10 Players</option>
                        <option value="11">11 Players</option>
                    </select>
                </div>

                {/* Teams Container */}
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    <Team1 />
                    <Team2 />
                </div>

                {/* Next Button */}
                <div className="flex justify-center">
                    <Link to="/toss">
                        <button className="group bg-gradient-to-r from-emerald-600 to-green-600 text-white px-10 py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center">
                            Proceed to Toss
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default Teamnfo;

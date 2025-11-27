import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateToss } from "../utils/teaminfoslice";
import { Coins, Target, Clock, ArrowRight, CheckCircle2 } from "lucide-react";

const Teamtoss = () => {
    const [tossWinTeam, setTossWinTeam] = useState('');
    const [chooseto, setChooseto] = useState('');
    const tossinfo = useSelector((store) => store.Info.toss);
    const dispatch = useDispatch();
    const teamName = useSelector((store) => store.Info.TeamName);

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-emerald-100">
                <div className="max-w-4xl mx-auto px-6 py-6">
                    <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-br from-emerald-600 to-green-700 p-2 rounded-lg">
                            <Coins className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Toss Information</h1>
                            <p className="text-sm text-gray-600">Set up match conditions and toss details</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-10">
                {/* Toss Winner Section */}
                <section className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-6">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="bg-emerald-100 p-2 rounded-lg">
                            <Coins className="w-5 h-5 text-emerald-600" />
                        </div>
                        <p className="text-lg font-bold text-gray-900">Which Team Won the Toss?</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button
                            onClick={() => {
                                dispatch(updateToss({ key: 'team', value: 'team1' }));
                            }}
                            className={`relative px-6 py-4 rounded-xl font-semibold transition-all duration-300 border-2 ${
                                tossinfo.team === 'team1'
                                    ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white border-emerald-600 shadow-lg'
                                    : 'bg-white text-gray-700 border-gray-300 hover:border-emerald-400 hover:bg-emerald-50'
                            }`}
                        >
                            {tossinfo.team === 'team1' && (
                                <CheckCircle2 className="absolute top-5 right-3 w-5 h-5" />
                            )}
                            {teamName.team1 || 'Team 1'}
                        </button>

                        <button
                            onClick={() => {
                                dispatch(updateToss({ key: 'team', value: 'team2' }));
                            }}
                            className={`relative px-6 py-4 rounded-xl font-semibold transition-all duration-300 border-2 ${
                                tossinfo.team === 'team2'
                                    ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white border-emerald-600 shadow-lg'
                                    : 'bg-white text-gray-700 border-gray-300 hover:border-emerald-400 hover:bg-emerald-50'
                            }`}
                        >
                            {tossinfo.team === 'team2' && (
                                <CheckCircle2 className="absolute top-5 right-3 w-5 h-5" />
                            )}
                            {teamName.team2 || 'Team 2'}
                        </button>
                    </div>
                </section>

                {/* Choose to Section */}
                <section className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-6">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="bg-green-100 p-2 rounded-lg">
                            <Target className="w-5 h-5 text-green-600" />
                        </div>
                        <p className="text-lg font-bold text-gray-900">Choose to:</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button
                            onClick={() => {
                                dispatch(updateToss({ key: 'chossto', value: 'bat' }));
                            }}
                            className={`relative px-6 py-4 rounded-xl font-semibold transition-all duration-300 border-2 ${
                                tossinfo.chossto === 'bat'
                                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white border-green-600 shadow-lg'
                                    : 'bg-white text-gray-700 border-gray-300 hover:border-green-400 hover:bg-green-50'
                            }`}
                        >
                            {tossinfo.chossto === 'bat' && (
                                <CheckCircle2 className="absolute top-5 right-3 w-5 h-5" />
                            )}
                            Bat
                        </button>

                        <button
                            onClick={() => {
                                dispatch(updateToss({ key: 'chossto', value: 'ball' }));
                            }}
                            className={`relative px-6 py-4 rounded-xl font-semibold transition-all duration-300 border-2 ${
                                tossinfo.chossto === 'ball'
                                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white border-green-600 shadow-lg'
                                    : 'bg-white text-gray-700 border-gray-300 hover:border-green-400 hover:bg-green-50'
                            }`}
                        >
                            {tossinfo.chossto === 'ball' && (
                                <CheckCircle2 className="absolute top-5 right-3 w-5 h-5" />
                            )}
                            Ball
                        </button>
                    </div>
                </section>

                {/* Overs Selection Section */}
                <section className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-6">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="bg-blue-100 p-2 rounded-lg">
                            <Clock className="w-5 h-5 text-blue-600" />
                        </div>
                        <label className="text-lg font-bold text-gray-900">How Many Overs?</label>
                    </div>
                    <select
                        onChange={(e) => {
                            dispatch(updateToss({ key: 'overs', value: Number(e.target.value) }));
                        }}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl text-gray-700 font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 cursor-pointer bg-white hover:border-blue-300"
                    >
                        <option disabled selected>Select the number of overs</option>
                        <option value="2">2 Overs</option>
                        <option value="5">5 Overs</option>
                        <option value="6">6 Overs</option>
                        <option value="10">10 Overs</option>
                        <option value="15">15 Overs</option>
                        <option value="20">20 Overs (T20)</option>
                        <option value="25">25 Overs</option>
                        <option value="30">30 Overs</option>
                        <option value="35">35 Overs</option>
                        <option value="90">90 Overs</option>
                    </select>
                </section>

                {/* Summary and Next Button */}
                {(tossinfo.team !== '' && tossinfo.chossto !== '' && tossinfo.overs !== 0) && (
                    <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl p-6 shadow-lg mb-6">
                        <div className="flex items-center justify-between text-white">
                            <div>
                                <p className="text-sm font-medium text-emerald-50 mb-1">Match Summary</p>
                                <p className="text-lg font-bold">
                                    {tossinfo.team === 'team1' ? teamName.team1 : teamName.team2} won the toss and chose to {tossinfo.chossto}
                                </p>
                                <p className="text-emerald-100 text-sm mt-1">
                                    {tossinfo.overs} Overs Match
                                </p>
                            </div>
                            <CheckCircle2 className="w-12 h-12 text-white" />
                        </div>
                    </div>
                )}

                {/* Next Button Section */}
                <section className="flex justify-center">
                    {(tossinfo.team !== '' && tossinfo.chossto !== '' && tossinfo.overs !== 0) ? (
                        <Link to="/inning1">
                            <button className="group bg-gradient-to-r from-emerald-600 to-green-600 text-white px-10 py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center">
                                Start Match
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    ) : (
                        <div className="bg-gray-100 text-gray-400 px-10 py-4 rounded-xl font-semibold flex items-center border-2 border-gray-200">
                            Complete all selections to continue
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Teamtoss;
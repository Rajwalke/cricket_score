import { useDispatch, useSelector } from "react-redux";
import { updateCurrentBatballStatus, updateCurrentInning, updateSecondInningchasseScore } from "../utils/teaminfoslice";
import { Link } from "react-router-dom";
import { X, CheckCircle2, XCircle } from "lucide-react";

const Batsmanlist = (props) => {
    const { batsmanInfo, setbatsman1, setbatsman2, setBatsmanPopup, batsman1, batsman2 } = props;
    const dispatch = useDispatch();

    const batsmanslect = (info) => {
        if (batsman1) {
            // if(batsman2!==''){
            //     setbatsman2('');
            // }else{
                setbatsman2(info);
            // }
            
        } else {
            //  if(batsman1!==''){
            //     setbatsman1('');
            // }else{
                setbatsman1(info);
            // }
        }
    }

    const checkallOutOrNot = batsmanInfo.filter((info) => {
        if (info.out === false) return info;
    });

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">Select Batsmen</h2>
                            <p className="text-emerald-100 text-sm mt-1">
                                Choose 2 batsmen to start batting
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-bold">
                                {(batsman1 ? 1 : 0) + (batsman2 ? 1 : 0)}/2
                            </div>
                            <div className="text-emerald-100 text-xs">Selected</div>
                        </div>
                    </div>
                </div>

                {/* Players List */}
                <div className="p-6 overflow-y-auto max-h-[60vh]">
                    <div className="space-y-3">
                        {batsmanInfo.map((info, index) => (
                            <div
                                key={index}
                                className={`flex justify-between items-center px-6 py-4 rounded-xl border-2 transition-all duration-300 ${
                                    info.out
                                        ? 'bg-red-50 border-red-200 cursor-not-allowed opacity-60'
                                        : (info === batsman1 || info === batsman2)
                                        ? 'bg-emerald-50 border-emerald-500 shadow-md'
                                        : 'bg-white border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 cursor-pointer'
                                }`}
                                onClick={() => {
                                    if (info.out === false && info !== batsman1 && info !== batsman2) batsmanslect(info);
                                }}
                            >
                                <div className="flex items-center space-x-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                                        info.out 
                                            ? 'bg-red-100 text-red-600'
                                            : (info === batsman1 || info === batsman2)
                                            ? 'bg-emerald-100 text-emerald-600'
                                            : 'bg-gray-100 text-gray-600'
                                    }`}>
                                        {index + 1}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{info.playerName}</p>
                                        <p className="text-sm text-gray-500">Runs: {info.runs || 0}</p>
                                    </div>
                                </div>
                                <div>
                                    {info.out ? (
                                        <div className="flex items-center text-red-600">
                                            <XCircle className="w-5 h-5 mr-2" />
                                            <span className="font-semibold">OUT</span>
                                        </div>
                                    ) : (info === batsman1 || info === batsman2) ? (
                                        <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                                    ) : null}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 bg-gray-50 border-t border-gray-200">
                    {(checkallOutOrNot.length === 1) ? (
                        <Link to="/inning2">
                            <button
                                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-lg"
                                onClick={() => {
                                    dispatch(updateCurrentBatballStatus());
                                    dispatch(updateCurrentInning());
                                    dispatch(updateSecondInningchasseScore());
                                }}
                            >
                                All Out - Next Inning
                            </button>
                        </Link>
                    ) : (batsman1 === '' || batsman2 === '') ? (
                        <button
                            disabled
                            className="w-full bg-gray-300 text-gray-500 px-6 py-4 rounded-xl font-semibold cursor-not-allowed"
                        >
                            Please select two batsmen
                        </button>
                    ) : (
                        <button
                            onClick={setBatsmanPopup}
                            className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-lg"
                        >
                            Confirm Selection
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Batsmanlist;


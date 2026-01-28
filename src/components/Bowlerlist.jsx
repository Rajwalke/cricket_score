import { useDispatch } from "react-redux";
import { updateBolwerName, updateBowlerOver, updateCurrentNewBowler } from "../utils/teaminfoslice";
import { X, Target } from "lucide-react";

const Bowlerlist = (props) => {
    const { setCurrentOver, allbowlerinfo, setBowlerPopup, setCurrentbowlerInfo, srNoOfBalls, setEnableAddBowlerbutton } = props;
    const dispatch = useDispatch();

    function passInfo(info) {
        setCurrentbowlerInfo(info);
        setBowlerPopup(false);
        setEnableAddBowlerbutton(false);
        dispatch(updateCurrentNewBowler());
        dispatch(updateBowlerOver(info.id));
        dispatch(updateBolwerName(info.playerName));
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            {/* <div className="bg-white bg-opacity-20 p-2 rounded-lg"> */}
                                <Target className="w-8 h-8 text-beige-600" />
                                
                            {/* </div> */}
                            <div>
                                <h2 className="text-2xl font-bold">Select Bowler</h2>
                                <p className="text-green-100 text-sm mt-1">
                                    Choose a bowler for the next over
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setBowlerPopup(false)}
                            className="cursor-pointer "
                        >
                            <X className="w-8 h-8 text-beige-600" />
                        </button>
                    </div>
                </div>

                {/* Bowlers List */}
                <div className="p-6 overflow-y-auto max-h-[60vh]">
                    <div className="space-y-3">
                        {allbowlerinfo.info.map((bowlerinfo, index) => (
                            <div
                                key={bowlerinfo.id}
                                className="flex justify-between items-center px-6 py-4 rounded-xl border-2 border-gray-200 hover:border-green-400 hover:bg-green-50 cursor-pointer transition-all duration-300 bg-white"
                                onClick={() => passInfo(bowlerinfo)}
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{bowlerinfo.playerName}</p>
                                        <p className="text-sm text-gray-500">Select to bowl</p>
                                    </div>
                                </div>
                                <div className="flex space-x-6 text-center">
                                    <div>
                                        <p className="text-xs text-gray-600">Overs</p>
                                        <p className="text-lg font-bold text-gray-900">{bowlerinfo.over}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600">Wickets</p>
                                        <p className="text-lg font-bold text-red-600">{bowlerinfo.wicket}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Bowlerlist;


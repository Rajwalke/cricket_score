import { useState } from "react";
import { AlertCircle } from "lucide-react";

const Abc = (props) => {
    const { setCurrentOver } = props;
    useState(() => {
        setCurrentOver();
    }, []);

    return (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-6 text-center">
            <AlertCircle className="w-12 h-12 text-amber-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-amber-900 mb-2">Over Complete!</h3>
            <p className="text-amber-700">Please select the next bowler to continue</p>
        </div>
    );
};
export default Abc;

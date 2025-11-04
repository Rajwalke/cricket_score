import { useSelector } from "react-redux";

const Totalscore=()=>{
    const inning1Score=useSelector((store)=>store.Info.inning1Score);
    const totalOvers=useSelector((store)=>store.Info.toss);
    return(
        <div className="w-fit border-1-black">
            <p className="text-xl ">team1:{inning1Score.runs}/{inning1Score.wicket}</p>
            <p className="text-xl ">Overs:{`${inning1Score.overs}.${inning1Score.balls}`}/{totalOvers.overs}</p>
        </div>
    )
};
export default Totalscore;
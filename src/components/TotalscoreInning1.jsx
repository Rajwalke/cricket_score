import { useSelector } from "react-redux";

const TotalscoreInning1=(props)=>{
    const inning1Score=useSelector((store)=>store.Info.inning1Score);
    const totalOvers=useSelector((store)=>store.Info.toss);
    const {bowlingTeamName,battingTeamName}=props
    return(
        <div className="w-fit border-1-black flex justify-center items-center flex-col border-2 border-black rounded-md p-2 mt-5">
            <p className="text-xl ">{battingTeamName}:{inning1Score.runs}/{inning1Score.wicket}</p>
            <p className="text-xl ">Overs:{`${inning1Score.overs}.${inning1Score.balls}`}/{totalOvers.overs}</p>
        </div>
    )
};
export default TotalscoreInning1;
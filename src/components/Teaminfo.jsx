import { Link } from "react-router-dom";
import Team1 from "./Team1";
import Team2 from "./Team2";

const Teamnfo=()=>{
    return(
        <div className="flex flex-col justify-center items-center gap-10">
            <div>
                <Team1/>
                <Team2/>
            </div>
            <div>
               <Link to="/toss"><button>Next</button></Link> 
            </div>
            
            
        </div>
    )
};
export default Teamnfo;
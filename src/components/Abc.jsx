import { useState } from "react";

const Abc=(props)=>{
    const {setCurrentOver}=props;
    useState(()=>{
        setCurrentOver();
    },[])
return(
    <h1>Over is complete please slect the nextn bowler</h1>
)
};
export default Abc;
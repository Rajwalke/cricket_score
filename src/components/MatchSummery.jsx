import { GoogleGenAI } from "@google/genai";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const Matchsummery=()=>{
  const [result,setResult]=useState('');
  const API_KEY = import.meta.env.VITE_API_KEY;
  console.log("API KEY ",API_KEY);
  const ai=new GoogleGenAI({apiKey: API_KEY})
  const team1Data=useSelector((store)=>store.Info.team1Info);
  const team2Data=useSelector((store)=>store.Info.team2info);
  const tossInfo=useSelector((store)=>store.Info.toss);
  const inning1Score=useSelector((store)=>store.Info.inning1Score);
  const inning2Score=useSelector((store)=>store.Info.inning2Score);
  const teamNames=useSelector((store)=>store.Info.TeamName);

  // console.log('team1 and team2',team1Data,team2Data);
  async function MatchSummeryCall(params) {
    const response=await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
  {
    role: "user",
    parts: [
      {
        text: `

Below is the complete match data. Carefully analyze it and generate a **clear, engaging, and well-structured cricket match summary**.

MATCH DATA:
----------------
Team Names:
${JSON.stringify(teamNames, null, 2)}

Toss Information:
${JSON.stringify(tossInfo, null, 2)}

Team 1 Players & Performance:
${JSON.stringify(team1Data, null, 2)}

Team 2 Players & Performance:
${JSON.stringify(team2Data, null, 2)}

Innings 1 Scorecard:
${JSON.stringify(inning1Score, null, 2)}

Innings 2 Scorecard:
${JSON.stringify(inning2Score, null, 2)}

INSTRUCTIONS:
-----------
- Summarize how the match progressed.
- Mention who won and by what margin.
- Highlight key batting and bowling performances.
- Keep the summary concise and readable.
- Do NOT include raw JSON or technical data.
`
      }
    ]
  }
]

    });
    console.log(response.text);
     setResult(response.text)
  }
  const speakResult = () => {
  if (!result) return;

  window.speechSynthesis.cancel(); // stop previous speech

  const utterance = new SpeechSynthesisUtterance(result);
  utterance.lang = "en-IN"; // Indian English
  utterance.rate = 1.2;      // speed (0.8–1.2 is good)
  utterance.pitch = 1;

  window.speechSynthesis.speak(utterance);
};
  useEffect(()=>{
    MatchSummeryCall();
    
  },[])

  useEffect(()=>{
    speakResult();
  },[result])
  return (
    <div>
      <h1>Match Summery</h1>
      <p>Result is : {result}</p>
      <button 
      onClick={speakResult}
      >
        Listen
      </button>
    </div>
  )
};
export default Matchsummery
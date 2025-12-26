import { GoogleGenAI } from "@google/genai";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Sparkles, Trophy, Volume2, VolumeX, Loader2 } from "lucide-react";

const Matchsummery = () => {
  const [result, setResult] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const API_KEY = import.meta.env.VITE_API_KEY;
  console.log("API KEY ", API_KEY);
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const team1Data = useSelector((store) => store.Info.team1Info);
  const team2Data = useSelector((store) => store.Info.team2info);
  const tossInfo = useSelector((store) => store.Info.toss);
  const inning1Score = useSelector((store) => store.Info.inning1Score);
  const inning2Score = useSelector((store) => store.Info.inning2Score);
  const teamNames = useSelector((store) => store.Info.TeamName);

  async function MatchSummeryCall(params) {
    setIsLoading(true);
    try {
      const response = await ai.models.generateContent({
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
- Do NOT include raw JSON or technical data.and dont use * charcter
`
              }
            ]
          }
        ]
      });
      console.log(response.text);
      setResult(response.text);
    } catch (error) {
      console.error("Error generating summary:", error);
      setResult("Failed to generate match summary. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const speakResult = () => {
    if (!result || result.includes("Failed to generate")) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(result);
    utterance.lang = "en-IN";
    utterance.rate = 1.2;
    utterance.pitch = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  useEffect(() => {
    MatchSummeryCall();
  }, []);

  useEffect(() => {
    if (result && !result.includes("Failed to generate")) {
      speakResult();
    }
  }, [result]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top duration-700">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-emerald-600" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Match Summary
            </h1>
            <Trophy className="w-10 h-10 text-emerald-600" />
          </div>
          <p className="text-gray-600 text-lg">AI-Powered Match Analysis</p>
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-bottom duration-700">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Generated Summary
            </h2>
            {!isLoading && result && !result.includes("Failed to generate") && (
              <button
                onClick={isSpeaking ? stopSpeaking : speakResult}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-300 hover:scale-105"
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-5 h-5" />
                    <span className="hidden sm:inline">Stop</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-5 h-5" />
                    <span className="hidden sm:inline">Listen</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Card Body */}
          <div className="p-6 md:p-8">
            {isLoading ? (
              <div className="space-y-4">
                {/* Shimmer Loading Animation */}
                <div className="flex items-center justify-center mb-6">
                  <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
                  <span className="ml-3 text-gray-600 text-lg">Generating match summary...</span>
                </div>
                
                {/* Shimmer Lines */}
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="space-y-3">
                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse bg-[length:200%_100%] animate-shimmer"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse bg-[length:200%_100%] animate-shimmer" style={{ width: '90%', animationDelay: '0.1s' }}></div>
                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse bg-[length:200%_100%] animate-shimmer" style={{ width: '95%', animationDelay: '0.2s' }}></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base md:text-lg">
                  {result || "No summary available"}
                </p>
              </div>
            )}
          </div>

          {/* Card Footer */}
          {!isLoading && (
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Powered by AI
                </span>
                {isSpeaking && (
                  <span className="flex items-center gap-2 text-emerald-600 font-medium animate-pulse">
                    <Volume2 className="w-4 h-4" />
                    Speaking...
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 animate-in fade-in slide-in-from-left duration-700">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-emerald-600" />
              Match Info
            </h3>
            <p className="text-sm text-gray-600">AI-generated analysis of the complete match data</p>
          </div>
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 animate-in fade-in slide-in-from-right duration-700">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-emerald-600" />
              Audio Summary
            </h3>
            <p className="text-sm text-gray-600">Click the speaker icon to hear the summary</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default Matchsummery;
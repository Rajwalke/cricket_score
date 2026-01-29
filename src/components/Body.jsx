import { Link } from "react-router-dom";
import { Trophy, Users, BarChart3, Clock, ArrowRight, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png"
const Body = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      {/* Header/Navbar */}
      <nav className="bg-white shadow-sm border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-2 py-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img className="w-2/12" src={logo} />
            </div>
            <Link
              to="/team1"
              className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div
        
          className={`text-center transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="inline-flex items-center bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-pulse">
            <Zap className="w-4 h-4 mr-2" />
            Professional Cricket Scoring Made Simple
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Track Every Ball,
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Master Every Match
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            The ultimate cricket scoring application for teams, tournaments, and enthusiasts. 
            Real-time scoring with 100% free & no sign-up required
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              to="/team1"
              className="group bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center"
            >
              Start Scoring Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            
            <a href="https://youtu.be/pr-xGXlLqmo?si=bglWWVEoBiQn73LZ" target="blank" ><button className="bg-white text-emerald-700 px-8 py-4 rounded-xl font-semibold border-2 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-300 shadow-md">
              Watch Demo
            </button>
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              icon: Users,
              title: "Team Management",
              description: "Organize players, track performances, and manage multiple teams effortlessly",
              color: "emerald"
            },
            {
              icon: BarChart3,
              title: "Live Analytics",
              description: "Real-time statistics, run rates, and performance metrics at your fingertips",
              color: "green"
            },
            {
              icon: Clock,
              title: "Ball-by-Ball",
              description: "Detailed ball-by-ball commentary and scoring with complete match history",
              color: "teal"
            },
            {
              icon: Trophy,
              title: "Match Summary",
              description: "Comprehensive scorecards and match summaries for every game",
              color: "emerald"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className={`bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-${feature.color}-200 transform hover:-translate-y-2 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`
              }}
            >
              <div className={`bg-gradient-to-br from-${feature.color}-100 to-${feature.color}-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Elevate Your Cricket Scoring?
          </h2>
          <p className="text-emerald-50 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of teams already using CricDash for professional match management
          </p>
          <Link
            to="/team1"
            className="inline-flex items-center bg-white text-emerald-700 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Begin Your Match
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-2">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="bg-gradient-to-br from-emerald-600 to-green-700 p-2 rounded-lg">
                <Trophy className="w-3 h-3 text-white" />
              </div>
              <span className="text-md font-bold text-gray-800">CricDash</span>
            </div>
            <p className="text-gray-600 text-sm">
              © 2025 CricDash. Professional Cricket Scoring Platform.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Body;
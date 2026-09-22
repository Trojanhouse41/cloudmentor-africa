import { useState } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('matchmaking');

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-blue-900 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">☁️ CloudMentor Africa</h1>
          <p className="text-sm text-blue-200 hidden md:block">WIICA Final Project</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto flex space-x-4 p-2 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('matchmaking')}
            className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === 'matchmaking' ? 'bg-blue-100 text-blue-900' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            🤝 Matchmaking
          </button>
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === 'analytics' ? 'bg-blue-100 text-blue-900' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            📊 Analytics (R)
          </button>
          <button 
            onClick={() => setActiveTab('feedback')}
            className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === 'feedback' ? 'bg-blue-100 text-blue-900' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            🔒 Feedback & Privacy
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto p-4 md:p-8">
        {activeTab === 'matchmaking' && <MatchmakingView />}
        {activeTab === 'analytics' && <AnalyticsView />}
        {activeTab === 'feedback' && <FeedbackView />}
      </main>
    </div>
  );
}

// Matchmaking Tab
function MatchmakingView() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Find Your Cloud Mentor</h2>
      <p className="text-gray-600 mb-6">Tell us your career goals, and our AI will match you with an expert.</p>
      
      <div className="space-y-4">
        <input 
          type="text" 
          placeholder="e.g., I want to learn AWS Machine Learning..." 
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition">
          Analyze & Match (AWS Comprehend)
        </button>
      </div>
    </div>
  );
}

// Analytics Tab - WITH YOUR R CHART
function AnalyticsView() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Community Skill Gaps</h2>
      <p className="text-gray-600 mb-6">Descriptive analytics generated via R to show top requested skills.</p>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <img 
          src="/skill_gaps.png" 
          alt="R Generated Chart of Cloud Skills" 
          className="w-full h-auto rounded shadow-sm"
        />
        <p className="text-xs text-gray-500 mt-3 text-center italic">
          *Data generated using R (ggplot2) from anonymized WIICA mentorship requests.
        </p>
      </div>
    </div>
  );
}

// Feedback Tab
function FeedbackView() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Anonymous Session Feedback</h2>
      
      <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded">
        <p className="text-green-800 text-sm font-medium">🔒 Data Protection Active: Your feedback is anonymized using Strathmore-certified privacy protocols.</p>
      </div>

      <div className="space-y-4">
        <textarea 
          placeholder="How was your mentorship session today?" 
          className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 outline-none"
        ></textarea>
        
        <div className="flex items-center space-x-2">
          <input type="checkbox" id="consent" className="w-4 h-4 text-blue-600" defaultChecked />
          <label htmlFor="consent" className="text-sm text-gray-600">I consent to my feedback being analyzed for community insights.</label>
        </div>

        <button className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition">
          Submit Anonymously
        </button>
      </div>
    </div>
  );
}

export default App;
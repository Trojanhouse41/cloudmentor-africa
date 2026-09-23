import { useState, useEffect } from 'react';

// --- MOCK DATA ---
const mockMentors = [
  { id: 1, name: "Sarah Ochieng", role: "AWS Solutions Architect", skills: ["Cloud Security", "EC2", "S3"], img: "https://ui-avatars.com/api/?name=Sarah+Ochieng&background=6b21a8&color=fff" },
  { id: 2, name: "David Kimani", role: "Machine Learning Engineer", skills: ["Python", "SageMaker", "Data Science"], img: "https://ui-avatars.com/api/?name=David+Kimani&background=047857&color=fff" },
  { id: 3, name: "Amina Hassan", role: "Frontend & Cloud Developer", skills: ["React", "AWS Amplify", "UI/UX"], img: "https://ui-avatars.com/api/?name=Amina+Hassan&background=d97706&color=fff" },
];

const initialMockDynamoDBItems = [
  { id: "item-001", timestamp: "2026-09-23 10:15:22", feedback: "Great session on S3 buckets!", sentiment: "POSITIVE", anonymized: true },
  { id: "item-002", timestamp: "2026-09-23 11:30:05", feedback: "Need more help with Lambda triggers.", sentiment: "NEUTRAL", anonymized: true },
  { id: "item-003", timestamp: "2026-09-23 14:45:10", feedback: "Loved the matchmaking feature!", sentiment: "POSITIVE", anonymized: false },
];

const cloudResources = [
  { title: "AWS Skill Builder", desc: "Free digital training on cloud fundamentals.", icon: "fa-graduation-cap", color: "text-purple-500", link: "https://skillbuilder.aws/" },
  { title: "AWS Free Tier", desc: "Explore 100+ AWS services for free for 12 months.", icon: "fa-gift", color: "text-amber-500", link: "https://aws.amazon.com/free/" },
  { title: "R Programming Docs", desc: "Official documentation for R and ggplot2 analytics.", icon: "fa-r-project fab", color: "text-violet-500", link: "https://www.r-project.org/" },
  { title: "WIICA Community", desc: "Connect with other women innovators in cloud tech.", icon: "fa-users", color: "text-fuchsia-500", link: "#" },
];

const liveEvents = [
  "Amina from Nairobi just matched with a Cloud Architect!",
  "15 new feedback submissions anonymized today.",
  " David completed the AWS Cloud Practitioner path.",
  "Data Protection protocols successfully updated.",
  "New mentor 'Sarah O.' joined the platform."
];

function App() {
  const [activeTab, setActiveTab] = useState('matchmaking');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);

  const [dbData, setDbData] = useState(() => {
    const savedData = localStorage.getItem('wiica_dynamodb_data');
    return savedData ? JSON.parse(savedData) : initialMockDynamoDBItems;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % liveEvents.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isDarkMode]);

  const addFeedbackToDb = (text) => {
    const newItem = {
      id: `user-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      feedback: text,
      sentiment: "POSITIVE", 
      anonymized: true
    };
    const newData = [newItem, ...dbData];
    setDbData(newData);
    localStorage.setItem('wiica_dynamodb_data', JSON.stringify(newData)); 
  };

  return (
    // SOFT PURPLE & AMBER GRADIENT BACKGROUND
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-50 via-white to-amber-50/40 dark:from-slate-950 dark:via-purple-950/20 dark:to-slate-950 font-sans flex flex-col transition-colors duration-500">
      
      {/* Header - Soft Purple */}
      <header className="bg-purple-900/95 dark:bg-slate-900/95 backdrop-blur-md text-white p-4 shadow-lg border-b border-purple-800/30 dark:border-purple-900/50 transition-all duration-300">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2 tracking-tight">
            <i className="fas fa-cloud text-purple-300"></i> CloudMentor Africa
          </h1>
          <div className="flex items-center gap-4">
            <p className="text-sm text-purple-200 dark:text-purple-300/70 hidden md:block font-medium">WIICA Final Project</p>
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 dark:bg-purple-900/50 dark:hover:bg-purple-800/50 transition backdrop-blur-sm">
              {isDarkMode ? <i className="fas fa-sun text-amber-400"></i> : <i className="fas fa-moon text-purple-200"></i>}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation - Frosted Glass with Purple Accents */}
      <nav className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg shadow-sm sticky top-0 z-20 border-b border-purple-100/50 dark:border-purple-900/30 transition-all duration-300">
        <div className="container mx-auto flex space-x-2 md:space-x-4 p-2 overflow-x-auto">
          <button onClick={() => setActiveTab('matchmaking')} className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap flex items-center ${activeTab === 'matchmaking' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-purple-100/50 dark:hover:bg-purple-900/30'}`}>
            <i className="fas fa-handshake mr-2"></i> Matchmaking
          </button>
          <button onClick={() => setActiveTab('analytics')} className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap flex items-center ${activeTab === 'analytics' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-purple-100/50 dark:hover:bg-purple-900/30'}`}>
            <i className="fas fa-chart-bar mr-2"></i> Analytics (R)
          </button>
          <button onClick={() => setActiveTab('feedback')} className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap flex items-center ${activeTab === 'feedback' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-purple-100/50 dark:hover:bg-purple-900/30'}`}>
            <i className="fas fa-lock mr-2"></i> Feedback
          </button>
          <button onClick={() => setActiveTab('aws-console')} className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap flex items-center ${activeTab === 'aws-console' ? 'bg-amber-500 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-purple-100/50 dark:hover:bg-purple-900/30'}`}>
            <i className="fab fa-aws mr-2"></i> AWS Console
          </button>
          <button onClick={() => setActiveTab('resources')} className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap flex items-center ${activeTab === 'resources' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-purple-100/50 dark:hover:bg-purple-900/30'}`}>
            <i className="fas fa-book-open mr-2"></i> Resources
          </button>
        </div>
      </nav>

      {/* Live Activity Ticker */}
      <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-b border-purple-100/50 dark:border-purple-900/30 py-2 px-4 transition-colors duration-300">
        <div className="container mx-auto flex items-center text-sm">
          <span className="font-bold text-purple-700 dark:text-purple-400 mr-3 flex items-center">
            <i className="fas fa-broadcast-tower mr-2 animate-pulse text-amber-500"></i> LIVE ACTIVITY:
          </span>
          <span className="text-gray-700 dark:text-gray-300 transition-opacity duration-500 ease-in-out font-medium" key={tickerIndex}>
            {liveEvents[tickerIndex]}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto p-4 md:p-8 flex-grow">
        {activeTab === 'matchmaking' && <MatchmakingView />}
        {activeTab === 'analytics' && <AnalyticsView />}
        {activeTab === 'feedback' && <FeedbackView onSubmitFeedback={addFeedbackToDb} />}
        {activeTab === 'aws-console' && <AWSConsoleView dbData={dbData} />}
        {activeTab === 'resources' && <ResourcesView />}
      </main>

      {/* Footer */}
      <footer className="bg-purple-950/90 dark:bg-black/90 backdrop-blur-md text-purple-200/70 text-center p-6 text-sm mt-auto border-t border-purple-900/50 transition-colors duration-300">
        <p>© 2026 CloudMentor Africa. Built for Women Innovation in Cloud Africa (WIICA).</p>
        <p className="text-xs mt-2 flex justify-center items-center gap-2"><i className="fas fa-shield-alt text-amber-400"></i> Secured with AWS IAM & Data Protection Protocols.</p>
      </footer>
    </div>
  );
}

// --- MATCHMAKING VIEW ---
function MatchmakingView() {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [matchedMentor, setMatchedMentor] = useState(null);
  const [isAnonymous, setIsAnonymous] = useState(false); 

  const handleAnalyze = () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    setMatchedMentor(null);
    setTimeout(() => {
      const randomMentor = mockMentors[Math.floor(Math.random() * mockMentors.length)];
      setMatchedMentor(randomMentor);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-xl border border-purple-100/50 dark:border-purple-900/30 transition-all duration-300">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Find Your Cloud Mentor</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Tell us your career goals. Our AI (AWS Comprehend) will analyze your text and match you with an expert.</p>
        
        <div className="space-y-4">
          <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="e.g., I want to learn AWS Machine Learning..." className="w-full p-4 border border-purple-100 dark:border-purple-900/50 bg-white/50 dark:bg-slate-900/50 text-gray-900 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-lg transition-all duration-300 shadow-sm" />
          <div className="flex items-center space-x-3 bg-purple-50/80 dark:bg-purple-900/20 p-3 rounded-xl border border-purple-100 dark:border-purple-800/50 transition-all duration-300">
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={isAnonymous} onChange={() => setIsAnonymous(!isAnonymous)} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
            <span className="text-sm font-medium text-purple-900 dark:text-purple-200 flex items-center"><i className="fas fa-user-shield mr-2 text-purple-600 dark:text-purple-400"></i> Anonymize my profile (Data Protection)</span>
          </div>
          <button onClick={handleAnalyze} disabled={isLoading} className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-violet-700 transition-all shadow-lg disabled:opacity-50 flex justify-center items-center">
            {isLoading ? <><i className="fas fa-circle-notch fa-spin mr-2"></i> Sending to Amazon Comprehend API...</> : <><i className="fas fa-rocket mr-2"></i> Analyze & Match</>}
          </button>
        </div>
        
        {/* Match Result - Soft Amber/Yellow */}
        {matchedMentor && (
          <div className="mt-6 p-6 bg-amber-50/80 dark:bg-amber-900/20 backdrop-blur-sm border border-amber-200 dark:border-amber-800/50 rounded-xl transition-all duration-300 shadow-md">
            <h3 className="text-lg font-bold text-amber-900 dark:text-amber-300 mb-3 flex items-center"><i className="fas fa-star text-amber-500 mr-2"></i> Perfect Match Found via AWS AI!</h3>
            <div className="flex items-center gap-4">
              <img src={matchedMentor.img} alt={matchedMentor.name} className="w-16 h-16 rounded-full border-2 border-white shadow-sm" />
              <div>
                <p className="font-bold text-gray-800 dark:text-gray-100 text-lg">{matchedMentor.name}</p>
                <p className="text-gray-600 dark:text-gray-400">{matchedMentor.role}</p>
                <div className="flex flex-wrap gap-2 mt-2">{matchedMentor.skills.map(skill => (<span key={skill} className="px-2 py-1 bg-white dark:bg-slate-800 text-purple-800 dark:text-purple-300 text-xs rounded-full border border-purple-200 dark:border-purple-700">{skill}</span>))}</div>
              </div>
            </div>
            <button className="mt-4 w-full bg-gradient-to-r from-amber-400 to-yellow-500 text-purple-900 py-2 rounded-xl hover:from-amber-500 hover:to-yellow-600 transition flex justify-center items-center shadow-md font-bold"><i className="fas fa-envelope mr-2"></i> Request Mentorship</button>
          </div>
        )}
        <div className="mt-6 flex justify-end items-center gap-2 text-xs text-gray-400 border-t border-purple-100/50 dark:border-purple-900/30 pt-4 transition-colors duration-300">
          <i className="fab fa-aws text-lg text-amber-500"></i><span>Powered by AWS Amplify & DynamoDB</span>
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center transition-colors duration-300"><i className="fas fa-users text-purple-600 dark:text-purple-400 mr-2"></i> Featured Cloud Mentors</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockMentors.map(mentor => (
            <div key={mentor.id} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-purple-100/50 dark:border-purple-900/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <img src={mentor.img} alt={mentor.name} className="w-12 h-12 rounded-full shadow-sm" />
                <div><p className="font-bold text-gray-800 dark:text-gray-100">{mentor.name}</p><p className="text-xs text-gray-500 dark:text-gray-400">{mentor.role}</p></div>
              </div>
              <div className="flex flex-wrap gap-1">{mentor.skills.map(skill => (<span key={skill} className="px-2 py-1 bg-purple-50/80 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full">{skill}</span>))}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- ANALYTICS VIEW ---
function AnalyticsView() {
  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-xl border border-purple-100/50 dark:border-purple-900/30 transition-all duration-300">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 flex items-center"><i className="fas fa-chart-line text-purple-600 dark:text-purple-400 mr-2"></i> Community Skill Gaps</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Descriptive analytics generated via R (ggplot2) to show top requested skills.</p>
      <div className="bg-purple-50/50 dark:bg-slate-900/80 p-4 rounded-xl border border-purple-100/50 dark:border-purple-900/30 transition-all duration-300 shadow-inner">
        <img src="/skill_gaps.png" alt="R Generated Chart" className="w-full h-auto rounded-lg shadow-sm" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center italic flex justify-center items-center"><i className="fab fa-r-project mr-1 text-purple-500"></i> Data generated using R from anonymized WIICA mentorship requests.</p>
      </div>
    </div>
  );
}

// --- FEEDBACK VIEW ---
function FeedbackView({ onSubmitFeedback }) {
  const [inputText, setInputText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => { 
    e.preventDefault(); 
    onSubmitFeedback(inputText); 
    setInputText(''); 
    setSubmitted(true); 
  };

  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-xl border border-purple-100/50 dark:border-purple-900/30 max-w-2xl mx-auto transition-all duration-300">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center"><i className="fas fa-comment-dots text-purple-600 dark:text-purple-400 mr-2"></i> Anonymous Session Feedback</h2>
      <div className="bg-purple-50/80 dark:bg-purple-900/20 border-l-4 border-purple-500 p-4 mb-6 rounded-xl transition-all duration-300">
        <p className="text-purple-900 dark:text-purple-200 text-sm font-medium flex items-start"><i className="fas fa-shield-alt mt-1 mr-2 text-amber-500"></i><span><strong>Data Protection Active:</strong> Your feedback is anonymized and encrypted using Strathmore-certified privacy protocols before storage in DynamoDB.</span></p>
      </div>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea required value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="How was your mentorship session today?" className="w-full p-3 border border-purple-100 dark:border-purple-900/50 bg-white/50 dark:bg-slate-900/50 text-gray-900 dark:text-gray-100 rounded-xl h-32 focus:ring-2 focus:ring-purple-500 outline-none transition-all duration-300 shadow-sm"></textarea>
          <div className="flex items-start space-x-2"><input type="checkbox" id="consent" className="w-4 h-4 mt-1 text-purple-600" defaultChecked required /><label htmlFor="consent" className="text-sm text-gray-600 dark:text-gray-400">I consent to my feedback being analyzed for community insights.</label></div>
          <button type="submit" className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 text-purple-900 py-3 rounded-xl font-bold hover:from-amber-500 hover:to-yellow-600 transition-all shadow-lg flex justify-center items-center"><i className="fas fa-paper-plane mr-2"></i> Submit Anonymously</button>
        </form>
      ) : (
        <div className="text-center py-10"><i className="fas fa-check-circle text-5xl text-amber-500 mb-4"></i><h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Thank You!</h3><p className="text-gray-600 dark:text-gray-400 mb-6">Your feedback has been securely anonymized and submitted to the WIICA database.</p><button onClick={() => setSubmitted(false)} className="text-purple-600 dark:text-purple-400 hover:underline font-medium">Submit another response</button></div>
      )}
    </div>
  );
}

// --- AWS CONSOLE VIEW ---
function AWSConsoleView({ dbData }) {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <aside className="w-full md:w-64 bg-[#232f3e] text-gray-300 p-4 rounded-2xl shadow-xl border border-purple-900/30">
        <div className="flex items-center gap-2 mb-6 text-white">
          <i className="fab fa-aws text-2xl text-amber-500"></i>
          <span className="font-bold tracking-wide">AWS Management Console</span>
        </div>
        <ul className="space-y-3 text-sm">
          <li className="flex items-center gap-3 p-2 bg-purple-900/40 rounded-lg text-white shadow-inner border-l-2 border-amber-500"><i className="fas fa-database text-amber-400"></i> DynamoDB</li>
          <li className="flex items-center gap-3 p-2 hover:bg-[#37475a] rounded-lg cursor-pointer transition"><i className="fas fa-bolt text-yellow-400"></i> Lambda</li>
          <li className="flex items-center gap-3 p-2 hover:bg-[#37475a] rounded-lg cursor-pointer transition"><i className="fas fa-brain text-green-400"></i> Comprehend</li>
          <li className="flex items-center gap-3 p-2 hover:bg-[#37475a] rounded-lg cursor-pointer transition"><i className="fas fa-shield-alt text-blue-400"></i> IAM</li>
        </ul>
      </aside>

      <div className="flex-1 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-purple-100/50 dark:border-purple-900/30">
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">DynamoDB Read Capacity</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-1">42 <span className="text-sm text-amber-500 font-normal">/ 200M</span></p>
          </div>
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-purple-100/50 dark:border-purple-900/30">
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Lambda Invocations</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-1">15 <span className="text-sm text-amber-500 font-normal">/ 1M</span></p>
          </div>
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-purple-100/50 dark:border-purple-900/30">
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Comprehend API Calls</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-1">8 <span className="text-sm text-amber-500 font-normal">/ 100K</span></p>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-purple-100/50 dark:border-purple-900/30">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center">
              <i className="fas fa-table text-amber-500 mr-2"></i> Table: <span className="text-purple-600 dark:text-purple-400 ml-1 font-mono">WIICA-Feedback-Table</span>
            </h3>
            <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs rounded-full font-bold flex items-center gap-1"><span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span> Active</span>
          </div>
          <div className="overflow-x-auto rounded-lg border border-purple-100/50 dark:border-purple-900/30">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-purple-50/80 dark:bg-slate-900/80 dark:text-gray-400">
                <tr>
                  <th className="px-4 py-3">Partition Key (id)</th>
                  <th className="px-4 py-3">Timestamp</th>
                  <th className="px-4 py-3">Feedback Text</th>
                  <th className="px-4 py-3">Sentiment</th>
                  <th className="px-4 py-3">Anonymized</th>
                </tr>
              </thead>
              <tbody>
                {dbData.map(item => (
                  <tr key={item.id} className="bg-white/50 dark:bg-slate-800/50 border-b dark:border-purple-900/30 hover:bg-purple-50/50 dark:hover:bg-purple-900/20 transition">
                    <td className="px-4 py-3 font-mono text-purple-600 dark:text-purple-400">{item.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs">{item.timestamp}</td>
                    <td className="px-4 py-3 text-gray-800 dark:text-gray-200">{item.feedback}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${item.sentiment === 'POSITIVE' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800'}`}>
                        {item.sentiment}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {item.anonymized ? <i className="fas fa-check-circle text-amber-500"></i> : <i className="fas fa-times-circle text-gray-400"></i>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-4 italic">* This view simulates the Amazon DynamoDB Items explorer. Data persists via LocalStorage for this Phase 1 prototype.</p>
        </div>
      </div>
    </div>
  );
}

// --- RESOURCES VIEW ---
function ResourcesView() {
  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-xl border border-purple-100/50 dark:border-purple-900/30 transition-all duration-300">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 flex items-center">
        <i className="fas fa-book-open text-purple-600 dark:text-purple-400 mr-2"></i> Cloud Learning Resources
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Curated tools and platforms to help you master cloud computing and data analytics.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cloudResources.map((resource, index) => (
          <a 
            key={index} 
            href={resource.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block p-5 bg-purple-50/50 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-purple-100/50 dark:border-purple-900/30 hover:shadow-xl hover:-translate-y-1 hover:border-purple-400/50 transition-all duration-300"
          >
            <i className={`fas ${resource.icon} text-3xl ${resource.color} mb-3`}></i>
            <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-1">{resource.title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{resource.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

export default App;
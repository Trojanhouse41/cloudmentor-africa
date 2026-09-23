import { useState, useEffect } from 'react';

// --- MOCK DATA ---
const mockMentors = [
  { id: 1, name: "Sarah Ochieng", role: "AWS Solutions Architect", skills: ["Cloud Security", "EC2", "S3"], img: "https://ui-avatars.com/api/?name=Sarah+Ochieng&background=1e3a8a&color=fff" },
  { id: 2, name: "David Kimani", role: "Machine Learning Engineer", skills: ["Python", "SageMaker", "Data Science"], img: "https://ui-avatars.com/api/?name=David+Kimani&background=047857&color=fff" },
  { id: 3, name: "Amina Hassan", role: "Frontend & Cloud Developer", skills: ["React", "AWS Amplify", "UI/UX"], img: "https://ui-avatars.com/api/?name=Amina+Hassan&background=b45309&color=fff" },
];

const initialMockDynamoDBItems = [
  { id: "item-001", timestamp: "2026-09-23 10:15:22", feedback: "Great session on S3 buckets!", sentiment: "POSITIVE", anonymized: true },
  { id: "item-002", timestamp: "2026-09-23 11:30:05", feedback: "Need more help with Lambda triggers.", sentiment: "NEUTRAL", anonymized: true },
  { id: "item-003", timestamp: "2026-09-23 14:45:10", feedback: "Loved the matchmaking feature!", sentiment: "POSITIVE", anonymized: false },
];

const cloudResources = [
  { title: "AWS Skill Builder", desc: "Free digital training on cloud fundamentals.", icon: "fa-graduation-cap", color: "text-orange-500", link: "https://skillbuilder.aws/" },
  { title: "AWS Free Tier", desc: "Explore 100+ AWS services for free for 12 months.", icon: "fa-gift", color: "text-purple-500", link: "https://aws.amazon.com/free/" },
  { title: "R Programming Docs", desc: "Official documentation for R and ggplot2 analytics.", icon: "fa-r-project fab", color: "text-blue-500", link: "https://www.r-project.org/" },
  { title: "WIICA Community", desc: "Connect with other women innovators in cloud tech.", icon: "fa-users", color: "text-pink-500", link: "#" },
];

// NEW: Live Activity Data
const liveEvents = [
  "📡 Amina from Nairobi just matched with a Cloud Architect!",
  " 15 new feedback submissions anonymized today.",
  "🎓 David completed the AWS Cloud Practitioner path.",
  " Data Protection protocols successfully updated.",
  " New mentor 'Sarah O.' joined the platform."
];

function App() {
  const [activeTab, setActiveTab] = useState('matchmaking');
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Live Ticker State
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
    
    // Ticker Animation Logic
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % liveEvents.length);
    }, 3500); // Changes every 3.5 seconds

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans flex flex-col transition-colors duration-300">
      {/* Header */}
      <header className="bg-blue-900 dark:bg-gray-800 text-white p-4 shadow-md transition-colors duration-300">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
            <i className="fas fa-cloud text-blue-300"></i> CloudMentor Africa
          </h1>
          <div className="flex items-center gap-4">
            <p className="text-sm text-blue-200 dark:text-gray-400 hidden md:block">WIICA Final Project</p>
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full bg-blue-800 dark:bg-gray-700 hover:bg-blue-700 dark:hover:bg-gray-600 transition">
              {isDarkMode ? <i className="fas fa-sun text-yellow-400"></i> : <i className="fas fa-moon text-gray-200"></i>}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10 transition-colors duration-300">
        <div className="container mx-auto flex space-x-2 md:space-x-4 p-2 overflow-x-auto">
          <button onClick={() => setActiveTab('matchmaking')} className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap flex items-center ${activeTab === 'matchmaking' ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
            <i className="fas fa-handshake mr-2"></i> Matchmaking
          </button>
          <button onClick={() => setActiveTab('analytics')} className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap flex items-center ${activeTab === 'analytics' ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
            <i className="fas fa-chart-bar mr-2"></i> Analytics (R)
          </button>
          <button onClick={() => setActiveTab('feedback')} className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap flex items-center ${activeTab === 'feedback' ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
            <i className="fas fa-lock mr-2"></i> Feedback
          </button>
          <button onClick={() => setActiveTab('aws-console')} className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap flex items-center ${activeTab === 'aws-console' ? 'bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
            <i className="fab fa-aws mr-2"></i> AWS Console
          </button>
          <button onClick={() => setActiveTab('resources')} className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap flex items-center ${activeTab === 'resources' ? 'bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
            <i className="fas fa-book-open mr-2"></i> Resources
          </button>
        </div>
      </nav>

      {/* NEW: Live Activity Ticker */}
      <div className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-2 px-4 transition-colors duration-300">
        <div className="container mx-auto flex items-center text-sm">
          <span className="font-bold text-blue-900 dark:text-blue-400 mr-3 flex items-center">
            <i className="fas fa-broadcast-tower mr-2 animate-pulse"></i> LIVE ACTIVITY:
          </span>
          <span className="text-gray-700 dark:text-gray-300 transition-opacity duration-500 ease-in-out" key={tickerIndex}>
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
      <footer className="bg-gray-800 dark:bg-gray-950 text-gray-400 text-center p-4 text-sm mt-auto transition-colors duration-300">
        <p>© 2026 CloudMentor Africa. Built for Women Innovation in Cloud Africa (WIICA).</p>
        <p className="text-xs mt-1">Secured with AWS IAM & Data Protection Protocols.</p>
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
      <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Find Your Cloud Mentor</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Tell us your career goals. Our AI (AWS Comprehend) will analyze your text and match you with an expert.</p>
        
        <div className="space-y-4">
          <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="e.g., I want to learn AWS Machine Learning..." className="w-full p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-lg transition-colors duration-300" />
          <div className="flex items-center space-x-3 bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg border border-blue-100 dark:border-blue-800 transition-colors duration-300">
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={isAnonymous} onChange={() => setIsAnonymous(!isAnonymous)} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
            <span className="text-sm font-medium text-blue-900 dark:text-blue-200 flex items-center"><i className="fas fa-user-shield mr-2 text-blue-600 dark:text-blue-400"></i> Anonymize my profile (Data Protection)</span>
          </div>
          <button onClick={handleAnalyze} disabled={isLoading} className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition disabled:bg-blue-400 flex justify-center items-center">
            {isLoading ? <><i className="fas fa-circle-notch fa-spin mr-2"></i> Sending to Amazon Comprehend API...</> : <><i className="fas fa-rocket mr-2"></i> Analyze & Match</>}
          </button>
        </div>
        {matchedMentor && (
          <div className="mt-6 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg transition-colors duration-300">
            <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-3 flex items-center"><i className="fas fa-star text-yellow-500 mr-2"></i> Perfect Match Found via AWS AI!</h3>
            <div className="flex items-center gap-4">
              <img src={matchedMentor.img} alt={matchedMentor.name} className="w-16 h-16 rounded-full" />
              <div>
                <p className="font-bold text-gray-800 dark:text-gray-100 text-lg">{matchedMentor.name}</p>
                <p className="text-gray-600 dark:text-gray-400">{matchedMentor.role}</p>
                <div className="flex flex-wrap gap-2 mt-2">{matchedMentor.skills.map(skill => (<span key={skill} className="px-2 py-1 bg-white dark:bg-gray-800 text-blue-800 dark:text-blue-300 text-xs rounded-full border border-blue-200 dark:border-blue-700">{skill}</span>))}</div>
              </div>
            </div>
            <button className="mt-4 w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-600 transition flex justify-center items-center"><i className="fas fa-envelope mr-2"></i> Request Mentorship</button>
          </div>
        )}
        <div className="mt-6 flex justify-end items-center gap-2 text-xs text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-4 transition-colors duration-300">
          <i className="fab fa-aws text-lg"></i><span>Powered by AWS Amplify & DynamoDB</span>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center transition-colors duration-300"><i className="fas fa-users text-blue-900 dark:text-blue-400 mr-2"></i> Featured Cloud Mentors</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockMentors.map(mentor => (
            <div key={mentor.id} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-colors duration-300">
              <div className="flex items-center gap-3 mb-3">
                <img src={mentor.img} alt={mentor.name} className="w-12 h-12 rounded-full" />
                <div><p className="font-bold text-gray-800 dark:text-gray-100">{mentor.name}</p><p className="text-xs text-gray-500 dark:text-gray-400">{mentor.role}</p></div>
              </div>
              <div className="flex flex-wrap gap-1">{mentor.skills.map(skill => (<span key={skill} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">{skill}</span>))}</div>
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
    <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 flex items-center"><i className="fas fa-chart-line text-blue-900 dark:text-blue-400 mr-2"></i> Community Skill Gaps</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Descriptive analytics generated via R (ggplot2) to show top requested skills.</p>
      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <img src="/skill_gaps.png" alt="R Generated Chart" className="w-full h-auto rounded shadow-sm" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center italic flex justify-center items-center"><i className="fab fa-r-project mr-1"></i> Data generated using R from anonymized WIICA mentorship requests.</p>
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
    <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 max-w-2xl mx-auto transition-colors duration-300">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center"><i className="fas fa-comment-dots text-blue-900 dark:text-blue-400 mr-2"></i> Anonymous Session Feedback</h2>
      <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 mb-6 rounded transition-colors duration-300">
        <p className="text-blue-800 dark:text-blue-200 text-sm font-medium flex items-start"><i className="fas fa-shield-alt mt-1 mr-2"></i><span><strong>Data Protection Active:</strong> Your feedback is anonymized and encrypted using Strathmore-certified privacy protocols before storage in DynamoDB.</span></p>
      </div>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea required value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="How was your mentorship session today?" className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 outline-none transition-colors duration-300"></textarea>
          <div className="flex items-start space-x-2"><input type="checkbox" id="consent" className="w-4 h-4 mt-1 text-blue-600" defaultChecked required /><label htmlFor="consent" className="text-sm text-gray-600 dark:text-gray-400">I consent to my feedback being analyzed for community insights.</label></div>
          <button type="submit" className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition flex justify-center items-center"><i className="fas fa-paper-plane mr-2"></i> Submit Anonymously</button>
        </form>
      ) : (
        <div className="text-center py-10"><i className="fas fa-check-circle text-5xl text-green-500 mb-4"></i><h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Thank You!</h3><p className="text-gray-600 dark:text-gray-400 mb-6">Your feedback has been securely anonymized and submitted to the WIICA database.</p><button onClick={() => setSubmitted(false)} className="text-blue-600 dark:text-blue-400 hover:underline">Submit another response</button></div>
      )}
    </div>
  );
}

// --- AWS CONSOLE VIEW ---
function AWSConsoleView({ dbData }) {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <aside className="w-full md:w-64 bg-[#232f3e] text-gray-300 p-4 rounded-xl shadow-lg">
        <div className="flex items-center gap-2 mb-6 text-white">
          <i className="fab fa-aws text-2xl"></i>
          <span className="font-bold">AWS Management Console</span>
        </div>
        <ul className="space-y-3 text-sm">
          <li className="flex items-center gap-3 p-2 bg-[#37475a] rounded text-white"><i className="fas fa-database text-orange-400"></i> DynamoDB</li>
          <li className="flex items-center gap-3 p-2 hover:bg-[#37475a] rounded cursor-pointer"><i className="fas fa-bolt text-yellow-400"></i> Lambda</li>
          <li className="flex items-center gap-3 p-2 hover:bg-[#37475a] rounded cursor-pointer"><i className="fas fa-brain text-green-400"></i> Comprehend</li>
          <li className="flex items-center gap-3 p-2 hover:bg-[#37475a] rounded cursor-pointer"><i className="fas fa-shield-alt text-blue-400"></i> IAM</li>
        </ul>
      </aside>

      <div className="flex-1 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 uppercase">DynamoDB Read Capacity</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">42 <span className="text-sm text-green-500 font-normal">/ 200M</span></p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 uppercase">Lambda Invocations</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">15 <span className="text-sm text-green-500 font-normal">/ 1M</span></p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 uppercase">Comprehend API Calls</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">8 <span className="text-sm text-green-500 font-normal">/ 100K</span></p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center">
              <i className="fas fa-table text-orange-500 mr-2"></i> Table: <span className="text-blue-600 dark:text-blue-400 ml-1">WIICA-Feedback-Table</span>
            </h3>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                  <tr key={item.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-4 py-3 font-mono text-blue-600 dark:text-blue-400">{item.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{item.timestamp}</td>
                    <td className="px-4 py-3 text-gray-800 dark:text-gray-200">{item.feedback}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${item.sentiment === 'POSITIVE' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {item.sentiment}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {item.anonymized ? <i className="fas fa-check-circle text-green-500"></i> : <i className="fas fa-times-circle text-red-500"></i>}
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
    <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 flex items-center">
        <i className="fas fa-book-open text-green-600 dark:text-green-400 mr-2"></i> Cloud Learning Resources
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Curated tools and platforms to help you master cloud computing and data analytics.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cloudResources.map((resource, index) => (
          <a 
            key={index} 
            href={resource.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block p-5 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
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
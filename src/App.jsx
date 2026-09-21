import React, { useState, useEffect } from 'react';
import { 
  Code, Brain, Laptop, GraduationCap, Eye, HeartPulse,
  FileText, Mail, MapPin, Share2, Calendar,
  Microchip, Wrench, X, CheckCircle, ArrowUpRight, Menu,
  Terminal, ShieldCheck, Award, ExternalLink, Send
} from 'lucide-react';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (title, desc) => {
    setToastMessage({ title, desc });
  };

  const handleResumeDownload = (e) => {
    e.preventDefault();
    // Create an invisible anchor element to trigger the download
    const link = document.createElement('a');
    link.href = '/Souren_Mondal_Resume.pdf'; // Make sure your PDF is in the public folder with this filename
    link.download = 'Souren_Mondal_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast("Resume Download", "Resume PDF downloaded successfully.");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast("Message Sent!", `Thank you ${formData.name}! Your message has been received.`);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  const projects = [
    {
      id: 1,
      title: "CARDIOINSIGHT",
      category: "AI/ML",
      badge: "Research Internship",
      icon: <HeartPulse className="w-6 h-6 text-cyan-400" />,
      description: "An explainable AI-based cardiovascular risk prediction system designed to analyze health-related factors and provide interpretable risk insights.",
      problem: "Early cardiovascular risk prediction among young adults.",
      solution: "Engineered clinical and lifestyle features and evaluated ML models using classification and threshold metrics.",
      tech: ["Python", "Pandas", "Scikit-learn", "XGBoost", "Matplotlib", "SHAP", "React.js", "TypeScript", "FastAPI", "GenAI"],
      demoDesc: "AI-powered cardiovascular risk prediction system with real-time analytics dashboards and historical data comparison."
    },
    {
      id: 2,
      title: "Speech Emotion Recognition",
      category: "AI/ML",
      badge: "Deep Learning",
      icon: <ShieldCheck className="w-6 h-6 text-indigo-400" />,
      description: "Deep learning model trained on custom audio datasets using Recurrent Neural Networks (RNNs) with high classification accuracy.",
      problem: "Manual emotion labeling is time-consuming and prone to subjectivity.",
      solution: "Built robust RNN pipeline achieving over 90% validation accuracy.",
      tech: ["Python", "TensorFlow", "Keras", "Librosa", "NumPy", "RNN", "Scikit-learn", "Streamlit", "MFCC", "LSTM"],
      demoDesc: "Custom RNN model trained for rapid speech emotion recognition, voice analysis, and classification."
    },
    {
      id: 3,
      title: "LegalGuard AI",
      category: "AI/ML",
      badge: "Data Science",
      icon: <ShieldCheck className="w-6 h-6 text-purple-400" />,
      description: "Full-stack automated legal document auditing platform.",
      problem: "Inefficient manual legal document review process.",
      solution: "Created a web-based ML inference tool with interactive charts and risk matrices.",
      tech: ["React", "FastAPI", "Python", "Gemini 2.5 Flash", "Firebase", "Render", "Tailwind CSS"],
      demoDesc: "Interactive legal document auditing dashboard powered by supervised machine learning algorithms."
    },
    {
      id: 4,
      title: "Movie Recommendation System",
      category: "AI/ML",
      badge: "Deep Learning",
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      description: "High-performance RESTful API service featuring JWT authentication, role-based access control, and encrypted data storage.",
      problem: "Vulnerabilities in standard token distribution and session management.",
      solution: "Engineered secure middleware with rate-limiting and robust encryption standards.",
      tech: ["NLP", "Python", "TensorFlow", "Scikit-learn"],
      demoDesc: "Full-stack authentication and authorization microservice for enterprise web applications."
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="bg-[#0b0f19] text-gray-100 min-h-screen selection:bg-cyan-500 selection:text-black font-sans antialiased">
      
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0b0f19]/85 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">
            Portfolio<span className="text-cyan-400"></span>
          </a>
          
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="#about" className="text-gray-300 hover:text-cyan-400 transition-colors">About</a>
            <a href="#projects" className="text-gray-300 hover:text-cyan-400 transition-colors">Projects</a>
            <a href="#experience" className="text-gray-300 hover:text-cyan-400 transition-colors">Experience</a>
            <a href="#skills" className="text-gray-300 hover:text-cyan-400 transition-colors">Skills</a>
            <a href="#certificates" className="text-gray-300 hover:text-cyan-400 transition-colors">Certificates</a>
            <a href="#contact" className="text-gray-300 hover:text-cyan-400 transition-colors">Contact</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button onClick={handleResumeDownload} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-95 transition-all shadow-lg shadow-cyan-500/20 flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Resume</span>
            </button>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-gray-300 focus:outline-none text-xl p-2">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#131c2e] border-b border-gray-800 px-6 py-4 space-y-3">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 hover:text-cyan-400 py-1">About</a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 hover:text-cyan-400 py-1">Projects</a>
            <a href="#experience" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 hover:text-cyan-400 py-1">Experience</a>
            <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 hover:text-cyan-400 py-1">Skills</a>
            <a href="#certificates" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 hover:text-cyan-400 py-1">Certificates</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 hover:text-cyan-400 py-1">Contact</a>
            <div className="pt-2">
              <button onClick={(e) => { setMobileMenuOpen(false); handleResumeDownload(e); }} className="w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 flex items-center justify-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Download Resume</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>Available for AI/ML Opportunities & Internships</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Hi, I'm <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">Souren Mondal</span>
            </h1>
            
            <p className="text-xl sm:text-2xl font-medium text-gray-300">
              AI & ML Undergraduate | Software Developer | Machine Learning Enthusiast
            </p>
            
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Passionate about building intelligent neural systems, scalable backend web applications, and data-driven solutions. Experienced in Smart India Hackathon challenges, AI research, and robust software engineering.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a href="#projects" className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-black bg-cyan-400 hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-400/25 text-center flex items-center justify-center space-x-2">
                <Code className="w-5 h-5" />
                <span>Explore Projects</span>
              </a>
              <a href="#contact" className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-gray-200 bg-[#131c2e] hover:bg-gray-800 border border-gray-700 transition-all text-center flex items-center justify-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>Get in Touch</span>
              </a>
            </div>

            <div className="flex items-center justify-center lg:justify-start space-x-6 pt-4 text-gray-400">
              <a href="https://github.com/Souren44" target="_blank" rel="noreferrer" className="hover:text-cyan-400 text-sm font-semibold flex items-center gap-1.5"><ExternalLink className="w-4 h-4" /> GitHub</a>
              <a href="https://www.linkedin.com/in/souren-mondal-626b73326/" target="_blank" rel="noreferrer" className="hover:text-cyan-400 text-sm font-semibold flex items-center gap-1.5"><ExternalLink className="w-4 h-4" /> LinkedIn</a>
              <a href="mailto:suman.swapan2005@gmail.com" className="hover:text-cyan-400 text-sm font-semibold flex items-center gap-1.5"><Mail className="w-4 h-4" /> Email</a>
              <span className="text-xs text-gray-500 font-mono hidden sm:inline">Supreme Knowledge Foundation Group Of Institutions (Class of '27)</span>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-72 sm:w-80 h-96 sm:h-[420px] rounded-3xl bg-gradient-to-b from-cyan-500/20 to-indigo-600/20 p-1 border border-cyan-500/30 shadow-2xl">
              <div className="w-full h-full bg-[#131c2e] rounded-[22px] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
                
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-600 p-1 mb-6 shadow-xl overflow-hidden">
  <img 
    src="/profile.jpg" 
    alt="Souren Mondal" 
    className="w-full h-full object-cover rounded-full"
  />
</div>

                <h3 className="text-xl font-bold text-white mb-1">Souren Mondal</h3>
                <p className="text-sm text-cyan-400 font-medium mb-4">B.Tech in AI & Machine Learning</p>
                
                <div className="w-full bg-[#0b0f19]/60 border border-gray-800 rounded-xl p-3 text-left space-y-2 text-xs text-gray-300">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Degree:</span>
                    <span className="font-semibold text-gray-200">B.Tech (AI & ML)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Institution:</span>
                    <span className="font-semibold text-gray-200">SKF (Grad. 2027)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Core Focus:</span>
                    <span className="font-semibold text-cyan-400">Deep Learning & Systems</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-[#131c2e]/40 border-t border-b border-gray-800/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest text-cyan-400 uppercase mb-3">About Me</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Engineering Intelligent Systems for Tomorrow</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#131c2e] border border-gray-800 rounded-2xl p-8 hover:border-cyan-500/50 transition-all shadow-lg">
              <div className="w-14 h-14 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-2xl mb-6">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">Academic Excellence</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Currently pursuing B.Tech in Artificial Intelligence and Machine Learning at Supreme Knowledge Foundation (Passing out in 2027). Consistently exploring advanced algorithms, neural network architectures, and data structures.
              </p>
            </div>

            <div className="bg-[#131c2e] border border-gray-800 rounded-2xl p-8 hover:border-indigo-500/50 transition-all shadow-lg">
              <div className="w-14 h-14 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-2xl mb-6">
                <Brain className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">AI & ML Focus</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Hands-on experience in training computer vision models, predictive analytics, and natural language processing pipelines using Python, PyTorch, TensorFlow, OpenCV, and Scikit-Learn.
              </p>
            </div>

            <div className="bg-[#131c2e] border border-gray-800 rounded-2xl p-8 hover:border-purple-500/50 transition-all shadow-lg">
              <div className="w-14 h-14 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 text-2xl mb-6">
                <Laptop className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">Software Development</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Beyond models, I build robust, responsive full-stack applications and APIs using JavaScript, React, Node.js, and FastAPI. Passionate about end-to-end product deployment and clean code architecture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-xs font-bold tracking-widest text-cyan-400 uppercase mb-3">Portfolio</h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Featured Projects</h3>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
              {['All', 'AI/ML', 'Hackathons', 'Web'].map(category => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeFilter === category 
                      ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-400/20' 
                      : 'bg-[#131c2e] text-gray-300 border border-gray-800 hover:border-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map(project => (
              <div key={project.id} className="bg-[#131c2e] border border-gray-800 rounded-2xl overflow-hidden hover:border-cyan-500/40 transition-all flex flex-col justify-between shadow-xl">
                <div className="p-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                      {project.badge}
                    </span>
                    {project.icon}
                  </div>
                  <h4 className="text-2xl font-bold text-white">{project.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="space-y-2 pt-2 border-t border-gray-800/80 text-xs text-gray-300">
                    <p><strong className="text-cyan-400">Problem:</strong> {project.problem}</p>
                    <p><strong className="text-cyan-400">Solution:</strong> {project.solution}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech.map(t => (
                      <span key={t} className="px-2.5 py-1 rounded-md bg-[#0b0f19] text-gray-300 text-xs font-mono border border-gray-800">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="px-8 py-4 bg-[#0b0f19]/40 border-t border-gray-800 flex items-center justify-between">
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="text-sm font-semibold text-gray-300 hover:text-cyan-400 transition-colors flex items-center space-x-1.5">
                    <ExternalLink className="w-4 h-4" />
                    <span>Source Code</span>
                  </a>
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="text-sm font-semibold text-cyan-400 hover:underline flex items-center space-x-1"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 bg-[#131c2e]/40 border-t border-b border-gray-800/60">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest text-cyan-400 uppercase mb-3">Career Journey</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Experience & Milestones</h3>
          </div>

          <div className="relative border-l border-cyan-500/30 ml-4 sm:ml-8 space-y-12">
            <div className="relative pl-8 sm:pl-10">
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-cyan-400 ring-4 ring-[#0b0f19]"></div>
              <div className="bg-[#131c2e] border border-gray-800 rounded-2xl p-6 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                  <h4 className="text-lg font-bold text-white">Machine Learning Intern</h4>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 w-fit mt-1 sm:mt-0 border border-cyan-500/30">CodeAlpha / Cognifyz</span>
                </div>
                <p className="text-xs font-mono text-cyan-400 mb-3 flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Recent Experience</span>
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Developed and fine-tuned regression and classification models. Performed extensive exploratory data analysis (EDA), data cleaning, and model evaluation to boost predictive accuracy.
                </p>
              </div>
            </div>

            <div className="relative pl-8 sm:pl-10">
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-indigo-400 ring-4 ring-[#0b0f19]"></div>
              <div className="bg-[#131c2e] border border-gray-800 rounded-2xl p-6 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                  <h4 className="text-lg font-bold text-white">Research Intern</h4>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 w-fit mt-1 sm:mt-0 border border-indigo-500/30">IEEE SMC Research</span>
                </div>
                <p className="text-xs font-mono text-indigo-400 mb-3 flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Academic Research</span>
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Collaborated on intelligent systems research under IEEE SMC guidelines. Investigated algorithmic optimization, neural processing, and system automation frameworks.
                </p>
              </div>
            </div>

            <div className="relative pl-8 sm:pl-10">
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-purple-400 ring-4 ring-[#0b0f19]"></div>
              <div className="bg-[#131c2e] border border-gray-800 rounded-2xl p-6 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                  <h4 className="text-lg font-bold text-white">Bootcamps & Specialized Training</h4>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 w-fit mt-1 sm:mt-0 border border-purple-500/30">Build with AI & Cyber Security</span>
                </div>
                <p className="text-xs font-mono text-purple-400 mb-3 flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Continuous Learning</span>
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Completed intensive training programs including "Build with AI" workshops and Windows Forensic Analysis bootcamps, reinforcing cybersecurity and AI application security practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Matrix - UPDATED PER CV DETAILS */}
      <section id="skills" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest text-cyan-400 uppercase mb-3">Expertise</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Technical Skills Matrix</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#131c2e] border border-gray-800 rounded-2xl p-8 shadow-xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-lg">
                  <Code className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white">Languages</h4>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {['Python', 'C','Java', 'TypeScript', 'JavaScript', 'SQL', 'HTML5 / CSS3'].map(skill => (
                  <span key={skill} className="px-3 py-1.5 rounded-lg bg-[#0b0f19] border border-gray-800 text-sm font-medium text-gray-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#131c2e] border border-gray-800 rounded-2xl p-8 shadow-xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 text-lg">
                  <Microchip className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white">AI / ML & Data Science</h4>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {['TensorFlow', 'PyTorch', 'Scikit-Learn', 'OpenCV', 'Pandas & NumPy','LLM','LangChain', 'RAG', 'NLP', 'Vector Databases'].map(skill => (
                  <span key={skill} className="px-3 py-1.5 rounded-lg bg-[#0b0f19] border border-gray-800 text-sm font-medium text-gray-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#131c2e] border border-gray-800 rounded-2xl p-8 shadow-xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 text-lg">
                  <Laptop className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white">Web & Frameworks</h4>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {['React.js', 'Node.js', 'Express', 'FastAPI', 'Streamlit', 'Tailwind CSS'].map(skill => (
                  <span key={skill} className="px-3 py-1.5 rounded-lg bg-[#0b0f19] border border-gray-800 text-sm font-medium text-gray-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#131c2e] border border-gray-800 rounded-2xl p-8 shadow-xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-lg">
                  <Wrench className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white">Tools & Databases</h4>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {['Git & GitHub', 'MongoDB', 'Firebase', 'Linux CLI', 'REST APIs', 'Render','MySQL'].map(skill => (
                  <span key={skill} className="px-3 py-1.5 rounded-lg bg-[#0b0f19] border border-gray-800 text-sm font-medium text-gray-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section id="certificates" className="py-24 px-6 bg-[#131c2e]/40 border-t border-b border-gray-800/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest text-cyan-400 uppercase mb-3">Validation</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Certificates & Achievements</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#131c2e] border border-gray-800 rounded-2xl p-6 flex items-start space-x-4 shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex-shrink-0 flex items-center justify-center text-cyan-400">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-1">Smart India Hackathon idea qualified in internal hackathon</h4>
                <p className="text-xs text-gray-400 mb-2">Government of India Initiative</p>
                <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">Team Lead - GreenSentinel</span>
              </div>
            </div>

            <div className="bg-[#131c2e] border border-gray-800 rounded-2xl p-6 flex items-start space-x-4 shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex-shrink-0 flex items-center justify-center text-indigo-400">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-1">IEEE SMC Research Internship Completion</h4>
                <p className="text-xs text-gray-400 mb-2">Systems, Man, and Cybernetics</p>
                <span className="text-[11px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">Active Researcher</span>
              </div>
            </div>

            <div className="bg-[#131c2e] border border-gray-800 rounded-2xl p-6 flex items-start space-x-4 shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex-shrink-0 flex items-center justify-center text-purple-400">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-1">CodeAlpha Machine Learning Internship Completion</h4>
                <p className="text-xs text-gray-400 mb-2">Internship Completion Certificate & LOR</p>
                <span className="text-[11px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">Machine Learning and Deep Learning</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest text-cyan-400 uppercase mb-3">Get In Touch</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Let's Connect & Collaborate</h3>
            <p className="text-gray-400 text-sm mt-3">
              Looking for an ambitious AI/ML intern or software developer? Drop a message below!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#131c2e] border border-gray-800 rounded-2xl p-6 flex items-center space-x-4 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xl">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase">Email Me</p>
                  <a href="mailto:suman.swapan2005@gmail.com" className="text-gray-200 font-medium hover:text-cyan-400 transition-colors">suman.swapan2005@gmail.com</a>
                </div>
              </div>

              <div className="bg-[#131c2e] border border-gray-800 rounded-2xl p-6 flex items-center space-x-4 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-xl">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase">Location</p>
                  <p className="text-gray-200 font-medium">Kolkata / India (Open to Remote & Relocation)</p>
                </div>
              </div>

              <div className="bg-[#131c2e] border border-gray-800 rounded-2xl p-6 flex items-center space-x-4 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 text-xl">
                  <Share2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase">Profiles</p>
                  <div className="flex space-x-4 mt-1">
                    <a href="https://www.linkedin.com/in/souren-mondal-626b73326/" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-cyan-400 text-sm font-semibold">LinkedIn</a>
                    <a href="https://github.com/Souren44" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-cyan-400 text-sm font-semibold">GitHub</a>
                    <a href="https://leetcode.com/u/souren44/" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-cyan-400 text-sm font-semibold">LeetCode</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <form onSubmit={handleFormSubmit} className="bg-[#131c2e] border border-gray-800 rounded-2xl p-8 space-y-6 shadow-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-300 uppercase">Your Name</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Recruiter Name" 
                      className="w-full bg-[#0b0f19] border border-gray-800 rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:border-cyan-400 text-sm transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-300 uppercase">Your Email</label>
                    <input 
                      type="email" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="recruiter@company.com" 
                      className="w-full bg-[#0b0f19] border border-gray-800 rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:border-cyan-400 text-sm transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-300 uppercase">Subject</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    placeholder="AI/ML Internship Opportunity" 
                    className="w-full bg-[#0b0f19] border border-gray-800 rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:border-cyan-400 text-sm transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-300 uppercase">Message</label>
                  <textarea 
                    rows="4" 
                    required 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Hi Souren, we would like to discuss an opportunity..." 
                    className="w-full bg-[#0b0f19] border border-gray-800 rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:border-cyan-400 text-sm transition-colors"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-semibold text-black bg-cyan-400 hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-400/20 text-center flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-[#0b0f19] border-t border-gray-800 text-center text-sm text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>&copy; 2026 Souren Mondal. All rights reserved.</p>
          <p className="text-xs font-mono text-cyan-400">Built with React & Tailwind CSS • 24/7 Deployed on Vercel</p>
        </div>
      </footer>

      {/* Project Demo Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#131c2e] border border-gray-800 rounded-2xl max-w-lg w-full p-6 relative shadow-2xl">
            <button 
              onClick={() => setSelectedProject(null)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg p-1"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                <Laptop className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">{selectedProject.title}</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              {selectedProject.demoDesc}
            </p>
            <div className="bg-[#0b0f19] p-4 rounded-xl border border-gray-800 mb-6 text-xs font-mono text-cyan-400">
              Status: Production Ready | Hosted & Live 24/7
            </div>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setSelectedProject(null)} 
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700"
              >
                Close
              </button>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer" 
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-black bg-cyan-400 hover:bg-cyan-300 flex items-center space-x-1.5"
              >
                <ExternalLink className="w-4 h-4" />
                <span>View Source</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#131c2e] border border-cyan-500/50 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 transition-all">
          <CheckCircle className="w-6 h-6 text-cyan-400" />
          <div>
            <h4 className="text-sm font-bold">{toastMessage.title}</h4>
            <p className="text-xs text-gray-400">{toastMessage.desc}</p>
          </div>
        </div>
      )}

    </div>
  );
}
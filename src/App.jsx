import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, ChevronDown, Code, Cloud, Database, Cpu, Award, BookOpen } from 'lucide-react';

const Portfolio = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      setScrolled(scrollTop > 50);
      setScrollProgress(progress);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'education', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const experiences = [
    {
      title: "Cloud Solutions Architect Intern",
      company: "Cloudnautics",
      location: "India",
      period: "March 2023 - August 2023",
      achievements: [
        "Designed and implemented scalable data pipelines, improving data processing speed by 25%.",
        "Streamlined provisioning and configuration across AWS, Azure, and Google Cloud, reducing deployment time by 30% and operational costs by 25%.",
        "Crafted detailed architecture documentation, decreasing troubleshooting time by 20% and improving onboarding efficiency by 15%.",
        "Strengthened cloud security, resulting in a 30% reduction in incidents and a 20% increase in data protection through access controls and encryption measures."
      ]
    },
    {
      title: "Software Developer Intern",
      company: "SAARK Customs",
      location: "India",
      period: "June 2022 - May 2023",
      achievements: [
        "Engineered a data pipeline for real-time environmental monitoring, achieving 30% faster notification times for hazardous conditions.",
        "Developed firmware with object-oriented code, reducing sensor integration time by 25%.",
        "Optimized AWS IoT Core, improving data transmission speed to the Django server by 20%.",
        "Conducted comprehensive testing of the entire smart emergency system, including firmware, AWS IoT Core, and MQTT implementation, ensuring reliability, accuracy, and a 25% improvement in overall system performance"
      ]
    }
  ];

  const skills = {
    "Languages": ["Java", "Python", "JavaScript", "SQL", "MATLAB"],
    "Frameworks & Technologies": ["AWS", "Microsoft Azure", "Spring Boot", "Express.js", "Node.js", "Flutter", "NLP", "MongoDB", "TensorFlow", "PyTorch", "CUDA"],
    "Tools & Methodologies": ["Git", "Docker", "Power BI", "Tableau"],
    "Project and Product Management Methodologies/Tools": ["PMLC", "Project Documentation", "Product Management", "Product Planning", "Product/Project Strategies", "Kanban", "Agile", "JIRA", "SCRUM", "PowerPoint/Keynote/Slides", "Selenium"]
  };

  const projects = [
    {
      title: "Intelligent Code Reviewer",
      description: "AI-driven code review system with GitHub integration for real-time feedback using LLM-based analysis. Privacy-first solution with local hosting via LM Studio and Docker.",
      tech: ["GitHub Webhooks", "Docker", "Express.js", "Node.js"],
      icon: <Code className="w-6 h-6" />
    },
    {
      title: "IT Chrome Extension",
      description: "Real-time tech news aggregator for developers, featuring robust NodeJS APIs for web scraping and AWS EC2 hosting for reliable data delivery.",
      tech: ["NodeJS", "MongoDB", "AWS"],
      icon: <Cpu className="w-6 h-6" />
    },
    {
      title: "Competitive Calendar",
      description: "Centralized platform for global competitive coding contests with Spring-Boot scraper, RESTful API, and Google Authentication for secure data sharing.",
      tech: ["Flutter", "Firebase", "Spring-Boot", "Selenium"],
      icon: <Database className="w-6 h-6" />
    }
  ];

  const education = [
    {
      degree: "Master of Science in Computer Science",
      school: "University of Dayton",
      period: "August 2023 - May 2025",
      focus: "AI, Image Processing, Data Visualization, NLP, Software Engineering, Advanced Computer Vision"
    },
    {
      degree: "Bachelor of Science in Computer Science",
      school: "MIT-ADT University",
      period: "August 2019 - May 2023",
      focus: "Algorithm Design, DBMS, OS, AI/ML, Cloud Computing, Data Structures, Software Engineering"
    }
  ];

  return (
    <>
      {/* Navigation - Fixed at top, outside main container */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/95 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-center items-center">
          <div className="flex gap-8">
            {['Home', 'About', 'Experience', 'Skills', 'Projects', 'Education', 'Contact'].map(item => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="nav-item px-4 py-2 text-white transition-all duration-300 hover:scale-125 hover:shadow-lg rounded-lg"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

    <div className="min-h-screen bg-black text-white overflow-x-hidden w-full relative">
      {/* Super Visible Test Scroll Bars */}
      <div 
        className="fixed left-0 top-0 w-6 h-full z-50 pointer-events-none"
        style={{ 
          background: scrolled ? '#723ee7' : 'transparent',
          opacity: scrolled ? '0.8' : '0',
          transition: 'all 0.3s ease'
        }}
      ></div>
      
      <div 
        className="fixed right-0 top-0 w-6 h-full z-50 pointer-events-none"
        style={{ 
          background: scrolled ? '#723ee7' : 'transparent',
          opacity: scrolled ? '0.8' : '0',
          transition: 'all 0.3s ease'
        }}
      ></div>
      
      {/* Progress Bars */}
      {scrollProgress > 0 && (
        <>
          <div 
            className="fixed left-0 top-0 w-6 z-50 pointer-events-none"
            style={{ 
              height: `${scrollProgress}%`,
              background: '#9333ea',
              boxShadow: '0 0 20px #723ee7'
            }}
          ></div>
          
          <div 
            className="fixed right-0 top-0 w-6 z-50 pointer-events-none"
            style={{ 
              height: `${scrollProgress}%`,
              background: '#9333ea',
              boxShadow: '0 0 20px #723ee7'
            }}
          ></div>
        </>
      )}
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body, html {
          width: 100%;
          overflow-x: hidden;
          background: #000000;
        }
        
        .fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .gradient-text {
          background: linear-gradient(to right, #ffffff, #808080);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .hero-gradient {
          background: radial-gradient(ellipse at top center, rgba(147, 51, 234, 0.25) 0%, transparent 50%);
          width: 100vw;
          position: relative;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
        }
        
        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(147, 51, 234, 0.25);
        }
        
        .skill-tag {
          transition: all 0.3s ease;
        }
        
        .skill-tag:hover {
          transform: translateY(-2px);
          background: rgba(147, 51, 234, 0.3);
          border-color: rgb(147, 51, 234);
        }
        
        .pulse-dot::after {
          content: '';
          position: absolute;
          width: 20px;
          height: 20px;
          background: rgba(147, 51, 234, 0.4);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: pulse 2s infinite;
        }
        
        .nav-item {
          position: relative;
          font-weight: 500;
          color: white;
          transform-origin: center;
        }
        
        .nav-item:hover {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          transform: scale(1.25) translateY(-2px);
          z-index: 10;
        }
        
        .nav-item:active {
          transform: scale(1.15) translateY(-1px);
        }
        
        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
        }

        .animated-heading {
          background: linear-gradient(90deg, #723ee7, #9333ea, #c084fc, #723ee7);
          background-size: 400% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 3s ease-in-out infinite;
          position: relative;
        }

        .animated-heading::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, #723ee7, #9333ea);
          border-radius: 2px;
          animation: expandLine 1s ease-out 0.5s both;
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes expandLine {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 80px;
            opacity: 1;
          }
        }

        .typewriter {
          overflow: hidden;
          border-right: 2px solid #723ee7;
          white-space: nowrap;
          animation: typing 2s steps(20) 0.5s both, blink 1s infinite 2.5s;
        }

        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        @keyframes blink {
          50% {
            border-color: transparent;
          }
        }

        .bounce-in {
          animation: bounceIn 1s ease-out 1s both;
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(50px);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative hero-gradient w-full">
        <div className={`text-center px-6 w-full ${visibleSections.has('home') ? 'fade-in' : 'opacity-0'}`}>
          <img 
            src="/images/DP.jpg" 
            alt="Saivedant Hava"
            className="w-52 h-52 md:w-64 md:h-64 rounded-full mx-auto mb-8 border-2 border-white/10 shadow-2xl object-cover"
            style={{ objectPosition: 'center 35%' }}
          />
          <h1 className="text-5xl md:text-7xl font-bold mb-4 gradient-text">
            Saivedant Hava
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-4">Technical | Product Management | Project Management</p>
          <p className="text-gray-500 max-w-4xl mx-auto mb-8 text-lg leading-relaxed text-center">
            Full-stack developer and cloud architect with expertise in AI/ML, Graduate student in Computer Science at the University of Dayton. Skilled at translating complex technical requirements into scalable, user-centric solutions. Experienced in end-to-end product lifecycle management—from ideation and architecture design to deployment and optimization—while driving cross-functional collaboration to deliver innovative, high-impact projects.
          </p>
          <div className="flex gap-4 justify-center">
            <a 
              href="https://github.com/saivedant169" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-medium transition-all hover:scale-105 flex items-center gap-2"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
            <a 
              href="https://linkedin.com/in/saivedant-hava" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full font-medium transition-all hover:scale-105 flex items-center gap-2 border border-white/20"
            >
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </a>
          </div>
          <div className="mt-16 animate-bounce">
            <ChevronDown className="w-6 h-6 mx-auto text-gray-500" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6">
        <div className={`max-w-4xl mx-auto ${visibleSections.has('about') ? 'fade-in' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center animated-heading">About Me</h2>
          <p className="text-gray-400 text-lg leading-relaxed text-center">
            I'm a passionate full-stack developer and cloud solutions architect with a strong foundation in computer science and a drive for innovation. 
            With experience spanning from IoT systems to AI-driven applications, I specialize in creating scalable, efficient solutions that solve real-world problems. 
            My journey has taken me through challenging internships at Cloudnautics and SAARK Customs, where I've optimized cloud infrastructures, 
            built data pipelines, and developed intelligent systems. I'm focused on advancing my expertise in AI, computer vision, and software engineering while contributing to cutting-edge projects that make a difference.
          </p>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 bg-gradient-to-b from-transparent to-black/50">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl md:text-5xl font-bold mb-16 text-center animated-heading ${visibleSections.has('experience') ? 'fade-in' : 'opacity-0'}`}>
            Experience
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                className={`bg-zinc-900/50 border border-white/10 rounded-2xl p-8 card-hover ${
                  visibleSections.has('experience') ? 'fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-1" style={{color: '#723ee7'}}>{exp.title}</h3>
                    <p className="text-gray-400 mb-1">{exp.company}, {exp.location}</p>
                    <p className="text-sm text-gray-500 mb-4">{exp.period}</p>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-300">
                          <span className="text-purple-400 mt-1 text-lg leading-none flex-shrink-0">•</span>
                          <span className="leading-relaxed">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl md:text-5xl font-bold mb-16 text-center animated-heading ${visibleSections.has('skills') ? 'fade-in' : 'opacity-0'}`}>
            Skills
          </h2>
          <div className="space-y-8">
            {Object.entries(skills).map(([category, items], index) => (
              <div 
                key={category}
                className={`${visibleSections.has('skills') ? 'fade-in' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-300">{category}</h3>
                <div className="flex flex-wrap gap-3 bounce-in">
                  {items.map(skill => (
                    <span 
                      key={skill}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm skill-tag hover:cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 bg-gradient-to-b from-transparent to-black/50">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl md:text-5xl font-bold mb-16 text-center animated-heading ${visibleSections.has('projects') ? 'fade-in' : 'opacity-0'}`}>
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index}
                className={`bg-zinc-900/50 border border-white/10 rounded-2xl p-8 card-hover ${
                  visibleSections.has('projects') ? 'fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                    {project.icon}
                  </div>
                  <h3 className="text-2xl font-semibold flex-1">{project.title}</h3>
                </div>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map(tech => (
                    <span key={tech} className="text-sm text-gray-500">
                      {tech} {project.tech.indexOf(tech) < project.tech.length - 1 && '•'}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            
            {/* GitHub CTA Card */}
            <div className={`bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/10 rounded-2xl p-8 card-hover ${
              visibleSections.has('projects') ? 'fade-in' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.3s' }}>
              <h3 className="text-2xl font-semibold mb-3">More on GitHub</h3>
              <p className="text-gray-400 mb-6">
                Explore my complete portfolio of projects, contributions, and open-source work on GitHub.
              </p>
              <a 
                href="https://github.com/saivedant169" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-medium transition-all hover:scale-105"
              >
                <Github className="w-5 h-5" />
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-4xl md:text-5xl font-bold mb-16 text-center animated-heading ${visibleSections.has('education') ? 'fade-in' : 'opacity-0'}`}>
            Education
          </h2>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <div 
                key={index}
                className={`bg-zinc-900/50 border border-white/10 rounded-2xl p-8 card-hover ${
                  visibleSections.has('education') ? 'fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <BookOpen className="w-6 h-6 text-blue-400 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-2">{edu.degree}</h3>
                    <p className="text-gray-400 mb-2">{edu.school}</p>
                    <p className="text-sm text-gray-500 mb-4">{edu.period}</p>
                    <p className="text-gray-300">{edu.focus}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-gradient-to-b from-transparent to-black">
        <div className={`max-w-4xl mx-auto text-center ${visibleSections.has('contact') ? 'fade-in' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Let's Connect</h2>
          <p className="text-gray-400 text-lg mb-12">
            I'm always interested in discussing new opportunities, innovative projects, and technology challenges.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <a 
              href="mailto:saivedant169@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-medium transition-all hover:scale-105"
            >
              <Mail className="w-5 h-5" />
              saivedant169@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center text-gray-500">
          <p>&copy; 2025 Saivedant Hava. Crafted with precision and passion.</p>
        </div>
      </footer>
    </div>
    </>
  );
};

export default Portfolio;

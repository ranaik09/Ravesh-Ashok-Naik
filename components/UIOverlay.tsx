/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo } from 'react';
import { AppState } from '../types';
import { 
    Github, Linkedin, Mail, Phone, MapPin, 
    Terminal, Code2, Award,
    Briefcase, User, GraduationCap, Sun, Moon, BookOpen,
    Rocket, Star, MessageSquare, Send, ExternalLink,
    Atom, Box, Wind, FileCode, Bug, Server, Cpu, Wifi, Database, BarChart3,
    ChevronDown, Layers, Building2, GitFork, Sparkles, Filter
} from 'lucide-react';

interface UIOverlayProps {
  appState: AppState;
  isAutoRotate: boolean;
  currentModel: 'Avatar' | 'Workstation';
  onDismantle: () => void;
  onRebuild: () => void;
  onToggleRotation: () => void;
  onSwitchModel: (model: 'Avatar' | 'Workstation') => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

type ProjectCategory = 'Open Source' | 'Professional' | 'Academic' | 'Personal';

interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    votes: number;
    reviews: string[];
    link: string;
    category: ProjectCategory;
}

export const UIOverlay: React.FC<UIOverlayProps> = ({
  isDarkMode,
  toggleTheme
}) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'experience' | 'skills' | 'education' | 'projects'>('summary');
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'All'>('All');

  // Interactive State for Projects
  const [projects, setProjects] = useState<Project[]>([
      {
          id: 1,
          title: "Voxel Resume Engine",
          description: "A 3D interactive resume builder using React, Three.js, and Voxel geometry.\n\nAllows users to visualize experience as building blocks that can be dismantled and rebuilt.",
          technologies: ["React", "Three.js", "TypeScript", "Tailwind CSS"],
          votes: 128,
          reviews: ["This interaction is incredibly satisfying!", "Great use of WebGL."],
          link: "https://github.com/ranaik09",
          category: 'Personal'
      },
      {
          id: 2,
          title: "Kernel Debugger Assistant",
          description: "An automated analysis tool for Windows memory dumps that suggests potential driver faults using heuristic analysis and WinDbg JS API.",
          technologies: ["Python", "WinDbg", "React", "Node.js"],
          votes: 84,
          reviews: ["Essential tool for driver devs.", "Saved me hours of debugging."],
          link: "#",
          category: 'Professional'
      },
      {
          id: 3,
          title: "IoT Sensor Mesh",
          description: "A lightweight MQTT based sensor network for agricultural monitoring.\n\nCurrently learning Rust to rewrite the edge node firmware for better concurrency.",
          technologies: ["Rust", "MQTT", "InfluxDB", "Grafana"],
          votes: 45,
          reviews: [],
          link: "#",
          category: 'Open Source'
      },
      {
          id: 4,
          title: "Smart Campus Attendance",
          description: "Biometric attendance system integrated with university portal.\n\nBuilt as a final year capstone project using Raspberry Pi and OpenCV.",
          technologies: ["Python", "OpenCV", "Django", "PostgreSQL"],
          votes: 62,
          reviews: ["Innovative use of facial recognition."],
          link: "#",
          category: 'Academic'
      }
  ]);

  const handleVote = (id: number) => {
      setProjects(prev => prev.map(p => 
          p.id === id ? { ...p, votes: p.votes + 1 } : p
      ));
  };

  const handleAddReview = (id: number, text: string) => {
      setProjects(prev => prev.map(p => 
          p.id === id ? { ...p, reviews: [...p.reviews, text] } : p
      ));
  };

  const filteredProjects = useMemo(() => {
      if (selectedCategory === 'All') return projects;
      return projects.filter(p => p.category === selectedCategory);
  }, [projects, selectedCategory]);

  const categories: { id: ProjectCategory | 'All', label: string, icon: React.ReactNode }[] = [
      { id: 'All', label: 'All Projects', icon: <Layers size={16} /> },
      { id: 'Open Source', label: 'Open Source', icon: <GitFork size={16} /> },
      { id: 'Professional', label: 'Professional', icon: <Building2 size={16} /> },
      { id: 'Academic', label: 'College', icon: <GraduationCap size={16} /> },
      { id: 'Personal', label: 'Self Interest', icon: <Sparkles size={16} /> },
  ];

  // Theme Constants
  const theme = {
    bg: isDarkMode ? 'bg-slate-900/90' : 'bg-white/90',
    textPrimary: isDarkMode ? 'text-white' : 'text-slate-900',
    textSecondary: isDarkMode ? 'text-slate-400' : 'text-slate-500',
    accentText: isDarkMode ? 'text-[#6366f1]' : 'text-indigo-600',
    border: isDarkMode ? 'border-white/10' : 'border-slate-200',
    cardBg: isDarkMode ? 'bg-slate-800/40' : 'bg-slate-50',
    cardHover: isDarkMode ? 'hover:bg-slate-800/60' : 'hover:bg-white',
    timelineLine: isDarkMode ? 'border-slate-700' : 'border-slate-300',
    timelineDot: isDarkMode ? 'bg-slate-600' : 'bg-slate-300',
    skillBg: isDarkMode ? 'bg-slate-800' : 'bg-white',
    skillText: isDarkMode ? 'text-slate-200' : 'text-slate-700',
    skillBorder: isDarkMode ? 'border-slate-700' : 'border-slate-200',
    inputBg: isDarkMode ? 'bg-slate-900/50' : 'bg-slate-100',
    buttonGhost: isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-200',
    filterActive: isDarkMode ? 'bg-[#6366f1] text-white shadow-indigo-500/30' : 'bg-indigo-600 text-white shadow-indigo-500/30',
    filterInactive: isDarkMode ? 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white' : 'bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900 border border-slate-200',
  };

  return (
    <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none flex flex-col items-center">
      
      {/* --- FULL SCREEN CONTAINER --- */}
      <div className={`w-full h-full ${theme.bg} backdrop-blur-xl shadow-2xl overflow-y-auto custom-scrollbar pointer-events-auto transition-colors duration-500`}>
        
        {/* Centered Content Wrapper with Padding */}
        <div className="max-w-6xl mx-auto w-full min-h-full flex flex-col px-6 md:px-12 lg:px-24">
            
            {/* Header / Profile Card */}
            <div className="py-8 md:py-12 mt-4 md:mt-8 relative">
                
                {/* Theme Toggle Button */}
                <button 
                    onClick={toggleTheme}
                    className={`absolute top-8 right-0 p-2 rounded-full transition-all duration-300 ${isDarkMode ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 shadow-sm'}`}
                    title="Toggle Theme"
                >
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <div className="flex flex-col md:flex-row md:items-center gap-8 mb-10">
                    <div className={`w-28 h-28 rounded-full border-4 ${isDarkMode ? 'border-[#6366f1]' : 'border-indigo-500'} overflow-hidden shadow-[0_0_30px_rgba(99,102,241,0.25)] ${isDarkMode ? 'bg-slate-800' : 'bg-white'} transition-transform duration-500 hover:scale-105 hover:rotate-3 shrink-0`}>
                        <img src="ranaik_logo.jpeg" alt="Ravesh Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h1 className={`text-4xl md:text-5xl font-black tracking-tight mb-2 ${isDarkMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600'}`}>
                            RAVESH ASHOK NAIK
                        </h1>
                        <p className={`font-bold text-lg tracking-wide flex items-center gap-2 ${theme.accentText}`}>
                            SYSTEM SOFTWARE ENGINEER
                        </p>
                        <div className={`flex items-center gap-2 text-sm mt-3 font-medium ${theme.textSecondary}`}>
                            <MapPin size={14} /> Bengaluru, Karnataka, India
                        </div>
                    </div>
                    
                    <div className="md:ml-auto flex gap-3 mt-4 md:mt-0">
                        <SocialBtn isDarkMode={isDarkMode} href="https://github.com/ranaik09" icon={<Github size={20} />} label="GitHub" />
                        <SocialBtn isDarkMode={isDarkMode} href="https://linkedin.com/in/ranaik587" icon={<Linkedin size={20} />} label="LinkedIn" />
                        <SocialBtn isDarkMode={isDarkMode} href="#" icon={<BookOpen size={20} />} label="Technical Blog" />
                        <SocialBtn isDarkMode={isDarkMode} href="mailto:ravesh.ashok.naik@gmail.com" icon={<Mail size={20} />} label="Email" />
                        <SocialBtn isDarkMode={isDarkMode} href="tel:+919731239300" icon={<Phone size={20} />} label="Call" />
                    </div>
                </div>

                {/* Navigation Tabs - Responsive Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                    <NavBtn isDarkMode={isDarkMode} active={activeTab === 'summary'} onClick={() => setActiveTab('summary')} icon={<User size={18}/>} label="About Me" />
                    <NavBtn isDarkMode={isDarkMode} active={activeTab === 'experience'} onClick={() => setActiveTab('experience')} icon={<Briefcase size={18}/>} label="Experience" />
                    <NavBtn isDarkMode={isDarkMode} active={activeTab === 'projects'} onClick={() => setActiveTab('projects')} icon={<Rocket size={18}/>} label="Projects" />
                    <NavBtn isDarkMode={isDarkMode} active={activeTab === 'skills'} onClick={() => setActiveTab('skills')} icon={<Code2 size={18}/>} label="Skills" />
                    <NavBtn isDarkMode={isDarkMode} active={activeTab === 'education'} onClick={() => setActiveTab('education')} icon={<GraduationCap size={18}/>} label="Education" />
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 pb-24">
                
                {activeTab === 'summary' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <SectionTitle isDarkMode={isDarkMode} icon={<User size={24} />} title="Professional Summary" />
                        <div className={`text-lg leading-relaxed font-medium space-y-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                            <p>
                                System Software Engineer with <strong className={theme.accentText}>7.5+ years</strong> of hands-on experience in driver development, firmware engineering, and intelligent automation across x86/ARM platforms.
                            </p>
                            <p>
                                Deep expertise in <strong className={theme.textPrimary}>Windows kernel debugging (WinDbg)</strong>, complex I/O operations, Plug & Play / Power Management systems, and multi-OS driver validation.
                            </p>
                        </div>
                        <div className={`mt-8 p-8 border rounded-3xl transition-all duration-300 ${isDarkMode ? 'bg-indigo-900/20 border-indigo-500/30 hover:bg-indigo-900/30' : 'bg-indigo-50 border-indigo-100 hover:bg-indigo-100/50 shadow-sm'}`}>
                            <h4 className={`font-bold mb-3 flex items-center gap-2 text-xl ${theme.accentText}`}>
                                <Terminal size={22} /> Current Focus
                            </h4>
                            <p className={`text-base leading-relaxed ${isDarkMode ? 'text-indigo-100/80' : 'text-slate-700'}`}>
                                Debugging complex Windows and NI Linux RT driver issues, C firmware for automotive protocols (CAN, LIN), and designing intelligent automation agents using Python.
                            </p>
                        </div>
                    </div>
                )}

                {activeTab === 'experience' && (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <SectionTitle isDarkMode={isDarkMode} icon={<Briefcase size={24} />} title="Experience" />
                        
                        <div className="space-y-12 pl-2">
                            <TimelineItem 
                                isDarkMode={isDarkMode}
                                role="Software Engineer"
                                company="National Instruments (NI)"
                                period="Jan 2024 – Present"
                                details={[
                                    "Debugged complex Windows/Linux RT driver issues using WinDbg & Crash dumps.",
                                    "Implemented C firmware for CAN, LIN, Automotive Ethernet.",
                                    "Developed PXI controller drivers (KMDF/UMDF), handling IRPs/DMA.",
                                    "Designed AI-driven failure classification automation using Python & ELK stack."
                                ]}
                                current
                            />

                            <TimelineItem 
                                isDarkMode={isDarkMode}
                                role="Senior Software Technician"
                                company="National Instruments (NI)"
                                period="Jun 2022 – Jan 2024"
                                details={[
                                    "Led driver feature dev for NI-XNET using WDF/C++.",
                                    "Upgraded OPC UA SDK with security compliance.",
                                    "Partnered with BIOS/Firmware teams on UEFI & ARM interrupt routing.",
                                    "Validated automotive protocol hardware firmware upgrades."
                                ]}
                            />

                            <TimelineItem 
                                isDarkMode={isDarkMode}
                                role="Staff Software Technician"
                                company="National Instruments (NI)"
                                period="May 2020 – Jun 2022"
                                details={[
                                    "Standardized driver validation, migrating 30+ drivers to unified infra.",
                                    "Built Python automation agents for log analysis & failure grouping.",
                                    "Maintained Lab Hardware Tracking Tool (Django + SystemLink)."
                                ]}
                            />

                            <TimelineItem 
                                isDarkMode={isDarkMode}
                                role="Software Technician"
                                company="National Instruments (NI)"
                                period="Jan 2018 – May 2020"
                                details={[
                                    "Debugged ATS/LabVIEW tests for semiconductor validation.",
                                    "Expanded automation for NI-DCPower, NI-DMM across Windows/Linux.",
                                    "Key contributor to initial Linux Desktop driver release for NI-DMM."
                                ]}
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'projects' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4 mb-2 border-slate-200/50">
                            <SectionTitle isDarkMode={isDarkMode} icon={<Rocket size={24} />} title="Projects Portfolio" />
                        </div>
                        
                        {/* Filter Bar */}
                        <div className="flex flex-wrap gap-3 mb-6">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`
                                        flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300
                                        ${selectedCategory === cat.id 
                                            ? `${theme.filterActive} shadow-lg scale-105` 
                                            : `${theme.filterInactive} hover:scale-105`
                                        }
                                    `}
                                >
                                    {cat.icon}
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        {/* Projects Grid */}
                        <div className="grid grid-cols-1 gap-8 min-h-[400px]">
                            {filteredProjects.length > 0 ? (
                                filteredProjects.map(project => (
                                    <ProjectCard 
                                        key={project.id}
                                        project={project}
                                        onVote={handleVote}
                                        onAddReview={handleAddReview}
                                        theme={theme}
                                        isDarkMode={isDarkMode}
                                    />
                                ))
                            ) : (
                                <div className={`flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-3xl ${isDarkMode ? 'border-slate-800 text-slate-600' : 'border-slate-200 text-slate-400'}`}>
                                    <Filter size={48} className="mb-4 opacity-50" />
                                    <p className="text-lg font-bold">No projects found in this category.</p>
                                    <button 
                                        onClick={() => setSelectedCategory('All')}
                                        className="mt-4 text-indigo-500 font-bold hover:underline"
                                    >
                                        View all projects
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'skills' && (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <SectionTitle isDarkMode={isDarkMode} icon={<Code2 size={24} />} title="Technical Skills" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                            <SkillGroup isDarkMode={isDarkMode} title="Languages" skills={["C", "C++", "Python", "Shell/Bash", "LabVIEW"]} />
                            <SkillGroup isDarkMode={isDarkMode} title="OS & Kernel" skills={["Windows Internals", "Linux Kernel", "NI LinuxRT", "Embedded Linux", "UEFI", "BIOS"]} />
                            <SkillGroup isDarkMode={isDarkMode} title="Drivers & Frameworks" skills={["WDF", "KMDF", "UMDF", "IRPs", "DMA", "PnP", "Power Management"]} />
                            <SkillGroup isDarkMode={isDarkMode} title="Debugging" skills={["WinDbg", "GDB", "VS Remote Debugger", "Crash Dump Analysis"]} />
                            <SkillGroup isDarkMode={isDarkMode} title="Automation & CI/CD" skills={["Jenkins", "Azure DevOps", "Docker", "Git", "TestStand"]} />
                            <SkillGroup isDarkMode={isDarkMode} title="Observability" skills={["Elasticsearch", "Kibana", "Grafana", "Splunk"]} />
                        </div>
                    </div>
                )}

                {activeTab === 'education' && (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <SectionTitle isDarkMode={isDarkMode} icon={<GraduationCap size={24} />} title="Education" />
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <EduCard 
                                isDarkMode={isDarkMode}
                                degree="M.Sc. Computer Science"
                                school="Christ University"
                                year="2021 – 2023"
                            />
                            <EduCard 
                                isDarkMode={isDarkMode}
                                degree="BCA"
                                school="Annamalai University"
                                year="2018 – 2020"
                            />
                            <EduCard 
                                isDarkMode={isDarkMode}
                                degree="Diploma in Computer Eng."
                                school="NTTF"
                                year="2014 – 2017"
                                grade="83%"
                            />
                        </div>

                        <div className="mt-16">
                            <SectionTitle isDarkMode={isDarkMode} icon={<Award size={24} />} title="Certifications" />
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <CertificationItem isDarkMode={isDarkMode} label="CCNA Certification" />
                                <CertificationItem isDarkMode={isDarkMode} label="NSDC Certification" />
                                <CertificationItem isDarkMode={isDarkMode} label="Linux Administration Certification" />
                                <CertificationItem isDarkMode={isDarkMode} label="IoT Instructor Certification (Guest Lecturer at Christ University)" />
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
      </div>

    </div>
  );
};

// --- Sub Components ---

const SocialBtn = ({ href, icon, label, isDarkMode }: { href: string, icon: React.ReactNode, label: string, isDarkMode: boolean }) => (
    <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`group p-3 rounded-xl transition-all duration-300 border 
        ${isDarkMode 
            ? 'bg-slate-800 text-slate-400 border-slate-700/50 hover:bg-[#6366f1] hover:text-white hover:shadow-indigo-500/30' 
            : 'bg-white text-slate-500 border-slate-200 hover:bg-indigo-500 hover:text-white hover:shadow-indigo-500/20 shadow-sm'}
        hover:-translate-y-1 hover:shadow-lg`}
        title={label}
    >
        {icon}
    </a>
);

const NavBtn = ({ active, onClick, icon, label, isDarkMode }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string, isDarkMode: boolean }) => (
    <button
        onClick={onClick}
        className={`
            flex items-center justify-center gap-3 px-5 py-4 rounded-xl font-bold text-sm transition-all duration-300 border
            ${active 
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/30 scale-[1.02]' 
                : isDarkMode
                    ? 'bg-slate-800/50 text-slate-400 border-slate-700/50 hover:bg-slate-800 hover:text-white hover:border-slate-600'
                    : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-slate-800 hover:border-slate-300 shadow-sm'
            }
        `}
    >
        {icon}
        {label}
    </button>
);

const SectionTitle = ({ icon, title, isDarkMode }: { icon: React.ReactNode, title: string, isDarkMode: boolean }) => (
    <h2 className={`text-2xl font-bold flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
        <span className={isDarkMode ? 'text-[#6366f1]' : 'text-indigo-600'}>{icon}</span>
        {title}
    </h2>
);

const TimelineItem = ({ role, company, period, details, current, isDarkMode }: { role: string, company: string, period: string, details: string[], current?: boolean, isDarkMode: boolean }) => (
    <div className={`relative pl-8 border-l-2 transition-colors duration-300 ${current ? 'border-indigo-500' : isDarkMode ? 'border-slate-700 hover:border-slate-600' : 'border-slate-200 hover:border-slate-300'}`}>
        <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 transition-transform duration-300 hover:scale-125 
            ${current ? 'bg-indigo-500' : isDarkMode ? 'bg-slate-600' : 'bg-slate-300'}
            ${isDarkMode ? 'border-slate-900' : 'border-white'}
        `} />
        <h3 className={`text-xl font-bold leading-none ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{role}</h3>
        <div className={`text-base font-semibold mt-1 mb-3 ${isDarkMode ? 'text-[#6366f1]' : 'text-indigo-600'}`}>{company}</div>
        <div className={`text-xs font-mono uppercase tracking-wider mb-4 inline-block px-3 py-1 rounded-md border 
            ${isDarkMode ? 'text-slate-500 bg-slate-800/50 border-white/5' : 'text-slate-500 bg-slate-100 border-slate-200'}
        `}>{period}</div>
        <ul className="space-y-3">
            {details.map((item, i) => (
                <li key={i} className={`text-base leading-relaxed flex items-start gap-3 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    <span className={isDarkMode ? 'text-[#6366f1] mt-1.5' : 'text-indigo-500 mt-1.5'}>•</span>
                    {item}
                </li>
            ))}
        </ul>
    </div>
);

const SkillGroup = ({ title, skills, isDarkMode }: { title: string, skills: string[], isDarkMode: boolean }) => (
    <div>
        <h4 className="text-sm font-extrabold text-slate-500 uppercase tracking-widest mb-4">{title}</h4>
        <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
                <span key={skill} className={`
                    px-4 py-2 text-sm font-bold rounded-lg border transition-all duration-300 cursor-default
                    ${isDarkMode 
                        ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-[#6366f1] hover:text-white hover:border-[#6366f1] hover:shadow-indigo-500/20' 
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 shadow-sm hover:shadow-indigo-500/20'
                    }
                    hover:scale-105 hover:shadow-lg
                `}>
                    {skill}
                </span>
            ))}
        </div>
    </div>
);

const EduCard = ({ degree, school, year, grade, isDarkMode }: { degree: string, school: string, year: string, grade?: string, isDarkMode: boolean }) => (
    <div className={`
        p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1
        ${isDarkMode 
            ? 'bg-slate-800/40 border-white/5 hover:border-white/20 hover:bg-slate-800/60' 
            : 'bg-white border-slate-200 hover:border-indigo-200 hover:bg-indigo-50/30 shadow-sm'
        }
    `}>
        <h3 className={`font-bold text-base ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{degree}</h3>
        <div className={`text-sm mt-1 font-semibold ${isDarkMode ? 'text-[#6366f1]' : 'text-indigo-600'}`}>{school}</div>
        <div className="flex justify-between items-center mt-4">
            <span className="text-xs text-slate-500 font-mono">{year}</span>
            {grade && <span className="text-xs bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded font-bold border border-emerald-500/20">{grade}</span>}
        </div>
    </div>
);

const CertificationItem = ({ label, isDarkMode }: { label: string, isDarkMode: boolean }) => (
    <div className={`
        flex items-center gap-3 p-4 rounded-xl border transition-colors group
        ${isDarkMode 
            ? 'bg-slate-800/30 border-white/5 hover:border-[#6366f1]/30' 
            : 'bg-white border-slate-200 hover:border-indigo-200 hover:bg-indigo-50/30 shadow-sm'
        }
    `}>
        <div className="w-2 h-2 bg-emerald-500 rounded-full group-hover:scale-150 transition-transform"/> 
        <span className={`text-sm font-medium transition-colors ${isDarkMode ? 'text-slate-300 group-hover:text-white' : 'text-slate-600 group-hover:text-slate-900'}`}>{label}</span>
    </div>
);

const ProjectCard = ({ project, onVote, onAddReview, theme, isDarkMode }: { 
    project: Project; 
    onVote: (id: number) => void;
    onAddReview: (id: number, text: string) => void;
    theme: any;
    isDarkMode: boolean;
}) => {
    const [reviewText, setReviewText] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const [isVoting, setIsVoting] = useState(false);

    const handleSubmitReview = () => {
        if (!reviewText.trim()) return;
        onAddReview(project.id, reviewText);
        setReviewText("");
    };

    const handleVoteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isVoting) return;
        onVote(project.id);
        setIsVoting(true);
        setTimeout(() => setIsVoting(false), 800);
    };

    const getTechIcon = (tech: string) => {
        switch (tech) {
            case "React": return <Atom size={18} />;
            case "Three.js": return <Box size={18} />;
            case "TypeScript": return <FileCode size={18} />;
            case "Tailwind CSS": return <Wind size={18} />;
            case "Python": return <Terminal size={18} />;
            case "WinDbg": return <Bug size={18} />;
            case "Node.js": return <Server size={18} />;
            case "Rust": return <Cpu size={18} />;
            case "MQTT": return <Wifi size={18} />;
            case "InfluxDB": return <Database size={18} />;
            case "Grafana": return <BarChart3 size={18} />;
            case "OpenCV": return <Box size={18} />;
            case "Django": return <Server size={18} />;
            case "PostgreSQL": return <Database size={18} />;
            default: return <Code2 size={18} />;
        }
    };

    // Category badge colors
    const getCategoryColor = (cat: string) => {
        switch (cat) {
            case 'Open Source': return isDarkMode ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'Professional': return isDarkMode ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' : 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Academic': return isDarkMode ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' : 'bg-purple-100 text-purple-700 border-purple-200';
            case 'Personal': return isDarkMode ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-amber-100 text-amber-700 border-amber-200';
            default: return isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <div className={`rounded-3xl border transition-all duration-300 ${theme.cardBg} ${theme.border} ${theme.cardHover} overflow-hidden`}>
            {/* Header - Always Visible & Clickable */}
            <div 
                className="p-6 cursor-pointer" 
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className={`text-xl font-bold ${theme.textPrimary}`}>{project.title}</h3>
                            <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-1 rounded-md border ${getCategoryColor(project.category)}`}>
                                {project.category}
                            </span>
                        </div>
                        
                        {/* Tech Icons Row */}
                        <div className="flex flex-wrap gap-3 mt-3" onClick={(e) => e.stopPropagation()}>
                            {project.technologies.map(tech => (
                                <div 
                                    key={tech} 
                                    className={`group relative p-2 rounded-lg border transition-all duration-300 hover:scale-110 cursor-help ${theme.skillBg} ${theme.skillText} ${theme.skillBorder}`}
                                >
                                    {getTechIcon(tech)}
                                    
                                    {/* Custom Tooltip */}
                                    <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-xs font-bold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none z-50 transform translate-y-2 group-hover:translate-y-0 ${isDarkMode ? 'bg-white text-slate-900' : 'bg-slate-800 text-white'}`}>
                                        {tech}
                                        {/* Arrow */}
                                        <div className={`absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent ${isDarkMode ? 'border-t-white' : 'border-t-slate-800'}`}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <a href={project.link} target="_blank" rel="noopener noreferrer" 
                           onClick={(e) => e.stopPropagation()}
                           className={`p-2 rounded-xl transition-colors ${theme.buttonGhost} ${theme.textSecondary}`}>
                            <ExternalLink size={20} />
                        </a>
                        <div className={`p-2 rounded-xl transition-all duration-300 ${theme.textSecondary} ${isExpanded ? 'rotate-180 bg-slate-100/10' : ''}`}>
                            <ChevronDown size={20} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Collapsible Body */}
            <div className={`grid transition-all duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    <div className="px-6 pb-6">
                        <p className={`text-base leading-relaxed mb-6 font-medium whitespace-pre-line ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                            {project.description}
                        </p>

                        <div className={`flex items-center gap-6 pt-4 border-t ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
                            <button 
                                onClick={handleVoteClick}
                                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 group ${isDarkMode ? 'bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'}`}
                            >
                                <div className={`transition-all duration-500 ${isVoting ? 'scale-125 rotate-[360deg] text-yellow-400' : 'group-hover:scale-110'}`}>
                                    <Star size={16} fill={isVoting ? "currentColor" : "currentColor"} /> 
                                </div>
                                <span className="transition-all duration-300">{project.votes} Votes</span>
                                
                                {isVoting && (
                                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-emerald-500 font-extrabold text-lg animate-bounce pointer-events-none">
                                        +1
                                    </span>
                                )}
                            </button>
                            
                            <div className={`flex items-center gap-2 text-sm font-bold ${theme.textSecondary}`}>
                                <MessageSquare size={16} /> {project.reviews.length} Reviews
                            </div>
                        </div>

                        {/* Reviews Section - Always visible if Expanded */}
                        <div className="mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
                            <div className={`mb-4 max-h-40 overflow-y-auto custom-scrollbar space-y-3`}>
                                {project.reviews.length === 0 ? (
                                    <p className="text-xs text-slate-500 italic">No reviews yet. Be the first!</p>
                                ) : (
                                    project.reviews.map((review, i) => (
                                        <div key={i} className={`p-3 rounded-xl text-sm ${isDarkMode ? 'bg-slate-900/50 text-slate-300' : 'bg-slate-100 text-slate-700'}`}>
                                            "{review}"
                                        </div>
                                    ))
                                )}
                            </div>
                            <div className="flex gap-2">
                                <input 
                                    type="text" 
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    placeholder="Leave a review..."
                                    className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${theme.inputBg} ${theme.textPrimary} ${theme.border}`}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSubmitReview()}
                                />
                                <button 
                                    onClick={handleSubmitReview}
                                    disabled={!reviewText.trim()}
                                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-bold"
                                >
                                    <Send size={16} /> Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
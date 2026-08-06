import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, BookOpen, Monitor, Users, MapPin, Calendar, 
  Laptop, Droplets, Shield, Fence, Zap, GraduationCap, 
  School, Heart, Globe, Award
} from 'lucide-react';

export default function About() {
  const infrastructure = [
    { icon: <Building2 size={24} />, label: 'Private Building', desc: 'Well-maintained private school building with pucca boundary wall' },
    { icon: <School size={24} />, label: '13 Classrooms', desc: 'All classrooms in good condition for instructional purposes' },
    { icon: <Laptop size={24} />, label: '14 Computers', desc: 'Fully functional computer-aided learning lab for digital education' },
    { icon: <BookOpen size={24} />, label: 'Library', desc: 'Rich collection of books and resources for students and staff' },
    { icon: <Users size={24} />, label: 'Playground', desc: 'Spacious playground for sports, recreation, and physical education' },
    { icon: <Droplets size={24} />, label: 'Clean Water', desc: 'Functional tap water supply for safe drinking water access' },
    { icon: <Zap size={24} />, label: 'Electric Connection', desc: 'Reliable electric supply for digital classrooms and campus needs' },
    { icon: <Shield size={24} />, label: 'Separate Toilets', desc: 'Functional separate toilet facilities for boys and girls' },
  ];

  const highlights = [
    { icon: <Calendar size={20} />, label: 'Established', value: '1998' },
    { icon: <GraduationCap size={20} />, label: 'Grades', value: '1 to 10' },
    { icon: <Globe size={20} />, label: 'Medium', value: 'English' },
    { icon: <Users size={20} />, label: 'Type', value: 'Co-educational' },
    { icon: <MapPin size={20} />, label: 'Location', value: 'Kaliabor Block' },
    { icon: <Award size={20} />, label: 'District', value: 'Nagaon, Assam' },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
      {/* Hero Banner */}
      <section className="relative h-[150px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-900/90 backdrop-blur-[2px]"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center animate-fade-in-up mt-4">
          <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400 mb-2 tracking-tight">
            About Our School
          </h1>
          <div className="flex items-center justify-center gap-2 text-slate-300 font-medium text-sm">
            <Link to="/" className="text-orange-400 hover:text-orange-300 transition-colors">Home</Link>
            <span className="text-slate-500">/</span>
            <span className="text-white">About</span>
          </div>
        </div>
      </section>

      {/* About Main Section */}
      <section className="pt-12 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start lg:justify-between max-w-6xl mx-auto">
            {/* Left — Text Content */}
            <div className="flex-1 max-w-3xl text-center lg:text-left">
              <span className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-500 text-xs font-bold tracking-widest uppercase mb-6 border border-orange-500/20">
                Est. 1998
              </span>
              <h2 className="text-3xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
                Saint Robert's School,<br/>
                <span className="text-slate-500 dark:text-slate-400">Jakhalabandha</span>
              </h2>
              <div className="w-20 h-1.5 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full mb-8 mx-auto lg:mx-0"></div>
              
              <div className="space-y-6 text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                <p>
                  Saint Robert's School was established in <strong className="text-slate-900 dark:text-white font-semibold">1998</strong> and is managed as a 
                  <strong className="text-slate-900 dark:text-white font-semibold"> Private Unaided</strong> institution. Located in the rural area of 
                  <strong className="text-slate-900 dark:text-white font-semibold"> Kaliabor block, Nagaon district, Assam</strong>, the school serves as a 
                  beacon of quality education in the region.
                </p>
                <p>
                  The school offers <strong className="text-slate-900 dark:text-white font-semibold">English-medium</strong> education from <strong className="text-slate-900 dark:text-white font-semibold">Grades 1 to 10</strong>, 
                  along with an attached <strong className="text-slate-900 dark:text-white font-semibold">pre-primary section</strong>. It is a <strong className="text-slate-900 dark:text-white font-semibold">co-educational</strong> institution 
                  committed to the holistic development of every child. The academic session commences in <strong className="text-slate-900 dark:text-white font-semibold">April</strong> each year.
                </p>
                <p>
                  With a dedicated staff of experienced educators, modern infrastructure including 
                  <strong className="text-slate-900 dark:text-white font-semibold"> 14 functional computers</strong> in a dedicated computer-aided learning lab, 
                  a well-stocked <strong className="text-slate-900 dark:text-white font-semibold">library</strong>, and a spacious <strong className="text-slate-900 dark:text-white font-semibold">playground</strong>, 
                  St. Robert's School ensures that students receive a well-rounded education that prepares 
                  them for future challenges.
                </p>
              </div>

              <div className="mt-10">
                <Link to="/gallery" className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-rose-500 rounded-lg hover:shadow-lg hover:shadow-orange-500/25 hover:-translate-y-1 transition-all duration-300 uppercase tracking-widest">
                  Explore Our Campus
                </Link>
              </div>
            </div>

            {/* Right — Quick Highlights Card */}
            <div className="w-full lg:w-[400px]">
              <div className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-xl">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 text-center flex items-center justify-center gap-3">
                  <span className="w-8 h-px bg-slate-200 dark:bg-slate-700"></span>
                  School at a Glance
                  <span className="w-8 h-px bg-slate-200 dark:bg-slate-700"></span>
                </h3>
                
                <div className="flex flex-col gap-4">
                  {highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-colors group">
                      <div className="w-12 h-12 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">{item.label}</div>
                        <div className="text-slate-900 dark:text-white font-semibold text-lg">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section className="py-10 bg-slate-100/50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800/50 relative overflow-hidden">
        {/* Decorative background blurs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-500/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-6">Our Infrastructure</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full mx-auto mb-6"></div>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Our school building has <strong className="text-slate-900 dark:text-white font-semibold">13 classrooms</strong> in good condition, 
              <strong className="text-slate-900 dark:text-white font-semibold"> 2 non-teaching rooms</strong>, a separate Head Master room, 
              and is fully accessible by all-weather road.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {infrastructure.map((item, idx) => (
              <div key={idx} className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800/80 rounded-2xl p-8 hover:-translate-y-2 hover:shadow-xl hover:shadow-black/5 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 group flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-orange-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-orange-500/30 group-hover:text-orange-500 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.2)] transition-all duration-300">
                  {item.icon}
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{item.label}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-3xl p-10 md:p-12 text-center hover:border-slate-300 dark:hover:border-slate-700 transition-colors group">
              <div className="w-20 h-20 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300">
                <Heart size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Our Mission</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                To nurture young minds through quality English-medium education, instilling values of 
                discipline, compassion, and excellence. We aim to develop students who are academically 
                strong, morally upright, and socially responsible citizens.
              </p>
            </div>

            <div className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-3xl p-10 md:p-12 text-center hover:border-slate-300 dark:hover:border-slate-700 transition-colors group">
              <div className="w-20 h-20 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                <Globe size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Our Vision</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                To be the leading institution of academic excellence in the Kaliabor region — 
                empowering every student with knowledge, skills, and values that enable them to 
                contribute positively to society and thrive in an ever-changing world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Info */}
      <section className="pt-10 pb-20 mb-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">Find Us</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full mx-auto"></div>
          </div>
          
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 p-8 md:p-10 rounded-3xl flex flex-col md:flex-row gap-8 items-center shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center flex-shrink-0 animate-pulse">
              <MapPin size={32} />
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">St. Robert's School Campus</h4>
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-4">
                Jakhalabandha, Rongaloo<br />
                Kaliabor Block, Nagaon District<br />
                Assam, India — 782136
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800/80 text-sm text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/50">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Approachable by all-weather road. Located in the heart of the Jakhalabandha community.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

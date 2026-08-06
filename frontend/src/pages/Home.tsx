import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Monitor, Award, Heart, Shield, Users, Layers, 
  Star, Sparkles, GraduationCap, Calendar, Laptop, MapPin,
  ArrowRight, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getTeachers } from '../lib/api';

export default function Home() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [countersVisible, setCountersVisible] = useState(false);

  useEffect(() => {
    getTeachers()
      .then(res => {
        if (res.success && res.data && res.data.length > 0) {
          setTeachers(res.data.slice(0, 3));
        } else {
          setTeachers(fallbackTeachers);
        }
      })
      .catch(() => setTeachers(fallbackTeachers));
  }, []);

  // Animate counters on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setCountersVisible(true);
      },
      { threshold: 0.3 }
    );
    const el = document.getElementById('stats-section');
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  const fallbackTeachers = [
    { Name: "Sir Manohar K.", qualification: "B.Ed, M.Sc", experience: "7 Years", role: "Assistant Teacher" },
    { Name: "Sir Umesh S.", qualification: "B.Ed, B.Sc", experience: "7 Years", role: "Assistant Teacher" },
    { Name: "Mam Knisha Kullu", qualification: "B.Ed, B.A", experience: "7 Years", role: "Assistant Teacher" }
  ];

  const stats = [
    { value: '25+', label: 'Years of Excellence', icon: <Calendar size={28} /> },
    { value: '14', label: 'Dedicated Staff', icon: <Users size={28} /> },
    { value: '10', label: 'Grade Levels', icon: <GraduationCap size={28} /> },
    { value: '14', label: 'Computers', icon: <Laptop size={28} /> },
  ];

  const facilities = [
    { title: "Library", desc: "A rich collection of academic books, reference materials, and literary resources.", icon: <BookOpen size={24} /> },
    { title: "Computer Lab", desc: "14 functional computers with a dedicated computer-aided learning lab.", icon: <Monitor size={24} /> },
    { title: "Science Lab", desc: "Well-equipped lab providing hands-on experience in sciences.", icon: <Layers size={24} /> },
    { title: "Playground", desc: "A spacious playground for sports and physical education.", icon: <Award size={24} /> },
    { title: "Hostel & Boarding", desc: "Separate hostels for boys and girls with dedicated caring staff.", icon: <Shield size={24} /> },
    { title: "Campus Church", desc: "A serene venue for reflection, prayer, and community gatherings.", icon: <Heart size={24} /> },
    { title: "Digital Classrooms", desc: "13 classrooms equipped with modern aids for interactive learning.", icon: <Sparkles size={24} /> },
    { title: "Clean Infrastructure", desc: "Private building with running water and modern sanitation.", icon: <MapPin size={24} /> },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-900 transition-colors duration-300 overflow-hidden">
      {/* ─── HERO SECTION ─── */}
      <header className="relative min-h-[calc(100vh-80px)] flex items-center pt-4 pb-8 lg:pt-6 lg:pb-12">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=1920" 
            alt="Campus" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-transparent dark:from-slate-900 dark:via-slate-900/90"></div>
        </div>

        <div className="container relative z-10 animate-fade-in-up">
          <div className="max-w-3xl">
            <span className="inline-block py-1.5 px-4 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
              Est. 1998 • Jakhalabandha, Assam
            </span>
            <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6 uppercase">
              St. Robert's <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400">School</span>
            </h1>
            <p className="text-xl md:text-xl text-slate-300 font-light italic mb-6">
              Ensuring Better Education for a Better World
            </p>
            <p className="text-lg text-slate-400 mb-10 max-w-2xl leading-relaxed">
              A co-educational English-medium school providing quality education from 
              Grades 1 to 10, nurturing young minds in the heart of Nagaon district since 1998.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/about" className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-xl font-bold flex items-center gap-2 hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:-translate-y-1">
                Discover More <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/office-hours" className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-xl font-bold backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                Office Hours
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Feature Cards */}
        <div className="absolute -bottom-24 left-0 right-0 z-20 hidden lg:block">
          <div className="container">
            <div className="grid grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden group hover:-translate-y-2 transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50">
                <div className="bg-slate-900 p-6 text-center">
                  <h3 className="text-white font-bold text-xl">English Medium</h3>
                </div>
                <div className="p-8 text-center flex flex-col items-center">
                  <p className="text-slate-600 dark:text-slate-400 mb-6">Complete English-medium instruction from pre-primary through Grade 10 with experienced educators.</p>
                  <Link to="/about" className="text-slate-900 dark:text-white font-bold uppercase tracking-wider text-sm flex items-center gap-1 group-hover:text-orange-500 transition-colors">
                    Learn More <ChevronRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden group hover:-translate-y-2 transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50">
                <div className="bg-gradient-to-r from-orange-500 to-rose-500 p-6 text-center">
                  <h3 className="text-white font-bold text-xl">Computer Lab</h3>
                </div>
                <div className="p-8 text-center flex flex-col items-center">
                  <p className="text-slate-600 dark:text-slate-400 mb-6">State-of-the-art computer-aided learning lab with functional computers for digital education.</p>
                  <Link to="/gallery" className="text-slate-900 dark:text-white font-bold uppercase tracking-wider text-sm flex items-center gap-1 group-hover:text-orange-500 transition-colors">
                    View Gallery <ChevronRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden group hover:-translate-y-2 transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50">
                <div className="bg-slate-900 p-6 text-center">
                  <h3 className="text-white font-bold text-xl">Holistic Growth</h3>
                </div>
                <div className="p-8 text-center flex flex-col items-center">
                  <p className="text-slate-600 dark:text-slate-400 mb-6">Sports, cultural programs, spiritual development, and academics — for the complete child.</p>
                  <Link to="/staff" className="text-slate-900 dark:text-white font-bold uppercase tracking-wider text-sm flex items-center gap-1 group-hover:text-orange-500 transition-colors">
                    Meet Staff <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for Floating Cards on Desktop */}
      <div className="hidden lg:block h-32"></div>

      {/* ─── STATS COUNTER ─── */}
      <section id="stats-section" className="pt-6 pb-12 bg-slate-900 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-rose-500"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"></div>
        
        <div className="container relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className={`text-center transform transition-all duration-700 ${countersVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">{stat.value}</div>
                <div className="text-slate-400 font-medium uppercase tracking-wider text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT SNIPPET ─── */}
      <section className="py-6">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1 relative group w-full">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-rose-500 rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition duration-500"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/campus/20210315_121313-01.jpeg" 
                  alt="St. Robert's School Campus" 
                  className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                  onError={(e: any) => { e.target.src = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800'; }}
                />
                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-slate-900/90 to-transparent">
                  <span className="text-white font-bold uppercase tracking-widest text-sm">Our Beautiful Campus</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <span className="inline-block text-orange-500 font-bold uppercase tracking-widest mb-4 text-sm">About Us</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
                A Legacy of 25+ Years of <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">Educational Excellence</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Saint Robert's School was established in <strong className="text-slate-800 dark:text-slate-200">1998</strong> as a private unaided 
                institution in the rural area of Kaliabor block, Nagaon district, Assam. We offer 
                co-educational English-medium education from <strong className="text-slate-800 dark:text-slate-200">Grades 1 to 10</strong> with 
                an attached pre-primary section.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
                Our campus features 13 well-maintained classrooms, a modern computer-aided learning lab, a 
                library, playground, and dedicated hostel facilities for boarding students.
              </p>
              <Link to="/about" className="inline-flex items-center gap-2 font-bold text-orange-500 hover:text-orange-600 transition-colors uppercase tracking-wider group">
                Read Full Story <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FACILITIES ─── */}
      <section className="py-6 bg-slate-100 dark:bg-slate-800/50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-orange-500 font-bold uppercase tracking-widest mb-4 block text-sm">Discover</span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-6">Our Campus Facilities</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              We provide a rich, modern environment supporting our students' academic, physical, and spiritual development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {facilities.map((fac, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group">
                <div className="w-14 h-14 rounded-xl bg-orange-100 dark:bg-orange-500/20 text-orange-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                  {fac.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{fac.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{fac.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TEACHERS ─── */}
      <section className="py-6">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-orange-500 font-bold uppercase tracking-widest mb-4 block text-sm">Faculty</span>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-6">Our Leading Teachers</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Meet some of our highly qualified and passionate educators driving student success.
              </p>
            </div>
            <Link to="/staff" className="hidden md:inline-flex px-6 py-3 bg-slate-900 dark:bg-slate-700 text-white font-bold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors">
              View All Staff
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teachers.map((teacher, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 text-white flex items-center justify-center font-bold text-xl shadow-md">
                    {(teacher.Name || `${teacher.Fname} ${teacher.Lname}`).substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {teacher.Name || `${teacher.Fname} ${teacher.Lname}`}
                    </h3>
                    <p className="text-orange-500 font-semibold text-sm uppercase tracking-wider mt-1">{teacher.role || 'Educator'}</p>
                  </div>
                </div>
                <div className="pt-6 border-t border-slate-100 dark:border-slate-700/50 space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Qualification</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{teacher.qualification || 'B.Ed'}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Experience</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{teacher.experience || '7 Years'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center md:hidden">
             <Link to="/staff" className="inline-flex px-6 py-3 bg-slate-900 dark:bg-slate-700 text-white font-bold rounded-xl">
              View All Staff
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-10 bg-slate-900 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-slate-900 to-transparent"></div>
        
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-orange-500 font-bold uppercase tracking-widest mb-4 block text-sm">Testimonials</span>
            <h2 className="text-3xl font-extrabold text-white mb-6">What Our Students Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-10 hover:-translate-y-2 transition-transform duration-300">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} size={20} className="fill-orange-500 text-orange-500" />)}
              </div>
              <p className="text-xl text-slate-300 font-light italic leading-relaxed mb-8">
                "I love our vibrant library and the continuous support from teachers! They make complex concepts extremely simple to learn."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">AC</div>
                <div>
                  <h4 className="text-white font-bold text-lg">Ankita Chetry</h4>
                  <p className="text-slate-400 text-sm">Class 5 Student</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-10 hover:-translate-y-2 transition-transform duration-300 md:mt-12">
              <div className="flex gap-1 mb-6">
                 {[...Array(5)].map((_, i) => <Star key={i} size={20} className="fill-orange-500 text-orange-500" />)}
              </div>
              <p className="text-xl text-slate-300 font-light italic leading-relaxed mb-8">
                "The digital classes and scientific labs make learning so much fun! I get hands-on experience which helps me understand practical concepts."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-rose-500 flex items-center justify-center text-white font-bold">NA</div>
                <div>
                  <h4 className="text-white font-bold text-lg">Nashir Ansari</h4>
                  <p className="text-slate-400 text-sm">Class 6 Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="py-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-rose-600"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjIpIi8+PC9zdmc+')] opacity-50"></div>
        
        <div className="container relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight">Ready to join St. Robert's School?</h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light">
            Admissions open for the new academic session starting April. Contact us to learn more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/office-hours" className="px-8 py-4 bg-white text-rose-600 rounded-xl font-bold hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1 transition-all duration-300">
              Book an Appointment
            </Link>
            <Link to="/about" className="px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-xl font-bold hover:bg-white/10 transition-all duration-300">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

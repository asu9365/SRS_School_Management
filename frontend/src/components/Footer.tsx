import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();
  const isManagementRoute = ['/dashboard', '/add-student', '/add-teacher', '/messages', '/student-portal', '/parent-portal'].some(path => location.pathname.startsWith(path));

  if (isManagementRoute) return null;

  return (
    <footer id="footer" className="bg-slate-900 border-t border-slate-800 text-slate-300 transition-colors duration-300">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left Column */}
          <div className="flex flex-col gap-5">
            <h4 className="font-extrabold text-xl text-white tracking-tight">St. Robert's School</h4>
            <div className="flex items-start gap-4 group">
              <div className="mt-1 p-2 bg-orange-500/10 rounded-lg text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                <MapPin size={18} />
              </div>
              <address className="not-italic text-slate-400 leading-relaxed">
                Jakhalabandha, Rongaloo,<br />
                Kaliabor Block, Nagaon District,<br />
                Assam — 782136
              </address>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                <Mail size={18} />
              </div>
              <a href="mailto:strobertschool@gmail.com" className="text-slate-400 hover:text-orange-400 transition-colors">strobertschool@gmail.com</a>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                <Phone size={18} />
              </div>
              <span className="text-slate-400">+91 82364 86349</span>
            </div>
          </div>

          {/* Center Column */}
          <div className="flex flex-col gap-5">
            <h4 className="font-extrabold text-xl text-white tracking-tight">Connect With Us</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <a href="https://www.facebook.com/SaintRobertsHighSchool/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-400 hover:text-orange-400 hover:translate-x-1 transition-all duration-300 group w-fit">
                  <div className="p-1.5 bg-slate-800 rounded-md text-slate-300 group-hover:bg-orange-500/20 group-hover:text-orange-500 transition-colors">
                     <Facebook size={16} />
                  </div>
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 text-slate-400 hover:text-orange-400 hover:translate-x-1 transition-all duration-300 group w-fit">
                  <div className="p-1.5 bg-slate-800 rounded-md text-slate-300 group-hover:bg-orange-500/20 group-hover:text-orange-500 transition-colors">
                     <Twitter size={16} />
                  </div>
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 text-slate-400 hover:text-orange-400 hover:translate-x-1 transition-all duration-300 group w-fit">
                  <div className="p-1.5 bg-slate-800 rounded-md text-slate-300 group-hover:bg-orange-500/20 group-hover:text-orange-500 transition-colors">
                     <Instagram size={16} />
                  </div>
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 text-slate-400 hover:text-orange-400 hover:translate-x-1 transition-all duration-300 group w-fit">
                  <div className="p-1.5 bg-slate-800 rounded-md text-slate-300 group-hover:bg-orange-500/20 group-hover:text-orange-500 transition-colors">
                     <Youtube size={16} />
                  </div>
                  YouTube
                </a>
              </li>
            </ul>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-5">
            <h4 className="font-extrabold text-xl text-white tracking-tight">About This Project</h4>
            <p className="text-slate-400 leading-relaxed">
              BCA Final Year Project<br />
              <strong className="text-white">Ashish Aind</strong><br />
              Roll: UT-201-300-0004
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full my-1"></div>
            <p className="text-slate-500 text-sm italic leading-relaxed">
              St. Robert's School, est. 1998 — Providing quality English-medium education 
              for Grades 1 to 10 in the heart of Jakhalabandha.
            </p>
          </div>
        </div>
      </div>

      <div className="py-6 border-t border-slate-800/60 bg-slate-950/50">
        <div className="container text-center text-sm text-slate-500 font-medium">
          &copy; {new Date().getFullYear()} St. Robert's School, Jakhalabandha | All Rights Reserved
        </div>
      </div>
    </footer>
  );
}

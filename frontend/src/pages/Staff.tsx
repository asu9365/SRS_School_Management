import React, { useState, useEffect } from 'react';
import { BookOpen, Award, GraduationCap, MapPin, Phone, MessageSquare, Quote } from 'lucide-react';
import { getTeachers } from '../lib/api';

interface Teacher {
  Name?: string;
  Fname?: string;
  Lname?: string;
  qualification?: string;
  experience?: string;
  role?: string;
  address?: string;
  Phone?: string;
  message?: string;
  image?: string;
  [key: string]: any;
}

export default function Staff() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const staticStaff = [
    { Name: "Sir Manohar K.", qualification: "B.Ed", experience: "7 Years", role: "Assistant Teacher", address: "Jakhalabandha", Phone: "67896854789", message: 'Teaching is a lifelong journey of learning and inspiring others.', image: "/images/Teachers/DSC_9067.JPG" },
    { Name: "Sir Kanchan", qualification: "B.Ed", experience: "7 Years", role: "Assistant Teacher", address: "Jakhalabandha", Phone: "67896854789", message: 'Education is the light that guides us through life\'s challenges.', image: "/images/Teachers/DSC_9068.JPG" },
    { Name: "Sir Umesh S.", qualification: "B.Ed", experience: "7 Years", role: "Assistant Teacher", address: "Jakhalabandha", Phone: "67896854789", message: 'A good teacher ignites curiosity that lasts a lifetime.', image: "/images/Teachers/DSC_9075.JPG" },
    { Name: "Mam Kaniska Kumari", qualification: "B.Ed", experience: "7 Years", role: "Assistant Teacher", address: "Jakhalabandha", Phone: "67896854789", message: "Great teachers inspire, encourage, and empower.", image: "/images/Teachers/DSC_9076.JPG" },
    { Name: "Sir Criyac Kujur", qualification: "B.Ed", experience: "7 Years", role: "Assistant Teacher", address: "Jakhalabandha", Phone: "67896854789", message: "Learning is a treasure that will follow its owner everywhere.", image: "/images/Teachers/DSC_9077.JPG" },
    { Name: "Mam Leena Kujur", qualification: "B.Ed", experience: "7 Years", role: "Assistant Teacher", address: "Jakhalabandha", Phone: "67896854789", message: "Every child deserves a champion—an adult who will never give up on them.", image: "/images/Teachers/DSC_9082.JPG" },
    { Name: "Mam Roshni Kandulna", qualification: "B.Ed", experience: "7 Years", role: "Assistant Teacher", address: "Jakhalabandha", Phone: "67896854789", message: "Teaching is the profession that teaches all other professions.", image: "/images/Teachers/DSC_9084.JPG" },
    { Name: "Miss Prova Aind", qualification: "B.Ed", experience: "7 Years", role: "Assistant Teacher", address: "Jakhalabandha", Phone: "67896854789", message: "A teacher affects eternity; they can never tell where their influence stops.", image: "/images/Teachers/DSC_9085.JPG" },
    { Name: "Mam Chainika", qualification: "B.Ed", experience: "7 Years", role: "Assistant Teacher", address: "Jakhalabandha", Phone: "67896854789", message: "Knowledge is the passport to the future, and teachers are the guides.", image: "/images/Teachers/DSC_9086.JPG" },
    { Name: "Mam Roshlin Kandulna", qualification: "B.Ed", experience: "7 Years", role: "Assistant Teacher", address: "Jakhalabandha", Phone: "67896854789", message: "The best teachers teach from the heart, not from the book.", image: "/images/Teachers/DSC_9087.JPG" },
    { Name: "Mam Anjali Singh", qualification: "B.Ed", experience: "7 Years", role: "Assistant Teacher", address: "Jakhalabandha", Phone: "67896854789", message: "In teaching, you touch the lives of many, forever.", image: "/images/Teachers/DSC_9088.JPG" },
    { Name: "Sir Raphael Lakra", qualification: "B.Ed", experience: "7 Years", role: "Assistant Teacher", address: "Jakhalabandha", Phone: "67896854789", message: "Education is the most powerful weapon to change the world.", image: "/images/Teachers/DSC_9089.JPG" },
    { Name: "Mam Pinky Dey", qualification: "B.Ed", experience: "7 Years", role: "Assistant Teacher", address: "Jakhalabandha", Phone: "67896854789", message: "A teacher's purpose is not to create students in their own image, but to develop students who can create their own future.", image: "/images/Teachers/DSC_9090.JPG" }
  ];

  useEffect(() => {
    getTeachers()
      .then(res => {
        if (res.success && res.data && res.data.length > 0) {
          // Merge dynamic teachers with the static core staff
          const merged = [...res.data, ...staticStaff.filter(s => !res.data.some((d: Teacher) => d.Name === s.Name))];
          setTeachers(merged);
        } else {
          setTeachers(staticStaff);
        }
      })
      .catch(() => setTeachers(staticStaff));
  }, []);

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen relative overflow-hidden transition-colors duration-300">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none"></div>
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <section className="pt-10 pb-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
            <div className="w-20 h-20 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(249,115,22,0.15)]">
              <GraduationCap size={40} />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 mb-6 tracking-tight">
              Our Dedicated Staff
            </h1>
            <div className="w-20 h-1.5 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full mx-auto mb-6"></div>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Our experienced teachers are the heart of St. Robert’s High School.
              They inspire academic excellence and holistic growth through patience and commitment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teachers.map((teacher, idx) => {
              const displayName = teacher.Name || `${teacher.Fname} ${teacher.Lname}`;
              const init = displayName.replace('Sir ', '').replace('Mam ', '').replace('Miss ', '').substring(0, 2);

              return (
                <div key={idx} className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 group flex flex-col h-full relative overflow-hidden">
                  {/* Card top accent */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  <div className="flex items-center gap-4 mb-6">
                    {teacher.image ? (
                      <div className="relative">
                        <div className="absolute inset-0 bg-orange-500 rounded-full blur-md opacity-20 group-hover:opacity-60 transition-opacity"></div>
                        <img src={teacher.image} alt={displayName} className="w-16 h-16 rounded-full object-cover border-2 border-slate-200 dark:border-slate-700 group-hover:border-orange-500 transition-colors relative z-10" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-orange-400 flex items-center justify-center font-bold text-xl uppercase relative z-10 group-hover:border-orange-500 transition-colors">
                        {init}
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">{displayName}</h3>
                      <span className="inline-block px-2 py-0.5 mt-1 bg-slate-100 dark:bg-slate-800 rounded text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider border border-slate-200 dark:border-slate-700/50">{teacher.role || 'Assistant Teacher'}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 mb-6 flex-grow">
                    <div className="flex items-start gap-3">
                      <GraduationCap size={16} className="text-orange-500 mt-1 flex-shrink-0" />
                      <span className="text-sm text-slate-600 dark:text-slate-300"><strong className="text-slate-900 dark:text-white font-semibold">Qualification:</strong> {teacher.qualification || 'B.Ed'}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Award size={16} className="text-orange-500 mt-1 flex-shrink-0" />
                      <span className="text-sm text-slate-600 dark:text-slate-300"><strong className="text-slate-900 dark:text-white font-semibold">Experience:</strong> {teacher.experience || '7 Years'}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin size={16} className="text-orange-500 mt-1 flex-shrink-0" />
                      <span className="text-sm text-slate-600 dark:text-slate-300"><strong className="text-slate-900 dark:text-white font-semibold">Address:</strong> {teacher.address || 'Jakhalabandha'}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone size={16} className="text-orange-500 mt-1 flex-shrink-0" />
                      <span className="text-sm text-slate-600 dark:text-slate-300"><strong className="text-slate-900 dark:text-white font-semibold">Contact:</strong> {teacher.Phone || '67896854789'}</span>
                    </div>
                  </div>

                  {teacher.message && (
                    <div className="mt-auto relative bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/80 rounded-xl p-4 pt-5 mt-4 group-hover:bg-slate-100/50 dark:group-hover:bg-slate-800/30 transition-colors">
                      <div className="absolute -top-3 left-4 w-6 h-6 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-orange-500 flex items-center justify-center shadow-lg">
                        <Quote size={12} className="fill-current" />
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 italic leading-relaxed">
                        "{teacher.message}"
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

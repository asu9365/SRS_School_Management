import React, { useState } from 'react';
import { Clock, Calendar, Check, X, ShieldAlert, BookOpen, GraduationCap } from 'lucide-react';
import Toast from '../components/Toast';
import { bookAppointment } from '../lib/api';

export default function OfficeHours() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ SName: '', Class: '', GName: '', number: '' });
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.SName || !formData.Class || !formData.GName || !formData.number) {
      setToastType('error');
      setToastMessage('Please fill all fields.');
      return;
    }

    setLoading(true);
    try {
      const data = await bookAppointment(formData);

      if (data.success) {
        setToastType('success');
        setToastMessage('Appointment booked successfully!');
        setFormData({ SName: '', Class: '', GName: '', number: '' });
        setIsModalOpen(false);
      } else {
        setToastType('error');
        setToastMessage(data.message || 'Booking failed. Please try again.');
      }
    } catch (err) {
      setToastType('error');
      setToastMessage('Error connecting to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen relative overflow-hidden transition-colors duration-300">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rose-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      <section className="pt-10 pb-16 relative z-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
            <div className="w-20 h-20 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(249,115,22,0.15)]">
              <Clock size={40} />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 mb-6 tracking-tight">
              School & Office Hours
            </h1>
            <div className="w-20 h-1.5 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full mx-auto mb-6"></div>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Review St. Robert's School timing guides and schedule meetings with the administration. Academic session starts in April.
            </p>
          </div>

          {/* Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* School Hours Card */}
            <div className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-3xl p-8 hover:border-orange-500/50 dark:hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                  <GraduationCap size={28} />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">School Hours</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                    <Calendar size={18} className="text-orange-500" />
                    Monday to Friday
                  </h4>
                  <div className="space-y-3 pl-6 border-l-2 border-slate-200 dark:border-slate-800">
                    <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950/50 p-3 rounded-lg border border-slate-200 dark:border-slate-800/80">
                      <span className="text-slate-600 dark:text-slate-400 font-medium">Montessori</span>
                      <span className="text-slate-900 dark:text-white font-bold tracking-wide">8:50 AM – 11:30 AM</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950/50 p-3 rounded-lg border border-slate-200 dark:border-slate-800/80">
                      <span className="text-slate-600 dark:text-slate-400 font-medium">Nursery</span>
                      <span className="text-slate-900 dark:text-white font-bold tracking-wide">8:50 AM – 12:30 PM</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950/50 p-3 rounded-lg border border-slate-200 dark:border-slate-800/80">
                      <span className="text-slate-600 dark:text-slate-400 font-medium">Class I to X</span>
                      <span className="text-slate-900 dark:text-white font-bold tracking-wide">8:50 AM – 2:00 PM</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                    <Calendar size={18} className="text-orange-500" />
                    Saturday
                  </h4>
                  <div className="pl-6 border-l-2 border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3 bg-rose-500/10 p-3 rounded-lg border border-rose-500/20 text-rose-500 dark:text-rose-400">
                      <X size={18} />
                      <span className="font-semibold">Every 3rd Saturday: School Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Hours Card */}
            <div className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-3xl p-8 hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                  <Clock size={28} />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Office Work Hours</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                    <Calendar size={18} className="text-blue-500" />
                    Daily Timings
                  </h4>
                  <div className="pl-6 border-l-2 border-slate-200 dark:border-slate-800">
                    <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800/80">
                      <span className="text-slate-600 dark:text-slate-400 font-medium">Visiting Hours</span>
                      <span className="text-slate-900 dark:text-white font-bold tracking-wide text-lg">9:15 AM – 12:00 PM</span>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5 mt-8">
                  <h4 className="text-amber-600 dark:text-amber-500 font-bold mb-2 flex items-center gap-2">
                    <ShieldAlert size={20} />
                    Important Note
                  </h4>
                  <p className="text-amber-600/90 dark:text-amber-500/80 leading-relaxed text-sm">
                    No office work is conducted on holidays, Sundays, or during recess periods on working days. Please plan your visit accordingly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="inline-flex items-center justify-center gap-2 px-10 py-4 text-base font-bold text-white bg-gradient-to-r from-orange-500 to-rose-500 rounded-xl hover:shadow-xl hover:shadow-orange-500/25 hover:-translate-y-1 transition-all duration-300 uppercase tracking-widest group"
            >
              <Calendar size={20} className="group-hover:rotate-12 transition-transform" />
              Book an Appointment
            </button>
            <p className="text-slate-500 text-sm mt-4">Save time by scheduling your visit in advance.</p>
          </div>
        </div>

        {/* Appointment Booking Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 dark:bg-slate-950/80 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)}>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Calendar className="text-orange-500" size={24} />
                  Book Appointment
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-slate-900 bg-white hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:bg-slate-800 dark:hover:bg-slate-700 p-2 rounded-lg transition-colors border border-slate-200 dark:border-transparent">
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleFormSubmit} className="p-6 space-y-5">
                <div>
                  <label htmlFor="SName" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Student Name</label>
                  <input
                    type="text"
                    name="SName"
                    id="SName"
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                    placeholder="Enter Student Full Name"
                    value={formData.SName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="Class" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Class / Grade</label>
                  <input
                    type="number"
                    name="Class"
                    id="Class"
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                    placeholder="e.g., 5"
                    value={formData.Class}
                    onChange={handleInputChange}
                    required
                    min="1"
                    max="12"
                  />
                </div>

                <div>
                  <label htmlFor="GName" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Guardian Name</label>
                  <input
                    type="text"
                    name="GName"
                    id="GName"
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                    placeholder="Enter Guardian's Name"
                    value={formData.GName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="number" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="number"
                    id="number"
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                    placeholder="Enter 10-digit mobile number"
                    value={formData.number}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-xl text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 dark:text-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" disabled={loading} className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-orange-500 hover:bg-orange-400 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading ? 'Booking...' : 'Confirm Booking'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <Toast 
          message={toastMessage} 
          type={toastType} 
          onClose={() => setToastMessage('')} 
        />
      </section>
    </div>
  );
}

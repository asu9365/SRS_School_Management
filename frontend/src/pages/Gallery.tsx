import React, { useState } from 'react';
import { Camera, Layers, X, Maximize2 } from 'lucide-react';

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'campus', label: 'Campus' },
    { id: 'staff', label: 'Staff' },
    { id: 'faculties', label: 'Faculties' },
    { id: 'students', label: 'Students' },
    { id: 'church', label: 'Church' },
    { id: 'programs', label: 'Programs' }
  ];

  const galleryItems = [
    // CAMPUS
    { url: '/images/campus/20210315_121313-01.jpeg', title: 'Lush Green Campus', category: 'campus' },
    { url: '/images/campus/20210315_121919-01.jpeg', title: 'Main School Building', category: 'campus' },
    { url: '/images/campus/8Z2A35681.jpg', title: 'Vast Playground', category: 'campus' },
    { url: '/images/campus/IMG_20210520_051628-01.jpeg', title: 'Spacious Corridors', category: 'campus' },
    
    // STAFF
    { url: '/images/Teachers/DSC04519.JPG', title: 'Staff Group Photo', category: 'staff' },
    { url: '/images/Teachers/DSC_9067.JPG', title: 'Teachers Conference', category: 'staff' },
    { url: '/images/Teachers/DSC_9077.JPG', title: 'Staff Discussion Room', category: 'staff' },
    { url: '/images/Teachers/DSC_9082.JPG', title: 'Teachers Award Ceremony', category: 'staff' },

    // FACULTIES
    { url: '/images/image/flower2.jpg', title: 'Science Block Gardens', category: 'faculties' },
    { url: '/images/image/night.jpg', title: 'Hostel at Dusk', category: 'faculties' },
    { url: '/images/image/marble1.jpg', title: 'Corridor Marble Art', category: 'faculties' },
    { url: '/images/image/washington.png', title: 'Department Entrance', category: 'faculties' },

    // STUDENTS
    { url: '/images/image/teachers/DSC_8933.JPG', title: 'Students Cultural Program', category: 'students' },
    { url: '/images/image/teachers/DSC_8940.JPG', title: 'Classroom Interactions', category: 'students' },
    { url: '/images/image/teachers/DSC_8951.JPG', title: 'School Assembly', category: 'students' },
    { url: '/images/image/teachers/DSC_9005.JPG', title: 'Students Skill Workshop', category: 'students' },

    // CHURCH
    { url: '/images/hostel/IMG20211212103519.jpg', title: 'Chapel Outer View', category: 'church' },
    { url: '/images/hostel/IMG20211212104117.jpg', title: 'Chapel Prayer Hall', category: 'church' },
    { url: '/images/hostel/IMG20211212104829.jpg', title: 'Chapel Altar Detail', category: 'church' },
    { url: '/images/hostel/IMG20221216193411.jpg', title: 'Christmas Mass Celebration', category: 'church' },

    // PROGRAMS
    { url: '/images/Programs/10Aug029.jpg', title: 'Independence Day Program', category: 'programs' },
    { url: '/images/Programs/20170909_114809.jpg', title: 'Annual Cultural Feast', category: 'programs' },
    { url: '/images/Programs/IMG_2958.JPG', title: 'Science Exhibition Labs', category: 'programs' },
    { url: '/images/Programs/Hou (10).jpg', title: 'Inter-House Sports Meet', category: 'programs' }
  ];

  const filteredItems = activeTab === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeTab);

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen relative overflow-hidden transition-colors duration-300">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <section className="pt-10 pb-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
            <div className="w-20 h-20 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(249,115,22,0.15)]">
              <Camera size={40} />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 mb-6 tracking-tight">
              Campus Gallery
            </h1>
            <div className="w-20 h-1.5 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full mx-auto mb-6"></div>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Take a visual tour through St. Robert's School — our campus, cultural programs, classrooms, and community spaces.
            </p>
          </div>

          {/* Tab Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-16 px-4">
            {categories.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 border ${
                  activeTab === tab.id 
                    ? 'bg-orange-500 border-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.4)]' 
                    : 'bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
            {filteredItems.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden cursor-pointer group hover:shadow-2xl hover:shadow-orange-500/10 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-500" 
                onClick={() => setSelectedImage(item)}
              >
                <div className="relative h-64 w-full overflow-hidden bg-slate-100 dark:bg-slate-950 flex items-center justify-center">
                  {/* Fallback pattern for missing images */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-slate-400 dark:text-slate-600 p-6 text-center">
                    <Layers size={32} className="opacity-50" />
                    <span className="text-sm opacity-50">{item.title}</span>
                  </div>
                  
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="w-full h-full object-cover relative z-10 transition-transform duration-700 group-hover:scale-110" 
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-orange-500/90 text-white flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                      <Maximize2 size={20} />
                    </div>
                  </div>
                </div>
                
                <div className="p-5 border-t border-slate-200 dark:border-slate-800/50 bg-white/90 dark:bg-slate-900/80">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1 truncate">{item.title}</h4>
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-500">{item.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md animate-fade-in" onClick={() => setSelectedImage(null)}>
            <button className="absolute top-6 right-6 p-3 text-slate-500 hover:text-slate-900 bg-white hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:bg-slate-900 dark:hover:bg-slate-800 rounded-full transition-colors z-10 shadow-lg" onClick={() => setSelectedImage(null)}>
              <X size={24} />
            </button>
            
            <div className="relative max-w-5xl w-full max-h-full flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] transform scale-100 transition-transform" onClick={(e) => e.stopPropagation()}>
              <div className="flex-1 overflow-hidden min-h-[50vh] bg-slate-100 dark:bg-black flex items-center justify-center relative">
                <img 
                  src={selectedImage.url} 
                  alt={selectedImage.title} 
                  className="max-w-full max-h-[75vh] object-contain relative z-10"
                  onError={(e) => {
                    e.currentTarget.src = 'https://placehold.co/800x600/0f172a/f97316?text=Image+Not+Found';
                  }}
                />
              </div>
              <div className="p-6 md:p-8 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{selectedImage.title}</h3>
                <span className="inline-block px-3 py-1 bg-orange-500/10 text-orange-500 border border-orange-500/20 rounded-lg text-sm font-bold uppercase tracking-wider">
                  {selectedImage.category}
                </span>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

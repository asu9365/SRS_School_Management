import React, { useState } from 'react';
import { Camera, Layers, X, Maximize2 } from 'lucide-react';

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

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
    <section className="section-padding" style={styles.section}>
      <div className="container">
        <div style={styles.header}>
          <Camera size={36} style={{ color: 'var(--primary)', marginBottom: '12px' }} />
          <h1 style={styles.title}>Campus Gallery</h1>
          <div style={styles.divider}></div>
          <p style={styles.desc}>Take a visual tour through St. Robert's School — our campus, cultural programs, classrooms, and community spaces.</p>
        </div>

        {/* Tab Filters */}
        <div style={styles.tabsContainer}>
          {categories.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                ...styles.tabBtn,
                backgroundColor: activeTab === tab.id ? 'var(--primary)' : 'var(--bg-surface)',
                color: activeTab === tab.id ? 'white' : 'var(--text-secondary)',
                borderColor: activeTab === tab.id ? 'var(--primary)' : 'var(--border)'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid-3" style={styles.grid}>
          {filteredItems.map((item, idx) => (
            <div 
              key={idx} 
              className="glass-card" 
              style={styles.card} 
              onClick={() => setSelectedImage(item)}
            >
              <div style={styles.imgContainer}>
                {/* Fallback pattern for missing images */}
                <div style={styles.imgPlaceholder}>
                  <Layers size={32} style={{ opacity: 0.3 }} />
                  <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{item.title}</span>
                </div>
                <img 
                  src={item.url} 
                  alt={item.title} 
                  style={styles.img} 
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div style={styles.overlay}>
                  <Maximize2 size={20} color="white" />
                </div>
              </div>
              <div style={styles.cardFooter}>
                <h4 style={styles.cardTitle}>{item.title}</h4>
                <span style={styles.cardCategory}>{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div style={styles.lightbox} onClick={() => setSelectedImage(null)}>
          <button style={styles.closeBtn} onClick={() => setSelectedImage(null)}>
            <X size={32} />
          </button>
          <div style={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedImage.url} 
              alt={selectedImage.title} 
              style={styles.lightboxImg}
              onError={(e) => {
                e.target.src = 'https://placehold.co/800x600?text=Image+Not+Found';
              }}
            />
            <div style={styles.lightboxCaption}>
              <h3>{selectedImage.title}</h3>
              <p style={{ textTransform: 'capitalize' }}>Category: {selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

const styles = {
  section: {
    background: 'var(--bg-app)',
    minHeight: 'calc(100vh - 70px)',
    transition: 'background-color var(--transition-normal)'
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: 'var(--text-primary)'
  },
  divider: {
    width: '60px',
    height: '4px',
    background: 'var(--primary)',
    borderRadius: '2px',
    margin: '12px 0 16px'
  },
  desc: {
    fontSize: '1.05rem',
    color: 'var(--text-secondary)',
    maxWidth: '600px'
  },
  tabsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '40px'
  },
  tabBtn: {
    border: '1px solid',
    padding: '8px 20px',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)'
  },
  grid: {
    marginTop: '20px'
  },
  card: {
    cursor: 'pointer',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    border: '1px solid var(--border)'
  },
  imgContainer: {
    position: 'relative',
    height: '220px',
    width: '100%',
    overflow: 'hidden',
    background: 'var(--border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imgPlaceholder: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    color: 'var(--text-secondary)',
    textAlign: 'center',
    padding: '20px'
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 1,
    transition: 'transform var(--transition-normal)'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(var(--hue), 85%, 57%, 0.4)',
    opacity: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    transition: 'opacity var(--transition-normal)'
  },
  cardFooter: {
    padding: '20px',
    background: 'var(--bg-surface)'
  },
  cardTitle: {
    fontSize: '1.05rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    marginBottom: '4px'
  },
  cardCategory: {
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    color: 'var(--primary)',
    fontWeight: '700',
    letterSpacing: '0.05em'
  },
  // Lightbox
  lightbox: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(15, 23, 42, 0.9)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
    padding: '40px'
  },
  closeBtn: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'transparent',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    padding: '10px'
  },
  lightboxContent: {
    maxWidth: '90%',
    maxHeight: '80%',
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--bg-surface)',
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden',
    boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
    border: '1px solid var(--border)'
  },
  lightboxImg: {
    maxWidth: '100%',
    maxHeight: '65vh',
    objectFit: 'contain'
  },
  lightboxCaption: {
    padding: '20px 30px',
    background: 'var(--bg-surface)',
    color: 'var(--text-primary)'
  }
};

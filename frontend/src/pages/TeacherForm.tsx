import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Check, FileText } from 'lucide-react';
import Toast from '../components/Toast';
import ManagementLayout from '../components/ManagementLayout';
import { createTeacher } from '../lib/api';

export default function TeacherForm({ auth }: { auth: any }) {
  const [formData, setFormData] = useState({
    Fname: '', Mname: '', Lname: '',
    caste: '', DOB: '', Phone: '', blood: '', gender: '', email: '',
    Ftname: '', Fcontact: '',
    Mtname: '', Mcontact: '',
    address: '', POaddress: '', pin: '', Dist: '', State: '',
    qualification: '', experience: '', classAssign: ''
  });

  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState<any>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!auth) navigate('/login');
  }, [auth, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await createTeacher(formData);

      if (data.success) {
        setToastType('success');
        setToastMessage('Teacher registered successfully!');
        setReceipt(data.data);
      } else {
        setToastType('error');
        setToastMessage(data.message || 'Registration failed.');
      }
    } catch (err) {
      setToastType('error');
      setToastMessage('Network error occurred.');
    } finally {
      setLoading(false);
    }
  };

  if (!auth) return null;

  if (receipt) {
    return (
      <ManagementLayout auth={auth} title="Teacher Registration">
        <div className="flex justify-center items-center w-full min-h-[70vh]">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-8 shadow-sm flex flex-col gap-6">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-2">
                <Check size={32} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Registration Successful!</h2>
              <p className="text-slate-500">Teacher profile created with ID: <strong className="text-slate-800">#{receipt.id}</strong></p>
            </div>
            
            <div className="border-y border-slate-200 py-6">
              <h4 className="text-base font-bold text-slate-800 mb-4">Registered Details</h4>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between text-sm border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Teacher Name:</span> 
                  <strong className="text-slate-800">{`${receipt.Fname} ${receipt.Mname || ''} ${receipt.Lname}`}</strong>
                </div>
                <div className="flex justify-between text-sm border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Contact Phone:</span> 
                  <strong className="text-slate-800">{receipt.Phone}</strong>
                </div>
                {receipt.email && (
                  <div className="flex justify-between text-sm border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Email:</span> 
                    <strong className="text-slate-800">{receipt.email}</strong>
                  </div>
                )}
                <div className="flex justify-between text-sm border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Class Assigned:</span> 
                  <strong className="text-slate-800">Class {receipt.classAssign || 'N/A'}</strong>
                </div>
                <div className="flex justify-between text-sm border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Qualification:</span> 
                  <strong className="text-slate-800">{receipt.qualification || 'N/A'}</strong>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Experience:</span> 
                  <strong className="text-slate-800">{receipt.experience || 'N/A'}</strong>
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-4 mt-2">
              <button onClick={() => {
                setReceipt(null);
                setFormData({
                  Fname: '', Mname: '', Lname: '', caste: '', DOB: '', Phone: '', blood: '', gender: '', email: '',
                  Ftname: '', Fcontact: '', Mtname: '', Mcontact: '',
                  address: '', POaddress: '', pin: '', Dist: '', State: '',
                  qualification: '', experience: '', classAssign: ''
                });
              }} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors text-sm">
                Register Another
              </button>
              <Link to="/dashboard?tab=teachers" className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors text-sm">
                View Directory
              </Link>
            </div>
          </div>
        </div>
      </ManagementLayout>
    );
  }

  return (
    <ManagementLayout auth={auth} title="New Teacher Registration">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Form Side */}
        <div className="flex-1 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm w-full">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-4 mb-6">
            <div className="p-2 bg-orange-50 text-orange-500 rounded-lg">
              <UserPlus size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Registration Form</h2>
          </div>
          
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
            
            {/* Personal Details */}
            <div>
              <h3 className="text-sm font-bold text-orange-500 uppercase tracking-wider mb-4">Personal Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase">First Name *</label>
                  <input type="text" name="Fname" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" value={formData.Fname} onChange={handleInputChange} required />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase">Middle Name</label>
                  <input type="text" name="Mname" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" value={formData.Mname} onChange={handleInputChange} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase">Last Name *</label>
                  <input type="text" name="Lname" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" value={formData.Lname} onChange={handleInputChange} required />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase">Phone Number *</label>
                  <input type="tel" name="Phone" placeholder="Enter Contact Number" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" value={formData.Phone} onChange={handleInputChange} required />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase">Email</label>
                  <input type="email" name="email" placeholder="teacher@example.com" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" value={formData.email} onChange={handleInputChange} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase">Gender *</label>
                  <select name="gender" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm bg-white" value={formData.gender} onChange={handleInputChange} required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase">Date of Birth *</label>
                  <input type="date" name="DOB" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" value={formData.DOB} onChange={handleInputChange} required />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase">Blood Group *</label>
                  <input type="text" name="blood" placeholder="e.g. A+" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" value={formData.blood} onChange={handleInputChange} required />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase">Caste</label>
                  <input type="text" name="caste" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" value={formData.caste} onChange={handleInputChange} />
                </div>
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* Parent Info */}
            <div>
              <h3 className="text-sm font-bold text-orange-500 uppercase tracking-wider mb-4">Parents Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase">Father's Name</label>
                  <input type="text" name="Ftname" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" value={formData.Ftname} onChange={handleInputChange} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase">Father's Contact</label>
                  <input type="tel" name="Fcontact" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" value={formData.Fcontact} onChange={handleInputChange} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase">Mother's Name</label>
                  <input type="text" name="Mtname" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" value={formData.Mtname} onChange={handleInputChange} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase">Mother's Contact</label>
                  <input type="tel" name="Mcontact" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" value={formData.Mcontact} onChange={handleInputChange} />
                </div>
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* Address Details */}
            <div>
              <h3 className="text-sm font-bold text-orange-500 uppercase tracking-wider mb-4">Address Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase">Village / Town</label>
                  <input type="text" name="address" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" value={formData.address} onChange={handleInputChange} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase">P.O. (Post Office)</label>
                  <input type="text" name="POaddress" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" value={formData.POaddress} onChange={handleInputChange} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase">Pin Code</label>
                  <input type="number" name="pin" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" value={formData.pin} onChange={handleInputChange} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase">District</label>
                  <input type="text" name="Dist" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" value={formData.Dist} onChange={handleInputChange} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase">State</label>
                  <input type="text" name="State" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" value={formData.State} onChange={handleInputChange} />
                </div>
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* Qualifications */}
            <div>
              <h3 className="text-sm font-bold text-orange-500 uppercase tracking-wider mb-4">Qualification & Experience</h3>
              <div className="flex flex-col gap-4 mb-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase">Qualification Details</label>
                  <textarea name="qualification" rows={3} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm resize-none" placeholder="e.g. B.Ed, M.Sc in Mathematics" value={formData.qualification} onChange={handleInputChange}></textarea>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase">Experience Details</label>
                  <textarea name="experience" rows={3} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm resize-none" placeholder="e.g. 5 Years teaching at High School level" value={formData.experience} onChange={handleInputChange}></textarea>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 md:w-1/3">
                <label className="text-xs font-semibold text-slate-600 uppercase">Class Assigned (Grade Number)</label>
                <input type="number" name="classAssign" placeholder="e.g. 5" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" value={formData.classAssign} onChange={handleInputChange} min="1" max="12" />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button type="submit" disabled={loading} className="px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
                {loading ? 'Processing...' : 'Submit Registration'}
              </button>
            </div>
          </form>
        </div>

        {/* Live Preview Side */}
        <div className="w-full lg:w-80 lg:sticky lg:top-8 flex-shrink-0">
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col items-center text-center">
            <div className="w-full flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold text-sm">
              <FileText size={16} />
              Live Profile Preview
            </div>
            
            <div className="p-6 w-full flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-slate-800 text-white text-3xl font-bold flex items-center justify-center mb-4 shadow-lg shadow-slate-200">
                {formData.Fname ? formData.Fname.substring(0,1) + (formData.Lname ? formData.Lname.substring(0,1) : '') : 'T'}
              </div>
              
              <h3 className="text-xl font-bold text-slate-800 leading-tight">
                {`${formData.Fname || '---'} ${formData.Mname || ''} ${formData.Lname || '---'}`}
              </h3>
              <p className="text-xs font-bold text-orange-500 uppercase tracking-wider mt-1">Assistant Teacher</p>
              
              <div className="h-px bg-slate-200 my-5 w-full"></div>

              <div className="space-y-3 text-sm text-slate-600 w-full text-left">
                <div><strong className="text-slate-800">Class Assigned:</strong> Class {formData.classAssign || 'N/A'}</div>
                <div><strong className="text-slate-800">Phone:</strong> {formData.Phone || '---'}</div>
                {formData.email && <div><strong className="text-slate-800">Email:</strong> <span className="break-all">{formData.email}</span></div>}
                <div><strong className="text-slate-800">Gender:</strong> {formData.gender || '---'}</div>
                <div><strong className="text-slate-800">Blood Group:</strong> {formData.blood || '---'}</div>
                <div><strong className="text-slate-800">Qualifications:</strong> {formData.qualification || '---'}</div>
              </div>
            </div>
          </div>
        </div>
        
      </div>

      <Toast 
        message={toastMessage} 
        type={toastType} 
        onClose={() => setToastMessage('')} 
      />
    </ManagementLayout>
  );
}

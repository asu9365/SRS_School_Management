import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, ArrowLeft, Check, FileText } from 'lucide-react';
import Toast from '../components/Toast';
import ManagementLayout from '../components/ManagementLayout';
import { createStudent } from '../lib/api';

export default function StudentForm({ auth }: { auth: any }) {
  const [formData, setFormData] = useState({
    Fname: '', Mname: '', Lname: '',
    class: '', rollno: '', caste: '', DOB: '', blood: '', gender: '', email: '',
    Ftname: '', Fcontact: '', Foccupation: '',
    Mtname: '', Mcontact: '', Moccupation: '',
    Gurdian: '', Gcontact: '',
    address: '', POaddress: '', pin: '', Dist: '', State: ''
  });

  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState<any>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!auth) navigate('/login');
  }, [auth, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await createStudent(formData);

      if (data.success) {
        setToastType('success');
        setToastMessage('Student registered successfully!');
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
      <ManagementLayout auth={auth} title="Student Registration">
        <div className="flex justify-center items-center w-full min-h-[70vh]">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-8 shadow-sm flex flex-col gap-6">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-2">
                <Check size={32} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Registration Successful!</h2>
              <p className="text-slate-500">Student record created with ID: <strong className="text-slate-800">#{receipt.student_id}</strong></p>
            </div>
            
            <div className="border-y border-slate-200 py-6">
              <h4 className="text-base font-bold text-slate-800 mb-4">Registered Details</h4>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between text-sm border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Student Name:</span> 
                  <strong className="text-slate-800">{`${receipt.Fname} ${receipt.Mname || ''} ${receipt.Lname}`}</strong>
                </div>
                <div className="flex justify-between text-sm border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Class:</span> 
                  <strong className="text-slate-800">{receipt.class}</strong>
                </div>
                <div className="flex justify-between text-sm border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Roll Number:</span> 
                  <strong className="text-slate-800">{receipt.rollno}</strong>
                </div>
                <div className="flex justify-between text-sm border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Blood Group:</span> 
                  <strong className="text-slate-800">{receipt.blood}</strong>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Contact Info:</span> 
                  <strong className="text-slate-800">{receipt.Fcontact || receipt.Mcontact || 'N/A'}</strong>
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-4 mt-2">
              <button onClick={() => {
                setReceipt(null);
                setFormData({
                  Fname: '', Mname: '', Lname: '', class: '', rollno: '', caste: '', DOB: '', blood: '', gender: '', email: '',
                  Ftname: '', Fcontact: '', Foccupation: '', Mtname: '', Mcontact: '', Moccupation: '',
                  Gurdian: '', Gcontact: '', address: '', POaddress: '', pin: '', Dist: '', State: ''
                });
              }} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors text-sm">
                Register Another
              </button>
              <Link to="/dashboard?tab=students" className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors text-sm">
                View Directory
              </Link>
            </div>
          </div>
        </div>
      </ManagementLayout>
    );
  }

  return (
    <ManagementLayout auth={auth} title="New Student Registration">
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
                  <label className="text-xs font-semibold text-slate-600 uppercase">Gender *</label>
                  <select name="gender" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm bg-white" value={formData.gender} onChange={handleInputChange} required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase">Date of Birth *</label>
                  <input type="date" name="DOB" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" value={formData.DOB} onChange={handleInputChange} required />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase">Blood Group *</label>
                  <input type="text" name="blood" placeholder="e.g. O+" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" value={formData.blood} onChange={handleInputChange} required />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase">Class *</label>
                  <input type="text" name="class" placeholder="e.g. 5" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" value={formData.class} onChange={handleInputChange} required />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase">Roll No *</label>
                  <input type="number" name="rollno" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" value={formData.rollno} onChange={handleInputChange} required min="1" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase">Email</label>
                  <input type="email" name="email" placeholder="student@example.com" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" value={formData.email} onChange={handleInputChange} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase">Caste</label>
                  <input type="text" name="caste" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" value={formData.caste} onChange={handleInputChange} />
                </div>
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* Parents Section */}
            <div>
              <h3 className="text-sm font-bold text-orange-500 uppercase tracking-wider mb-4">Parents / Guardian Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase">Father's Name</label>
                  <input type="text" name="Ftname" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" value={formData.Ftname} onChange={handleInputChange} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase">Father's Contact</label>
                  <input type="tel" name="Fcontact" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" value={formData.Fcontact} onChange={handleInputChange} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase">Father's Occupation</label>
                  <input type="text" name="Foccupation" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" value={formData.Foccupation} onChange={handleInputChange} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase">Mother's Name</label>
                  <input type="text" name="Mtname" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" value={formData.Mtname} onChange={handleInputChange} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase">Mother's Contact</label>
                  <input type="tel" name="Mcontact" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" value={formData.Mcontact} onChange={handleInputChange} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase">Mother's Occupation</label>
                  <input type="text" name="Moccupation" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" value={formData.Moccupation} onChange={handleInputChange} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase">Guardian Name</label>
                  <input type="text" name="Gurdian" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" value={formData.Gurdian} onChange={handleInputChange} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase">Guardian Contact</label>
                  <input type="tel" name="Gcontact" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" value={formData.Gcontact} onChange={handleInputChange} />
                </div>
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* Address Details */}
            <div>
              <h3 className="text-sm font-bold text-orange-500 uppercase tracking-wider mb-4">Address Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase">Village / Town *</label>
                  <input type="text" name="address" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" value={formData.address} onChange={handleInputChange} required />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase">P.O. (Post Office)</label>
                  <input type="text" name="POaddress" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" value={formData.POaddress} onChange={handleInputChange} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase">Pin Code *</label>
                  <input type="number" name="pin" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" value={formData.pin} onChange={handleInputChange} required />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase">District *</label>
                  <input type="text" name="Dist" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" value={formData.Dist} onChange={handleInputChange} required />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase">State *</label>
                  <input type="text" name="State" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" value={formData.State} onChange={handleInputChange} required />
                </div>
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
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold text-sm">
              <FileText size={16} />
              Live Registration Card
            </div>
            
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="font-bold text-lg text-slate-800 leading-tight">St. Robert's High School</div>
                <div className="text-xs font-bold text-orange-500 uppercase tracking-widest mt-1">Registry Card</div>
              </div>
              
              <div className="space-y-3 text-sm text-slate-600">
                <div><strong className="text-slate-800">Name:</strong> {`${formData.Fname || '---'} ${formData.Mname || ''} ${formData.Lname || '---'}`}</div>
                <div><strong className="text-slate-800">Gender:</strong> {formData.gender || '---'}</div>
                <div><strong className="text-slate-800">Class:</strong> {formData.class || '---'}</div>
                <div><strong className="text-slate-800">Roll Number:</strong> {formData.rollno || '---'}</div>
                <div><strong className="text-slate-800">Blood Group:</strong> {formData.blood || '---'}</div>
                <div><strong className="text-slate-800">DOB:</strong> {formData.DOB || '---'}</div>
                {formData.email && <div><strong className="text-slate-800">Email:</strong> {formData.email}</div>}
              </div>

              <div className="h-px bg-slate-200 my-4"></div>

              <div className="space-y-3 text-sm text-slate-600">
                <div className="text-xs font-bold text-orange-500 uppercase">Emergency Contact</div>
                <div><strong className="text-slate-800">Parent:</strong> {formData.Ftname || formData.Mtname || 'N/A'}</div>
                <div><strong className="text-slate-800">Phone:</strong> {formData.Fcontact || formData.Mcontact || 'N/A'}</div>
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

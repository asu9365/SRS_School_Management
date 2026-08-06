import React, { useState, useEffect } from 'react';
import api from '../lib/api';
import { useAuthStore } from '../lib/authStore';
import { 
  Building2, Users, CreditCard, Activity, 
  Plus, Edit, Trash2, CheckCircle, XCircle 
} from 'lucide-react';

interface School {
  id: number;
  name: string;
  subdomain: string;
  contact_email: string;
  subscription_plan: string;
  status: string;
  created_at: string;
}

export default function SuperAdminDashboard() {
  const { user } = useAuthStore();
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSchool, setNewSchool] = useState({
    name: '',
    subdomain: '',
    contact_email: '',
    subscription_plan: 'Basic',
    status: 'active'
  });
  const [createdAdmin, setCreatedAdmin] = useState<{email: string, password: string} | null>(null);

  const fetchSchools = async () => {
    try {
      const response = await api.get('/schools');
      if (response.data.success) {
        setSchools(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching schools", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  const handleCreateSchool = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/schools', newSchool);
      if (response.data.success) {
        setSchools([...schools, response.data.data]);
        setCreatedAdmin(response.data.admin_credentials);
      }
    } catch (error) {
      console.error("Error creating school", error);
      alert("Failed to create school.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCreatedAdmin(null);
    setNewSchool({ name: '', subdomain: '', contact_email: '', subscription_plan: 'Basic', status: 'active' });
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const activeSchools = schools.filter(s => s.status === 'active').length;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Super Admin Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage all multi-tenant schools in the SchoolOS ecosystem.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none"
        >
          <Plus size={20} />
          Register New School
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4">
          <div className="p-4 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl text-indigo-600 dark:text-indigo-400">
            <Building2 size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Schools</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{schools.length}</h3>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4">
          <div className="p-4 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl text-emerald-600 dark:text-emerald-400">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Schools</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{activeSchools}</h3>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4">
          <div className="p-4 bg-amber-100 dark:bg-amber-900/50 rounded-xl text-amber-600 dark:text-amber-400">
            <CreditCard size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Subscriptions</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{schools.length}</h3>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4">
          <div className="p-4 bg-blue-100 dark:bg-blue-900/50 rounded-xl text-blue-600 dark:text-blue-400">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">System Admins</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">1</h3>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Registered Schools</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-sm">
                <th className="px-6 py-4 font-medium">ID</th>
                <th className="px-6 py-4 font-medium">School Name</th>
                <th className="px-6 py-4 font-medium">Subdomain</th>
                <th className="px-6 py-4 font-medium">Plan</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Registered</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {schools.map(school => (
                <tr key={school.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">#{school.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900 dark:text-white">{school.name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{school.contact_email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                    <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs font-mono">
                      {school.subdomain}.schoolos.com
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full font-medium">
                      {school.subscription_plan}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {school.status === 'active' ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-1 rounded-full">
                        <CheckCircle size={12} /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30 px-2.5 py-1 rounded-full">
                        <XCircle size={12} /> Suspended
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                    {new Date(school.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-2">
                      <Edit size={18} />
                    </button>
                    <button className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors p-2 ml-1">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {schools.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                    No schools registered yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Registration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {createdAdmin ? 'School Registered Successfully' : 'Register New School'}
              </h2>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                <XCircle size={24} />
              </button>
            </div>
            
            <div className="p-6">
              {createdAdmin ? (
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} />
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mb-6">
                    The school has been provisioned and the default Admin account has been created. Please securely share these credentials with the school's principal.
                  </p>
                  
                  <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl text-left border border-slate-200 dark:border-slate-700 mb-6">
                    <div className="mb-3">
                      <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Admin Login URL</p>
                      <p className="font-mono text-sm text-slate-800 dark:text-slate-200">
                        {newSchool.subdomain ? `http://${newSchool.subdomain}.schoolos.com/login` : 'http://schoolos.com/login'}
                      </p>
                    </div>
                    <div className="mb-3">
                      <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Admin Email</p>
                      <p className="font-mono text-sm text-slate-800 dark:text-slate-200">{createdAdmin.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Temporary Password</p>
                      <p className="font-mono text-sm text-emerald-600 dark:text-emerald-400 font-bold">{createdAdmin.password}</p>
                    </div>
                  </div>

                  <button 
                    onClick={closeModal}
                    className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 rounded-lg font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCreateSchool} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">School Name</label>
                    <input 
                      type="text" 
                      required
                      value={newSchool.name}
                      onChange={e => setNewSchool({...newSchool, name: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g. St. Robert's High School"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Subdomain</label>
                    <div className="flex">
                      <input 
                        type="text" 
                        required
                        value={newSchool.subdomain}
                        onChange={e => setNewSchool({...newSchool, subdomain: e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '')})}
                        className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-l-lg px-4 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="srhs"
                      />
                      <span className="bg-slate-100 dark:bg-slate-800 border border-l-0 border-slate-200 dark:border-slate-700 rounded-r-lg px-4 py-2 text-slate-500">
                        .schoolos.com
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Contact Email</label>
                    <input 
                      type="email" 
                      required
                      value={newSchool.contact_email}
                      onChange={e => setNewSchool({...newSchool, contact_email: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="principal@srhs.com"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Plan</label>
                      <select 
                        value={newSchool.subscription_plan}
                        onChange={e => setNewSchool({...newSchool, subscription_plan: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="Basic">Basic</option>
                        <option value="Pro">Pro</option>
                        <option value="Enterprise">Enterprise</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
                      <select 
                        value={newSchool.status}
                        onChange={e => setNewSchool({...newSchool, status: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="active">Active</option>
                        <option value="suspended">Suspended</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button 
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors shadow-lg shadow-indigo-200 dark:shadow-none font-medium"
                    >
                      Provision School
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Save, Plus, Check, X, Trash2 } from 'lucide-react';
import api from '../lib/api';

interface ActionItem {
    id?: number;
    description: string;
    status: 'pending' | 'completed';
}

export default function MeetingNotesPanel({ appointmentId }: { appointmentId: string }) {
    const [notes, setNotes] = useState('');
    const [actionItems, setActionItems] = useState<ActionItem[]>([]);
    const [newItemText, setNewItemText] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        // Fetch existing notes and action items
        const fetchData = async () => {
            try {
                const response = await api.get(`/appointments/${appointmentId}`);
                if (response.data.success) {
                    setNotes(response.data.data.notes || '');
                    setActionItems(response.data.data.action_items || []);
                }
            } catch (error) {
                console.error("Error fetching appointment data", error);
            }
        };
        fetchData();
    }, [appointmentId]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await api.post(`/appointments/${appointmentId}/notes`, {
                notes,
                action_items: actionItems
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch (error) {
            console.error("Error saving notes", error);
        }
        setIsSaving(false);
    };

    const addActionItem = () => {
        if (!newItemText.trim()) return;
        setActionItems([...actionItems, { description: newItemText, status: 'pending' }]);
        setNewItemText('');
    };

    const toggleActionItemStatus = (index: number) => {
        const newItems = [...actionItems];
        newItems[index].status = newItems[index].status === 'pending' ? 'completed' : 'pending';
        setActionItems(newItems);
    };

    const removeActionItem = (index: number) => {
        const newItems = [...actionItems];
        newItems.splice(index, 1);
        setActionItems(newItems);
    };

    return (
        <div className="flex flex-col h-full bg-gray-900 border-l border-gray-800 text-gray-200">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-950">
                <h2 className="font-outfit font-semibold text-lg text-white">Meeting Notes</h2>
                <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-3 py-1.5 rounded text-sm transition disabled:opacity-50"
                >
                    {saved ? <Check size={16} /> : <Save size={16} />}
                    {saved ? 'Saved' : 'Save'}
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Private Notes</label>
                    <textarea 
                        className="w-full h-40 bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-orange-500 resize-none"
                        placeholder="Write meeting minutes here..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>
                
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Action Tracker</label>
                    
                    <div className="flex gap-2 mb-3">
                        <input 
                            type="text"
                            value={newItemText}
                            onChange={(e) => setNewItemText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addActionItem()}
                            placeholder="Add action item..."
                            className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-orange-500"
                        />
                        <button 
                            onClick={addActionItem}
                            className="bg-gray-700 hover:bg-gray-600 px-2 py-1.5 rounded transition text-white"
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                    
                    <ul className="space-y-2">
                        {actionItems.length === 0 ? (
                            <li className="text-gray-500 text-sm text-center py-4 border border-dashed border-gray-700 rounded">No action items yet.</li>
                        ) : actionItems.map((item, idx) => (
                            <li key={idx} className={`flex items-start gap-3 p-2 rounded border ${item.status === 'completed' ? 'bg-gray-800/50 border-gray-800' : 'bg-gray-800 border-gray-700'}`}>
                                <button 
                                    onClick={() => toggleActionItemStatus(idx)}
                                    className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded flex items-center justify-center border ${item.status === 'completed' ? 'bg-orange-500 border-orange-500 text-white' : 'border-gray-500'}`}
                                >
                                    {item.status === 'completed' && <Check size={12} />}
                                </button>
                                <span className={`flex-1 text-sm ${item.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-200'}`}>
                                    {item.description}
                                </span>
                                <button 
                                    onClick={() => removeActionItem(idx)}
                                    className="text-gray-500 hover:text-red-400 transition"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}


import React, { useState } from 'react';
import { Translation } from '../types';

interface PatientFormProps {
  t: Translation;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ t, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    generalInfo: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 animate-slideUp">
      <h2 className="text-xl font-bold mb-6 text-gray-800">{t.addPatient}</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t.name}</label>
          <input 
            required
            type="text" 
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.phone}</label>
            <input 
              required
              type="tel" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.age}</label>
            <input 
              type="number" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.age}
              onChange={(e) => setFormData({...formData, age: e.target.value})}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t.generalInfo}</label>
          <textarea 
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={formData.generalInfo}
            onChange={(e) => setFormData({...formData, generalInfo: e.target.value})}
          />
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <button 
          type="submit"
          className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 active:scale-95 transition-all"
        >
          {t.save}
        </button>
        <button 
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
        >
          {t.cancel}
        </button>
      </div>
    </form>
  );
};

export default PatientForm;

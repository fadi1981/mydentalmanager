
import React, { useState } from 'react';
import { Patient, Translation } from '../types';

interface PatientListProps {
  patients: Patient[];
  t: Translation;
  onSelect: (p: Patient) => void;
  onDelete: (id: string) => void;
}

const PatientList: React.FC<PatientListProps> = ({ patients, t, onSelect, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="relative">
        <input 
          type="text" 
          placeholder={t.search} 
          className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
          <p className="text-gray-500">{t.noPatients}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(patient => (
            <div 
              key={patient.id}
              className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex justify-between items-center group cursor-pointer"
              onClick={() => onSelect(patient)}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                  {patient.name[0].toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                  <p className="text-sm text-gray-500">{patient.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={(e) => { e.stopPropagation(); onDelete(patient.id); }}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors rounded-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
                <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientList;

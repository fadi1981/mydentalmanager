
import React from 'react';
import { ClinicData, Translation } from '../types';

interface DashboardProps {
  data: ClinicData;
  t: Translation;
  onAddPatient: () => void;
  onManagePatients: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ data, t, onAddPatient, onManagePatients }) => {
  const totalPatients = data.patients.length;
  const totalDue = data.patients.reduce((acc, p) => acc + p.treatments.reduce((sum, t) => sum + t.cost, 0), 0);
  const totalPaid = data.patients.reduce((acc, p) => acc + p.payments.reduce((sum, pay) => sum + pay.amount, 0), 0);
  const totalRemaining = totalDue - totalPaid;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Section */}
      <div className="text-center space-y-2 py-4">
        <div className="inline-block p-3 bg-blue-100 rounded-2xl mb-2">
           <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 01-.586 1.414l-5 5c-.391.391-.391 1.024 0 1.414s1.024.391 1.414 0l5-5A2 2 0 0115 11.172V5l-1-1H8L7 5v5.172a2 2 0 01-.586 1.414l-5 5c-.391.391-.391 1.024 0 1.414s1.024.391 1.414 0l5-5A2 2 0 017 11.172V5l1-1z"></path></svg>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900">{t.dashboard}</h2>
        <p className="text-gray-500 font-medium">Dental Clinic Management</p>
      </div>

      {/* Backup Reminder (Smart Alert) */}
      {totalPatients > 0 && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center gap-4 animate-pulse">
          <div className="bg-amber-100 p-2 rounded-full text-amber-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-amber-800 uppercase">{document.dir === 'rtl' ? 'تذكير أمان' : 'Security Reminder'}</p>
            <p className="text-sm text-amber-700">
              {document.dir === 'rtl' 
                ? 'لا تنسَ تصدير نسخة احتياطية لبياناتك من الإعدادات بانتظام.' 
                : 'Don\'t forget to export a backup of your data from settings regularly.'}
            </p>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
          <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-1">{t.patients}</p>
          <p className="text-4xl font-extrabold text-gray-900">{totalPatients}</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
          <p className="text-red-600 text-xs font-bold uppercase tracking-widest mb-1">{t.remaining}</p>
          <p className="text-3xl font-extrabold text-red-600">{totalRemaining} $</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4">
        <button 
          onClick={onAddPatient}
          className="bg-blue-600 text-white p-6 rounded-3xl shadow-lg shadow-blue-200 flex items-center justify-between group hover:bg-blue-700 transition-all active:scale-95"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="bg-white/20 p-3 rounded-2xl">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
            </div>
            <div>
              <p className="text-lg font-bold">{t.addPatient}</p>
              <p className="text-sm text-blue-100">Create a new medical file</p>
            </div>
          </div>
          <svg className={`w-6 h-6 text-blue-300 group-hover:text-white transition-all ${document.dir === 'rtl' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </button>

        <button 
          onClick={onManagePatients}
          className="bg-white text-gray-800 p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-all active:scale-95"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="bg-gray-100 p-3 rounded-2xl">
              <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </div>
            <div>
              <p className="text-lg font-bold">{t.patients}</p>
              <p className="text-sm text-gray-400">View and update patient records</p>
            </div>
          </div>
          <svg className={`w-6 h-6 text-gray-300 group-hover:text-blue-500 transition-all ${document.dir === 'rtl' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </button>
      </div>

      {/* Financial Summary Log */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 relative z-10">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          Financial Summary
        </h3>
        <div className="space-y-3 relative z-10">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 font-medium">{t.totalCost}</span>
            <span className="font-bold text-gray-900">{totalDue} $</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 font-medium">{t.totalPaid}</span>
            <span className="font-bold text-green-600">{totalPaid} $</span>
          </div>
          <div className="pt-3 border-t flex justify-between">
            <span className="text-gray-900 font-bold">{t.remaining}</span>
            <span className="font-extrabold text-red-500">{totalRemaining} $</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

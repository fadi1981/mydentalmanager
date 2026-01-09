
import React from 'react';
import { Translation, Language } from '../types';

interface SettingsProps {
  t: Translation;
  lang: Language;
  onLanguageToggle: () => void;
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Settings: React.FC<SettingsProps> = ({ t, lang, onLanguageToggle, onExport, onImport }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-bold text-gray-900 px-2">{t.settings}</h2>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Language Selection */}
        <div className="p-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 11.37 9.188 16.503 5 20"></path></svg>
            </div>
            <div>
              <p className="font-bold text-gray-800">Language / اللغة</p>
              <p className="text-xs text-gray-400 font-medium">{lang === 'ar' ? 'العربية' : 'English'}</p>
            </div>
          </div>
          <button 
            onClick={onLanguageToggle}
            className="bg-gray-100 px-4 py-2 rounded-xl text-sm font-bold text-blue-600 hover:bg-blue-50 transition-colors"
          >
            {t.languageSwitch}
          </button>
        </div>

        {/* Data Management */}
        <div className="p-4 space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Data & Backups</h3>
          
          <div className="space-y-3">
            <button 
              onClick={onExport}
              className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-2xl hover:bg-blue-50 group transition-all"
            >
              <div className="p-2 bg-white rounded-xl shadow-sm group-hover:text-blue-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-800">{t.exportData}</p>
                <p className="text-xs text-gray-400 font-medium">Download JSON file to your device</p>
              </div>
            </button>

            <label className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-2xl hover:bg-green-50 group transition-all cursor-pointer">
              <input type="file" accept=".json" onChange={onImport} className="hidden" />
              <div className="p-2 bg-white rounded-xl shadow-sm group-hover:text-green-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-800">{t.importData}</p>
                <p className="text-xs text-gray-400 font-medium">Restore data from a backup file</p>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="text-center p-8 opacity-40">
        <p className="text-xs font-bold">DentaCare v1.0.0</p>
        <p className="text-[10px] mt-1 uppercase tracking-tighter">Powered by LocalStorage API</p>
      </div>
    </div>
  );
};

export default Settings;

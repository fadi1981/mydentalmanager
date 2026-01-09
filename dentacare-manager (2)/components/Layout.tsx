
import React from 'react';
import { Translation, Language } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  t: Translation;
  lang: Language;
  currentView: string;
  onViewChange: (view: any) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, t, lang, currentView, onViewChange }) => {
  const isRtl = lang === 'ar';

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 7v5l3 3"></path></svg>
            {t.title}
          </h1>
          <button 
            onClick={() => onViewChange('settings')}
            className={`p-2 rounded-full hover:bg-blue-700 transition-colors ${currentView === 'settings' ? 'bg-blue-700' : ''}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-4xl w-full mx-auto px-4 py-6 mb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 fixed bottom-0 w-full z-10 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <div className="max-w-4xl mx-auto flex justify-around items-center">
          <NavItem 
            active={currentView === 'dashboard'} 
            onClick={() => onViewChange('dashboard')} 
            label={t.dashboard}
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>}
          />
          <NavItem 
            active={currentView === 'list' || currentView === 'details'} 
            onClick={() => onViewChange('list')} 
            label={t.patients}
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>}
          />
          <NavItem 
            active={currentView === 'add'} 
            onClick={() => onViewChange('add')} 
            label={t.addPatient}
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>}
          />
        </div>
      </nav>
    </div>
  );
};

interface NavItemProps {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ active, onClick, label, icon }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center py-2 px-4 transition-all ${active ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
  >
    {icon}
    <span className="text-xs mt-1 font-medium">{label}</span>
    {active && <span className="w-1 h-1 bg-blue-600 rounded-full mt-1"></span>}
  </button>
);

export default Layout;


import React, { useState, useEffect, useMemo } from 'react';
import { translations } from './translations';
import { Patient, Language, ClinicData, Treatment, Payment, PatientImage } from './types';
import Layout from './components/Layout';
import PatientList from './components/PatientList';
import PatientForm from './components/PatientForm';
import PatientDetails from './components/PatientDetails';
import Settings from './components/Settings';
import Dashboard from './components/Dashboard';

const STORAGE_KEY = 'dentacare_v1_data';

const App: React.FC = () => {
  const [data, setData] = useState<ClinicData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : { patients: [], settings: { language: 'ar' } };
  });

  const [view, setView] = useState<'dashboard' | 'list' | 'add' | 'details' | 'settings'>('dashboard');
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const lang = data.settings.language;
  const t = translations[lang];

  const handleLanguageToggle = () => {
    setData(prev => ({
      ...prev,
      settings: { ...prev.settings, language: prev.settings.language === 'ar' ? 'en' : 'ar' }
    }));
  };

  const addPatient = (newPatient: Omit<Patient, 'id' | 'treatments' | 'payments' | 'images' | 'createdAt'>) => {
    const patient: Patient = {
      ...newPatient,
      id: Date.now().toString(),
      treatments: [],
      payments: [],
      images: [],
      createdAt: new Date().toISOString()
    };
    setData(prev => ({ ...prev, patients: [patient, ...prev.patients] }));
    setView('list');
  };

  const updatePatient = (updatedPatient: Patient) => {
    setData(prev => ({
      ...prev,
      patients: prev.patients.map(p => p.id === updatedPatient.id ? updatedPatient : p)
    }));
  };

  const deletePatient = (id: string) => {
    if (window.confirm(t.confirmDelete)) {
      setData(prev => ({
        ...prev,
        patients: prev.patients.filter(p => p.id !== id)
      }));
      if (selectedPatientId === id) {
        setView('list');
        setSelectedPatientId(null);
      }
    }
  };

  const exportData = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dentacare_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string);
          if (imported.patients && imported.settings) {
            setData(imported);
            alert('Data imported successfully!');
          }
        } catch (err) {
          alert('Invalid file format');
        }
      };
      reader.readAsText(file);
    }
  };

  const selectedPatient = useMemo(() => 
    data.patients.find(p => p.id === selectedPatientId), 
    [data.patients, selectedPatientId]
  );

  return (
    <Layout 
      t={t} 
      lang={lang} 
      currentView={view} 
      onViewChange={setView}
    >
      {view === 'dashboard' && (
        <Dashboard data={data} t={t} onAddPatient={() => setView('add')} onManagePatients={() => setView('list')} />
      )}
      {view === 'list' && (
        <PatientList 
          patients={data.patients} 
          t={t} 
          onSelect={(p) => { setSelectedPatientId(p.id); setView('details'); }} 
          onDelete={deletePatient}
        />
      )}
      {view === 'add' && (
        <PatientForm t={t} onSubmit={addPatient} onCancel={() => setView('list')} />
      )}
      {view === 'details' && selectedPatient && (
        <PatientDetails 
          patient={selectedPatient} 
          t={t} 
          onUpdate={updatePatient}
          onBack={() => setView('list')} 
        />
      )}
      {view === 'settings' && (
        <Settings 
          t={t} 
          lang={lang}
          onLanguageToggle={handleLanguageToggle}
          onExport={exportData}
          onImport={importData}
        />
      )}
    </Layout>
  );
};

export default App;

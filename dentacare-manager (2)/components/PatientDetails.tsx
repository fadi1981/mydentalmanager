
import React, { useState } from 'react';
import { Patient, Translation, Treatment, Payment, PatientImage } from '../types';

interface PatientDetailsProps {
  patient: Patient;
  t: Translation;
  onUpdate: (p: Patient) => void;
  onBack: () => void;
}

const PatientDetails: React.FC<PatientDetailsProps> = ({ patient, t, onUpdate, onBack }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'work' | 'money' | 'images'>('info');
  const [showAddModal, setShowAddModal] = useState<'treatment' | 'payment' | 'image' | null>(null);

  const totalCost = patient.treatments.reduce((sum, item) => sum + item.cost, 0);
  const totalPaid = patient.payments.reduce((sum, item) => sum + item.amount, 0);
  const remaining = totalCost - totalPaid;

  const handleAddTreatment = (desc: string, cost: number) => {
    const newTreatment: Treatment = {
      id: Date.now().toString(),
      description: desc,
      cost,
      date: new Date().toISOString()
    };
    onUpdate({ ...patient, treatments: [newTreatment, ...patient.treatments] });
    setShowAddModal(null);
  };

  const handleAddPayment = (amount: number) => {
    const newPayment: Payment = {
      id: Date.now().toString(),
      amount,
      date: new Date().toISOString()
    };
    onUpdate({ ...patient, payments: [newPayment, ...patient.payments] });
    setShowAddModal(null);
  };

  const handleAddImage = (type: 'Panorama' | 'X-Ray', url: string) => {
    const newImg: PatientImage = {
      id: Date.now().toString(),
      url,
      type,
      date: new Date().toISOString()
    };
    onUpdate({ ...patient, images: [newImg, ...patient.images] });
    setShowAddModal(null);
  };

  const deleteItem = (id: string, type: 'treatment' | 'payment' | 'image') => {
    if (window.confirm(t.confirmDelete)) {
      if (type === 'treatment') {
        onUpdate({ ...patient, treatments: patient.treatments.filter(i => i.id !== id) });
      } else if (type === 'payment') {
        onUpdate({ ...patient, payments: patient.payments.filter(i => i.id !== id) });
      } else if (type === 'image') {
        onUpdate({ ...patient, images: patient.images.filter(i => i.id !== id) });
      }
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      <button onClick={onBack} className="flex items-center gap-2 text-blue-600 font-medium group">
        <svg className={`w-5 h-5 transition-transform ${document.dir === 'rtl' ? 'rotate-180 group-hover:translate-x-1' : 'group-hover:-translate-x-1'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        {t.patients}
      </button>

      {/* Header Profile */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 text-2xl font-bold">
            {patient.name[0].toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
            <p className="text-gray-500 font-medium">{patient.phone}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="bg-blue-50 px-4 py-2 rounded-xl text-center">
            <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">{t.remaining}</p>
            <p className={`text-lg font-bold ${remaining > 0 ? 'text-red-500' : 'text-green-600'}`}>{remaining} $</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 p-1 rounded-xl overflow-x-auto no-scrollbar">
        {[
          { id: 'info', label: t.details },
          { id: 'work', label: t.treatments },
          { id: 'money', label: t.payments },
          { id: 'images', label: t.imaging }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-2 px-4 text-sm font-semibold rounded-lg transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="min-h-[300px]">
        {activeTab === 'info' && (
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">{t.age}</p>
                <p className="text-lg font-medium text-gray-800">{patient.age || '-'}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">{t.date}</p>
                <p className="text-lg font-medium text-gray-800">{new Date(patient.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">{t.generalInfo}</p>
              <div className="bg-gray-50 p-4 rounded-xl text-gray-700 whitespace-pre-wrap min-h-[100px]">
                {patient.generalInfo || '-'}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'work' && (
          <div className="space-y-4">
            <button 
              onClick={() => setShowAddModal('treatment')}
              className="w-full bg-blue-50 text-blue-600 font-bold py-4 rounded-xl border-2 border-dashed border-blue-200 hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              {t.addTreatment}
            </button>
            
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-bold">
                  <tr>
                    <th className="px-4 py-3">{t.description}</th>
                    <th className="px-4 py-3 text-right">{t.cost}</th>
                    <th className="px-4 py-3 w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {patient.treatments.map(item => (
                    <tr key={item.id} className="text-sm">
                      <td className="px-4 py-4">
                        <p className="font-semibold text-gray-800">{item.description}</p>
                        <p className="text-xs text-gray-400">{new Date(item.date).toLocaleDateString()}</p>
                      </td>
                      <td className="px-4 py-4 text-right font-bold text-gray-900">{item.cost} $</td>
                      <td className="px-4 py-4">
                        <button onClick={() => deleteItem(item.id, 'treatment')} className="text-red-400 hover:text-red-600 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'money' && (
          <div className="space-y-4">
             <div className="grid grid-cols-3 gap-3">
              <div className="bg-white p-3 rounded-2xl border border-gray-100 text-center shadow-sm">
                <p className="text-[10px] text-gray-400 font-bold uppercase">{t.totalCost}</p>
                <p className="text-lg font-bold text-gray-900">{totalCost} $</p>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-gray-100 text-center shadow-sm">
                <p className="text-[10px] text-gray-400 font-bold uppercase">{t.totalPaid}</p>
                <p className="text-lg font-bold text-green-600">{totalPaid} $</p>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-gray-100 text-center shadow-sm">
                <p className="text-[10px] text-gray-400 font-bold uppercase">{t.remaining}</p>
                <p className={`text-lg font-bold ${remaining > 0 ? 'text-red-500' : 'text-gray-900'}`}>{remaining} $</p>
              </div>
            </div>

            <button 
              onClick={() => setShowAddModal('payment')}
              className="w-full bg-green-50 text-green-600 font-bold py-4 rounded-xl border-2 border-dashed border-green-200 hover:bg-green-100 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              {t.addPayment}
            </button>

            <div className="space-y-3">
              {patient.payments.map(payment => (
                <div key={payment.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase mb-1">{t.date}</p>
                    <p className="font-medium text-gray-800">{new Date(payment.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-lg font-bold text-green-600">+{payment.amount} $</p>
                    <button onClick={() => deleteItem(payment.id, 'payment')} className="text-red-400 hover:text-red-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'images' && (
          <div className="space-y-4">
            <div className="flex gap-3">
               <label className="flex-1">
                 <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => handleAddImage('Panorama', reader.result as string);
                      reader.readAsDataURL(file);
                    }
                  }} 
                 />
                 <div className="bg-blue-50 text-blue-600 font-bold py-3 rounded-xl border border-blue-200 text-center cursor-pointer hover:bg-blue-100 transition-colors">
                   {t.panorama}
                 </div>
               </label>
               <label className="flex-1">
                 <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => handleAddImage('X-Ray', reader.result as string);
                      reader.readAsDataURL(file);
                    }
                  }} 
                 />
                 <div className="bg-purple-50 text-purple-600 font-bold py-3 rounded-xl border border-purple-200 text-center cursor-pointer hover:bg-purple-100 transition-colors">
                   {t.xray}
                 </div>
               </label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {patient.images.map(img => (
                <div key={img.id} className="relative group rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white aspect-square">
                  <img src={img.url} alt={img.type} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button 
                      onClick={() => {
                        const win = window.open("");
                        win?.document.write(`<img src="${img.url}" style="width:100%"/>`);
                      }}
                      className="p-2 bg-white rounded-full text-gray-800"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                    </button>
                    <button onClick={() => deleteItem(img.id, 'image')} className="p-2 bg-white rounded-full text-red-600">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </div>
                  <div className="absolute bottom-0 w-full bg-white/90 px-3 py-1 text-[10px] font-bold text-gray-500 uppercase flex justify-between items-center border-t">
                    <span>{img.type}</span>
                    <span>{new Date(img.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showAddModal === 'treatment' && (
        <Modal onClose={() => setShowAddModal(null)} title={t.addTreatment}>
          <form className="space-y-4" onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleAddTreatment(formData.get('desc') as string, Number(formData.get('cost')));
          }}>
            <input required name="desc" placeholder={t.description} className="w-full px-4 py-3 rounded-xl border bg-gray-50" />
            <input required name="cost" type="number" placeholder={t.cost} className="w-full px-4 py-3 rounded-xl border bg-gray-50" />
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">{t.save}</button>
          </form>
        </Modal>
      )}

      {showAddModal === 'payment' && (
        <Modal onClose={() => setShowAddModal(null)} title={t.addPayment}>
          <form className="space-y-4" onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleAddPayment(Number(formData.get('amount')));
          }}>
            <input required name="amount" type="number" placeholder={t.amount} className="w-full px-4 py-3 rounded-xl border bg-gray-50" />
            <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-xl font-bold">{t.save}</button>
          </form>
        </Modal>
      )}
    </div>
  );
};

const Modal: React.FC<{ children: React.ReactNode; onClose: () => void; title: string }> = ({ children, onClose, title }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
    <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
      {children}
    </div>
  </div>
);

export default PatientDetails;

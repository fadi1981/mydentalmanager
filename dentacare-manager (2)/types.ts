
export type Language = 'ar' | 'en';

export interface Treatment {
  id: string;
  description: string;
  cost: number;
  date: string;
}

export interface Payment {
  id: string;
  amount: number;
  date: string;
}

export interface PatientImage {
  id: string;
  url: string; // Base64 or Blob URL
  type: 'Panorama' | 'X-Ray';
  date: string;
}

export interface Patient {
  id: string;
  name: string;
  phone: string;
  age: string;
  generalInfo: string;
  treatments: Treatment[];
  payments: Payment[];
  images: PatientImage[];
  createdAt: string;
}

export interface ClinicData {
  patients: Patient[];
  settings: {
    language: Language;
  };
}

export interface Translation {
  title: string;
  dashboard: string;
  patients: string;
  addPatient: string;
  search: string;
  name: string;
  phone: string;
  age: string;
  generalInfo: string;
  save: string;
  cancel: string;
  details: string;
  treatments: string;
  payments: string;
  imaging: string;
  totalCost: string;
  totalPaid: string;
  remaining: string;
  addTreatment: string;
  addPayment: string;
  description: string;
  cost: string;
  amount: string;
  date: string;
  settings: string;
  exportData: string;
  importData: string;
  languageSwitch: string;
  delete: string;
  confirmDelete: string;
  noPatients: string;
  uploadImage: string;
  panorama: string;
  xray: string;
}

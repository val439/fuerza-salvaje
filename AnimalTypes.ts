export interface Animal {
  id: number;
  name: string;
  category: string;
  breed: string;
  age: string;
  image: string;
  gallery?: string[];
  description: string;
  status: 'Disponible' | 'En proceso' | 'Adoptado';
  health: 'Excelente' | 'Buena' | 'Regular' | 'En tratamiento';
  training: string;
  history?: string;
  medicalRecords?: MedicalRecord[];
  locationId?: number;
}

export interface MedicalRecord {
  date: string;
  diagnosis: string;
  treatment: string;
  vet: string;
}

export interface RescueCenter {
  id: number;
  name: string;
  location: string;
  contact: string;
  hours?: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  isAdmin?: boolean;
}
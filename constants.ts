import { TimelineEvent } from './types';
import { Church, Wine, Utensils, Music } from 'lucide-react';

export const EVENT_DETAILS = {
  name: "Stephanie Xec",
  date: new Date('2026-06-20T16:00:00'), // Future date
  locationName: "Salón de Eventos 'El Palacio'",
  address: "Av. Reforma 12-34, Zona 9, Ciudad de Guatemala",
  mapLink: "https://goo.gl/maps/placeholder", // Replace with real link
  whatsappNumber: "50200000000", // Replace with real number
  giftMessage: "Tu presencia es mi mejor regalo, pero si deseas tener un detalle conmigo, te agradezco tu muestra de cariño en el buzón de regalo.",
};

export const TIMELINE: TimelineEvent[] = [
  { time: "16:00", title: "Misa de Acción de Gracias", icon: 'church' },
  { time: "19:00", title: "Ingreso & Vals", icon: 'toast' },
  { time: "20:00", title: "Cena de Gala", icon: 'dinner' },
  { time: "21:00", title: "Fiesta & Baile", icon: 'party' },
];

// Placeholder guest data - in a real app this might come from URL params or API
export const GUEST_INFO = {
  family: "Familia Invitada",
  passes: 2
};
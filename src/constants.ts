import { validateEventDetails } from './utils/dateValidation';

// Leer parámetros de URL (solo en navegador)
const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();

export const EVENT_DETAILS = {
  name: "Stephanie Xec",
  date: new Date('2026-03-07T19:00:00'),
  locationName: "Salón El Pimental",
  address: "Calzada Roosevelt km 13.5, 40-20 Zona 7, Ciudad de Guatemala",
  mapLink: "https://maps.app.goo.gl/88c6iy973Gv9zdsZA?g_st=aw",
  whatsappNumber: "50252727698",
  giftMessage: "Tu presencia es mi mejor regalo, pero si deseas tener un detalle conmigo, te agradezco tu muestra de cariño en efectivo para ayudarme a completar mi colección de makeup y mis proyectos.",
};

// Validate event details on load
if (!validateEventDetails(EVENT_DETAILS)) {
  console.warn('Event details validation failed. Some features may not work correctly.');
}

// Datos del invitado desde URL params
export const GUEST_INFO = {
  family: urlParams.get('f') || "Invitado Especial",
  tickets: urlParams.get('n') || "1"
};
import { validateEventDetails } from './utils/dateValidation';

// Leer parámetros de URL (solo en navegador)
const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();

export const EVENT_DETAILS = {
  name: "Stephanie Xec",
  date: new Date('2026-03-07T19:00:00'),
  locationName: "Club Español",
  address: "Calzada Roosevelt km 13.5, 40-20 Zona 7, Ciudad de Guatemala",
  mapLink: "https://maps.app.goo.gl/88c6iy973Gv9zdsZA?g_st=aw",
  whatsappNumber: "50258794988",
  giftMessage: "Gracias por acompañarme y ser parte de un día tan importante en mi vida. Tu presencia es lo que realmente hace especial este momento. Si deseas regalarme algo más, una aportación en efectivo será recibida con muchísimo cariño y me ayudará a seguir avanzando en mis metas personales.",
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
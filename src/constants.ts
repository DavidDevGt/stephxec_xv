import { validateEventDetails } from './utils/dateValidation';

export const EVENT_DETAILS = {
  name: "Stephanie Xec",
  date: new Date('2026-03-07T19:00:00'),
  locationName: "Salón El Pimental",
  address: "Calzada Roosevelt km 13.5, 40-20 Zona 7, Ciudad de Guatemala",
  mapLink: "https://maps.app.goo.gl/88c6iy973Gv9zdsZA?g_st=aw",
  whatsappNumber: "50252727698",
  giftMessage: "Mi mayor regalo es compartir este momento contigo. Si deseas tener un detalle adicional, una muestra de cariño en sobre será bienvenida.",
};

// Validate event details on load
if (!validateEventDetails(EVENT_DETAILS)) {
  console.warn('Event details validation failed. Some features may not work correctly.');
}

// Placeholder guest data - in a real app this might come from URL params or API
export const GUEST_INFO = {
  family: "Familia Invitada",
  passes: 2
};
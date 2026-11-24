/**
 * Central configuration for the Website Preview & Project Booking popup.
 * Adapt or override any copy, pricing, actions, and behavior timing here.
 */
import { COMPANY } from './companyData';

export const PROJECT_BOOKING_CONFIG = {
  // Flag to enable or disable the entire preview booking popup
  enabled: true,

  // Storage key for session dismissal persistence
  sessionDismissKey: 'elicit_preview_dismissed_session',

  // Behavior timing & triggers
  timing: {
    // Delay (in ms) after detecting the page bottom before opening popup
    bottomTriggerDelay: 650,
    // Pixel threshold buffer near page bottom to consider "bottom reached"
    bottomThresholdPx: 45,
  },

  // Popup Header & Copy
  copy: {
    eyebrow: 'WEBSITE PREVIEW',
    headline: 'Your Website Is Ready for the Next Step',
    supportingText: 'You’ve reviewed the frontend preview. Proceed to discuss the remaining development work and kickoff schedule.',
    bookingHeading: 'Reserve Your Project',
    bookingAmount: '50% of the agreed project fee',
    bookingNote: 'This kickoff payment will be applied toward the total project cost. The remaining balance and payment schedule will follow the agreed proposal.',
    primaryButtonText: 'Discuss on WhatsApp',
    secondaryButtonText: 'I’d like to discuss a few changes first',
  },

  // Client / Project metadata shown in header or badge
  client: {
    previewLabel: 'Frontend Stage Preview',
    brandName: COMPANY.name,
    projectScope: 'Full Website Redesign & Intelligence Platform',
  },

  // Contact / WhatsApp channels
  contact: {
    // International format without +, spaces, or punctuation
    whatsappNumber: '9670111167',
    email: COMPANY.emails.general || COMPANY.emails.rfq,
  },

  // Action links / routing destinations
  actions: {
    // Primary action: opens WhatsApp chat in new tab with prefilled message
    primary: {
      type: 'whatsapp',
      number: '9670111167',
      // Generates polite URL-encoded message dynamically using the project's brand name
      getMessage: (brandName = COMPANY.name) =>
        `Hi, I’ve reviewed the ${brandName} website preview and would like to discuss proceeding with the project. Please share the next steps for the 50% kickoff payment based on our agreed project fee and the remaining development work. Thank you.`,
    },
    // Secondary action: discuss changes via email
    secondary: {
      type: 'mailto',
      email: COMPANY.emails.general || COMPANY.emails.rfq,
      subject: `Feedback & Changes Discussion - ${COMPANY.shortName} Website Preview`,
      body: `Hello Team,\n\nI have reviewed the frontend preview and would like to discuss a few adjustments before proceeding with the next phase.\n\nSpecific feedback / notes:\n1. \n2. \n\nPlease let me know when we can connect.\n\nThank you!`,
      routeFallback: '/contact',
    },
  },
};

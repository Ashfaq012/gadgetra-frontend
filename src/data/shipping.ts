// Simple two-zone shipping model. Edit the rates or the zone assignments
// below to match your actual courier pricing.
export const SHIPPING_ZONE_A_RATE = 300 // Colombo & closest suburbs
export const SHIPPING_ZONE_B_RATE = 450 // Rest of the island
export const FREE_SHIPPING_THRESHOLD = 10000 // Order subtotal (LKR) for free delivery

const ZONE_A_DISTRICTS = ['Colombo', 'Gampaha', 'Kalutara']

export const DISTRICTS = [
  'Colombo',
  'Gampaha',
  'Kalutara',
  'Kandy',
  'Matale',
  'Nuwara Eliya',
  'Galle',
  'Matara',
  'Hambantota',
  'Jaffna',
  'Kilinochchi',
  'Mannar',
  'Vavuniya',
  'Mullaitivu',
  'Batticaloa',
  'Ampara',
  'Trincomalee',
  'Kurunegala',
  'Puttalam',
  'Anuradhapura',
  'Polonnaruwa',
  'Badulla',
  'Monaragala',
  'Ratnapura',
  'Kegalle',
]

/** Returns the delivery fee (LKR) for a district and order subtotal. */
export function getShippingFee(district: string, subtotal: number): number {
  if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0
  return ZONE_A_DISTRICTS.includes(district) ? SHIPPING_ZONE_A_RATE : SHIPPING_ZONE_B_RATE
}

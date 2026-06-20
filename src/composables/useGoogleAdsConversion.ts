const GOOGLE_ADS_CONVERSIONS = {
  lead: 'AW-18256969298/telNCO_w1cIcENL8zIFE',
  phone: 'AW-18256969298/FHFZCOT01cIcENL8zIFE',
  whatsapp: 'AW-18256969298/uy-5COCF1sIcENL8zIFE',
} as const

type GtagWindow = Window & {
  gtag?: (
    command: 'event',
    action: 'conversion',
    params: {
      send_to: string
      value: number
      currency: string
    },
  ) => void
}

function sendGoogleAdsConversion(sendTo: string) {
  if (typeof window === 'undefined')
    return

  const { gtag } = window as GtagWindow

  if (typeof gtag !== 'function')
    return

  gtag('event', 'conversion', {
    send_to: sendTo,
    value: 1.0,
    currency: 'USD',
  })
}

export function sendGoogleAdsLeadConversion() {
  sendGoogleAdsConversion(GOOGLE_ADS_CONVERSIONS.lead)
}

export function sendGoogleAdsPhoneConversion() {
  sendGoogleAdsConversion(GOOGLE_ADS_CONVERSIONS.phone)
}

export function sendGoogleAdsWhatsAppConversion() {
  sendGoogleAdsConversion(GOOGLE_ADS_CONVERSIONS.whatsapp)
}

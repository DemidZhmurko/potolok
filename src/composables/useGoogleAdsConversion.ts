const GOOGLE_ADS_CONVERSION_ID = 'AW-18239017735/4yETCOju3L8cEIemhflD'

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

export function sendGoogleAdsLeadConversion() {
  if (typeof window === 'undefined')
    return

  const { gtag } = window as GtagWindow

  if (typeof gtag !== 'function')
    return

  gtag('event', 'conversion', {
    send_to: GOOGLE_ADS_CONVERSION_ID,
    value: 1.0,
    currency: 'USD',
  })
}

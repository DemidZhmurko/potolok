import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  sendGoogleAdsLeadConversion,
  sendGoogleAdsPhoneConversion,
  sendGoogleAdsWhatsAppConversion,
} from '../src/composables/useGoogleAdsConversion'

describe('google Ads conversions', () => {
  afterEach(() => {
    Reflect.deleteProperty(window, 'gtag')
  })

  it.each([
    ['lead', sendGoogleAdsLeadConversion, 'AW-18256969298/telNCO_w1cIcENL8zIFE'],
    ['phone', sendGoogleAdsPhoneConversion, 'AW-18256969298/FHFZCOT01cIcENL8zIFE'],
    ['WhatsApp', sendGoogleAdsWhatsAppConversion, 'AW-18256969298/uy-5COCF1sIcENL8zIFE'],
  ])('sends one %s conversion with the correct label', (_, sendConversion, sendTo) => {
    const gtag = vi.fn()
    Object.assign(window, { gtag })

    sendConversion()

    expect(gtag).toHaveBeenCalledOnce()
    expect(gtag).toHaveBeenCalledWith('event', 'conversion', {
      send_to: sendTo,
      value: 1.0,
      currency: 'USD',
    })
  })

  it('does nothing when Google tag is unavailable', () => {
    expect(() => sendGoogleAdsLeadConversion()).not.toThrow()
  })
})

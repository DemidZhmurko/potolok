export function useTelegram() {
  const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID || '5733320191'

  const sendMessage = async (message: string) => {
    if (!token || !chatId) {
      console.error('Telegram env variables are missing')
      return false
    }

    const url = `https://api.telegram.org/bot${token}/sendMessage`
    const payload = {
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML',
    }

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const errorText = await res.text()
        console.error('Telegram API error', errorText)
      }

      return res.ok
    }
    catch (e) {
      console.error('Telegram error', e)
      return false
    }
  }

  return { sendMessage }
}

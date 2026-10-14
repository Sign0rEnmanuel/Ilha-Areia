/** Link universal do WhatsApp (wa.me) com a mensagem já escrita. */
export function buildWhatsAppUrl(phone, message) {
  const base = `https://wa.me/${String(phone).replace(/\D/g, '')}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

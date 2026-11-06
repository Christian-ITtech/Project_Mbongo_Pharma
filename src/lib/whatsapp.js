export const DEFAULT_WHATSAPP_MESSAGE =
    'Bonjour, j’aimerais savoir si vous avez un médicament en stock.';

export function toInternational(number) {
    let digits = String(number ?? '').replace(/\D/g, '');

    if (digits.startsWith('00')) {
        digits = digits.slice(2);
    }

    return digits && !digits.startsWith('242') ? `242${digits}` : digits;
}

export function buildTelLink(number) {
    const internationalNumber = toInternational(number);
    return internationalNumber ? `tel:+${internationalNumber}` : null;
}

export function buildWhatsAppLink(number, message) {
    const internationalNumber = toInternational(number);

    if (!internationalNumber) {
        return null;
    }

    const query = message ? `?text=${encodeURIComponent(message)}` : '';
    return `https://wa.me/${internationalNumber}${query}`;
}

export function medicineMessage(medicine) {
    return medicine
        ? `Bonjour, avez-vous du ${medicine} en stock ?`
        : DEFAULT_WHATSAPP_MESSAGE;
}

import { buildTelLink, buildWhatsAppLink, medicineMessage } from '@/lib/whatsapp';
import styles from './ContactButtons.module.css';

export default function ContactButtons({ phone, whatsapp, pharmacyName, medicine }) {
    const telLink = buildTelLink(phone);
    const whatsappLink = buildWhatsAppLink(whatsapp, medicineMessage(medicine));

    if (!telLink && !whatsappLink) {
        return null;
    }

    const pharmacyLabel = pharmacyName ? ` ${pharmacyName}` : '';

    return (
        <div className={styles.group}>
            {telLink && (
                <a href={telLink} className={styles.button} aria-label={`Appeler${pharmacyLabel}`}>
                    Appeler
                </a>
            )}
            {whatsappLink && (
                <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.button}
                    aria-label={`Écrire sur WhatsApp${pharmacyLabel ? ` à${pharmacyLabel}` : ''} (nouvel onglet)`}
                >
                    WhatsApp
                </a>
            )}
        </div>
    );
}

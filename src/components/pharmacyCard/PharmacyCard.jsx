import Link from 'next/link';
import styles from './pharmacyCard.module.css';

export default function PharmacyCard({ pharmacy }) {
    const paracetamol = pharmacy.stocks.find((stock) => stock.medicine === 'Paracétamol');
    const statusClass = {
        Disponible: styles.available,
        'Stock faible': styles.lowStock,
        Rupture: styles.outOfStock,
    }[paracetamol?.status] ?? styles.unknownStatus;

    return (
        <article className={styles.card}>
            <div className={styles.information}>
                <div className={styles.heading}>
                    <h2 className={styles.title}>
                        <Link href={`/pharmacies/${pharmacy.slug}`}>{pharmacy.name}</Link>
                    </h2>
                    {pharmacy.isOnCall && (
                        <span className={styles.onCallBadge}>De garde ce soir</span>
                    )}
                </div>
                <p className={styles.location}>
                    {pharmacy.neighborhood}, {pharmacy.city} – {pharmacy.hours.match(/\d.*$/)?.[0] ?? pharmacy.hours}
                </p>
            </div>

            <div className={styles.stock}>
                {paracetamol ? (
                    <>
                        <span className={`${styles.statusBadge} ${statusClass}`}>{paracetamol.status}</span>
                        <span className={styles.price}>
                            {paracetamol.price === null ? 'Prix non renseigné' : `${paracetamol.price.toLocaleString('fr-FR')} FCFA`}
                        </span>
                        <span className={styles.updatedAt}>Mis à jour {paracetamol.updatedAt}</span>
                    </>
                ) : (
                    <span className={styles.unknownStatus}>Paracétamol non renseigné</span>
                )}
            </div>

            <div className={styles.actions}>
                <a href={`tel:${pharmacy.phone}`}>Appeler</a>
                <a
                    href={`https://wa.me/${pharmacy.whatsapp}?text=${encodeURIComponent('Bonjour, avez-vous du paracétamol en stock ?')}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    WhatsApp
                </a>
                <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${pharmacy.address}, ${pharmacy.neighborhood}, ${pharmacy.city}`)}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    Itinéraire
                </a>
            </div>
        </article>
    );
}
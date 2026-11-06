import Link from 'next/link';
import { notFound } from 'next/navigation';
import PharmacyPublicLayout from '@/components/layout/PharmacyPublicLayout';
import { getApprovedPharmacyBySlug } from '@/lib/pharmacies';
import { mockPharmacies } from '@/lib/mock-pharmacies';
import styles from './pharmacyDetail.module.css';

const stockStatusClasses = {
    Disponible: styles.available,
    'Stock faible': styles.lowStock,
    Rupture: styles.outOfStock,
};

export function generateStaticParams() {
    return mockPharmacies
        .filter((pharmacy) => pharmacy.approvalStatus === 'APPROUVEE')
        .map((pharmacy) => ({ slug: pharmacy.slug }));
}

export default async function PharmacyDetailPage({ params }) {
    const { slug } = await params;
    const pharmacy = await getApprovedPharmacyBySlug(slug);

    if (!pharmacy) {
        notFound();
    }

    return (
        <PharmacyPublicLayout>
            <main className={styles.main}>
                <p className={styles.breadcrumb}>
                    <Link href="/pharmacies">Pharmacies</Link> / {pharmacy.name}
                </p>

                <section className={styles.pharmacyPanel} aria-labelledby="pharmacy-name">
                    <div className={styles.titleRow}>
                        <h1 className={styles.title} id="pharmacy-name">{pharmacy.name}</h1>
                        {pharmacy.isOnCall && (
                            <span className={styles.onCallBadge}>De garde ce soir</span>
                        )}
                    </div>
                    <p className={styles.address}>
                        {pharmacy.address}, {pharmacy.neighborhood}, {pharmacy.city}
                    </p>
                    <p className={styles.contact}>
                        {pharmacy.hours} – Tél.{' '}
                        <a href={`tel:${pharmacy.phone}`}>{pharmacy.displayPhone}</a>
                    </p>
                    <div className={styles.actions}>
                        <a href={`tel:${pharmacy.phone}`}>Appeler</a>
                        <a
                            href={`https://wa.me/${pharmacy.whatsapp}?text=${encodeURIComponent('Bonjour, avez-vous un médicament en stock ?')}`}
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
                </section>

                <section className={styles.stockPanel} aria-labelledby="stock-heading">
                    <div className={styles.stockHeader}>
                        <h2 id="stock-heading">Stock</h2>
                        <p>Fiche régénérée au moins toutes les 60 secondes</p>
                    </div>
                    <div className={styles.tableScroller}>
                        <table className={styles.stockTable}>
                            <thead>
                                <tr>
                                    <th scope="col">Médicament</th>
                                    <th scope="col">Forme</th>
                                    <th scope="col">Statut</th>
                                    <th scope="col">Prix</th>
                                    <th scope="col">Mis à jour</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pharmacy.stocks.map((stock) => (
                                    <tr key={stock.medicine}>
                                        <th scope="row">{stock.medicine}</th>
                                        <td>{stock.form}</td>
                                        <td>
                                            <span className={`${styles.statusBadge} ${stockStatusClasses[stock.status] ?? ''}`}>
                                                {stock.status}
                                            </span>
                                        </td>
                                        <td>{stock.price === null ? '–' : `${stock.price.toLocaleString('fr-FR')} FCFA`}</td>
                                        <td>{stock.updatedAt}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </PharmacyPublicLayout>
    );
}

import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PharmacyPublicLayout from '@/components/layout/PharmacyPublicLayout';
import DutyBadge from '@/components/pharmacy/DutyBadge';
import { getOnDutyPharmacies } from '@/lib/duty';
import styles from './onDutyPharmacies.module.css';

const cities = {
    brazzaville: {
        label: 'Brazzaville',
        value: 'BRAZZAVILLE',
    },
    'pointe-noire': {
        label: 'Pointe-Noire',
        value: 'POINTE_NOIRE',
    },
};

const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
    timeZone: 'Africa/Brazzaville',
    dateStyle: 'medium',
    timeStyle: 'short',
});

export function generateStaticParams() {
    return Object.keys(cities).map((ville) => ({ ville }));
}

function formatPeriod(dateDebut, dateFin) {
    return `${dateFormatter.format(new Date(dateDebut))} au ${dateFormatter.format(new Date(dateFin))}`;
}

async function OnDutyPharmaciesContent({ params }) {
    const { ville } = await params;
    const city = cities[ville];

    if (!city) {
        notFound();
    }

    const pharmacies = (await getOnDutyPharmacies())
        .filter((period) => period.pharmacie.ville === city.value);

    return (
        <PharmacyPublicLayout>
            <main className={styles.main}>
                <p className={styles.breadcrumb}>
                    <Link href="/pharmacies-de-garde">Pharmacies de garde</Link> / {city.label}
                </p>
                <header className={styles.header}>
                    <h1 className={styles.title}>Pharmacies de garde à {city.label}</h1>
                    <p className={styles.subtitle}>
                        Les pharmacies ouvertes de garde actuellement et pour les prochains jours.
                    </p>
                </header>

                <nav className={styles.cityNavigation} aria-label="Choisir une ville">
                    {Object.entries(cities).map(([citySlug, cityOption]) => (
                        <Link
                            key={citySlug}
                            className={citySlug === ville ? styles.activeCity : styles.cityLink}
                            href={`/pharmacies-de-garde/${citySlug}`}
                        >
                            {cityOption.label}
                        </Link>
                    ))}
                </nav>

                {pharmacies.length > 0 ? (
                    <section className={styles.list} aria-label={`Pharmacies de garde à ${city.label}`}>
                        {pharmacies.map((period) => (
                            <article className={styles.card} key={`${period.pharmacie.slug}-${new Date(period.dateDebut).toISOString()}`}>
                                <div className={styles.cardHeader}>
                                    <h2 className={styles.pharmacyName}>
                                        <Link href={`/pharmacies/${period.pharmacie.slug}`}>
                                            {period.pharmacie.nom}
                                        </Link>
                                    </h2>
                                    <DutyBadge />
                                </div>
                                <p className={styles.address}>
                                    {period.pharmacie.adresse}, {period.pharmacie.quartier}
                                </p>
                                <p className={styles.details}>
                                    {period.pharmacie.horaires ?? 'Horaires non renseignés'} · Tél.{' '}
                                    <a href={`tel:${period.pharmacie.telephone}`}>{period.pharmacie.telephone}</a>
                                </p>
                                <p className={styles.period}>
                                    Garde : {formatPeriod(period.dateDebut, period.dateFin)}
                                </p>
                            </article>
                        ))}
                    </section>
                ) : (
                    <p className={styles.emptyState}>
                        Aucune pharmacie de garde n&apos;est actuellement renseignée à {city.label}.
                    </p>
                )}
            </main>
        </PharmacyPublicLayout>
    );
}

function OnDutyPharmaciesFallback() {
    return (
        <PharmacyPublicLayout>
            <main className={styles.main}>
                <p className={styles.breadcrumb}>Pharmacies de garde</p>
                <p className={styles.emptyState}>Chargement des pharmacies de garde…</p>
            </main>
        </PharmacyPublicLayout>
    );
}

export default function OnDutyPharmaciesByCityPage({ params }) {
    return (
        <Suspense fallback={<OnDutyPharmaciesFallback />}>
            <OnDutyPharmaciesContent params={params} />
        </Suspense>
    );
}

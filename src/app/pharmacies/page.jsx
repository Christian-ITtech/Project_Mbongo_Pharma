import { Suspense } from 'react';
import PharmacyCard from '@/components/pharmacyCard/PharmacyCard';
import PharmacyPublicLayout from '@/components/layout/PharmacyPublicLayout';
import { getApprovedPharmacies } from '@/lib/pharmacies';
import styles from './pharmacies.module.css';

const cities = [
    { value: 'brazzaville', label: 'Brazzaville' },
    { value: 'pointe-noire', label: 'Pointe-Noire' },
];

function normalizeValue(value) {
    return value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLocaleLowerCase('fr')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

function getSingleParam(value) {
    if (Array.isArray(value)) {
        return value.find((item) => typeof item === 'string')?.trim() ?? '';
    }

    return typeof value === 'string' ? value.trim() : '';
}

async function PharmacyResults({ searchParams }) {
    const [params, pharmacies] = await Promise.all([searchParams, getApprovedPharmacies()]);
    const requestedCity = getSingleParam(params.ville);
    const selectedCity = cities.some((city) => city.value === requestedCity)
        ? requestedCity
        : cities[0].value;
    const cityLabel = cities.find((city) => city.value === selectedCity).label;
    const neighborhoods = [...new Set(pharmacies.map((pharmacy) => pharmacy.neighborhood))]
        .sort((a, b) => a.localeCompare(b, 'fr'));
    const requestedNeighborhood = getSingleParam(params.quartier);
    const selectedNeighborhood = neighborhoods.some(
        (neighborhood) => normalizeValue(neighborhood) === requestedNeighborhood,
    )
        ? requestedNeighborhood
        : 'all';
    const onCallOnly = getSingleParam(params.oncall) === 'on';
    const filteredPharmacies = pharmacies.filter((pharmacy) => (
        normalizeValue(pharmacy.city) === selectedCity
        && (selectedNeighborhood === 'all' || normalizeValue(pharmacy.neighborhood) === selectedNeighborhood)
        && (!onCallOnly || pharmacy.isOnCall)
    ));

    return (
        <>
            <header className={styles.pageHeader}>
                <h1 className={styles.title}>Résultats pour « paracétamol »</h1>
                <p className={styles.subtitle}>
                    {filteredPharmacies.length} {filteredPharmacies.length === 1 ? 'pharmacie trouvée' : 'pharmacies trouvées'}
                </p>
            </header>

            <form className={styles.filters} action="/pharmacies" method="get" aria-label="Filtres des pharmacies">
                <div className={styles.filterGroup}>
                    <label htmlFor="ville">Ville</label>
                    <select id="ville" name="ville" defaultValue={selectedCity}>
                        {cities.map((city) => (
                            <option key={city.value} value={city.value}>{city.label}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.filterGroup}>
                    <label htmlFor="quartier">Quartier</label>
                    <select id="quartier" name="quartier" defaultValue={selectedNeighborhood}>
                        <option value="all">Tous les quartiers</option>
                        {neighborhoods.map((neighborhood) => (
                            <option key={normalizeValue(neighborhood)} value={normalizeValue(neighborhood)}>
                                {neighborhood}
                            </option>
                        ))}
                    </select>
                </div>
                <label className={styles.onCallFilter} htmlFor="oncall">
                    <input id="oncall" name="oncall" type="checkbox" defaultChecked={onCallOnly} />
                    <span>De garde uniquement</span>
                </label>
                <button className={styles.filterButton} type="submit">Filtrer</button>
            </form>

            <section className={styles.pharmacyList} aria-label={`Pharmacies de ${cityLabel}`}>
                {filteredPharmacies.length > 0 ? (
                    filteredPharmacies.map((pharmacy) => (
                        <PharmacyCard key={pharmacy.slug} pharmacy={pharmacy} />
                    ))
                ) : (
                    <p className={styles.emptyState} role="status">
                        Aucune pharmacie ne correspond à ces filtres à {cityLabel}.
                    </p>
                )}
            </section>
        </>
    );
}

function PharmacyResultsFallback() {
    return <p className={styles.emptyState} role="status">Chargement des pharmacies…</p>;
}

export default function PharmaciesPage({ searchParams }) {
    return (
        <PharmacyPublicLayout>
            <main className={styles.main}>
                <p className={styles.breadcrumb}>Accueil / Recherche</p>
                <Suspense fallback={<PharmacyResultsFallback />}>
                    <PharmacyResults searchParams={searchParams} />
                </Suspense>
            </main>
        </PharmacyPublicLayout>
    );
}

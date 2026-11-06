import Link from 'next/link';
import { Suspense } from 'react';
import { searchPharmaciesByMedicine } from '@/lib/medicine-search';
import styles from './recherche.module.css';

const statusClassNames = {
    Disponible: styles.available,
    'Stock faible': styles.lowStock,
    Rupture: styles.outOfStock,
};

export const metadata = {
    title: 'Recherche de médicaments | Mbongo Pharma',
    description: 'Consultez la disponibilité des médicaments dans les pharmacies.',
};

function SearchPending() {
    return <p className={styles.emptyState} role="status">Recherche en cours…</p>;
}

async function SearchResults({ searchParams }) {
    const params = await searchParams;
    const queryParam = params.q;
    const queryValues = Array.isArray(queryParam) ? queryParam : [queryParam];
    const query = queryValues.find((value) => typeof value === 'string')?.trim() ?? '';
    const results = searchPharmaciesByMedicine(query);

    return (
        <>
            <section className={styles.searchSection} aria-labelledby="results-title">
                <h1 className={styles.title} id="results-title">
                    {query ? `Résultats pour « ${query} »` : 'Rechercher un médicament'}
                </h1>
                <p className={styles.resultCount} aria-live="polite">
                    {query
                        ? `${results.length} ${results.length === 1 ? 'pharmacie trouvée' : 'pharmacies trouvées'}`
                        : 'Indiquez le nom du médicament à rechercher.'}
                </p>

                <form className={styles.searchForm} action="/recherche" method="get">
                    <div className={styles.formField}>
                        <label htmlFor="medicine-query">Médicament</label>
                        <input
                            id="medicine-query"
                            name="q"
                            type="search"
                            defaultValue={query}
                            placeholder="Ex. Paracétamol"
                            autoComplete="off"
                            maxLength={100}
                        />
                    </div>
                    <button className={styles.searchButton} type="submit">Rechercher</button>
                </form>
            </section>

            {query && results.length > 0 && (
                <section className={styles.results} aria-label="Pharmacies et disponibilités">
                    {results.map(({ name, neighborhood, city, hours, stock }, index) => (
                        <article className={styles.resultCard} key={`${name}-${stock.medicine}-${index}`}>
                            <div className={styles.pharmacyInfo}>
                                <h2>{name}</h2>
                                <p>{neighborhood}, {city} – {hours}</p>
                            </div>
                            <div className={styles.stockInfo}>
                                <span className={`${styles.statusBadge} ${statusClassNames[stock.status] ?? ''}`}>
                                    {stock.status}
                                </span>
                                <span className={styles.price}>
                                    {stock.price === null
                                        ? 'Prix non renseigné'
                                        : `${stock.price.toLocaleString('fr-FR')} FCFA`}
                                </span>
                                <span className={styles.updatedAt}>Mis à jour {stock.updatedAt}</span>
                            </div>
                        </article>
                    ))}
                </section>
            )}

            {query && results.length === 0 && (
                <p className={styles.emptyState} role="status">
                    Aucune pharmacie trouvée pour « {query} ». Vérifiez l’orthographe ou essayez un autre nom.
                </p>
            )}
        </>
    );
}

export default function RecherchePage({ searchParams }) {
    return (
        <div className={styles.page}>
            <header className={styles.siteHeader}>
                <nav className={styles.navigation} aria-label="Navigation principale">
                    <Link className={styles.brand} href="/">
                        <span className={styles.brandIcon} aria-hidden="true">+</span>
                        <span>Mbongo Pharma</span>
                    </Link>
                    <div className={styles.navigationLinks}>
                        <Link href="/pharmacies">Pharmacies</Link>
                        <Link href="/pharmacies-de-garde">Pharmacies de garde</Link>
                        <Link href="/comment-ca-marche">Comment ça marche</Link>
                        <Link href="/pour-les-pharmacies">Pour les pharmacies</Link>
                    </div>
                    <Link className={styles.loginLink} href="/connexion">Connexion</Link>
                </nav>
            </header>

            <main className={styles.main}>
                <p className={styles.breadcrumb}><Link href="/">Accueil</Link> / Recherche</p>
                <Suspense fallback={<SearchPending />}>
                    <SearchResults searchParams={searchParams} />
                </Suspense>
            </main>

            <footer className={styles.footer}>
                Informations indicatives. Appelez la pharmacie pour confirmer sa disponibilité avant de vous déplacer.
                Aucun conseil médical n’est fourni. Données de démonstration fictives.
            </footer>
        </div>
    );
}

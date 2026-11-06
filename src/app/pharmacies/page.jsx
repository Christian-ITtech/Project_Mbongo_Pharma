import PharmacyCard from '@/components/pharmacyCard/PharmacyCard';
import PharmacyPublicLayout from '@/components/layout/PharmacyPublicLayout';
import { getApprovedPharmacies } from '@/lib/pharmacies';
import styles from './pharmacies.module.css';

export default async function PharmaciesPage() {
    const pharmacies = await getApprovedPharmacies();

    return (
        <PharmacyPublicLayout>
            <main className={styles.main}>
                <p className={styles.breadcrumb}>Accueil / Recherche</p>
                <header className={styles.pageHeader}>
                    <h1 className={styles.title}>Résultats pour « paracétamol »</h1>
                    <p className={styles.subtitle}>
                        {pharmacies.length} {pharmacies.length === 1 ? 'pharmacie trouvée' : 'pharmacies trouvées'}
                    </p>
                </header>

                <form className={styles.filters} aria-label="Filtres des pharmacies">
                    <div className={styles.filterGroup}>
                        <label htmlFor="ville">Ville</label>
                        <select id="ville" name="ville" defaultValue="brazzaville">
                            <option value="brazzaville">Brazzaville</option>
                            <option value="pointe-noire">Pointe-Noire</option>
                        </select>
                    </div>
                    <div className={styles.filterGroup}>
                        <label htmlFor="quartier">Quartier</label>
                        <select id="quartier" name="quartier" defaultValue="all">
                            <option value="all">Tous les quartiers</option>
                            <option value="poto-poto">Poto-Poto</option>
                            <option value="bacongo">Bacongo</option>
                            <option value="moungali">Moungali</option>
                            <option value="talangai">Talangaï</option>
                        </select>
                    </div>
                    <label className={styles.onCallFilter} htmlFor="oncall">
                        <input id="oncall" name="oncall" type="checkbox" />
                        <span>De garde uniquement</span>
                    </label>
                    <button className={styles.filterButton} type="button">Filtrer</button>
                </form>

                <section className={styles.pharmacyList} aria-label="Pharmacies trouvées">
                    {pharmacies.map((pharmacy) => (
                        <PharmacyCard key={pharmacy.slug} pharmacy={pharmacy} />
                    ))}
                </section>
            </main>
        </PharmacyPublicLayout>
    );
}

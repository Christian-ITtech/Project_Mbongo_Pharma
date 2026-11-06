import Link from 'next/link';
import styles from './pharmacyPublicLayout.module.css';

export default function PharmacyPublicLayout({ children }) {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <nav className={styles.navigation} aria-label="Navigation principale">
                    <Link className={styles.brand} href="/pharmacies">
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

            {children}

            <footer className={styles.footer}>
                <p>
                    Informations indicatives. Appelez la pharmacie pour confirmer sa disponibilité ou sa garde avant de vous déplacer.
                    Cette application ne donne aucun conseil médical. Données de démonstration fictives.
                </p>
            </footer>
        </div>
    );
}

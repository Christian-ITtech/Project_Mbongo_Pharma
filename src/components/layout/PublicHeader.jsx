// En-tête public (issue 5). Composant serveur : il ne lit ni session ni cookies,
// pour que les pages publiques restent statiques (SSG / ISR).
import Link from "next/link";
import ui from "@/styles/ui.module.css";
import styles from "./PublicHeader.module.css";

const links = [
  { href: "/pharmacies", label: "Pharmacies" },
  { href: "/pharmacies-de-garde", label: "Pharmacies de garde" },
  { href: "/comment-ca-marche", label: "Comment ça marche" },
  { href: "/pour-les-pharmacies", label: "Pour les pharmacies" },
];

function Logo() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 2h6v7h7v6h-7v7H9v-7H2V9h7z" fill="#0E7C4A" />
    </svg>
  );
}

export default function PublicHeader() {
  return (
    <header className={styles.header}>
      <div className={`${ui.container} ${styles.inner}`}>
        <Link href="/" className={styles.logo}>
          <Logo />
          Mbongo Pharma
        </Link>

        <nav aria-label="Navigation principale" className={styles.nav}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={styles.navLink}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link href="/connexion" className={styles.login}>
            Connexion
          </Link>

          <details className={styles.menu}>
            <summary className={styles.summary}>
              <span className={styles.srOnly}>Menu</span>
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M3 5h14M3 10h14M3 15h14" stroke="#1B2B24" strokeWidth="2" strokeLinecap="round" fill="none" />
              </svg>
            </summary>
            <nav aria-label="Menu mobile" className={styles.panel}>
              {links.map((l) => (
                <Link key={l.href} href={l.href} className={styles.panelLink}>
                  {l.label}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

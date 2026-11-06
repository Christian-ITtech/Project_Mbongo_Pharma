// Pied de page public avec l'avertissement obligatoire (issue 5).
import ui from "@/styles/ui.module.css";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${ui.container} ${styles.text}`}>
        <p>
          Informations indicatives. Appelez la pharmacie pour confirmer sa disponibilité ou sa garde
          avant de vous déplacer. Cette application ne donne aucun conseil médical.
        </p>
        <p>Données de démonstration fictives. Mbongo Pharma – Akieni Academy, groupe 8.</p>
      </div>
    </footer>
  );
}

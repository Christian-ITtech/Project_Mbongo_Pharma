// Accueil — SSG (issue 5) : contenu fixe, fabriqué une seule fois au build.
import Link from "next/link";
import ui from "@/styles/ui.module.css";
import styles from "@/styles/public.module.css";

export const metadata = {
  title: "Mbongo Pharma – Trouvez votre médicament avant de vous déplacer",
  description:
    "Consultez la disponibilité des médicaments en pharmacie et repérez les pharmacies de garde à Brazzaville et Pointe-Noire.",
};

const steps = [
  { title: "Recherchez", text: "Saisissez le nom du médicament et votre ville." },
  { title: "Comparez", text: "Voyez quelles pharmacies l’ont en stock, leur quartier et leurs horaires." },
  { title: "Appelez avant de partir", text: "Contactez la pharmacie par téléphone ou WhatsApp, puis rendez-vous sur place." },
];

export default function HomePage() {
  return (
    <div className={styles.stack}>
      <section className={styles.hero}>
        <p className={styles.kicker}>Brazzaville et Pointe-Noire</p>
        <h1 className={styles.title}>Trouvez votre médicament avant de vous déplacer</h1>
        <p className={styles.lead}>
          Consultez la disponibilité des médicaments en pharmacie et repérez les pharmacies de garde,
          sans faire le tour de la ville.
        </p>

        {/* Formulaire GET : fonctionne sans JavaScript, la page reste statique */}
        <form action="/recherche" method="get" className={styles.searchForm}>
          <div>
            <label htmlFor="q" className={ui.label}>Médicament</label>
            <input id="q" name="q" type="search" required placeholder="Ex. paracétamol" className={ui.input} />
          </div>
          <div>
            <label htmlFor="ville" className={ui.label}>Ville</label>
            <select id="ville" name="ville" className={ui.input}>
              <option value="Brazzaville">Brazzaville</option>
              <option value="Pointe-Noire">Pointe-Noire</option>
            </select>
          </div>
          <button type="submit" className={`${ui.btn} ${ui.btnPrimary}`}>
            Rechercher
          </button>
        </form>

        <div className={styles.heroLink}>
          <Link href="/pharmacies-de-garde" className={`${ui.btn} ${ui.btnOutline}`}>
            Pharmacies de garde ce soir
          </Link>
        </div>
      </section>

      <section aria-labelledby="etapes">
        <h2 id="etapes" className={styles.sectionTitle}>Comment ça marche</h2>
        <ol className={styles.steps}>
          {steps.map((s, i) => (
            <li key={s.title} className={ui.card}>
              <span className={styles.stepNum}>{i + 1}</span>
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <p className={styles.cardText}>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.cta}>
        <div>
          <h2 className={styles.ctaTitle}>Vous êtes une pharmacie ?</h2>
          <p className={styles.ctaText}>Publiez votre stock en quelques clics et signalez vos gardes.</p>
        </div>
        <Link href="/inscription" className={styles.ctaButton}>
          Créer un compte pharmacie
        </Link>
      </section>
    </div>
  );
}

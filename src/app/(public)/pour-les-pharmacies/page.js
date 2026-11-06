// Pour les pharmacies — SSG (issue 5).
import Link from "next/link";
import ui from "@/styles/ui.module.css";
import styles from "@/styles/public.module.css";

export const metadata = {
  title: "Pour les pharmacies – Mbongo Pharma",
  description: "Publiez votre stock et vos gardes pour que les habitants vous trouvent plus facilement.",
};

const benefits = [
  { title: "Soyez visible", text: "Les habitants de votre ville voient si vous avez le médicament qu’ils cherchent avant de se déplacer." },
  { title: "Mettez à jour en quelques clics", text: "Changez le statut d’un médicament (disponible, stock faible, rupture) depuis votre espace." },
  { title: "Signalez vos gardes", text: "Vos périodes de garde apparaissent sur la page dédiée, avec vos coordonnées." },
];

const steps = [
  "Créez le compte de votre pharmacie.",
  "Un administrateur valide votre inscription avant la publication.",
  "Renseignez votre profil et votre stock, puis mettez-les à jour quand ils changent.",
];

export default function ForPharmaciesPage() {
  return (
    <article className={styles.article}>
      <header>
        <h1 className={styles.pageTitle}>Pour les pharmacies</h1>
        <p className={styles.lead}>Aidez vos clients à vous trouver, sans changer votre façon de travailler.</p>
      </header>

      <div className={styles.grid3}>
        {benefits.map((b) => (
          <section key={b.title} className={ui.card}>
            <h2 className={styles.cardHeading}>{b.title}</h2>
            <p className={styles.cardText}>{b.text}</p>
          </section>
        ))}
      </div>

      <section>
        <h2 className={styles.sectionTitle}>Comment rejoindre Mbongo Pharma</h2>
        <ol className={styles.numbered}>
          {steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </section>

      <div className={styles.actions}>
        <Link href="/inscription" className={`${ui.btn} ${ui.btnPrimary}`}>
          Créer un compte pharmacie
        </Link>
        <Link href="/connexion" className={`${ui.btn} ${ui.btnOutline}`}>
          J’ai déjà un compte
        </Link>
      </div>
    </article>
  );
}

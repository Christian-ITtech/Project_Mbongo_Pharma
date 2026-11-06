// Comment ça marche — SSG (issue 5).
import Link from "next/link";
import ui from "@/styles/ui.module.css";
import styles from "@/styles/public.module.css";

export const metadata = {
  title: "Comment ça marche – Mbongo Pharma",
  description: "Rechercher un médicament, comparer les pharmacies et les appeler avant de vous déplacer.",
};

const steps = [
  { title: "1. Recherchez un médicament", text: "Tapez le nom du médicament et choisissez votre ville. Aucun compte n’est nécessaire." },
  { title: "2. Comparez les pharmacies", text: "Chaque pharmacie indique si le médicament est disponible, en stock faible ou en rupture, avec son quartier, ses horaires et la date de dernière mise à jour." },
  { title: "3. Appelez avant de partir", text: "Contactez la pharmacie par téléphone ou par WhatsApp pour confirmer, puis rendez-vous sur place." },
];

export default function HowItWorksPage() {
  return (
    <article className={styles.article}>
      <header className={styles.pageIntro}>
        <h1 className={styles.pageTitle}>Comment ça marche</h1>
        <p className={styles.lead}>
          Mbongo Pharma vous évite de faire le tour des pharmacies pour trouver un médicament.
        </p>
      </header>

      <div className={styles.grid3}>
        {steps.map((s) => (
          <section key={s.title} className={ui.card}>
            <h2 className={styles.cardHeading}>{s.title}</h2>
            <p className={styles.cardText}>{s.text}</p>
          </section>
        ))}
      </div>

      <section className={ui.card}>
        <h2 className={styles.cardHeading}>Pharmacies de garde</h2>
        <p className={styles.cardText}>
          La nuit ou le dimanche, consultez la liste des pharmacies de garde de votre ville.
          Le planning est actualisé toutes les 5 minutes.
        </p>
        <Link href="/pharmacies-de-garde" className={styles.textLink}>
          Voir les pharmacies de garde
        </Link>
      </section>

      <section className={styles.infoBox}>
        <h2 className={styles.infoTitle}>Ce que l’application ne fait pas</h2>
        <p className={styles.infoText}>
          Mbongo Pharma indique où trouver un médicament, jamais quoi prendre. Elle ne donne aucun
          conseil médical ni aucun dosage : demandez conseil à un pharmacien ou à un médecin.
        </p>
      </section>
    </article>
  );
}

// Layout des pages publiques (issue 5) : en-tête, contenu, pied de page.
import PublicHeader from "@/components/layout/PublicHeader";
import Footer from "@/components/layout/Footer";
import ui from "@/styles/ui.module.css";
import styles from "@/styles/public.module.css";

export default function PublicLayout({ children }) {
  return (
    <div className={styles.shell}>
      <PublicHeader />
      <main className={`${ui.container} ${styles.grow}`}>
        <div className={styles.main}>{children}</div>
      </main>
      <Footer />
    </div>
  );
}

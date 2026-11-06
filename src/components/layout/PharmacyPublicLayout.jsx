import PublicHeader from "@/components/layout/PublicHeader";
import Footer from "@/components/layout/Footer";
import styles from "@/styles/public.module.css";

export default function PharmacyPublicLayout({ children }) {
  return (
    <div className={styles.shell}>
      <PublicHeader />
      {children}
      <Footer />
    </div>
  );
}

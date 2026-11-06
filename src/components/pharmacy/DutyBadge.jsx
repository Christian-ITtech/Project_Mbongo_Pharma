import styles from './DutyBadge.module.css';

export default function DutyBadge({ label = 'De garde ce soir' }) {
    return <span className={styles.badge}>{label}</span>;
}

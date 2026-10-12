import tagIcon from '../../assets/icons/tag-icon.svg';
import styles from './Tagline.module.css';

export default function Tagline({ children, className }) {
  return (
    <span className={[styles.tagline, className].filter(Boolean).join(' ')}>
      <img src={tagIcon} alt="" width="27" height="27" className={styles.icon} />
      {children}
    </span>
  );
}

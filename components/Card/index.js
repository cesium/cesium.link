import styles from "./style.module.css";

const Card = ({ title, description, emoji, url }) => (
  <a href={url} className={styles.card}>
    <h3>
      {emoji} {title}
    </h3>
    {description && <p>{description}</p>}
  </a>
);

export default Card;

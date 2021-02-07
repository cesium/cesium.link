import 'animate.css';

import styles from "./style.module.css";

const Card = ({ title, description, emoji, url, atention=false }) => (
  <a href={url} className={styles.card}>
    <h3 className={atention && "animate__animated animate__shakeX animate__delay-2s"}>

      {emoji} {title}
    </h3>
    {description && <p>{description}</p>}
  </a>
);

export default Card;

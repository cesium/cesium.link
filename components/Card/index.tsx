import { Twemoji } from 'react-emoji-render';
import { ILink } from '~/models/Link';

import 'animate.css';

import styles from './style.module.css';

const Card = ({ title, emoji, link, attention }: ILink) => (
  <a href={link} className={styles.card}>
    <h3 className={attention ? 'animate__animated animate__shakeX animate__delay-2s' : undefined}>
      <Twemoji svg text={`${emoji} ${title}`} />
    </h3>
  </a>
);

export default Card;

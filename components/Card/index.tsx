import { Twemoji } from 'react-emoji-render';
import classNames from 'classnames';
import { ILink } from '~/models/Link';

import 'animate.css';
import styles from './style.module.css';

type Props = ILink;

const Card = ({ title, emoji, link, attention }: Props) => (
  <a href={link} className={styles.card}>
    <div className={styles.underline} />
    <h3
      className={classNames({ 'animate__animated animate__shakeX animate__delay-2s': attention })}
    >
      <Twemoji svg text={`${emoji} ${title}`} />
    </h3>
  </a>
);

export default Card;

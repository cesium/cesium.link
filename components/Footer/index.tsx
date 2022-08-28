import Image from 'next/image';
import { IoHeart } from 'react-icons/io5';

import SocialIcon, { ISocialIcon } from '~/components/SocialIcon';

import { SETTINGS } from '~/data/config';

import { DEFAULT_SOCIAL_NETWORKS } from './config';
import styles from './style.module.css';
import logo from '../../public/cesium.svg';

interface Props {
  social?: ISocialIcon[];
}

const Footer = ({ social = DEFAULT_SOCIAL_NETWORKS }: Props) => (
  <footer className={styles.footer}>
    <div className={styles.social}>
      {social.map((entry) => (
        <SocialIcon key={entry.tag} {...entry} />
      ))}
    </div>
    <div className={styles.copyright}>
      <a href={SETTINGS.domain} target="_blank" rel="noopener noreferrer">
        hacked with <IoHeart className={styles.heart} size="1.2em" /> by
        <Image width={84} height={24} src={logo} alt="CeSIUM's Logo" />
      </a>
    </div>
  </footer>
);

export default Footer;

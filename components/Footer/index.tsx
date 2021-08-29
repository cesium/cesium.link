import Image from 'next/image';
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoGithub,
  IoHeart
} from 'react-icons/io5';

import settings from '~/data/settings.json';
import social from '~/data/social.json';

import styles from './style.module.css';

import logo from '../../public/logo_lettering_light.png';

const logos = {
  facebook: IoLogoFacebook,
  instagram: IoLogoInstagram,
  twitter: IoLogoTwitter,
  github: IoLogoGithub
};

interface SocialIconProps {
  name: string;
  url: string;
  username: string;
  tag: string;
}

const SocialIcon = ({ name, url, username, tag }: SocialIconProps) => {
  const Icon = logos[tag];

  return (
    <a href={`${url}/${username}`}>
      <Icon title={name} size="1.5em" />
    </a>
  );
};

const Footer = ({ isThemeDark = false }) => (
  <footer className={styles.footer}>
    <div className={`${styles.social} ${!isThemeDark && styles.dark}`}>
      {social.map((entry: SocialIconProps) => (
        <SocialIcon key={entry.tag} {...entry} />
      ))}
    </div>
    <div className={`${styles.copyright} ${!isThemeDark && styles.dark}`}>
      <a href={settings.domain} target="_blank" rel="noopener noreferrer">
        hacked with <IoHeart className={styles.heart} size="1.2em" /> by
        <Image width={70} height={24} src={logo} alt="CoderDojo's Logo" />
      </a>
    </div>
  </footer>
);

export default Footer;

import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter, IoLogoGithub, IoHeart } from "react-icons/io5";

import social from '../../data/social.yml'

import styles from './style.module.css'

const logos = {
  facebook: IoLogoFacebook,
  instagram: IoLogoInstagram,
  twitter: IoLogoTwitter,
  github: IoLogoGithub
}

const SocialIcon = ({ name, url, username, tag }) => {
  const Icon = logos[tag]

  return (
    <a href={`${url}/${username}`}>
      <Icon title={name} size="1.5em" />
    </a>
  )
};

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.social}>
      {social.map(entry => (
        <SocialIcon key={entry.tag} {...entry} />
      ))}
    </div>
    <div className={styles.copyright}>
      <a
        href="https://cesium.di.uminho.pt"
        target="_blank"
        rel="noopener noreferrer"
      >
        hacked with <IoHeart className={styles.heart} size="1.2em" /> by
          <img src="/cesium.svg" alt="CeSIUM's Logo" className={styles.logo} />
      </a>
    </div>
  </footer>
);

export default Footer
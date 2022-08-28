import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter, IoLogoGithub } from 'react-icons/io5';
import { IconType } from 'react-icons/lib';

import { ESocialIcon } from './types';

export const SOCIAL_ICONS: { [key in ESocialIcon]: IconType } = {
  facebook: IoLogoFacebook,
  instagram: IoLogoInstagram,
  twitter: IoLogoTwitter,
  github: IoLogoGithub
};

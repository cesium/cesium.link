import { SOCIAL_ICONS } from './config';
import { ISocialIcon } from './types';

type Props = ISocialIcon;

const SocialIcon = ({ name, base_url, username, tag }: Props) => {
  const Icon = SOCIAL_ICONS[tag];

  return (
    <a href={`${base_url}/${username}`}>
      <Icon title={name} size="1.5em" />
    </a>
  );
};

export default SocialIcon;

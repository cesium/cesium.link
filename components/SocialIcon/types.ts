export enum ESocialIcon {
  GitHub = 'github',
  Facebook = 'facebook',
  Instagram = 'instagram',
  Twitter = 'twitter'
}

export interface ISocialIcon {
  name: string;
  base_url: string;
  username: string;
  tag: ESocialIcon;
}

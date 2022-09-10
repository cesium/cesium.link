import { getVersion } from '~/lib/config';

export default function Version() {
  return `${getVersion().ref}`;
}

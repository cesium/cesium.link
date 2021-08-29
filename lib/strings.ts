export function getNameInitials(name: string = '?'): string {
  const initials = name?.split(' ').map((name) => (/[A-Z]/.test(name[0]) ? name[0] : null));
  console.log(initials);

  return initials.length > 2 ? initials[0] + initials[initials.length - 1] : initials.join('');
}

export function getHexColor(name: string = '?'): string {
  let hash = 0;

  if (name.length === 0) return `${hash}`;

  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }

  let color = '#';

  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 255;
    color += ('00' + value.toString(16)).substr(-2);
  }

  return color;
}

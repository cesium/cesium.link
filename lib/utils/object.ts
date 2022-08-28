export function pick(obj: Record<string, any>, keys: string[]) {
  return Object.assign({}, ...keys.map((key) => ({ [key]: obj[key] })));
}

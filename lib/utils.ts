export function pick(obj, keys) {
  return Object.assign({}, ...keys.map((key) => ({ [key]: obj[key] })));
}

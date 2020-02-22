import nacs from '../nacs.json';

export const ProductCodes = {};
export const Descriptions = {};

for (const n of nacs) {
  if (ProductCodes[n.standardCode]) {
    throw new Error(`Duplicate code ${n.standardCode}`);
  }
  ProductCodes[n.standardCode] = n;
  Descriptions[n.longName] = n;
}

export function findMatch(desc) {
  if (Descriptions[desc]) {
    return Descriptions[desc];
  }
  const maybe = nacs.filter(f => f.longName.startsWith(desc));
  if (maybe.length) {
    return maybe[0];
  }
  throw new Error(`Unknown product description ${desc}`);
}

export function lineItemFromNACS(nacsItem, defaults = {}) {
  if (!nacsItem) {
    return defaults;
  }
  return {
    ...defaults,
    description: nacsItem.longName,
    code: nacsItem.standardCode,
    name: nacsItem.longName,
  };
}

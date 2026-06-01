import { Fragment } from './index.js';

function normalizeChildren(children) {
  if (children === undefined) return [];
  return Array.isArray(children) ? children.flat() : [children];
}

export function jsx(type, props = {}, key) {
  const { children, ...rest } = props ?? {};
  return { type, props: { ...rest, children: normalizeChildren(children) }, key };
}

export const jsxs = jsx;
export { Fragment };

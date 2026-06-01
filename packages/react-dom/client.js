import { Fragment, resetHooks, runEffects, setRenderer } from '/node_modules/react/index.js';

function setProps(element, props) {
  Object.entries(props ?? {}).forEach(([name, value]) => {
    if (name === 'children' || value === undefined || value === null || value === false) return;
    if (name === 'className') {
      element.setAttribute('class', value);
      return;
    }
    if (name === 'htmlFor') {
      element.setAttribute('for', value);
      return;
    }
    if (name === 'style' && typeof value === 'object') {
      Object.assign(element.style, value);
      return;
    }
    if (name.startsWith('on') && typeof value === 'function') {
      element.addEventListener(name.slice(2).toLowerCase(), value);
      return;
    }
    if (typeof value === 'boolean') {
      if (value) element.setAttribute(name, '');
      return;
    }
    element.setAttribute(name, String(value));
  });
}

function renderNode(vnode) {
  if (vnode === null || vnode === undefined || vnode === false || vnode === true) {
    return document.createTextNode('');
  }
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    return document.createTextNode(String(vnode));
  }
  if (Array.isArray(vnode)) {
    const fragment = document.createDocumentFragment();
    vnode.forEach((child) => fragment.append(renderNode(child)));
    return fragment;
  }
  if (vnode.type === Fragment) {
    return renderNode(vnode.props.children);
  }
  if (typeof vnode.type === 'function') {
    return renderNode(vnode.type(vnode.props ?? {}));
  }
  const element = document.createElement(vnode.type);
  setProps(element, vnode.props);
  (vnode.props?.children ?? []).forEach((child) => element.append(renderNode(child)));
  return element;
}

export function createRoot(container) {
  let tree = null;
  const draw = () => {
    resetHooks();
    container.replaceChildren(renderNode(tree));
    runEffects();
  };
  setRenderer(draw);
  return {
    render(nextTree) {
      tree = nextTree;
      draw();
    },
  };
}

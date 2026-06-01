let hookState = [];
let hookIndex = 0;
let effects = [];
let renderer = null;

export const Fragment = Symbol('Fragment');
export const StrictMode = Fragment;

export function setRenderer(nextRenderer) {
  renderer = nextRenderer;
}

export function resetHooks() {
  hookIndex = 0;
  effects = [];
}

export function runEffects() {
  const pending = effects;
  effects = [];
  pending.forEach((effect) => effect());
}

export function useState(initialValue) {
  const currentIndex = hookIndex;
  if (hookState[currentIndex] === undefined) {
    hookState[currentIndex] = typeof initialValue === 'function' ? initialValue() : initialValue;
  }
  const setState = (nextValue) => {
    const previous = hookState[currentIndex];
    hookState[currentIndex] = typeof nextValue === 'function' ? nextValue(previous) : nextValue;
    if (!Object.is(previous, hookState[currentIndex]) && renderer) {
      renderer();
    }
  };
  hookIndex += 1;
  return [hookState[currentIndex], setState];
}

export function useEffect(effect, deps) {
  const currentIndex = hookIndex;
  const previousDeps = hookState[currentIndex];
  const changed = !deps || !previousDeps || deps.some((dep, index) => !Object.is(dep, previousDeps[index]));
  hookState[currentIndex] = deps;
  hookIndex += 1;
  if (changed) {
    effects.push(effect);
  }
}

export function useMemo(factory, deps) {
  const currentIndex = hookIndex;
  const previous = hookState[currentIndex];
  const changed = !previous || deps.some((dep, index) => !Object.is(dep, previous.deps[index]));
  if (changed) {
    hookState[currentIndex] = { deps, value: factory() };
  }
  hookIndex += 1;
  return hookState[currentIndex].value;
}

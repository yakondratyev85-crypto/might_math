declare module '*.css';

declare module 'react' {
  export function StrictMode(props: { children?: unknown }): unknown;
  export function useEffect(effect: () => void, deps?: unknown[]): void;
  export function useMemo<T>(factory: () => T, deps: unknown[]): T;
  export function useState<T>(initialValue: T | (() => T)): [T, (nextValue: T | ((current: T) => T)) => void];
}

declare module 'react-dom/client' {
  export function createRoot(container: Element): { render(tree: unknown): void };
}

declare module 'react/jsx-runtime' {
  export const Fragment: (props: { children?: unknown }) => unknown;
  export function jsx(type: unknown, props: unknown, key?: unknown): unknown;
  export function jsxs(type: unknown, props: unknown, key?: unknown): unknown;
}

declare module '@vitejs/plugin-react' {
  export default function react(): unknown;
}

declare module 'vite' {
  export function defineConfig(config: unknown): unknown;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elementName: string]: Record<string, unknown>;
  }
}

export function logger(level: 'info' | 'error' | 'warn', m: unknown) {
    console[level](m);
}
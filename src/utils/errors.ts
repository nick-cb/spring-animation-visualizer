export const noop = <T>(any: T): T => any;

export type DevMessage = (check: boolean, message: string) => void;

export let warning: DevMessage = noop;

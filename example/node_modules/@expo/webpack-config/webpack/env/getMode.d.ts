import { Mode } from '../types';
/**
 * Resolve the `mode` in a way that accounts for legacy treatment and environment variables.
 *
 * mode -> production -> development -> process.env.NODE_ENV -> 'development'
 * @category env
 */
export default function getMode({ production, development, mode, }: {
    production?: boolean;
    development?: boolean;
    mode?: string;
}): Mode;

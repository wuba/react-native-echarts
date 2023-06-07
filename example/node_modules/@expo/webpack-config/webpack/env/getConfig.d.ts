import { PWAConfig } from 'expo-pwa';
import { Environment } from '../types';
/**
 * Get the Expo project config in a way that's optimized for web.
 *
 * @param env Environment properties used for getting the Expo project config.
 * @category env
 */
declare function getConfig(env: Pick<Environment, 'projectRoot' | 'config'>): PWAConfig;
export default getConfig;

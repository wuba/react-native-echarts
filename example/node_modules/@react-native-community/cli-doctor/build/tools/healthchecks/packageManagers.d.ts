import { PACKAGE_MANAGERS } from '../checkInstallation';
import { HealthCheckInterface } from '../../types';
declare const packageManager: PACKAGE_MANAGERS | undefined;
declare const yarn: HealthCheckInterface;
declare const npm: HealthCheckInterface;
export { packageManager, yarn, npm };
//# sourceMappingURL=packageManagers.d.ts.map
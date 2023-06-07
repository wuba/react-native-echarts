import { Configuration } from 'webpack';
import { Arguments, Environment } from './types';
export default function (env: Environment, argv?: Arguments): Promise<Configuration>;

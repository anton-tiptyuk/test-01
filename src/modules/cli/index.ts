export * from './cli-command-invoker';

import { commandsByNames } from './commands';

export const commands = Object.values(commandsByNames);

import { Logger } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import { AbstractCliCommand } from './abstract-cli-command';
import { commandsByNames } from './commands';

export function CliCommandInvoker(
  moduleRef: ModuleRef,
  command: string,
  rest: string[],
) {
  const logger = new Logger(CliCommandInvoker.name);

  const commandHandlerClass = commandsByNames[command];

  if (commandHandlerClass) {
    logger.log(`Trying to perform ${command}`);

    const commandHandler = moduleRef.get<AbstractCliCommand>(
      commandHandlerClass,
      { strict: false },
    );
    if (rest.length < commandHandler.argNumber) {
      console.error(
        `(${command}) requires [${commandHandler.argList.join()}] argument(s).`,
      );
      const { extraArgsInfo } = commandHandler;
      if (extraArgsInfo) console.log(extraArgsInfo);
    } else {
      return commandHandler.invoke(rest);
    }
  } else {
    if (command) console.log(`Command not found: ${command}`);
    console.log('Known commands:');
    console.log(Object.keys(commandsByNames));
  }
}

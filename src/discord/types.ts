import { Message } from 'discord.js';

export interface Command {
  msg: Message;
  command: string;
  args: string[];
}

export type CommandHandler = (cmd: Command) => Promise<void>;
export interface AvailableCommand {
  handler: CommandHandler;
  triggers: string[];
}

import { Message } from 'discord.js';

export const embedMessage = async (
  message: Message,
  title: string,
  description: string,
): Promise<void> => {
  const embed = new MessageEmbed()
    .setTitle(title)
    .setColor(0xff0000)
    .setDescription(description);
  await message.channel.send(embed);
};

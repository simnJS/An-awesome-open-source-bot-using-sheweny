import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { Message, TextChannel, MessageEmbed } from "discord.js";

export class MessageCreateEvent extends Event {
  constructor(client: ShewenyClient) {
    super(client, "messageCreate", {
      description: "message created",
    });
  }

  async execute(message: Message) {
    const settings = await this.client.db.get(message.guild!.id);
    const channel = await (message.guild!.channels.cache.find(c => c.id === settings.suggestChannel) as TextChannel)

    if (!channel) return;
    if (message.author.bot) return;

    if (message.channel === channel) {
      const threadAuthor = message.member!.displayName;

      const suggestEmbed = new MessageEmbed()
        .setColor('#FEE75C')
        .setTitle(`Nouvelle suggestion de ${message.author.username}`)
        .setDescription(message.content)
        .setTimestamp()


      await message.reply({ embeds: [suggestEmbed] }).then(function (message) {
        message.react("👍")
        message.react("👎")
        message.startThread({
          name: `${threadAuthor}-suggestion`,
          autoArchiveDuration: "MAX",
        });
      });

      message.delete();
    };
  }
}


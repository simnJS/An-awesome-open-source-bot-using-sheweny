import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { Message, TextChannel, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export class MessageCreateEvent extends Event {
  constructor(client: ShewenyClient) {
    super(client, "messageCreate", {
      description: "message created",
      
    });
  }

  async execute(message: Message) {

    if (message.author.bot || !message.guild) return;

    const settings = await this.client.db.get(message.guild!.id).catch(() => null);
    const channel = await (message.guild!.channels.cache.find(c => c.id === settings.suggestChannel) as TextChannel)
    console.log('1')
    if (!channel) return;
    if (settings.suggestion === false) return;
    if (message.author.bot) return;
    console.log('1')
    if (message.channel === channel) {
      const threadAuthor = message.member!.displayName;
      console.log('1')
      const suggestEmbed = new EmbedBuilder()
        .setColor('#FEE75C')
        .setTitle(`Nouvelle suggestion de ${message.author.username}`)
        .setDescription(message.content)
        .setTimestamp()

        const raw = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
          new ButtonBuilder()
            .setCustomId(`accepter`)
            .setLabel(`Accepter`)
            .setStyle(ButtonStyle.Success)
        )
        .addComponents(
          new ButtonBuilder()
            .setCustomId(`refuser`)
            .setLabel(`Refuser`)
            .setStyle(ButtonStyle.Danger)
        )
        console.log('1')
      await message.reply({ embeds: [suggestEmbed], components: [raw] }).then(function (message) {
        message.react("👍")
        message.react("👎")
        message.startThread({
          name: `${threadAuthor}-suggestion`,
          autoArchiveDuration: 4320,
        });
      });

      await message.delete();
    };
  }
}


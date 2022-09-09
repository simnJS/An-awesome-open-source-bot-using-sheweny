import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { Message, TextChannel, EmbedBuilder } from "discord.js";

export class MessageDeleteEvent extends Event {
  constructor(client: ShewenyClient) {
    super(client, "messageDelete", {
      description: "message Deleted",
    });
  }

  async execute(message: Message) {
    // const { content, channel, author, guild, mentions, cleanContent } = message;

    // if (author.bot ) return
    
    // const settings = await this.client.db.get(guild!.id);

    // if (!settings) return;
    // if (settings.ghost === false) return;



    // const logChannel = await (guild!.channels.cache.find(c => c.id === settings.ghostChannel) as TextChannel)
    // if (!logChannel) return;

    // console.log(content)
    // if (!author || mentions.users.size === 0 || content.length > 500)  {
    //     return
    // }
    // const ghostEmbed = new EmbedBuilder()
    //     .setColor('#FEE75C')
    //     .setTitle(`Possible ghost ping détecté`)
    //     .setDescription(`Message: ${cleanContent} \nAuteur: ${author}\nChannel: ${channel}`)
  
    // await logChannel.send({ embeds: [ghostEmbed] });
    }
}

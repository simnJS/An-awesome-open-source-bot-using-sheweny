import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import {
  GuildMember,
  EmbedBuilder,
  TextChannel,
  RoleResolvable,
  GuildMemberRoleManager,
} from "discord.js";

export class GuildMemberAddEvent extends Event {
  constructor(client: ShewenyClient) {
    super(client, "guildMemberRemove", {
      description: "A member left the server.",
    });
  }

  async execute(member: GuildMember) {
    const settings = await this.client.db.get(member.guild!.id);
    if (member.user.bot) return;
    try {
      if (settings.welcome === false) return
        const channel = await (member.guild!.channels.cache.find(
          (c) => c.id === settings.welcomeChannel
        ) as TextChannel);
        if (!channel) return;

        const embed = new EmbedBuilder()
          .setTitle(`${member.user.username} à quitter le serveur !`)
          .setDescription(
            `Nous sommes maintenant ${
              member.guild!.memberCount
            } membres sur le serveur.`
          )
          .setImage(
            member.user.displayAvatarURL({ extension: "png",  })
          )
          .setColor("#FEE75C")
          .setTimestamp();
        await channel.send({ embeds: [embed] });
    } catch (e) {
      console.log(e);
    }
  }
}

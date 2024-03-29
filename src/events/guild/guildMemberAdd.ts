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
    super(client, "guildMemberAdd", {
      description: "new member",
    });
  }

  async execute(member: GuildMember) {
    const settings = await this.client.db.get(member.guild!.id);

    try {
      if (settings.welcome === false) return
        const channel = await (member.guild!.channels.cache.find(
          (c) => c.id === settings.welcomeChannel
        ) as TextChannel);
        if (!channel) return;

        const embed = new EmbedBuilder()
          .setTitle(`${member.user.username} vient de rejoindre le serveur !`)
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

    if (settings.autorole === "true") {
      try {
        const role = settings.autoroleRole;
        let roleToAdd = member.guild!.roles.cache.find(
          (r) => r.id === `${role}`
        ) as RoleResolvable;

        (member?.roles as GuildMemberRoleManager).add(roleToAdd);
      } catch (e) {
        console.log(e);
      }
    }
  }
}

import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import {
  ApplicationCommandOptionType,
  CommandInteraction,
  EmbedBuilder,
  GuildMember,
} from "discord.js";
import { cpSync } from "fs";

export class User extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      type: "SLASH_COMMAND",
      name: "user",
      description: "Information d'un utilisateur",
      category: "Information",
      cooldown: 10,
      clientPermissions: ["SendMessages"],
      options: [
        {
          name: "user",
          description: "L'utilisateur",
          type: ApplicationCommandOptionType.User,
          required: false,
        },
      ],
    });
  }
  async execute(interaction: CommandInteraction) {
    const crayon = this.client.emojis.cache.get("1019644082710130759");
    const id = this.client.emojis.cache.get("1019652479757066301");
    const carteid = this.client.emojis.cache.get("1019926978595401808");
    const ordi = this.client.emojis.cache.get("1019928553120346144");
    const calendrier = this.client.emojis.cache.get("1020021313491976293");
    const fleche = this.client.emojis.cache.get("1020021910588899348");

    if (!interaction.options.getUser("user")) {
      const user = await interaction.member as GuildMember;

      const data = user.presence?.clientStatus!;
      const test = `${data.desktop ? "🖥️ Ordinateur |" : ""} ${data.mobile ? "📱 Mobile |" : ""} ${data.web ? "🌐 Navigateur |" : ""}`


      let status = ""
      if (user.presence?.status === "dnd") status = "🔴"
      if (user.presence?.status === "idle") status = "🟠"
      if (user.presence?.status === "online") status = "🟢"
      if (user.presence?.status === "offline") status = "⚫"


      const embed = new EmbedBuilder()
        .setAuthor({ name: user.user.tag, iconURL: user.displayAvatarURL() })
        .addFields(
          {
            name: "» User",
            value: `
            >>> ${crayon} **Pseudo**  » \`${user.user.username}\` 
            ${id} **Identifiant**  » \`${user.id}\`
            ${carteid} **Rôle supérieur**  » \`${user.roles.highest.name}\` `,
            inline: true,
          },
          {
            name: "» Compte",
            value: `
            >>> ${calendrier} **Création**  » <t:${Math.floor(user.user.createdTimestamp / 1000)}:f>
                ${fleche} **Arrivée**  » <t:${Math.floor(user.joinedTimestamp! / 1000)}:f>
            
            `,
            inline: true,
          },
          {
            name: "» Presence",
            value: `
            >>> ${ordi} **Plateforme**  » \`${test}${status}\``,
            inline: false,
          }
        )
        .setColor("#36393f");
      await interaction.reply({ embeds: [embed] });
    }
    if (interaction.options.getUser("user")) {
      const user = await interaction.options.getMember("user") as GuildMember;

      const data = user.presence?.clientStatus!;
      const test = `${data.desktop ? "🖥️ Ordinateur |" : ""} ${data.mobile ? "📱 Mobile |" : ""} ${data.web ? "🌐 Navigateur |" : ""}`


      let status = ""
      if (user.presence?.status === "dnd") status = "🔴"
      if (user.presence?.status === "idle") status = "🟠"
      if (user.presence?.status === "online") status = "🟢"
      if (user.presence?.status === "offline") status = "⚫"


      const embed = new EmbedBuilder()
        .setAuthor({ name: user.user.tag, iconURL: user.displayAvatarURL() })
        .addFields(
          {
            name: "» User",
            value: `
            >>> ${crayon} **Pseudo**  » \`${user.user.username}\` 
            ${id} **Identifiant**  » \`${user.id}\`
            ${carteid} **Rôle supérieur**  » \`${user.roles.highest.name}\` `,
            inline: true,
          },
          {
            name: "» Compte",
            value: `
            >>> ${calendrier} **Création**  » <t:${Math.floor(user.user.createdTimestamp / 1000)}:f>
                ${fleche} **Arrivée**  » <t:${Math.floor(user.joinedTimestamp! / 1000)}:f>
            
            `,
            inline: true,
          },
          {
            name: "» Presence",
            value: `
            >>> ${ordi} **Plateforme**  » \`${test}${status}\``,
            inline: false,
          }



        )
        .setColor("#36393f");

      console.log(user.presence?.clientStatus)
      await interaction.reply({ embeds: [embed] });
    }
  }
}

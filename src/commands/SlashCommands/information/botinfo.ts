import { ShewenyClient, Command } from "sheweny";
import { CommandInteraction, EmbedBuilder, GuildMember, version } from "discord.js";
import { timeformat } from "../../../utils/miscutils"
import dotenv from "dotenv";
dotenv.config();
export class InfoCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "botinfo",
      description: "Vous permet d'obtenir des informations sur le bot.",
      type: "SLASH_COMMAND",
      category: "Informations",
      cooldown: 10,
      clientPermissions: ["SendMessages"],
    });
  }

  async execute(interaction: CommandInteraction) {
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Informations sur le bot.")
          .setColor("#0099ff")
          .addFields(
            { name: "Nom", value: `\`\`\`${this.client.user?.username}\`\`\``, inline: true },
            { name: "Version", value: `\`\`\`${process.env.BOT_VERSION}\`\`\``, inline: true },
            { name: "Créateur", value: "\`\`\`simnJS#2697\`\`\`", inline: true },
            { name: "Ping", value: `\`\`\`${this.client.ws.ping}ms\`\`\``, inline: true },
            { name: "Uptime", value: `\`\`\`${timeformat(process.uptime())}\`\`\``, inline: true },
            { name: "Nombre de serveurs", value: `\`\`\`${this.client.guilds.cache.size}\`\`\``, inline: true },
            { name: "Nombre de membres", value: `\`\`\`${this.client.guilds.cache.reduce((a,b) => a + b.memberCount, 0).toLocaleString()}\`\`\``, inline: true },
            { name: "Nombre de commandes", value: `\`\`\`${this.client.application?.commands.cache.size}\`\`\``, inline: true },
            { name: "Discord.js", value: `\`\`\`${version} (sheweny)\`\`\``, inline: true },
          ),
      ], ephemeral: true,

    });
    
  }
}

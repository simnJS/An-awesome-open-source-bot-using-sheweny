import { ShewenyClient, Command } from "sheweny";
import { CommandInteraction, EmbedBuilder, GuildMember, version } from "discord.js";
const moment = require('moment');
import dotenv from "dotenv";
dotenv.config();
export class ServerCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "serverinfo",
      description: "Vous permet d'obtenir des informations sur le serveur.",
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
          .setTitle("Informations sur le serveur.")
          .setColor("#0099ff")
          .addFields(
            { name: "Nom", value: `\`\`\`${interaction.guild?.name}\`\`\``, inline: true },
            { name: "Owner", value: `\`\`\`${interaction.guild?.ownerId}\`\`\``, inline: true },
            { name: "Nombre de membres", value: `\`\`\`${interaction.guild?.memberCount}\`\`\``, inline: true },
            { name: "Nombre de channel", value: `\`\`\`${interaction.guild?.channels.cache.size}\`\`\``, inline: true },
            { name: "Créer le", value: `\`\`\`${moment(interaction.guild?.createdAt).format('DD/MM/YY')}\`\`\``, inline: true },
            { name: "Boost", value: `\`\`\`${interaction.guild?.premiumSubscriptionCount}\`\`\``, inline: true },
            { name: "Nombre de roles", value: `\`\`\`${interaction.guild?.roles.cache.size}\`\`\``, inline: true },
            { name: "Nombre de salons", value: `\`\`\`${interaction.guild?.channels.cache.size}\`\`\``, inline: true },
            { name: "Nombre d'emojis", value: `\`\`\`${interaction.guild?.emojis.cache.size}\`\`\``, inline: true },
          ),
      ],ephemeral: true,
    });
  }
}

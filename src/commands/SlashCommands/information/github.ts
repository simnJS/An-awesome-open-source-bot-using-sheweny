import { ShewenyClient, Command } from "sheweny";
import {
  CommandInteraction,
  EmbedBuilder,
  GuildMember,
  Message,
  BaseGuildTextChannel,
} from "discord.js";

export class GithubCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "source-code",
      description: "Affiche le lien vers le code source du bot.",
      type: "SLASH_COMMAND",
      category: "Information",
      cooldown: 10,
      clientPermissions: ["SendMessages"],
    });
  }

  async execute(interaction: CommandInteraction) {
    console.log("Commande source-code");
    interaction.reply({
      embeds: [new EmbedBuilder()
        .setTitle("Lien vers le code source du bot.")
        .setColor("#0099ff")
        .addFields(
            { name: "Lien", value: '[Le github](https://github.com/simnJS/An-awesome-open-source-bot-using-sheweny)', inline: true },
        ),
    ],ephemeral: true,
    });
  }
}

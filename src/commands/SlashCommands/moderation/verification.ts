import { ShewenyClient, Command } from "sheweny";
import {
  CommandInteraction,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";

export class UnlockCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "deploy_verification",
      description: "Vous permet de déployer la verification.",
      type: "SLASH_COMMAND",
      category: "Moderation",
      cooldown: 0,
      userPermissions: ["ManageChannels"],
      clientPermissions: ["ManageChannels"],
    });
  }

  async execute(interaction: CommandInteraction) {

    const settings = await this.client.db.get(interaction.guild!.id);

    if (settings.verification === "false") {
        interaction.reply("La vérification est désactivé.");
        return;
    }

    if (!settings.verificationRole) {
        interaction.reply("Il n'y a pas de roles définis.");
        return;
    }

    const raw = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setCustomId(`verif`)
          .setLabel(`Vérifier`)
          .setStyle(ButtonStyle.Primary)
      )

                

    await interaction.reply({ content: 'Succesfully send', ephemeral:true })
    await interaction.channel?.send({ content: 'Cliquer sur le bouton ci-dessous pour passer la vérification !', components: [raw] }).catch(() => {interaction.reply("Une erreur est survenue.")});
  }
}

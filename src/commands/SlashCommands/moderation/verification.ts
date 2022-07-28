import { ShewenyClient, Command } from "sheweny";
import {
  CommandInteraction,
  MessageActionRow,
  MessageButton,
} from "discord.js";

export class UnlockCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "deploy_verification",
      description: "Vous permet de déployer la verification.",
      type: "SLASH_COMMAND",
      category: "Moderation",
      cooldown: 0,
      userPermissions: ["MANAGE_CHANNELS"],
      clientPermissions: ["MANAGE_CHANNELS"],
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

    const raw = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId(`verif`)
          .setLabel(`Vérifier`)
          .setStyle('PRIMARY')
      )

                

    await interaction.reply({ content: 'Succesfully send', ephemeral:true })
    await interaction.channel?.send({ content: 'Cliquer sur le bouton ci-dessous pour passer la vérification !', components: [raw] }).catch(() => {interaction.reply("Une erreur est survenue.")});
  }
}

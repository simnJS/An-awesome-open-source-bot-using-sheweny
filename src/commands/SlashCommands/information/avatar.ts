import { ShewenyClient, Command } from "sheweny";
import { CommandInteraction, MessageEmbed, GuildMember, version } from "discord.js";
export class AvatarCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "server_avatar",
      description: "Récupérer l'avatar actuel du serveur.",
      type: "SLASH_COMMAND",
      category: "Information",
      cooldown: 0,
      clientPermissions: ["SEND_MESSAGES"],
    });
  }

  async execute(interaction: CommandInteraction) {
    console.log(interaction.guild?.iconURL())
    interaction.reply({
      embeds: [
        new MessageEmbed()
        .setTitle(`[Voir la version original](${interaction.guild?.iconURL()})`)
        .setImage(`${interaction.guild?.iconURL({format: "png", dynamic: true, size: 1024})}`)
        .setColor("#0099ff")
      ],
    });
  }
}

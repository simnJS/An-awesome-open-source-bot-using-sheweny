import { ShewenyClient, Command } from "sheweny";
import { CommandInteraction, EmbedBuilder, GuildMember, TextChannel, ApplicationCommandOptionType,CommandInteractionOptionResolver } from "discord.js";
import dotenv from "dotenv";
dotenv.config();
export class KickCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "kick",
      description: "Vous permet de kick une personne du discord.",
      type: "SLASH_COMMAND",
      category: "Moderation",
      cooldown: 0,
      userPermissions: ["KickMembers"],
      clientPermissions: ["KickMembers"],
      options: [
        {
          name: "user",
          description: "L'utilisateur à kick.",
          type: ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: "notification",
          description: "Envoyer une notification à l'utilisateur kick.",
          type: ApplicationCommandOptionType.Boolean,
          required: true,
        },
        {
          name: "reason",
          description: "La raison du kick.",
          type: ApplicationCommandOptionType.String,
          required: false,
        },
      ],
    });
  }

  async execute(interaction: CommandInteraction) {
    const guildMember = (interaction.options as CommandInteractionOptionResolver).getMember("user") as GuildMember;
    const reason = (interaction.options as CommandInteractionOptionResolver).getString("reason");
    const notification = (interaction.options as CommandInteractionOptionResolver).getBoolean("notification");

    if (!guildMember.kickable) {
      interaction.reply('Vous ne pouvez pas kick cette personne.')
      return
    }


    if (notification == true) {
      try {
        await guildMember.send({
          embeds: [
            new EmbedBuilder()
            .setTitle(`Vous avez été kick du serveur ${interaction.guild!.name}.`)
            .setDescription(`Raison: ${reason} ! `)
            .setColor("#8e48f7")
            .setFooter({text: `Sanction appliqué par ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL()})
            .setTimestamp()
          ],
        });
      } catch (err) {
        err;
      }
    }
    interaction.reply({content: `${guildMember.user.tag} a été kick pour la raison ${reason}.` , ephemeral: true})
    await guildMember.kick();
    
    const settings = await this.client.db.get(interaction.guild!.id);
    if (settings.logs === false) return;
    const logChannel = await (interaction.guild!.channels.cache.find(c => c.id === settings.modChannel) as TextChannel)

    if (!logChannel) return;

    logChannel.send({content:`${interaction.user.username} a kick ${guildMember.user.tag} pour la raison ${reason}`});
    
  }
}

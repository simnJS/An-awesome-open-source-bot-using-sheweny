import { ShewenyClient, Command } from "sheweny";
import { CommandInteraction, MessageEmbed, GuildMember, TextChannel } from "discord.js";
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
      userPermissions: ["KICK_MEMBERS"],
      clientPermissions: ["KICK_MEMBERS"],
      options: [
        {
          name: "user",
          description: "L'utilisateur à kick.",
          type: "USER",
          required: true,
        },
        {
          name: "notification",
          description: "Envoyer une notification à l'utilisateur kick.",
          type: "BOOLEAN",
          required: true,
        },
        {
          name: "reason",
          description: "La raison du kick.",
          type: "STRING",
          required: false,
        },
      ],
    });
  }

  async execute(interaction: CommandInteraction) {
    const user = interaction.options.getMember("user")
    const guildMember = user as GuildMember;
    const reason = interaction.options.getString("reason")!;
    const notification = interaction.options.getBoolean("notification");

    if (!guildMember.kickable) {
      interaction.reply('Vous ne pouvez pas kick cette personne.')
      return
    }


    if (notification == true) {
      try {
        await guildMember.send({
          embeds: [
            new MessageEmbed()
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

    (interaction.guild!.channels.cache.get(`${process.env.LOG_CHANNEL}`) as TextChannel).send(`${interaction.user.username} a kick ${guildMember.user.tag} pour la raison ${reason}`);
    
  }
}

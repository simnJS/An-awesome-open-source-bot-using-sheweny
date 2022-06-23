import { ShewenyClient, Command } from "sheweny";
import { CommandInteraction, MessageEmbed, GuildMember, TextChannel, MessageActionRow, MessageButton } from "discord.js";
import dotenv from "dotenv";
dotenv.config();
export class BanCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "ban",
      description: "Vous permet de bannir une personne du discord.",
      type: "SLASH_COMMAND",
      category: "Moderation",
      cooldown: 0,
      userPermissions: ["BAN_MEMBERS"],
      clientPermissions: ["BAN_MEMBERS"],
      options: [
        {
          name: "user",
          description: "L'utilisateur à bannir.",
          type: "USER",
          required: true,
        },
        {
          name: "notification",
          description: "Envoyer une notification à l'utilisateur banni.",
          type: "BOOLEAN",
          required: true,
        },
        {
          name: "reason",
          description: "La raison du ban.",
          type: "STRING",
          required: true,
        },
      ],
    });
  }

  async execute(interaction: CommandInteraction) {
    const user = interaction.options.getMember("user")
    const guildMember = user as GuildMember;
    const reason = interaction.options.getString("reason")!;
    const notification = interaction.options.getBoolean("notification");

    if (!guildMember.bannable) {
      interaction.reply('Vous ne pouvez pas ban cette personne.')
      return
    }

    if (notification == true) {
      try {
        await guildMember.send({
          embeds: [
            new MessageEmbed()
            .setTitle(`Vous avez été banni du serveur ${interaction.guild!.name}.`)
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

    const embed = new MessageEmbed()
      .setTitle(`Information`)
      .setDescription(`${guildMember.user.tag} a été banni pour la raison ${reason}.`)
      .setColor("#0099ff")
      .setTimestamp()

      const raw = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId(`ban--${guildMember.id}`)
          .setLabel(`Unban ${guildMember.user.username}`)
          .setStyle('DANGER')
        )




    interaction.reply({embeds: [embed], components: [raw], ephemeral: true})
    await guildMember.ban({
      reason: reason!,
    });

    (interaction.guild!.channels.cache.get(`${process.env.LOG_CHANNEL!}`) as TextChannel).send(`${interaction.user.username} a ban ${guildMember.user.tag} pour la raison ${reason}`)

  }
}

import { ShewenyClient, Command } from "sheweny";
import { CommandInteraction, MessageEmbed, GuildMember, TextChannel, MessageActionRow, MessageButton } from "discord.js";
import moment from "moment";
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
          name: "reason",
          description: "La raison du ban.",
          type: "STRING",
          required: true,
        },
      ],
    });
  }

  async execute(interaction: CommandInteraction) {
    const user = interaction.options.getMember("user")!
    const guildMember = user as GuildMember;
    const reason = interaction.options.getString("reason")!;

    const settings = await this.client.db.get(interaction.guild!.id);
    if (!guildMember.bannable) {
      interaction.reply('Vous ne pouvez pas ban cette personne.')
      return
    }

    try {
      await guildMember.send({
        embeds: [
          new MessageEmbed()
            .setTitle(`Vous avez été banni du serveur ${interaction.guild!.name}.`)
            .setDescription(`Raison: ${reason} ! `)
            .setColor("#8e48f7")
            .setFooter({ text: `Sanction appliqué par ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp()
        ],
      });
    } catch (err) {
      err
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
    const banArray = settings.bans;

    const ban = {
      case: (banArray.length + 1),
      name: guildMember.displayName,
      id: guildMember.id,
      moderator: interaction.user.tag,
      reason: reason,
      date: moment().format("DD/MM/YYYY - HH:mm")
    }

    banArray.push(ban);
    await this.client.db.update(`${interaction.guild!.id}`, { bans: banArray });

    interaction.reply({ embeds: [embed], components: [raw], ephemeral: true })
    // await guildMember.ban({
    //   reason: reason!,
    // });



    if (settings.logs === false) return;
    const channel = await (interaction.guild!.channels.cache.find(c => c.id === settings.modChannel) as TextChannel)

    if (!channel) return;

    (interaction.guild!.channels.cache.get(`${channel}`) as TextChannel)?.send(`${interaction.user.username} a ban ${guildMember.user.tag} pour la raison ${reason}`)

  }
}

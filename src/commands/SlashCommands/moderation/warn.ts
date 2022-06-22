import { Command, ShewenyClient } from "sheweny";
import { GuildMember, MessageEmbed } from "discord.js";
import type { CommandInteraction } from "discord.js";
import moment from "moment";
export class WarnCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "warn",
      description: "Warn member of the guild",
      category: "Moderation",
      type: "SLASH_COMMAND",
      channel: "GUILD",
      options: [
        {
          name: "user",
          type: "USER",
          description: "The user to warn",
          required: true,
        },
        {
          name: "reason",
          description: "The reason of warn",
          type: "STRING",
          required: false,
        },
      ],
      userPermissions: ["BAN_MEMBERS"],
    });
  }
  async execute(interaction: CommandInteraction) {
    
    const settings = await this.client.db.get(interaction.guildId!);
    const member = interaction.options.getMember("user") as GuildMember;
    if (!member)
      return interaction.reply({
        content: `User not found.`,
        ephemeral: true,
      });

    const reason: string =
      interaction.options.getString("reason") || "No reason was provided.";

    const embed = new MessageEmbed()
        .setAuthor({name: member.user.tag, iconURL: member.user.displayAvatarURL()})
        .setColor("#ff0000")
        .setDescription(`**Membre**: ${member.user.tag} (${member.user.id})
        **Action**: Warn
        **Raison**: ${reason}`);

    const userArray = settings.users;  

    const user= {
        case: (userArray.length + 1),
        name: member.displayName,
        id: member.id,
        moderator: interaction.user.tag,
        reason: reason,
        date: moment().format("DD/MM/YYYY - HH:mm")
    }

    userArray.push(user);
    await this.client.db.update(`${interaction.guild!.id}`, {users: userArray});
    await interaction.reply({content : `La commande warn a été éxécutée avec succès !` , embeds : [embed] , ephemeral: true});
  }
}
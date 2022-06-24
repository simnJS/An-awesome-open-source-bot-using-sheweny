import { Command, ShewenyClient } from "sheweny";
import { GuildMember, TextChannel } from "discord.js";
import type { CommandInteraction } from "discord.js";
export class WarnCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "lswarn",
      description: "Chercher les warns d'un utilisateur",
      category: "Moderation",
      type: "SLASH_COMMAND",
      channel: "GUILD",
      options: [
        {
          name: "user",
          type: "USER",
          description: "L'utilisateur à chercher",
          required: true,
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

      const filteredUser = settings.users.filter((u : any) => u.id == member.id);
      if (filteredUser.length == 0) return interaction.reply('Cette utilisateur n\'a pas de warns !');

      let warnList = `Liste des warns pour \`${member.user.tag}\` (**${member.id}**) : \n`;

      for (let warn of filteredUser) {
        warnList += `\n**${warn.case}** - Par \`${warn.moderator}\` - (le ${warn.date}). Raison: \`${warn.reason}\``;
      }

    await interaction.reply(warnList);

  }
}
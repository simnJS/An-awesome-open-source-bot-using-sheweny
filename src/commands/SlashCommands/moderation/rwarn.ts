import { Command, ShewenyClient } from "sheweny";
import { GuildMember } from "discord.js";
import type { CommandInteraction } from "discord.js";
export class RwarnCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "rwarn",
      description: "Supprime un warn",
      category: "Moderation",
      type: "SLASH_COMMAND",
      channel: "GUILD",
      options: [
        {
          name: "id",
          type: "NUMBER",
          description: "L'id du warn à supprimer",
          required: true,
        },
      ],
      userPermissions: ["BAN_MEMBERS"],
    });
  }
  async execute(interaction: CommandInteraction) {
    
    const settings = await this.client.db.get(interaction.guildId!);
    const idWarn = interaction.options.getNumber("id");

      const filteredId = settings.users.map((u : any) => u.case).indexOf(idWarn);
        if (filteredId == -1) return interaction.reply('Ce warn n\'existe pas !');

      settings.users.splice(filteredId, 1);

      await this.client.db.update(interaction.guild!.id, { users: settings.users});
    await interaction.reply(`Le warn ${idWarn} a bien été supprimé.`);
  }
}
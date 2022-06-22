import { Command, ShewenyClient } from "sheweny";
import type { CommandInteraction } from "discord.js";
import dotenv from "dotenv";
dotenv.config();
export class RestartCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "restart",
      description: "Redémarre le bot.",
      category: "Moderation",
      adminsOnly: true,
      type: "SLASH_COMMAND",
      channel: "GUILD",
    });
  }
  async execute(interaction: CommandInteraction) {
    await this.client.managers.commands?.deleteAllCommands(`${process.env.GUILD_ID}`)
    await interaction.reply("Redémarrage en cours...");
    return process.exit();

  }
}
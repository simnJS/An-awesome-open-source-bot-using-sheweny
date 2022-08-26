import { ShewenyClient } from "sheweny";
import { Partials } from "discord.js"
import dotenv from "dotenv";
import { DatabaseProvider } from "../utils/Database";
dotenv.config();

export default class Safia extends ShewenyClient {
  public db: DatabaseProvider;
  constructor() {
    super({
      admins: ["973339571683217408"],
      mode: "production",
      allowedMentions: {
        parse: ["roles", "users"],
      },
      intents: ["Guilds", "GuildMembers", "GuildMessages", "MessageContent"],
      partials: [Partials.GuildMember],
      joinThreadsOnCreate: true,
      presence: {
        status: "online",
        activities: [
          {
            name: "safia-bot.xyz",
          },
        ],
      },
      managers: {
        commands: {
          directory: "./commands",
          autoRegisterApplicationCommands: true,
          applicationPermissions: true,
          prefix: "!",
          default: {
            userPermissions: ["ViewChannel"],
            category: "Other",
            channel: "GUILD",
            cooldown: 3,
          },
        },
        events: {
          directory: "./events",
        },
        selectMenus: {
          directory: "./interactions/selectmenus",
        },
        buttons: {
          directory: "./interactions/buttons",
        },
      },
    });
    this.db = new DatabaseProvider();
  }
}

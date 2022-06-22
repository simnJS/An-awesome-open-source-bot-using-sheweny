import { ShewenyClient } from "sheweny";
import { Intents } from "discord.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
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
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MEMBERS,
      ],
      partials: ["CHANNEL", "MESSAGE", "REACTION", "USER", "GUILD_MEMBER"],
      presence: {
        status: "online",
        activities: [
          {
            name: "Safia bot",
            type: "WATCHING",
          },
        ],
      },
      managers: {
        commands: {
          directory: "./commands",
          autoRegisterApplicationCommands: true,
          loadAll: true,
          default: {
            category: "Other",
            channel: "GUILD",
            cooldown: 3,
          },
        },
        events: {
          directory: "./events",
          loadAll: true,
        },
        inhibitors: {
          directory: "./inhibitors",
          loadAll: true,
        },
        selectMenus: {
          directory: "./interactions/selectmenus",
          loadAll: true,
        },
        buttons: {
          directory: "./interactions/buttons",
          loadAll: true,
        },
      },
    });
    this.db = new DatabaseProvider();
  }
}

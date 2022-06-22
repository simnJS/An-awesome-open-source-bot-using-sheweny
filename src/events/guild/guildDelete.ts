import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { Guild } from "discord.js";


export class GuildEvent extends Event {
  constructor(client: ShewenyClient) {
    super(client, "guildDelete", {
      description: "New guild ! ",
    });
  }

  async execute(guild: Guild) {
    console.log(`removed a guild ! ${guild.name} (${guild.id})`);
    await this.client.db.delete(guild.id);
  }
};

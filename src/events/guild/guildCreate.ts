import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { Guild } from "discord.js";


export class GuildEvent extends Event {
  constructor(client: ShewenyClient) {
    super(client, "guildCreate", {
      description: "New guild ! ",
    });
  }

  async execute(guild: Guild) {
    
    console.log(`New guild ! ${guild.name} (${guild.id})`);
    await this.client.db.post({ guildId: guild.id, name: guild.name });
  }
};

import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { Guild, EmbedBuilder } from "discord.js";

export class GuildEvent extends Event {
  constructor(client: ShewenyClient) {
    super(client, "guildCreate", {
      description: "New guild ! ",
    });
  }

  async execute(guild: Guild) {
    console.log(`New guild ! ${guild.name} (${guild.id})`);
    await this.client.db.post({ guildId: guild.id, name: guild.name });

    const guildOwner = await guild.members.fetch(guild.ownerId);
    const owner = guildOwner.user;

    try {
      const embed = new EmbedBuilder()
        .setTitle("Merci d'avoir ajouté le bot !")
        .setDescription(
          "Pour configurer le bot, faites `/config + la configuration`"
        )
        .setColor("#00FF00")
        .setTimestamp();

      await owner.send({ embeds: [embed] });
    } catch (error) {
      console.log(error);
    }
  }
}

import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { CommandInteraction } from "discord.js";

export class InteractionCreateEvent extends Event {
  constructor(client: ShewenyClient) {
    super(client, "interactionCreate", {
      description: "Interaction created",
    });
  }

  async execute(interaction: CommandInteraction) {
    let guildSettings = await this.client.db.get(interaction.guild!.id!);


    if (!guildSettings) {
      await this.client.db.post({
        guildId: interaction.guild!.id,
        name: interaction.guild!.name,
      });
        guildSettings = await this.client.db.get(interaction.guildId!);
        return interaction.reply({content: "Le bot a mis a jour la base de données pour ce serveur merci de retapez la commande."})


    }
  }
}

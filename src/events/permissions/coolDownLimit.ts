import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { CommandInteraction } from "discord.js";
export class interactionCommandCreate extends Event {
  constructor(client: ShewenyClient) {
    super(client, "cooldownLimit", {
      description: "cooldownLimit.",
      once: false,
      emitter: client.managers.commands,
    });
  }

  async execute(interaction: CommandInteraction, time: number) {
    interaction.reply({
      content: `Vous devez attendre ${(time/10000)} secondes !`,
      ephemeral: true,
    });
  }
}
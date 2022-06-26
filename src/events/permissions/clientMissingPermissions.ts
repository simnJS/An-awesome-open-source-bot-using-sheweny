import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { CommandInteraction } from "discord.js";
export class interactionCommandCreate extends Event {
  constructor(client: ShewenyClient) {
    super(client, "clientMissingPermissions", {
      description: "client Missing Permissions.",
      once: false,
      emitter: client.managers.commands,
    });
  }

  async execute(interaction: CommandInteraction, missing: string) {
    interaction.reply({
      content: `Le bot à besoin de la permission ${missing} !`,
      ephemeral: true,
    });
  }
}
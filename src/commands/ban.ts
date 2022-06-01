import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { CommandInteraction, MessageEmbed } from "discord.js";

export class PingCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "ban",
      description: "Vous permet de bannir une personne du discord.",
      type: "SLASH_COMMAND",
      category: "Moderation",
      cooldown: 0,
      userPermissions: ["BAN_MEMBERS"],
      clientPermissions: ["BAN_MEMBERS"],
      options: [
        {
          name: "user",
          description: "L'utilisateur à bannir.",
          type: "USER",
          required: true,
        },
        {
          name: "notification",
          description: "Envoyer une notification à l'utilisateur banni.",
          type: "BOOLEAN",
          required: true,
        },
        {
          name: "reason",
          description: "La raison du ban.",
          type: "STRING",
          required: false,
        },
      ],
    });
  }

  async execute(interaction: CommandInteraction) {
    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason");
    const notification = interaction.options.getBoolean("notification");

    if (notification == !true) {
      try {
        await user!.send({
          embeds: [
            new MessageEmbed()
            .setTitle(`Vous avez été banni du serveur ${interaction.guild?.name}.`),
          ],
        });
      } catch (err) {
        err;
      }
    }
  }
}

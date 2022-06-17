import { ShewenyClient, Command } from "sheweny";
import {
  CommandInteraction,
  MessageEmbed,
  GuildMember,
  Message,
} from "discord.js";

export class LockCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "mail",
      description: "Envoie un message privée à un utilisateur.",
      type: "SLASH_COMMAND",
      category: "Moderation",
      cooldown: 0,
      userPermissions: ["ADMINISTRATOR"],
      clientPermissions: ["SEND_MESSAGES"],
      options: [
        {
          name: "user",
          description: "L'utilisateur à qui envoyer le message.",
          type: "USER",
        required: true,
        },
        {
          name: "message",
          description: "Le message à envoyer.",
          type: "STRING",
          required: true,
        },
      ],
    });
  }

  async execute(interaction: CommandInteraction) {
    const user = interaction.options.getUser("user");
    const message = interaction.options.getString("message");

    try {
      user!.send({
        embeds: [
          new MessageEmbed()
            .setTitle("Vous avez recu un mail !")
            .setDescription(message!)
            .setColor("#8e48f7")
            .setFooter({ text: `2022 ${this.client.user?.username}` }),
        ],
      });

      interaction.reply({
        content: "le message a été envoyé.",
        ephemeral: true,
      });
    } catch (error) {
      interaction.reply("Une erreur est survenue, le membre n'est pas sur le serveur ou ses mp sont désactivés.");
    }
  }
}

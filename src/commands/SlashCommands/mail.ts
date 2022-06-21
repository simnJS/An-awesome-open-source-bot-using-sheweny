import { ShewenyClient, Command } from "sheweny";
import {
  CommandInteraction,
  MessageEmbed,
  GuildMember,
  Message,
  TextChannel
} from "discord.js";
import dotenv from "dotenv";
dotenv.config();
export class MailCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "mail",
      description: "Envoie un message privée à un utilisateur.",
      type: "SLASH_COMMAND",
      category: "Moderation",
      cooldown: 10,
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
        {
          name: "anonyme",
          description: "Envoyer le message anonymement.",
          type: "BOOLEAN",
          required: true,
        }
      ],
    });
  }

  async execute(interaction: CommandInteraction) {
    const user = interaction.options.getUser("user");
    const message = interaction.options.getString("message");
    if (interaction.options.getBoolean("anonyme") == true) {
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
        console.log(error)
      }
    }


    if (interaction.options.getBoolean("anonyme") == false) {
      try {
        user!.send({
          embeds: [
            new MessageEmbed()
              .setTitle("Vous avez recu un mail de " + interaction.user.username + " !")
              .setDescription(message!)
              .setColor("#8e48f7")
              .setFooter({ text: `2022 ${this.client.user?.username}` }),
          ],
        });

        interaction.reply({
          content: "le message a été envoyé.",
          ephemeral: true,
        });

        (interaction.guild!.channels.cache.get(`${process.env.LOG_CHANNEL!}`) as TextChannel).send(`${interaction.user.username} a envoyé un mail à ${user?.tag}.`);
      } catch (error) {
        interaction.reply("Une erreur est survenue, le membre n'est pas sur le serveur ou ses mp sont désactivés.");
        console.log(error)
      }
    }

  }
}

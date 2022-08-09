import { ShewenyClient, Command } from "sheweny";
import {
  CommandInteraction,
  EmbedBuilder,
  GuildMember,
  Message,
  TextChannel,
  ApplicationCommandOptionType,
  CommandInteractionOptionResolver
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
      userPermissions: ["Administrator"],
      clientPermissions: ["SendMessages"],
      options: [
        {
          name: "user",
          description: "L'utilisateur à qui envoyer le message.",
          type: ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: "message",
          description: "Le message à envoyer.",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
        {
          name: "anonyme",
          description: "Envoyer le message anonymement.",
          type:ApplicationCommandOptionType.Boolean,
          required: true,
        }
      ],
    });
  }

  async execute(interaction: CommandInteraction) {
    
    const user = (interaction.options as CommandInteractionOptionResolver).getUser("user");
    const message = (interaction.options as CommandInteractionOptionResolver).getString("message");
    if ((interaction.options as CommandInteractionOptionResolver).getBoolean("anonyme") == false) {
      try {
        console.log('Commande mail')
        
        user!.send({
          embeds: [
            new EmbedBuilder()
              .setTitle("Vous avez recu un mail !")
              .setDescription(message)
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


    if ((interaction.options.get("anonyme")?.value as boolean) == false) {
      try {
        console.log('Commande mail')
        user!.send({
          embeds: [
            new EmbedBuilder()
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

        const settings = await this.client.db.get(interaction.guild!.id);
        if (settings.logs === false) return;
        const logChannel = await (interaction.guild!.channels.cache.find(c => c.id === settings.modChannel) as TextChannel)
    
        if (!logChannel) return;

        logChannel.send(`${interaction.user.username} a envoyé un mail à ${user?.tag}.`);
      } catch (error) {
        interaction.reply("Une erreur est survenue, le membre n'est pas sur le serveur ou ses mp sont désactivés.");
        console.log(error)
      }
    }

  }
}

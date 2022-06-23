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
export class LockCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "lock",
      description: "Vous permet de lock le salon ou la commande est utilisée.",
      type: "SLASH_COMMAND",
      category: "Moderation",
      cooldown: 0,
      userPermissions: ["MANAGE_CHANNELS"],
      clientPermissions: ["MANAGE_CHANNELS"],
    });
  }

  async execute(interaction: CommandInteraction) {
    const channel = interaction.channel;

    if (channel?.type !== "GUILD_TEXT") {
      interaction.reply("Vous pouvez lock seulement les channels textuels.");
      return;
    }

    channel.permissionOverwrites.edit(interaction.guild!.id, {
      SEND_MESSAGES: false,
      ADD_REACTIONS: false,
    });

    interaction.reply({
      content: "Le salon a bien été lock.",
      ephemeral: true,
    });

    channel.send({ embeds: [new MessageEmbed()
        .setTitle("Ce salon est vérouillé.")
        .setDescription(`Vous ne pouvez plus y envoyer de message.`)
        .setColor("#8e48f7")
        .setFooter({text: `2022 ${this.client.user?.username}`})
    
    ] });
    (interaction.guild!.channels.cache.get(`${process.env.LOG_CHANNEL!}`) as TextChannel).send(`${interaction.user.username} a lock le salon ${channel.name}`);
  }
}

import { ShewenyClient, Command } from "sheweny";
import {
  CommandInteraction,
  MessageEmbed,
  GuildMember,
  Message,
} from "discord.js";

export class UnlockCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "unlock",
      description: "Vous permet de unlock le salon ou la commande est utilisée.",
      type: "SLASH_COMMAND",
      category: "Moderation",
      cooldown: 0,
      userPermissions: ["MANAGE_CHANNELS"],
      clientPermissions: ["MANAGE_CHANNELS"],
    });
  }

  async execute(interaction: CommandInteraction) {
    const channel = interaction.channel;


    try {

    
    if (channel?.type !== "GUILD_TEXT") {
      interaction.reply("Vous pouvez lock seulement les channels textuels.");
      return;
    }

    channel.permissionOverwrites.edit(interaction.guild!.id, {
      SEND_MESSAGES: true,
      ADD_REACTIONS: true,
    });

    interaction.reply({
      content: "Le salon a bien été unlock.",
      ephemeral: true,
    });

    channel.send({ embeds: [new MessageEmbed()
        .setTitle("Ce salon est désormais dévérouillé.")
        .setDescription(`Vous pouvez de nouveaux écrire des messages ici.`)
        .setColor("#8e48f7")
        .setFooter({text: `2022 ${this.client.user?.username}`})
    
    ] });
  } catch (error) {
    console.log(error);
  }
} 
}

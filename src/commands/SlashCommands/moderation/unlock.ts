import { ShewenyClient, Command } from "sheweny";
import {
  CommandInteraction,
  EmbedBuilder,
  GuildMember,
  Message,
  TextChannel
} from "discord.js";

export class UnlockCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "unlock",
      description: "Vous permet de unlock le salon ou la commande est utilisée.",
      type: "SLASH_COMMAND",
      category: "Moderation",
      cooldown: 0,
      userPermissions: ["ManageChannels"],
      clientPermissions: ["ManageChannels"],
    });
  }

  async execute(interaction: CommandInteraction) {
    console.log("Commande unlock");
    const channel = interaction.channel as TextChannel;


    try {

    

    await channel.permissionOverwrites.edit(interaction.guild!.id, {
      SendMessages: true,
      AddReactions: true,
    });

    interaction.reply({
      content: "Le salon a bien été unlock.",
      ephemeral: true,
    });

    channel.send({ embeds: [new EmbedBuilder()
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

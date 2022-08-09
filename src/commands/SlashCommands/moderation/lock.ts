import { ShewenyClient, Command } from "sheweny";
import {
  CommandInteraction,
  EmbedBuilder,
  TextChannel
} from "discord.js";
export class LockCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "lock",
      description: "Vous permet de lock le salon ou la commande est utilisée.",
      type: "SLASH_COMMAND",
      category: "Moderation",
      cooldown: 0,
      userPermissions: ["ManageChannels"],
      clientPermissions: ["ManageChannels"],
    });
  }

  async execute(interaction: CommandInteraction) {
    console.log("Commande lock");
    const channel = interaction.channel as TextChannel;


    channel.permissionOverwrites.edit(interaction.guild!.id, {
      SendMessages: false,
      AddReactions: false,
    });

    interaction.reply({
      content: "Le salon a bien été lock.",
      ephemeral: true,
    });

    channel.send({ embeds: [
      new EmbedBuilder()
        .setTitle("Ce salon est vérouillé.")
        .setDescription(`Vous ne pouvez plus y envoyer de message.`)
        .setColor("#8e48f7")
        .setFooter({text: `2022 ${this.client.user?.username}`})
    
    ] });

    const settings = await this.client.db.get(interaction.guild!.id);
    if (settings.logs === false) return;
    const logChannel = await (interaction.guild!.channels.cache.find(c => c.id === settings.modChannel) as TextChannel)

    if (!logChannel) return;
     
    (interaction.guild!.channels.cache.get(`${settings.logChannel}`) as TextChannel).send(`${interaction.user.username} a lock le salon ${channel.name}`);
  }
}

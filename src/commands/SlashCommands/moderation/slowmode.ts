import { ShewenyClient, Command } from "sheweny";
import {
  CommandInteraction,
  TextChannel,
  ApplicationCommandOptionType,
  CommandInteractionOptionResolver
} from "discord.js";

export class SlowmodeCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "slowmode",
      description: "Vous permet d'activé le slowmode sur le salon ou la commande est utilisée.",
      type: "SLASH_COMMAND",
      category: "Moderation",
      cooldown: 0,
      userPermissions: ["ManageChannels"],
      clientPermissions: ["ManageChannels"],
      options: [
        {
            name: "temps",
            description: "Le temps du slowmode.",
            type: ApplicationCommandOptionType.Number,
            required: true,
        }
      ]
    });
  }

  async execute(interaction: CommandInteraction) {
    console.log("Commande slowmode");
    const time = interaction.options.get("temps")?.value as number;

    if (time! == 0) {
        await (interaction.channel as TextChannel).setRateLimitPerUser(0);
        interaction.reply("Le slowmode a bien été désactivé.");
    }

    if (time! > 0) {
        await (interaction.channel as TextChannel).setRateLimitPerUser(time!);
        interaction.reply(`Le slowmode a bien été activé à ${time} secondes.`);
    }

    if (time! < 0) {
        interaction.reply("Le slowmode ne peut pas être inférieur à 0.");
    }

    const settings = await this.client.db.get(interaction.guild!.id);
    if (settings.logs === false) return;
    const logChannel = await (interaction.guild!.channels.cache.find(c => c.id === settings.modChannel) as TextChannel)

    if (!interaction.channel) return;
    if (!logChannel) return;
    await logChannel.send(`${interaction.user.username} a activé le slowmode sur le salon ${interaction.channel.id}`);
  }
}

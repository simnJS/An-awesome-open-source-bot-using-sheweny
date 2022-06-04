import { ShewenyClient, Command } from "sheweny";
import {
  CommandInteraction,
  MessageEmbed,
  GuildMember,
  Message,
  TextChannel
} from "discord.js";

export class SlowmodeCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "slowmode",
      description: "Vous permet d'activé le slowmode sur le salon ou la commande est utilisée.",
      type: "SLASH_COMMAND",
      category: "Moderation",
      cooldown: 0,
      userPermissions: ["MANAGE_CHANNELS"],
      clientPermissions: ["MANAGE_CHANNELS"],
      options: [
        {
            name: "temps",
            description: "Le temps du slowmode.",
            type: "NUMBER",
            required: true,
        }
      ]
    });
  }

  async execute(interaction: CommandInteraction) {
    const time = interaction.options.getNumber("temps");

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
  }
}

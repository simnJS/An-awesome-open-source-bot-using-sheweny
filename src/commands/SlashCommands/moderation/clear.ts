import { ShewenyClient, Command } from "sheweny";
import {
    CommandInteraction,
    MessageEmbed,
    GuildMember,
    Message,
    BaseGuildTextChannel,
    TextChannel,
} from "discord.js";
import dotenv from "dotenv";
dotenv.config();
export class ClearCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: "clear",
            description: "supprime un certain nombre de message.",
            type: "SLASH_COMMAND",
            category: "Moderation",
            cooldown: 0,
            userPermissions: ["MANAGE_MESSAGES"],
            clientPermissions: ["MANAGE_MESSAGES"],
            options: [
                {
                    name: "message",
                    description: "Le nombre de message à supprimer.",
                    type: "NUMBER",
                    required: true,
                },
            ],
        });
    }

    async execute(interaction: CommandInteraction) {
        const nombre = interaction.options.getNumber("message")!;

        if (nombre > 100) {
            interaction.reply("Vous ne pouvez pas supprimer plus de 100 messages.");
            return;
        } else if (nombre < 1) {
            interaction.reply("Vous ne pouvez pas supprimer moins de 1 message.");
            return;
        } else {
            const channel = interaction.channel as BaseGuildTextChannel
            const { size } = await channel.bulkDelete(nombre, true);

            interaction.reply({ content: `${size} messages ont été supprimés.`, ephemeral: true });


            const settings = await this.client.db.get(interaction.guild!.id);
            const logChannel = await (interaction.guild!.channels.cache.find(c => c.id === settings.modChannel) as TextChannel)

            if (!logChannel) return;
            await logChannel.send(`${interaction.user.username} a supprimé ${size} messages dans le salon ${channel!.name}`);

        }
    }
}

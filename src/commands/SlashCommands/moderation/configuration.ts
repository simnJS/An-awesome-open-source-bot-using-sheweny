import { ShewenyClient, Command } from "sheweny";
import { CommandInteraction, MessageEmbed, GuildMember, TextChannel } from "discord.js";
export class ConfigCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: "config",
            description: "Vous permet de config les valeurs de la base de données.",
            type: "SLASH_COMMAND",
            category: "Moderation",
            cooldown: 0,
            userPermissions: ["ADMINISTRATOR"],
            options: [
                {
                    name: "log_channel",
                    description: "Le channel de log (vide pour rien mettre).",
                    type: "CHANNEL",
                    required: false,
                },
                {
                    name: "suggestion_channel",
                    description: "Le channel de suggestion (vide pour rien mettre).",
                    type: "CHANNEL",
                    required: false,
                },
            ],
        });
    }

    async execute(interaction: CommandInteraction) {
        const settings = await this.client.db.get(interaction.guild!.id!);
        const logChannel = interaction.options.getChannel("log_channel") as TextChannel;
        const suggestionChannel = interaction.options.getChannel("suggestion_channel") as TextChannel;


        if (logChannel) {
            await this.client.db.update(`${interaction.guild!.id}`, {modChannel: logChannel.id});
            interaction.reply({
                content: `Le channel de log a été mis à jour.`,
                ephemeral: true,
            });
        }
        if (suggestionChannel) {
            await this.client.db.update(`${interaction.guild!.id}`, {suggestChannel: suggestionChannel.id});
            interaction.reply({
                content: `Le channel de suggestion a été mis à jour.`,
                ephemeral: true,
            });

        }
    }

}
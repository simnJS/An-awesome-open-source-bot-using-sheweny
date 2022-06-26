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
                    name: "logs",
                    description: "La configuration en rapport avec les logs.",
                    type: "SUB_COMMAND",
                    options: [
                        {
                            name: "status",
                            description: "Vous permet d'activer ou de désactiver les logs sur le serveur.",
                            type: "BOOLEAN",
                            required: true,
                        },
                        {
                            name: "channel",
                            description: "Le salon dans lequel les logs seront envoyés.",
                            type: "CHANNEL",
                            required: true,
                        },
                    ],
                },
                {
                    name: "suggestion",
                    description: "La configuration en rapport avec les suggestions.",
                    type: "SUB_COMMAND",
                    options: [
                        {
                            name: "status",
                            description: "Vous permet d'activer ou de désactiver les suggestions sur le serveur.",
                            type: "BOOLEAN",
                            required: true,
                        },
                        {
                            name: "channel",
                            description: "Le salon dans lequel les suggestions seront envoyés.",
                            type: "CHANNEL",
                            required: true,
                        },
                    ],
                }, {
                    name: "welcome",
                    description: "La configuration en rapport avec les bienvenues.",
                    type: "SUB_COMMAND",
                    options: [
                        {
                            name: "status",
                            description: "Vous permet d'activer ou de désactiver les bienvenues sur le serveur.",
                            type: "BOOLEAN",
                            required: true,
                        },
                        {
                            name: "channel",
                            description: "Le salon dans lequel les bienvenues seront envoyés.",
                            type: "CHANNEL",
                            required: true,
                        },
                    ],
                }
            ]
        });
    }
    async execute(interaction: CommandInteraction) {
        const option = interaction.options.getSubcommand()
        if (option === "logs") {
            const status = interaction.options.getBoolean("status");
            const channel = interaction.options.getChannel("channel") as TextChannel;
            let reponse: string[] = [];
            if (status == true) {
                this.client.db.update(interaction.guild!.id, { logs: 'true' })
                reponse.push("Les logs sont maintenant activés.")
            }
            if (status == false) {
                this.client.db.update(interaction.guild!.id, { logs: 'false' })
                reponse.push("Les logs sont maintenant désactivés.")

            }

            if (channel) {
                this.client.db.update(interaction.guild!.id, { logChannel: channel.id })
                reponse.push("Le salon des logs a bien été changé.")
            }
            interaction.reply(reponse.join("\n"))
        }
        if (option === "suggestion") {
            const status = interaction.options.getBoolean("status");
            const channel = interaction.options.getChannel("channel") as TextChannel;
            let reponse: string[] = [];
            if (status == true) {
                this.client.db.update(interaction.guild!.id, { suggestion: 'true' })
                reponse.push("Les suggestions sont maintenant activés.")

            }
            if (status == false) {
                this.client.db.update(interaction.guild!.id, { suggestion: 'false' })
                reponse.push("Les suggestions sont maintenant désactivés.")
            }

            if (channel) {
                this.client.db.update(interaction.guild!.id, { suggestChannel: channel.id })
                reponse.push("Le salon des suggestions a bien été changé.")
            }
            interaction.reply(reponse.join("\n"))
        }
        if (option === "welcome") {
            const status = interaction.options.getBoolean("status");
            const channel = interaction.options.getChannel("channel") as TextChannel;
            let reponse: string[] = [];
            if (status == true) {
                this.client.db.update(interaction.guild!.id, { welcome: 'true' })
                reponse.push("Les bienvenues sont maintenant activés.")
            }
            if (status == false) {
                this.client.db.update(interaction.guild!.id, { welcome: 'false' })
                reponse.push("Les bienvenues sont maintenant désactivés.")
            }
            if (channel) {
                this.client.db.update(interaction.guild!.id, { welcomeChannel: channel.id })
                reponse.push("Le salon des bienvenues a bien été changé.")
            }
            interaction.reply(reponse.join("\n"))
        }
    }
}
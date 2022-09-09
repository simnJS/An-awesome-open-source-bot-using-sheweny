import { ShewenyClient, Command } from "sheweny";
import { CommandInteraction, TextChannel, ApplicationCommandOptionType, Role, CommandInteractionOptionResolver } from "discord.js";
export class ConfigCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: "config",
            description: "Vous permet de config les valeurs de la base de données.",
            type: "SLASH_COMMAND",
            category: "Moderation",
            cooldown: 0,
            userPermissions: ["Administrator"],
            options: [
                {
                    name: "logs",
                    description: "La configuration en rapport avec les logs.",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "status",
                            description: "Vous permet d'activer ou de désactiver les logs sur le serveur.",
                            type: ApplicationCommandOptionType.Boolean,
                            required: true,
                        },
                        {
                            name: "channel",
                            description: "Le salon dans lequel les logs seront envoyés.",
                            type: ApplicationCommandOptionType.Channel,
                            required: true,
                        },
                    ],
                },
                {
                    name: "suggestion",
                    description: "La configuration en rapport avec les suggestions.",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "status",
                            description: "Vous permet d'activer ou de désactiver les suggestions sur le serveur.",
                            type: ApplicationCommandOptionType.Boolean,
                            required: true,
                        },
                        {
                            name: "channel",
                            description: "Le salon dans lequel les suggestions seront envoyés.",
                            type: ApplicationCommandOptionType.Channel,
                            required: true,
                        },
                    ],
                }, {
                    name: "welcome",
                    description: "La configuration en rapport avec les messages de bienvenues.",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "status",
                            description: "Vous permet d'activer ou de désactiver les messages de bienvenues sur le serveur.",
                            type: ApplicationCommandOptionType.Boolean,
                            required: true,
                        },
                        {
                            name: "channel",
                            description: "Le salon dans lequel les messages de bienvenues seront envoyés.",
                            type: ApplicationCommandOptionType.Channel,
                            required: true,
                        },
                    ],
                }, {
                    name: "verification",
                    description: "la configuration en rapport avec la vérification.",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "status",
                            description: "Vous permet d'activer ou de désactiver la vérification sur le serveur.",
                            type: ApplicationCommandOptionType.Boolean,
                            required: true,
                        },
                        {
                            name: "role",
                            description: "Le role qui sera utilisé pour la vérification.",
                            type: ApplicationCommandOptionType.Role,
                            required: true,
                        },
                    ],
                }, {
                    name: "autorole",
                    description: "la configuration en rapport avec l'autorole'.",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "status",
                            description: "Vous permet d'activer ou de désactiver l'autorole.",
                            type: ApplicationCommandOptionType.Boolean,
                            required: true,
                        },
                        {
                            name: "role",
                            description: "Le role qui sera utilisé pour l'autorole'.",
                            type: ApplicationCommandOptionType.Role,
                            required: true,
                        },
                    ],
                 },
                 //  {
                //     name: "anti-ghostping",
                //     description: "La configuration en rapport avec l'anti-ghostping.",
                //     type: ApplicationCommandOptionType.Subcommand,
                //     options: [
                //         {
                //             name: "status",
                //             description: "Vous permet d'activer ou de désactiver l'anti ghostping.",
                //             type: ApplicationCommandOptionType.Boolean,
                //             required: true,
                //         },
                //         {
                //             name: "channel",
                //             description: "Le channel ou les logs de l'anti ghostping seront envoyés.",
                //             type: ApplicationCommandOptionType.Channel,
                //             required: true,
                //         },
                //     ],
                // }
            ]
        });
    }
    async execute(interaction: CommandInteraction) {
        console.log('Commande config')
        switch ((interaction.options as CommandInteractionOptionResolver).getSubcommand()) {
        case "logs":
            const status = (interaction.options as CommandInteractionOptionResolver).getBoolean("status");
            const channel = ((interaction.options as CommandInteractionOptionResolver).getChannel("channel") as TextChannel);
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
        break
        case "suggestion":
            const status1 = (interaction.options as CommandInteractionOptionResolver).getBoolean("status");
            const channel1 = ((interaction.options as CommandInteractionOptionResolver).getChannel("channel") as TextChannel);
            let reponse1: string[] = [];
            if (status1 == true) {
                this.client.db.update(interaction.guild!.id, { suggestion: 'true' })
                reponse1.push("Les suggestions sont maintenant activés.")

            }
            if (status1 == false) {
                this.client.db.update(interaction.guild!.id, { suggestion: 'false' })
                reponse1.push("Les suggestions sont maintenant désactivés.")
            }

            if (channel1) {
                this.client.db.update(interaction.guild!.id, { suggestChannel: channel1.id })
                reponse1.push("Le salon des suggestions a bien été changé.")
            }
            interaction.reply(reponse1.join("\n"))
        
        break
        case "welcome":
            const status2 = (interaction.options as CommandInteractionOptionResolver).getBoolean("status");
            const channel2 = ((interaction.options as CommandInteractionOptionResolver).getChannel("channel") as TextChannel);
            let reponse2: string[] = [];
            if (status2 == true) {
                this.client.db.update(interaction.guild!.id, { welcome: 'true' })
                reponse2.push("Les messages de bienvenues sont maintenant activés.")
            }
            if (status2 == false) {
                this.client.db.update(interaction.guild!.id, { welcome: 'false' })
                reponse2.push("Les messages de bienvenues sont maintenant désactivés.")
            }
            if (channel2) {
                this.client.db.update(interaction.guild!.id, { welcomeChannel: channel2.id })
                reponse2.push("Le salon des messages de bienvenues a bien été changé.")
            }
            interaction.reply(reponse2.join("\n"))
        break
        case "verification":
            const status3 = (interaction.options as CommandInteractionOptionResolver).getBoolean("status");
            const role = (interaction.options as CommandInteractionOptionResolver).getRole("role") as Role;
            let reponse3: string[] = [];
            if (status3 == true) {
                this.client.db.update(interaction.guild!.id, { verification: 'true' })
                reponse3.push("La vérification est maintenant activé.")
            }
            if (status3 == false) {
                this.client.db.update(interaction.guild!.id, { verification: 'false' })
                reponse3.push("La vérification est maintenant désactivé.")
            }
            if (role) {
                this.client.db.update(interaction.guild!.id, { verificationRole: role.id })

                reponse3.push("Le role de vérification a bien été changer.")
            }
            interaction.reply(reponse3.join("\n"))
        break
        case "autorole":
            const status4 = (interaction.options as CommandInteractionOptionResolver).getBoolean("status");
            const role2 = (interaction.options as CommandInteractionOptionResolver).getRole("role") as Role;
            let reponse4: string[] = [];
            if (status4 == true) {
                this.client.db.update(interaction.guild!.id, { autorole: 'true' })
                reponse4.push("L'autorole' est maintenant activé.")
            }
            if (status4 == false) {
                this.client.db.update(interaction.guild!.id, { autorole: 'false' })
                reponse4.push("L'autorole est maintenant désactivé.")
            }
            if (role2) {
                this.client.db.update(interaction.guild!.id, { autoroleRole: role2.id })

                reponse4.push("Le role de l'autorole a bien été changer.")
            }
            interaction.reply(reponse4.join("\n"))

        break
        // case "anti-ghostping":
        //     const status5 = (interaction.options as CommandInteractionOptionResolver).getBoolean("status");
        //     const channel3 = (interaction.options as CommandInteractionOptionResolver).getChannel("channel") as TextChannel;
        //     let reponse5: string[] = [];
        //     if (status5 == true) {
        //         this.client.db.update(interaction.guild!.id, { ghost: 'true' })
        //         reponse5.push("L'anti-ghostping est maintenant activé.")
        //     }
        //     if (status5 == false) {
        //         this.client.db.update(interaction.guild!.id, { ghost: 'false' })
        //         reponse5.push("L'anti-ghostping est maintenant désactivé.")
        //     }
        //     if (channel3) {
        //         this.client.db.update(interaction.guild!.id, { ghostChannel: channel3.id })

        //         reponse5.push("Le salon de l'anti-ghostping a bien été changer.")
        //     }
        //     interaction.reply(reponse5.join("\n"))

        // break
        }
    }
}
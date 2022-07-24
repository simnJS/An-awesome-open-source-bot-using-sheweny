import { Command, ShewenyClient } from "sheweny";
import { GuildMember, MessageEmbed, TextChannel } from "discord.js";
import type { CommandInteraction } from "discord.js";
import moment from "moment";
export class WarnCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: "warn",
            description: "Gérer le système de warn de la guild",
            category: "Moderation",
            type: "SLASH_COMMAND",
            channel: "GUILD",
            options: [
                {
                    name: "add",
                    type: "SUB_COMMAND",
                    description: "Ajouter un warn à une personne",
                    options: [
                        {
                            name: "user",
                            type: "USER",
                            description: "The user to warn",
                            required: true,
                        },
                        {
                            name: "reason",
                            description: "La raison du warn",
                            type: "STRING",
                            required: true,
                        }
                    ],
                },
                {
                    name: "remove",
                    description: "Retirer un warn à une personne",
                    type: "SUB_COMMAND",
                    options: [ {
                        name: "case",
                        type: "NUMBER",
                        description: "Le numéro du warn à retirer",
                        required: true,
                    }]
                },
                {
                    name: "list",
                    description: "Récupérer la list des warns d'une personne",
                    type: "SUB_COMMAND",
                    options: [{
                        name: "utilisateur",
                        type: "USER",
                        description: "L'utilisateurou à chercher",
                        required: true,
                    },]
                },




            ],
            userPermissions: ["BAN_MEMBERS"],
        });
    }
    async execute(interaction: CommandInteraction) {

        const settings = await this.client.db.get(interaction.guildId!);
        const option = interaction.options.getSubcommand(),
            user_add = interaction.options.getMember("user") as GuildMember,
            Case = interaction.options.getNumber("case"),
            utilisateur = interaction.options.getMember("utilisateur") as GuildMember,
            reason = interaction.options.getString("reason");


        if (option == "add") {

            if (!user_add)
                return interaction.reply({
                    content: `User not found.`,
                    ephemeral: true,
                });

            const embed = new MessageEmbed()
                .setAuthor({ name: user_add.user.tag, iconURL: user_add.user.displayAvatarURL() })
                .setColor("#ff0000")
                .setDescription(`**Membre**: ${user_add.user.tag} (${user_add.user.id})
        **Action**: Warn
        **Raison**: ${reason}`);

            const userArray = settings.users;

            const user = {
                case: (userArray.length + 1),
                name: user_add.displayName,
                id: user_add.id,
                moderator: interaction.user.tag,
                reason: reason,
                date: moment().format("DD/MM/YYYY - HH:mm")
            }

            userArray.push(user);
            await this.client.db.update(`${interaction.guild!.id}`, { users: userArray });
            await interaction.reply({ content: `La commande warn a été éxécutée avec succès !`, embeds: [embed], ephemeral: true });

            const logChannel = await (interaction.guild!.channels.cache.find(c => c.id === settings.modChannel) as TextChannel)

            if (!interaction.channel) return;
            if (settings.logs === false) return;
            await logChannel.send(`${interaction.user.username} a averti ${user_add.user.tag} pour la raison ${reason}`);

            try {
                user_add.send({embeds: [new MessageEmbed(
                    new MessageEmbed()
                    .setTitle(`Vous avez été warn sur le serveur ${interaction.guild!.name}.`)
                    .setDescription(`Raison: ${reason} ! `)
                    .setColor("#8e48f7")
                    .setFooter({ text: `Sanction appliqué par ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
                    .setTimestamp()
                )]})
            }   catch (e) {
                console.log(e);
            }


        }

        if (option == "remove") {
            const settings = await this.client.db.get(interaction.guild!.id);

            const filteredId = settings.users.map((u: any) => u.case).indexOf(Case);
            if (filteredId == -1) return interaction.reply('Ce warn n\'existe pas !');

            settings.users.splice(filteredId, 1);

            await this.client.db.update(interaction.guild!.id, { users: settings.users });

            await interaction.reply(`Le warn ${Case} a bien été supprimé.`);


            const logChannel = await (interaction.guild!.channels.cache.find(c => c.id === settings.modChannel) as TextChannel)
            if (settings.logs === false) return;
            if (!logChannel) return;

            await logChannel.send(`${interaction.user.username} a supprimé le warn ${Case}`);
        }

        if (option == "list") {
            if (!utilisateur)
                return interaction.reply({
                    content: `User not found.`,
                    ephemeral: true,
                });

            const filteredUser = settings.users.filter((u: any) => u.id == utilisateur.id);
            if (filteredUser.length == 0) return interaction.reply('Cette utilisateur n\'a pas de warns !');

            let warnList = `Liste des warns pour \`${utilisateur.user.tag}\` (**${utilisateur.id}**) : \n`;

            for (let warn of filteredUser) {
                warnList += `\n**${warn.case}** - Par \`${warn.moderator}\` - (le ${warn.date}). Raison: \`${warn.reason}\``;
            }
            await interaction.reply(warnList);
        }
    }
}
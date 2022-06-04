import { ShewenyClient, Command } from "sheweny";
import { MessageEmbed, GuildMember, ContextMenuInteraction } from "discord.js";

export class PingCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: "userinfo",
            description: "Vous permet de récupérer les informations sur le compte de une personne.",
            type: "CONTEXT_MENU_USER",
            category: "Information",
            cooldown: 0,
        });
    }

    async execute(interaction: ContextMenuInteraction) {
        const member = await interaction.guild?.members.fetch(interaction.targetId)

        interaction.reply({
            embeds: [
                new MessageEmbed()
                .setAuthor({name: `${member?.user.tag} (${member?.id})`, iconURL: member?.user.bot ? "https://images.emojiterra.com/twitter/512px/1f916.png" : "https://images.emojiterra.com/twitter/512px/1f9d1.png"})
                .setColor("#8e48f7")
                .setImage(member!.user.displayAvatarURL({format: "png", dynamic: true, size: 1024}))
                .addFields(
                    { name: 'Nom', value: `${member?.displayName}`, inline: true },
                    { name: 'Modérateur', value: `${member?.kickable ? 'Oui' : 'non'}`, inline: true },
                    { name: 'Bot', value: `${member?.user.bot ? 'Oui' : 'non'}`, inline: true },
                    { name: 'Roles', value: `${member?.roles.cache.map(role => role).join(', ')}` },
                    { name: 'Crée le', value: `${member?.user.createdAt}` },
                    { name: 'A rejoin le serveur le' ,value: `${member?.joinedAt}` },
                )

            ], ephemeral:true
        },)

    }
}

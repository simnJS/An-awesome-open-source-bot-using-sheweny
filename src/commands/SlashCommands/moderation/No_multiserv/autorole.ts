import { ShewenyClient, Command } from "sheweny";
import {
  CommandInteraction,
  MessageActionRow,
  MessageSelectMenu

} from "discord.js";
import dotenv from "dotenv";
dotenv.config();
export class AutoRoleCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "autorole_deploy",
      description: "déploiment de l'autorole.",
      type: "SLASH_COMMAND",
      category: "Moderation",
      cooldown: 0,
      adminsOnly: true,
    });
  }

  async execute(interaction: CommandInteraction) {


		// START EMOJI
		const css = this.client.emojis.cache.find(emoji => emoji.name === "css");
		const html = this.client.emojis.cache.find(emoji => emoji.name === "html");
		const javascript = this.client.emojis.cache.find(emoji => emoji.name === "javascript");
		const _python = this.client.emojis.cache.find(emoji => emoji.name === "python");	
		const batch = this.client.emojis.cache.find(emoji => emoji.name === "batch");
		const java = this.client.emojis.cache.find(emoji => emoji.name === "java");
        const php = this.client.emojis.cache.find(emoji => emoji.name === "php");
        const lua = this.client.emojis.cache.find(emoji => emoji.name === "lua");
        const csharp = this.client.emojis.cache.find(emoji => emoji.name === "csharp");
        const c = this.client.emojis.cache.find(emoji => emoji.name === "c_");
		// END EMOJI

        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('selectRole')
                .setPlaceholder('Choisissez vos rôles')
                .setMinValues(1)
                .setMaxValues(10)
                .addOptions([
                    {
                        label: 'Css',
                        description: 'Soit reconnu en tant que développeur Css.',
                        value: 'first_option',
                        emoji: css
                    },
                    {
                        label: 'Html',
                        description: 'Soit reconnu en tant que développeur Html.',
                        value: 'second_option',
                        emoji: html
                    },
                    {
                        label: 'Javascript/Typescript',	
                        description: 'Soit reconnu en tant que développeur Javascript/typescript.',
                        value: 'third_option',
                        emoji: javascript
                    },
                    {
                        label: 'Python',
                        description: 'Soit reconnu en tant que développeur Python.',
                        value: "fourth_option",
                        emoji: _python
                    },
                    {
                        label: 'Batch',
                        description: 'Soit reconnu en tant que développeur Batch.',
                        value: "fifth_option",
                        emoji: batch
                    },
                    {
                        label: 'Java',
                        description: 'Soit reconnu en tant que développeur Java.',
                        value: "sixth_option",
                        emoji: java
                    },
                    {
                        label: 'Php',
                        description: 'Soit reconnu en tant que développeur Php.',
                        value: "seventh_option",
                        emoji: php
                    },
                    {
                        label: 'Lua',
                        description: 'Soit reconnu en tant que développeur Lua.',
                        value: "eighth_option",
                        emoji: lua
                    },
                    {
                        label: 'C#',
                        description: 'Soit reconnu en tant que développeur C#.',
                        value: "ninth_option",
                        emoji: csharp
                    },
                    {
                        label: 'C / C++',
                        description: 'Soit reconnu en tant que développeur C / C++.',
                        value: "tenth_option",
                        emoji: c
                    }
                ]),
        );

    await interaction.reply({ content: 'Succesfully send', ephemeral:true });
    await interaction.channel?.send({ content: 'Choisissez vos rôles ci dessous !', components: [row] });


}
  }


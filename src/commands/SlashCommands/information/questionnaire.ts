import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { CommandInteraction, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from "discord.js";

export class quest extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      type: "SLASH_COMMAND",
      name: "questionnaire",
      description: "Le questionnaire sur l'école",
      cooldown: 2000
    });
  }
  async execute(i: CommandInteraction) {
    const modal = new ModalBuilder()
    .setCustomId('quest')
    .setTitle('Questionnaire')
    

    const age = new TextInputBuilder()
    .setCustomId('age')
    .setLabel("Quelle est votre Age actuel ?")
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

    const etablissement = new TextInputBuilder()
    .setCustomId('etablissement')
    .setLabel("Type d'établissement ( publique ou privé )")
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

    const sexe = new TextInputBuilder()
    .setCustomId('sexe')
    .setLabel("Quel est votre sexe ? ( homme ou femme )")
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

    const ami = new TextInputBuilder()
    .setCustomId('ami-travail')
    .setLabel("Nombre d'ami / temps de travail par jours")
    .setStyle(TextInputStyle.Paragraph)
    .setRequired(true);

    const classe = new TextInputBuilder()
    .setCustomId('classe')
    .setLabel("classe du changement d'avis ( lire cadre)")
    .setStyle(TextInputStyle.Paragraph)
    .setPlaceholder("La classe a partir de laquelle vous avez arrêter de considérer l'école comme une punition")
    .setRequired(true);
    

    const firstActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(age);
    const secondActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(etablissement);
    const thirdActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(sexe);
    const fourthActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(ami);
    const fifthActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(classe);

    modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow, fifthActionRow);

		await i.showModal(modal);









  }
}
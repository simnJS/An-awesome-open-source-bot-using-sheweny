import { ShewenyClient, Command } from "sheweny";
import { CommandInteraction, EmbedBuilder } from "discord.js";
import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();
export class DogCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "dog",
      description: "Envoie une magnifique image de chien !",
      type: "SLASH_COMMAND",
      category: "Fun",
      cooldown: 15,
      clientPermissions: ["SendMessages"],
    });
  }

  async execute(interaction: CommandInteraction) {
    console.log('Commande dog')
    const response = await fetch("https://dog.ceo/api/breeds/image/random")
    const body = await response.json()

    const error = body.status === "error"

    if (error) {
        interaction.reply("Une erreur est survenue.")
        return
        }

    await interaction.reply({embeds: [
        new EmbedBuilder()
            .setTitle("Voici un jolie chien pour vous !")
            .setImage(body.message)
            .setColor("#0099ff")
    ]})    


  }
}

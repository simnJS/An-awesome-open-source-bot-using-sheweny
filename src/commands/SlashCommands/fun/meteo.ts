import { ShewenyClient, Command } from "sheweny";
import { CommandInteraction, MessageEmbed } from "discord.js";
import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();
export class DogCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "meteo",
      description: "Vous permet d'obtenir la météo de votre ville.",
      type: "SLASH_COMMAND",
      category: "Fun",
      cooldown: 60,
      clientPermissions: ["SEND_MESSAGES"],
      options: [
        {
          name: "ville",
          description: "La ville ou vous voulez avoir la météo",
          type: "STRING",
          required: true,
        },
      ],
    });
  }

  async execute(interaction: CommandInteraction) {
    const ville = await interaction.options.getString("ville");
    const request = await fetch(`http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}&query=${ville}`)
        const res = await request.json()

    if (res.error) {
        interaction.reply("Une erreur est survenue.")
        return
    }
    
        const embed = new MessageEmbed()
            .setTitle(`Météo de ${ville} (${res.location.country})`) 
            .setColor("#0099ff")
            .addFields(
                { name: "Température", value: `\`\`\`${res.current.temperature}°C\`\`\``, inline: true },
                { name: "Humidité", value: `\`\`\`${res.current.humidity}%\`\`\``, inline: true },
                { name: "Vent", value: `\`\`\`${res.current.wind_speed} km/h\`\`\``, inline: true },
                { name: "Pression", value: `\`\`\`${res.current.pressure} hPa\`\`\``, inline: true },
                { name: "Précipitation", value: `\`\`\`${res.current.precip} mm\`\`\``, inline: true },
                { name: "Visibilité", value: `\`\`\`${res.current.visibility} km\`\`\``, inline: true },
                { name: "Ciel", value: `\`\`\`${res.current.weather_descriptions[0]}\`\`\``, inline: true },
                { name: "Vitesse du vent", value: `\`\`\`${res.current.wind_speed} km/h\`\`\``, inline: true },
                { name: "Direction du vent", value: `\`\`\`${res.current.wind_degree}\`\`\``, inline: true },
            )
            .setTimestamp()
            .setFooter({ text: "Information par weatherStack"})

            await interaction.reply({embeds: [embed]})
    }

}

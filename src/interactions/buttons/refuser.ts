import { ButtonInteraction, GuildMember, GuildMemberManager, Permissions } from "discord.js";
import { ShewenyClient } from "sheweny";

const {
  Interaction,
  EmbedBuilder,
  ActionRowBuilder,
  MessageButton,
} = require("discord.js");
const { Button } = require("sheweny");

module.exports = class Btns extends Button {
  constructor(client: ShewenyClient) {
    super(client, ["refuser"]);
  }

  async execute(button: ButtonInteraction) {
    if (!button.memberPermissions?.has("ManageMessages")) {
      button.reply("Vous pouvez éxécuter cette commande que si vous avez la permission `ManageMessages`");
      return;
  }
    const messageid = button.message.id;
    const message = await button.channel?.messages.fetch(messageid);

      message?.edit({
        embeds: [
          new EmbedBuilder()
          .setTitle("Suggestion" +  message?.embeds[0].title?.split("Nouvelle suggestion")[1] + " refusée.")
          .setColor("#FF0000")
          .setDescription(message?.embeds[0].description)
          .setTimestamp()
        ],
        components: []
        
    })
    message!.reactions.removeAll();

  }
}

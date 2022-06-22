import { ButtonInteraction, GuildMember, GuildMemberManager, Permissions } from "discord.js";
import { ShewenyClient } from "sheweny";

const {
  Interaction,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require("discord.js");
const { Button } = require("sheweny");

module.exports = class Btns extends Button {
  constructor(client: ShewenyClient) {
    super(client, [/ban--[0-9]{15,18}$/]);
  }

  async execute(button: ButtonInteraction) {
    if (button.memberPermissions?.has(Permissions.FLAGS.MANAGE_GUILD)) {
      button.reply("Vous pouvez éxécuter cette commande que si vous avez la permission `BAN_MEMBERS`");
      return;
  }

    const userid = button.customId.split("--")[1];
    await button.guild?.bans.remove(userid)


    await button.reply("L'utilisateur a été unban.")
    


  }
}

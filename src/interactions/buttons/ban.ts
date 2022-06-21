import { ButtonInteraction, GuildMember, GuildMemberManager } from "discord.js";
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
    const userid = button.customId.split("--")[1];
    await button.guild?.bans.remove(userid)


    await button.reply("L'utilisateur a été unban.")
    


  }
}

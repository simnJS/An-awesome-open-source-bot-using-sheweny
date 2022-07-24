import { ButtonInteraction, GuildMember, GuildMemberManager, Permissions, GuildMemberRoleManager, RoleResolvable } from "discord.js";
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
    super(client, [`verif`]);

  }

  async execute(button: ButtonInteraction) {
    const settings = await this.client.db.get(button.guild!.id);
    const role = settings.verificationRole
    let roleToAdd = button.guild!.roles.cache.find(r => r.id === `${role}`) as RoleResolvable
    const userid = button.member!.user.id;
    const user = await button.guild?.members.fetch(userid) as GuildMember;
    (user?.roles as GuildMemberRoleManager).add(roleToAdd);
    await button.reply({content: "L'utilisateur a été verifié.", ephemeral: true});
  }
}

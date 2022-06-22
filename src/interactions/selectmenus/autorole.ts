import { SelectMenu } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { SelectMenuInteraction, GuildMemberRoleManager } from "discord.js";

export class Autorole extends SelectMenu {
  constructor(client: ShewenyClient) {
    super(client, ["selectRole"]);
  }

  async execute(selectMenu: SelectMenuInteraction) {
    const member = selectMenu.member
    let css = selectMenu.guild!.roles.cache.find(r => r.id === "989244323348512808")
    let html = selectMenu.guild!.roles.cache.find(r => r.id === "989244373457834095")
    let js = selectMenu.guild!.roles.cache.find(r => r.id === "989244408698384464")
    let Python = selectMenu.guild!.roles.cache.find(r => r.id === "989244546837803068")
    let batch = selectMenu.guild!.roles.cache.find(r => r.id === "989244578911621230")
    let java = selectMenu.guild!.roles.cache.find(r => r.id === "989244746822189106")
    let php = selectMenu.guild!.roles.cache.find(r => r.id === "989244782847082576")
    let lua = selectMenu.guild!.roles.cache.find(r => r.id === "989244818708369489")
    let csharp = selectMenu.guild!.roles.cache.find(r => r.id === "989244857342120026")
    let c = selectMenu.guild!.roles.cache.find(r => r.id === "989244929408663602")

    selectMenu.values.forEach(v => {
      switch (v) {
        case "first_option": if (css) (member?.roles as GuildMemberRoleManager).add(css); selectMenu.reply("Le role css vous a été donné !"); break;
        case "second_option": if (html) (member?.roles as GuildMemberRoleManager).add(html); selectMenu.reply("Le role html vous a été donné !"); break;
        case "third_option": if (js) (member?.roles as GuildMemberRoleManager).add(js); selectMenu.reply("Le role javascript vous a été donné !"); break;
        case "fourth_option": if (Python) (member?.roles as GuildMemberRoleManager).add(Python); selectMenu.reply("Le role python vous a été donné !"); break;
        case "fifth_option": if (batch) (member?.roles as GuildMemberRoleManager).add(batch); selectMenu.reply("Le role batch vous a été donné !"); break;
        case "sixth_option": if (java) (member?.roles as GuildMemberRoleManager).add(java); selectMenu.reply("Le role java vous a été donné !"); break;
        case "seventh_option": if (php) (member?.roles as GuildMemberRoleManager).add(php); selectMenu.reply("Le role php vous a été donné !"); break;
        case "eighth_option": if (lua) (member?.roles as GuildMemberRoleManager).add(lua); selectMenu.reply("Le role lua vous a été donné !"); break;
        case "ninth_option": if (csharp) (member?.roles as GuildMemberRoleManager).add(csharp); selectMenu.reply("Le role c# vous a été donné !"); break;
        case "tenth_option": if (c) (member?.roles as GuildMemberRoleManager).add(c); selectMenu.reply("Le role c vous a été donné !"); break;
      }
    })
  }
}

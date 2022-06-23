import { SelectMenu } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { SelectMenuInteraction, GuildMemberRoleManager } from "discord.js";

export class Autorole extends SelectMenu {
  constructor(client: ShewenyClient) {
    super(client, ["selectRole"]);
  }

  async execute(selectMenu: SelectMenuInteraction) {
    const member = selectMenu.member;
    let css = selectMenu.guild!.roles.cache.find(
      (r) => r.id === "989244323348512808"
    );
    let html = selectMenu.guild!.roles.cache.find(
      (r) => r.id === "989244373457834095"
    );
    let js = selectMenu.guild!.roles.cache.find(
      (r) => r.id === "989244408698384464"
    );
    let Python = selectMenu.guild!.roles.cache.find(
      (r) => r.id === "989244546837803068"
    );
    let batch = selectMenu.guild!.roles.cache.find(
      (r) => r.id === "989244578911621230"
    );
    let java = selectMenu.guild!.roles.cache.find(
      (r) => r.id === "989244746822189106"
    );
    let php = selectMenu.guild!.roles.cache.find(
      (r) => r.id === "989244782847082576"
    );
    let lua = selectMenu.guild!.roles.cache.find(
      (r) => r.id === "989244818708369489"
    );
    let csharp = selectMenu.guild!.roles.cache.find(
      (r) => r.id === "989244857342120026"
    );
    let c = selectMenu.guild!.roles.cache.find(
      (r) => r.id === "989244929408663602"
    );

    let added_roles: string[] = [];
    selectMenu.values.forEach((v) => {
      switch (v) {
        case "first_option":
          if (
            (member?.roles as GuildMemberRoleManager).cache.has(`${css?.id}`)
          ) {
            if (css) {
              (member?.roles as GuildMemberRoleManager).remove(css);
            }
          } else {
            if (css) {
              (member?.roles as GuildMemberRoleManager).add(css);
              added_roles.push(`css`);
            }
          }
          break;
        case "second_option":
          if (
            (member?.roles as GuildMemberRoleManager).cache.has(`${html?.id}`)
          ) {
            if (html) {
              (member?.roles as GuildMemberRoleManager).remove(html);
            }
          }
          else {
            if (html) {
              (member?.roles as GuildMemberRoleManager).add(html);
              added_roles.push(`html`);
            }
          }
          break;
        case "third_option":
          if (
            (member?.roles as GuildMemberRoleManager).cache.has(`${js?.id}`)
          ) {
            if (js) {
              (member?.roles as GuildMemberRoleManager).remove(js);
            }
          }
          else {
            if (js) {
              (member?.roles as GuildMemberRoleManager).add(js);
              added_roles.push(`js`);
            }
          }
          break;
        case "fourth_option":
          if (
            (member?.roles as GuildMemberRoleManager).cache.has(`${Python?.id}`)
          ) {
            if (Python) {
              (member?.roles as GuildMemberRoleManager).remove(Python);
            }
          }
          else {
            if (Python) {
              (member?.roles as GuildMemberRoleManager).add(Python);
              added_roles.push(`Python`);
            }
          }
          break;
        case "fifth_option":
          if (
            (member?.roles as GuildMemberRoleManager).cache.has(`${batch?.id}`)
          ) {
            if (batch) {
              (member?.roles as GuildMemberRoleManager).remove(batch);
            }
          }
          else {
            if (batch) {
              (member?.roles as GuildMemberRoleManager).add(batch);
              added_roles.push(`batch`);
            }
          }
          break;
        case "sixth_option":
          if (
            (member?.roles as GuildMemberRoleManager).cache.has(`${java?.id}`)
          ) {
            if (java) {
              (member?.roles as GuildMemberRoleManager).remove(java);
            }
          }
          else {
            if (java) {
              (member?.roles as GuildMemberRoleManager).add(java);
              added_roles.push(`java`);
            }
          }
          break;
        case "seventh_option":
          if (
            (member?.roles as GuildMemberRoleManager).cache.has(`${php?.id}`)
          ) {
            if (php) {
              (member?.roles as GuildMemberRoleManager).remove(php);
            }
          }
          else {
            if (php) {
              (member?.roles as GuildMemberRoleManager).add(php);
              added_roles.push(`php`);
            }
          }
          break;
        case "eighth_option":
          if (
            (member?.roles as GuildMemberRoleManager).cache.has(`${lua?.id}`)
          ) {
            if (lua) {
              (member?.roles as GuildMemberRoleManager).remove(lua);
            }
          }
          else {
            if (lua) {
              (member?.roles as GuildMemberRoleManager).add(lua);
              added_roles.push(`lua`);
            }
          }
          break;
        case "ninth_option":
          if (
            (member?.roles as GuildMemberRoleManager).cache.has(`${csharp?.id}`)
          ) {
            if (csharp) {
              (member?.roles as GuildMemberRoleManager).remove(csharp);
            }
          }
          else {
            if (csharp) {
              (member?.roles as GuildMemberRoleManager).add(csharp);
              added_roles.push(`csharp`);
            }
          }
          break;
        case "tenth_option":
          if (
            (member?.roles as GuildMemberRoleManager).cache.has(`${c?.id}`)
          ) {
            if (c) {
              (member?.roles as GuildMemberRoleManager).remove(c);
            }
          }
          else {
            if (c) {
              (member?.roles as GuildMemberRoleManager).add(c);
              added_roles.push(`c`);
            }
          }
      }
    });
    if (added_roles.length > 0) {
      selectMenu.reply({
        content: `Les roles ${added_roles.join(
          `, `
        )} vous ont été mis à jours !`,
        ephemeral: true,
      });
    }
  }
}

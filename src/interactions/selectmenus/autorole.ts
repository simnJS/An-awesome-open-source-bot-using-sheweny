import { SelectMenu } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { SelectMenuInteraction } from "discord.js";
  
export class Autorole extends SelectMenu {
  constructor(client: ShewenyClient) {
    super(client, ["selectRole"]);
  }
  
  async execute(selectMenu: SelectMenuInteraction) {
    switch (selectMenu.values[0]) {
      // case "first_option": if(Js) (member?.roles as GuildMemberRoleManager).add(Js); break;
      case "first_option": console.log('First option'); break;
      case "second_option": console.log('First option'); break;
      case "third_option": console.log('First option'); break;
      case "fourth_option": console.log('First option'); break;
      case "fifth_option": console.log('First option'); break;
      case "sixth_option": console.log('First option'); break;
      case "seventh_option": console.log('First option'); break;
      case "eighth_option": console.log('First option'); break;
      case "ninth_option": console.log('First option'); break;
      case "tenth_option": console.log('First option'); break;
    }
  }
};

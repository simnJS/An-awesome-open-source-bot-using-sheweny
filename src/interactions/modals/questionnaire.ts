import { Modal } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { ModalSubmitInteraction, TextChannel } from "discord.js";

export class QuestionnaireModal extends Modal {
  constructor(client: ShewenyClient) {
    super(client, ["quest"], {});
  }

  execute(modal: ModalSubmitInteraction) {
    modal.fields.getTextInputValue("age");
    modal.fields.getTextInputValue("etablissement");
    modal.fields.getTextInputValue("sexe");
    modal.fields.getTextInputValue("ami-travail");
    modal.fields.getTextInputValue("classe");

    modal.reply({
      content: "Merci pour votre participation !",
      ephemeral: true,
    });

    const channel = this.client.channels.cache.get(
      "987298210865352726"
    ) as TextChannel;
    channel.send({
      content: `
      **id** : ${modal.user.id}
      **Pseudo :** ${modal.user.tag}
      **Age :** ${modal.fields.getTextInputValue("age")}
      **Etablissement :** ${modal.fields.getTextInputValue("etablissement")}
      **Sexe :** ${modal.fields.getTextInputValue("sexe")}
      **Ami / Travail :** ${modal.fields.getTextInputValue("ami-travail")}
      **Classe :** ${modal.fields.getTextInputValue("classe")}
      --------------------------------------------------------`
    });

    return;
  }
}

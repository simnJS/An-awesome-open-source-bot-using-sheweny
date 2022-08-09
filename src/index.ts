import { CommandInteraction, Message } from "discord.js";
import mongoose from "mongoose";
import type { DatabaseProvider } from "././utils/Database";
import dotenv  from "dotenv";
dotenv.config();
declare module "sheweny" {
  interface ShewenyClient {
    db: DatabaseProvider;
  }
}

declare module "discord.js" {
  interface CommandInteraction {
    replySuccessMessage(content: string): Promise<void>;
    replyErrorMessage(content: string): Promise<void>;
    editSuccessMessage(content: string): any;
    editErrorMessage(content: string): any;
  }
}


import Safia from "./client/safia";

const client = new Safia();

client.login(process.env.DISCORD_TOKEN);

function connectDB() {
  mongoose.connect(`${process.env.DATABASE_URL}`, {
    serverSelectionTimeoutMS: 20000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 100000, // Close sockets after 45 seconds of inactivity  //45000
  });
}

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected");
});
mongoose.connection.on("error", () => {
  console.log("Connection failed. Try reconecting in 5 seconds...");
  setTimeout(() => connectDB(), 5000);
});
client.managers.commands!.on(
  "cooldownLimit",
  (interaction: CommandInteraction | Message) => {
    interaction.reply({
      content: "Please slow down",
      ephemeral: true,
    });
  }
);

connectDB();
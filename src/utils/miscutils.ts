import { Guild, GuildMember, TextChannel } from "discord.js";
export function timeformat(timeInSeconds: number) :string  {
  const days = Math.floor((timeInSeconds % 31536000) / 86400);
  const hours = Math.floor((timeInSeconds % 86400) / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.round(timeInSeconds % 60);
  return (
    (days > 0 ? `${days} jours, ` : "") +
    (hours > 0 ? `${hours} heures, ` : "") +
    (minutes > 0 ? `${minutes} minutes, ` : "") +
    (seconds > 0 ? `${seconds} secondes` : "")
  );
}
 

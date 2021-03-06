import { Guild } from "../models";
import { Types } from "mongoose";
import type { GuildCreateDB }  from "../utils/interface";

class DatabaseProvider {
  async post(data: GuildCreateDB): Promise<true> {
    const merged = Object.assign({ _id: new Types.ObjectId() }, { ...data });
    await Guild.create(merged);
    return true;
  }
  async get(guildId: string): Promise<any | null> {
    let data = await Guild.findOne({ guildId });
    if (!data) {
      await this.post({ guildId });
      data = await Guild.findOne({ guildId });
    }
    return data;
  }
  async update(guildId: string, settings: any): Promise<any | null> {
    let data: any = await this.get(guildId);
    if (!data || typeof data !== "object") return null;
    for (const key in settings) {
      if (data[key] != settings[key]) data[key] = settings[key];
    }
    return await data.updateOne(settings);
  }
  async delete(guildId: string) {
    const doc = await this.get(guildId);
    if (!doc) return false;
    await doc.delete();
    return true;
  }
}
export { DatabaseProvider };
import mongoose from "mongoose";

interface model {
    guildId: string;
    name: string;
    modChannel: string;
    users: [];
    bans: [];
    suggestChannel: string;
    welcomeChannel: string;
    logs: string;
    welcome: string;
    suggestion: string;
}

const guildSchema = new mongoose.Schema<model>({
    guildId: { 'type': String, 'default': '' },
    name: { 'type': String, 'default': '' },
    modChannel: { 'type': String, 'default': '' },
    users: { 'type': [], 'default': [] },
    bans: { 'type': [], 'default': [] },
    suggestChannel: { 'type': String, 'default': '' },
    welcomeChannel: { 'type': String, 'default': '' },
    logs: { 'type': String, 'default': '' },
    welcome: { 'type': String, 'default': '' },
    suggestion: { 'type': String, 'default': '' },
})

export default mongoose.model('Guild', guildSchema);
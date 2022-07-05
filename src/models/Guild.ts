import mongoose from "mongoose";

interface model {
    guildId: string;
    name: string;
    modChannel: string;
    users: [];
    bans: [];
    suggestChannel: string;
    welcomeChannel: string;
    verificationRole: string;
    logs: string;
    welcome: string;
    suggestion: string;
    verification: string;
    autorole: string;
    autoroleRole: string;
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
    verification: { 'type': String, 'default': 'false' },
    verificationRole: { 'type': String, 'default': '' },
    autorole: { 'type': String, 'default': 'false' },
    autoroleRole: { 'type': String, 'default': '' }
})

export default mongoose.model('Guild', guildSchema);
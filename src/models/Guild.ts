import mongoose from "mongoose";

interface model {
    guildId: string;
    name: string;
    modChannel: string;
    users: []
    suggestChannel: string;
    welcomeChannel: string;
}

const guildSchema = new mongoose.Schema<model>({
    guildId: { 'type': String, 'default': '' },
    name: { 'type': String, 'default': '' },
    modChannel: { 'type': String, 'default': '' },
    users: { 'type': [], 'default': [] },
    suggestChannel: { 'type': String, 'default': '' },
    welcomeChannel: { 'type': String, 'default': '' },
})

export default mongoose.model('Guild', guildSchema);
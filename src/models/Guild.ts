import mongoose from "mongoose";

const guildSchema = new mongoose.Schema({
    guildId: { 'type': String, 'default': '' },
    name: { 'type': String, 'default': '' },
    modChannel: { 'type': String, 'default': '' },
    users: { 'type': [], 'default': [] },

})

export default mongoose.model('Guild', guildSchema);
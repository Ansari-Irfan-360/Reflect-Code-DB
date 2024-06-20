import mongoose from 'mongoose';

const CodeSchema = mongoose.Schema({
    code: {
        type: String,
        required: false
    },
    roomID:{
        type: String,
        required: true
    },
    savedDate: {
        type: Date
    }
});


const code = mongoose.model('code', CodeSchema);

export default code;
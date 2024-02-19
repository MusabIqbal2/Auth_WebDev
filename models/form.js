const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
    formName: String,
    MCQ: { type: Boolean, default: false },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'Users' },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Forms = mongoose.model('Forms', FormSchema);

module.exports = Forms;
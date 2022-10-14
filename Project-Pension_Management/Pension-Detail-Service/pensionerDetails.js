const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PensionerDetailSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    dob: {
        type: String,
        require: true,
    },
    pan: {
        type: String,
        require: true,
        unique: true,
        index: true

    },
    aadhaar: {
        type: Number,
        require: true,
        unique: true,
        index: true
    },
    salary_earned: {
        type: Number,
        require: true,
    },
    allowances: {
        type: Number,
        require: true,
    },
    classification: {
        // SELF OR FAMILY
        type: String,
        require: true,
    },
    bank_detail: {
        bank_name: String,
        account_number: Number,
        // type is PUBLIC OR PRIVATE
        bank_type: {
            type: String,
            enum: ['public', 'private']
        },
    },
});

module.exports = mongoose.model("PensionerDetail", PensionerDetailSchema);
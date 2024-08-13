const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
    inn: {
        type: Number,
    },
    name: {
        type: String,
        minlength: 2,
        maxlength: 30,
        require: true,
    },
    users: {
        type: Array,
        // [
        //     {
        //         id: mongoose.Schema.Types.ObjectId,
        //         index: Number,
        //         actionState: String
        //     }
        // ]
    },
    status: {
        type: String,
    },
    paystatus: {
        type: Boolean,
    },
    dateofexpired: {
        type: Date,
    },
    transactions: {
        type: Object,
    }

});

module.exports = mongoose.model('organization', organizationSchema);

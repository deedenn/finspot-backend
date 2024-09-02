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
        require: true,
        default: [],
    },
    approveUsers: {
        type: Array,
        // [
        //     {
        //         id: mongoose.Schema.Types.ObjectId,
        //         index: Number,
        //         actionState: String
        //     }
        // ]
        require: true,
        default: [],
    },
    supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },
    isActive: {
        type: Boolean,
        default: true,
        require: true,
    },
    paystatus: {
        type: Boolean,
        default: true,
        require: true,
    },
    dateofexpired: {
        type: Date,
    },
    transactions: {
        type: Object,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('organization', organizationSchema);

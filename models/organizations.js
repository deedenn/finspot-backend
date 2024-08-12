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
    track: {
        type: Object,
    },
    users: {
        type: Object,
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

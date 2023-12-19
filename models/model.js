const mongoose = require('mongoose');
const Schema = mongoose.Schema; //конструктор візуальної структурної схеми

const beerSchema = new Schema({
    numberCard: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                const cardNumberRegex = /^[0-9]{16}$/;
                return cardNumberRegex.test(value);
            },
            message: 'Invalid card number, must be 16 digits'
        },
    },
    cvv: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                const cardNumberRegex = /^[0-9]{3}$/;
                return cardNumberRegex.test(value);
            },
            message: 'Invalid card number, must be 3 digits'
        }
    },
    expireed: {
        year: {
            type: Number,
            required: true,
            unique: true,
            validate: {
                validator: function (value) {
                    const cardNumberRegex = /^[0-9]{1,2}$/;
                    return cardNumberRegex.test(value);
                },
                message: 'Invalid card number, must be 2 digits'
            }
        },
        mounth: {
            type: Number,
            unique: true,
            required: true,
        },
    },  
    beer: {
        type: String,
        required: true,
    },
    nuts: {
        type: String,
    },
    squid: {
        type: String,
    },
    snack: {
        type: String,
    },
    deliveryPoint: {
        street: {
            type: String,
            required: true,
        },
        index: {
            type: Number,
            requireed: true,
        },
    },
});
const Beer = mongoose.model('beer', beerSchema);
module.exports = Beer;
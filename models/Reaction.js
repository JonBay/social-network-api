const { Schema, model, Types } = require("mongoose");
const dayjs = require("dayjs");

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: dateFormat => dayjs(dateFormat).format("MM/DD/YYYY HH:mm:ss")
            //add getter method to format the timestamp on query
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
)

module.exports = reactionSchema;
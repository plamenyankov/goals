var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var GoalSchema = new Schema({
    //_creator:Number,
    title: String,
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});
module.exports = mongoose.model("Goals",GoalSchema);
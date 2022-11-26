const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
    
    activityTitle : {
        type : String,
        required : true,
        trim : true

    },
    category : {
        type : String,
        required : true,
        trim : true
    },
    likeCount : {
        type : Number,
        default : 0,
        trim : true
    },
    liked : {
        type : Boolean,
        default : false,
    },
    photo : {
        type : String,
        default : "default.png",
        trim : true
    },
    owner : {
        type : Array,
        trim : true
    }
}, {collection : "activities", timestamps: true})

const db = mongoose.model("activities", activitySchema)


module.exports = db
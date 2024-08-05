const mongoose = require(mongoose)

const urlSchema = new mongoose.Schema({
    shortId:{
        type : String,
        required:true,
        unique: true
    },
    originalUrl:{
        type : String,
        required:true
    },
    numberOfClick:{
        type : Number,
    }
})

const urlModel = mongoose.model("url-shortner",urlSchema)
module.exports = urlModel
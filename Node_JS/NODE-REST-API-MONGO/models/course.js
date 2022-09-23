const mongoose = require("mongoose")

const coures = mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    genre:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    active:Boolean
})

module.exports=mongoose.model("courses",course)
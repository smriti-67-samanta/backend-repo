const mongoose=require('mongoose')

const reviewSchema=new Mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        min:1,
        max:5

    },
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Restaurent',
        required:true
    }
})
module.exports=mongoose.model('Review',reviewSchema)
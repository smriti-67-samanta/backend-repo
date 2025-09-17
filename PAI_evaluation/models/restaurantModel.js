const mongoose=require('mongoose')
const restaurentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    cuisin:{
        type:String,
        enum:['Italian','Mexican','Indian','Chinese','Other']
    }, 
    address:{
        type:String,
        required:true
    },
    averageRating:{
        type:Number,
        default:0

    }
})

module.exports=mongoose.model('Restaurent',restaurentSchema)
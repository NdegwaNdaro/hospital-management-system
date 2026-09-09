import mongoose from "mongoose";

const NurseSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        // password:{
        //     type:String,
        //     required:true
        // },
        gender:{
            type:String,
            required:true
        },
        phone:{
            type:String,
            required:true
        },
        shift:{
            type:String,
            required:true
        },
       specialization: { type: String },
  qualifications: {
    type: Array,
  },

  experiences: {
    type: Array,
  },
    },{timestamps:true}
)
export default mongoose.model("Nurse",NurseSchema)
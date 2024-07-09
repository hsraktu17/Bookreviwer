import mongoose, { Document, Model } from "mongoose";

mongoose.connect("mongodb+srv://utkarsh172002srivastava:u7cPS1M9QAjGZ2JD@cluster0.sxjqohy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/Book")

interface UserDocument extends Document{
    email : string,
    firstname : string,
    lastname : string,
    password : string
}

const userSchema = new mongoose.Schema<UserDocument>({
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
        minlength : 3,
        maxlength : 30
    },
    firstname : {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastname : {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    password : {
        type : String,
        required : true,
        minlength : 6
    }
})

const User  = mongoose.model<UserDocument>('User', userSchema)

export { User, UserDocument }
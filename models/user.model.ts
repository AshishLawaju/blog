
import mongoose,{model} from "mongoose";

type userTypes={
    email: string,
    passwordHash: string,
    googleId: String,
    facebookId: String,
    lastGithubPushDate: Date,
    githubId: String,
    githubAccessTokenHash: String,
    profilePicture: String,
    username: String,
    refreshToken: String,
    resetPin: String,
    resetPinExpiration: Date,
}

const userSchema = new mongoose.Schema<userTypes>({
    email:{
        type: String,
        required: true
    },
    passwordHash:{
        type: String,
        required: true
    },
    googleId: String,
    facebookId: String,
    lastGithubPushDate: String,
    githubId: String,
    githubAccessTokenHash: String,
    profilePicture: String,
    username: String,
    refreshToken: String,
    resetPin: String,
    resetPinExpiration: String
})

const User = model<userTypes>("user",userSchema);
export{ User };

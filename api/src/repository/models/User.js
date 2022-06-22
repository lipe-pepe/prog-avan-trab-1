import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        createdOn: { type: Date, default: Date.now },
        balance: { type: Number, default: 0 },
        totalPoints: { type: Number, default: 0 },
        activeMissions: { type: Array, required: true },
        pendingRewards: { type: Array, required: true },
        completedMissions: { type: Array, required: true },
        claimedRewards: { type: Array, required: true }
    }
)

const user = mongoose.model("users", userSchema);

export default user;
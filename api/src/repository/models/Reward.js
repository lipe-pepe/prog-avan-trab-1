import mongoose from "mongoose";

const rewardSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        availability: { type: Number, required: true },
        createdOn: { type: Date, default: Date.now },
        claimers: { type: Array, required: true },
        handed: { type: Array, required: true }
    }
)

const reward = mongoose.model("rewards", rewardSchema);

export default reward;
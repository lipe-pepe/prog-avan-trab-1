import mongoose from "mongoose";

const missionSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        points: { type: Number, required: true },
        expirationDate: { type: Date, required: true },
        createdOn: { type: Date, default: Date.now },
        createdBy: { type: mongoose.ObjectId, required: true },
        participants: { type: Array, required: true },
        completers: { type: Array, required: true },
        formUrl: { type: String, required: true }
    }
)

const missions = mongoose.model("missions", missionSchema);

export default missions;
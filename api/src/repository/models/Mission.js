import mongoose from "mongoose";

const missionSchema = new mongoose.Schema(
    {
        id: { type: Number, required: true },
        name: { type: String, required: true }
    }
)

const missions = mongoose.model("missions", missionSchema);

export default missions;
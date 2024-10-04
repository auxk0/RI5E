import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PositionSchema = new Schema(
    {
        buyPrice: Number,
        sellingPrice: Number,
        profit: Number,
        positions: Array
    },
    {
        timestamps: true,
        toJSON: { getters: true }
    }
);

const Position = mongoose.model("Position", PositionSchema);

export default Position;
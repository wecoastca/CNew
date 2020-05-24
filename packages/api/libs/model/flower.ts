import mongoose from "../db/db";

let Schema = mongoose.Schema;

let Flower = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
});

Flower.virtual("model").get(function () {
  return this.source && this.name;
});

export { Flower };

export default mongoose.model("Flower", Flower);

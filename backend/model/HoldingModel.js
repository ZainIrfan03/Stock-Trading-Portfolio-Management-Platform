const mongoose = require("mongoose");
const HoldingsSchema = require("../schemas/HoldingSchema");

const HoldingModel = mongoose.model("holdings", HoldingsSchema);

module.exports = HoldingModel;

import mongoose from "mongoose";
import nodeSchema from "./nodeModel.js";

const ruleSchema = new mongoose.Schema({
    ruleName: {
        type: String,
        required: true
    },
    rule: [{
        type: String,
        required: true
    }],
    root: {
        type: nodeSchema,
        required: true
    }
}, { timestamps: true });

const RuleModel = mongoose.model("RuleModel", ruleSchema);

export default RuleModel;
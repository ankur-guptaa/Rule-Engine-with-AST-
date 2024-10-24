import RuleModel from "../model/ruleModel.js"

const ruleList = async (req, res) => {
    try {
        const rules = await RuleModel.find();
        res.send(rules);
    }
    catch (error) {
        res.status(400).send(error);
    }
}

export default ruleList;
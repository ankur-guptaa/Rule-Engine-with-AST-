import RuleModel from "../model/ruleModel.js";

const evaluate = (rule, data) => {
    if (rule.type == "Operand") {
        let value = ("data." + rule.value);
        let fun = new Function('data', `return ${value}`);
        return fun(data);
    }

    let left = evaluate(rule.left, data), right = evaluate(rule.right, data);
    if (rule.value == "&&")
        return (left && right);
    else if (rule.value == "||")
        return (left || right);
}

const evaluateRule = async (req, res) => {
    try {
        let ruleName = req.body.ruleName, data = req.body.data;

        let rule = await RuleModel.findOne({ ruleName });
        // console.log(rule);
        if (rule == null)
            throw new Error("Rule Name doesnot exists.");
        let solution = evaluate(rule.root, data);

        // console.log(solution);
        res.send(solution);
    }
    catch (error) {
        res.send(error.message);
    }
}

export default evaluateRule;
import { formatInput, combineTwoRules } from "../utils/construct_ast.js";
import RuleModel from "../model/ruleModel.js";

const show_ast = (root) => {
    if (root == null)
        return;

    console.log(root.value);
    show_ast(root.left);
    show_ast(root.right);
}

const combineRules = async (req, res) => {
    try {
        const ruleName = req.body.ruleName, rules = req.body.rules;

        if (await RuleModel.findOne({ ruleName })) {
            throw new Error("Please enter a Unique Rule Name. You can check the list of existing Rules in the Evaluate Page");
        }

        // Initializing a list to store the root node of every rule
        let rule_list = [];
        for (let i = 0; i < rules.length; i++)
            rule_list.push(formatInput(rules[i]));

        let temp_list = [];
        while (rule_list.length > 1) {
            while (rule_list.length > 1)
                temp_list.push(combineTwoRules(rule_list.pop(), rule_list.pop()));
            while (temp_list.length > 0)
                rule_list.push(temp_list.pop());
        }
        let combinedRule = rule_list.pop();
        // console.log(JSON.stringify(combinedRule, null, 2));
        // show_ast(combinedRule);

        const newRule = new RuleModel({ ruleName, rule: rules, root: combinedRule });
        await newRule.save();

        res.send("Rule has been created.");
    }
    catch (error) {
        res.send(error.message);
    }
}

export default combineRules;
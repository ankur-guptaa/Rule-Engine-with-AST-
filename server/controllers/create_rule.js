import { formatInput } from "../utils/construct_ast.js";
import RuleModel from "../model/ruleModel.js";

const show_ast = (root) => {
  if (root == null)
    return;

  console.log(root.value);
  show_ast(root.left);
  show_ast(root.right);
}

const createRule = async (req, res) => {
  try {
    let ruleName = req.body.ruleName, rule = req.body.rule;

    const root = formatInput(rule);
    // console.log(JSON.stringify(root, null, 2));
    // show_ast(root);

    if (await RuleModel.findOne({ ruleName })) {
      throw new Error("Please enter a Unique Rule Name. You can check the list of existing Rules in the Evaluate Page");
    }
    const newRule = new RuleModel({ ruleName, rule, root });
    await newRule.save();

    res.send("Rule has been created.");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export default createRule;

// Defining the Node Structure
class Node {
    constructor(type, left, right, value) {
        this.type = type;
        this.left = left;
        this.right = right;
        this.value = value;
    }
}

const constructAST = (rule) => {
    // Checking the presence of "AND" and "OR" operator as their absence confirms that it's the simplest logical expression
    if (!rule.includes("&&") && !rule.includes("||"))
        return new Node("Operand", null, null, rule);

    // Initializing a stack for Brackets as it will help us in seperating the two different expressions
    let st = [], expression_idx = 1, flag = true;
    while (flag) {
        if (rule[0] == '(') {
            st.push('(');
        }
        // Empty stack indicate that the first expression has ended and now our iterator "expression_idx" is pointing to the operator
        while (st.length > 0) {
            if (rule[expression_idx] == '(')
                st.push('(');
            else if (rule[expression_idx] == ')')
                st.pop();
            expression_idx++;
        }

        // If "expression_idx" points to the last index then it mean that string is consisting of unnecessary brackets
        if (expression_idx == rule.length && (rule[0] == '(' && rule[rule.length - 1] == ')')) {
            // Removing that unnecessary bracket
            rule = rule.substr(1, rule.length - 2);
            expression_idx = 1;
        }
        else
            flag = false;
    }

    // If string doesnot consist of brackets then we will break it from the first "AND" or "OR"
    if (expression_idx == 1) {
        let first_occ_AND = rule.indexOf("&&"), first_occ_OR = rule.indexOf("||");
        if (first_occ_AND != -1 && first_occ_OR != -1)
            expression_idx = Math.min(first_occ_AND, first_occ_OR);
        else if (first_occ_AND != -1)
            expression_idx = first_occ_AND;
        else if (first_occ_OR != -1)
            expression_idx = first_occ_OR;
    }

    // Extracting the first expression from the string
    let expression_1 = rule.substr(0, expression_idx);
    let operator_idx = expression_idx, operator = '';

    // Extracting the operator from the string
    while (operator_idx < rule.length && (rule[operator_idx] == '&' || rule[operator_idx] == '|'))
        operator_idx++;
    if (operator_idx - expression_idx > 0)
        operator = rule.substr(expression_idx, operator_idx - expression_idx);

    //Extracting the second expression from the string
    let expression_2 = '';
    if (operator != '')
        expression_2 = rule.substr(operator_idx, rule.length - operator_idx);

    // Making a recursive in order to find the simplest expressions
    return new Node("Operator", constructAST(expression_1), constructAST(expression_2), operator);
};

const formatInput = (rule) => {
    // Removing all the Spaces
    rule = rule.replace(/\s+/g, '');

    // Replacing different Types of Brackets into just one type i.e. "()"
    rule = rule.replace(/\{/g, '(');
    rule = rule.replace(/\}/g, ')');
    rule = rule.replace(/\[/g, '(');
    rule = rule.replace(/\]/g, ')');

    // Replacing "AND" with "&&" and "OR" with "||" as this will help in evaluating the expression without the need of any further changes
    rule = rule.replace(/AND/g, "&&");
    rule = rule.replace(/OR/g, "||");

    // Replacing '=' with "==" as we want comparision and also making sure it wouldn't impact the other operator
    rule = rule.replace(/=/g, "==");
    rule = rule.replace(/<==/g, "<=");
    rule = rule.replace(/>==/g, ">=");

    // Constructuring the AST
    return constructAST(rule);
}

const combineTwoRules = (rule_2, rule_1) => {
    return new Node("Operator", rule_1, rule_2, "&&");
}

export { formatInput, combineTwoRules };

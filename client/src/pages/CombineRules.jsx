import { useState } from "react";
import Header from "../components/Header.jsx";
import axios from "axios";

const CombineRules = () => {
  const [numRule, setNumRule] = useState(2);
  const [ruleName, setRuleName] = useState("");
  const [ruleList, setRuleList] = useState([]);

  return (
    <div className=" w-screen flex flex-col items-center gap-10">
      <Header heading="Combine Rules"></Header>
      <div className="w-full flex justify-center">
        <div className=" w-1/6 flex items-center justify-center">
          Enter the Rule Name
        </div>
        <div className=" w-3/6">
          <input
            type="text"
            placeholder="Eg. Rule 5"
            className=" w-full border border-gray-400 rounded-xl p-2"
            onChange={(e) => {
              setRuleName(e.target.value);
            }}
          ></input>
        </div>
      </div>
      <div className=" w-full flex flex-col justify-center gap-2">
        {Array(numRule)
          .fill()
          .map((_, index) => {
            return (
              <div className=" w-full flex justify-center">
                <div className=" w-1/6 flex items-center justify-center">
                  Enter the Rule String
                </div>
                <div className=" w-3/6">
                  <textarea
                    type="text"
                    rows={3}
                    placeholder="Eg. ((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)"
                    className=" w-full border border-gray-400 rounded-xl p-2"
                    onChange={(e) => {
                      const updatedRuleList = ruleList;
                      updatedRuleList[index] = e.target.value;
                      setRuleList(updatedRuleList);
                      console.log(ruleList);
                    }}
                  ></textarea>
                </div>
              </div>
            );
          })}
      </div>
      <div className=" w-7/12 flex justify-center">
        <div className=" w-full flex justify-start">
          <button
            className=" bg-blue-500 text-white text-sm rounded-lg px-2 py-2"
            onClick={() => {
              if (numRule == 1) return;
              setNumRule(numRule - 1);
              const updatedRuleList = ruleList;
              updatedRuleList.pop();
              setRuleList(updatedRuleList);
            }}
          >
            Remove Rule
          </button>
        </div>
        <div className=" w-full flex justify-center">
          <button
            className=" bg-blue-600 text-white text-xl rounded-lg px-20 py-2"
            onClick={async (e) => {
              try {
                const res = await axios.post(
                  `${import.meta.env.VITE_BASEURL}/combine_rules`,
                  { ruleName, rules: ruleList }
                );
                alert(res.data);
              } catch (error) {
                alert(error.message);
              }
            }}
          >
            Submit
          </button>
        </div>
        <div className=" w-full flex justify-end">
          <button
            className=" bg-blue-500 text-white text-sm rounded-lg px-2 py-2"
            onClick={() => {
              setNumRule(numRule + 1);
              const updatedRuleList = ruleList;
              updatedRuleList.push("");
              setRuleList(updatedRuleList);
            }}
          >
            Add Rule
          </button>
        </div>
      </div>
    </div>
  );
};

export default CombineRules;

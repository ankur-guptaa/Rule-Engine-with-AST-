import { useEffect, useState } from "react";
import axios from "axios";
import AddRuleData from "../components/AddRuleData.jsx";
import Header from "../components/Header.jsx";

const EvaluateRule = () => {
  const [numRuleData, setNumRuleData] = useState(3);
  const [ruleList, setRuleList] = useState([]);
  const [currentRule, setCurrentRule] = useState(null);
  const [data, setData] = useState("");

  const getRules = async () => {
    const res = await axios(`${import.meta.env.VITE_BASEURL}/rule_list`);
    setRuleList(res.data);
  };

  useEffect(() => {
    getRules();
  }, []);

  return (
    <div className=" w-screen flex flex-col gap-8">
      <Header heading="Evaluate Rule"></Header>
      <div className=" w-full flex justify-center gap-5">
        <div className="w-1/4 flex flex-col justify-center items-center">
          <div className=" w-full flex items-center justify-center text-xl font-semibold p-4">
            Rule List
          </div>
          <div className=" w-3/4  border border-gray-300 rounded-lg max-h-96 overflow-y-auto">
            {ruleList.map((rule) => {
              return (
                <div className=" w-full">
                  <div
                    className={` w-full flex justify-center borer border-gray-300 p-2 ${
                      currentRule == rule ? "bg-blue-500 text-white" : ""
                    }`}
                    onClick={() => {
                      setCurrentRule(rule);
                    }}
                  >
                    {rule.ruleName}
                  </div>
                  <div>
                    <hr className=" w-full border border-gray-300"></hr>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className=" w-3/4 flex flex-col items-center gap-5">
          <div className=" w-3/4 flex items-center justify-center border border-gray-300 rounded-lg p-5 my-5">
            {currentRule
              ? currentRule.rule
              : "Expression for the selected Rule will be Displayed here. You select any Rule from the Rule List."}
          </div>
          <div className=" w-3/4 flex items-center justify-center">
            Enter the Data in JSON Format
          </div>
          <div className=" w-3/4 flex flex-col justify-center items-center gap-1">
            <textarea
              type="text"
              rows={3}
              placeholder={`Eg. {"age": 35, "department": "Sales", "salary": 60000, "experience": 3}`}
              className=" w-full border border-gray-400 rounded-xl p-2"
              onChange={(e) => {
                setData(e.target.value);
              }}
            ></textarea>
            {/* {Array(numRuleData)
              .fill()
              .map((_, index) => (
                <AddRuleData key={index} />
              ))} */}
          </div>
          <div className=" w-3/4 flex justify-center">
            {/* <div className=" w-full flex justify-start">
              <button
                className=" bg-blue-500 text-white text-sm rounded-lg px-2 py-2"
                onClick={() => {
                  if (numRuleData == 1) return;
                  setNumRuleData(numRuleData - 1);
                }}
              >
                Remove Rule
              </button>
            </div> */}
            <div className=" w-full flex justify-center">
              <button
                className=" bg-blue-600 text-white text-xl rounded-lg px-20 py-2"
                onClick={async () => {
                  try {
                    const res = await axios.post(
                      `${import.meta.env.VITE_BASEURL}/evaluate_rule`,
                      { ruleName: currentRule.ruleName, data: JSON.parse(data) }
                    );
                    alert(res.data);
                  } catch (error) {
                    if(currentRule == null)
                      alert("Please select the Rule on which you want to Evaluate.");
                    else
                    alert(error.message);
                  }
                }}
              >
                Submit
              </button>
            </div>
            {/* <div className=" w-full flex justify-end">
              <button
                className=" bg-blue-500 text-white text-sm rounded-lg px-2 py-2"
                onClick={() => {
                  setNumRuleData(numRuleData + 1);
                }}
              >
                Add Rule
              </button>
            </div> */}
          </div>
        </div>
        <div className=""></div>
      </div>
    </div>
  );
};

export default EvaluateRule;

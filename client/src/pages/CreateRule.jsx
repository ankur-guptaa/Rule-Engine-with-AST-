import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateRule = () => {
  const [ruleName, setRuleName] = useState("");
  const [rule, setRule] = useState("");
  const navigate = useNavigate();

  return (
    <div className=" w-screen flex flex-col gap-16">
      <div className=" w-full flex flex-col mt-10 gap-4">
        <div className="w-full flex justify-center text-5xl font-bold">
          Application 1 : Rule Engine with AST
        </div>
        <div className="w-full flex justify-center text-2xl font-semibold">
          Create Rule
        </div>
      </div>
      <div className=" w-full flex flex-col justify-center items-center gap-10">
        <div className="w-full flex justify-center">
          <div className=" w-1/6 flex items-center justify-center">
            Enter the Rule Name
          </div>
          <div className=" w-3/6">
            <input
              type="text"
              placeholder="Eg. Rule 5"
              onChange={(e) => {
                setRuleName(e.target.value);
              }}
              className=" w-full border border-gray-400 rounded-xl p-2"
            ></input>
          </div>
        </div>
        <div className=" w-full flex justify-center">
          <div className=" w-1/6 flex items-center justify-center">
            Enter the Rule String
          </div>
          <div className=" w-3/6">
            <textarea
              type="text"
              rows={5}
              placeholder="Eg. ((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)"
              onChange={(e) => {
                setRule(e.target.value);
              }}
              className=" w-full border border-gray-400 rounded-xl p-2"
            ></textarea>
          </div>
        </div>
        <div className=" w-4/6 flex justify-center">
          <button
            className=" bg-blue-600 text-white text-xl rounded-lg px-20 py-2"
            onClick={async (event) => {
              try {
                const res = await axios.post(
                  `${import.meta.env.VITE_BASEURL}/create_rule`,
                  { ruleName, rule }
                );

                alert(res.data);
                navigate("/evaluate_rule");
              } catch (error) {
                alert(error.response.data);
              }
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRule;

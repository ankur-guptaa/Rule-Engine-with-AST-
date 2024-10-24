import ruleList from "../../../server/controllers/rule_list";

const AddRule = (props) => {
  return (
    <div className=" w-full flex flex-col justify-center gap-4">
      <div className="w-full flex justify-center">
        <div className=" w-1/6 flex items-center justify-center">
          Enter the Rule Name
        </div>
        <div className=" w-3/6">
          <input
            type="text"
            placeholder="Eg. Rule 5"
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
            rows={3}
            placeholder="Eg. ((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)"
            className=" w-full border border-gray-400 rounded-xl p-2"
            onChange={(e)=>{
              const updatedRuleList = props.ruleList;
              updatedRuleList[props.index] = e.target.value;
              props.setRuleList(updatedRuleList);
              console.log(props.ruleList);
            }}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default AddRule;

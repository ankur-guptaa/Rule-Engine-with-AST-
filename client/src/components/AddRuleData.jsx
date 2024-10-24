const AddRuleData = () => {
  return (
    <div className=" w-5/12 flex justify-around">
      <input
        type="text"
        rows={3}
        placeholder='Eg. {"age": 35, "department": "Sales", "salary": 60000, "experience": 3}'
        className=" w-full border border-gray-400 rounded-xl p-2"
      ></input>
      <div className=" flex text-5xl px-5">-</div>
      <input
        type="text"
        rows={3}
        placeholder='Eg. {"age": 35, "department": "Sales", "salary": 60000, "experience": 3}'
        className=" w-full border border-gray-400 rounded-xl p-2"
      ></input>
    </div>
  );
};

export default AddRuleData;

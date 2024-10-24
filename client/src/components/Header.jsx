const Header = (props) => {
  return (
    <div className=" w-full flex flex-col mt-6 gap-2">
      <div className="w-full flex justify-center text-4xl font-bold">
        Application 1 : Rule Engine with AST
      </div>
      <div className="w-full flex justify-center text-xl font-semibold">
        {props.heading}
      </div>
    </div>
  );
};

export default Header;

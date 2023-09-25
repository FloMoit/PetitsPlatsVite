import { useMemo } from "react";

function Select(props) {
  //const recipesLength = useMemo(() => filterTodos(todos, tab), [todos, tab]);
  const Selection = {
    label: props.defaultValue.label,
    value: props.defaultValue.value,
  };

  return (
    <>
      <div className="flex flex-col gap-3 bg-white w-52 rounded-2xl">
        <div className="flex flex-row items-center justify-between px-4 py-2">
          <span>{Selection.label}</span>
          <i className="fa-solid fa-chevron-down" />
        </div>
        <div className="relative flex flex-row px-4">
          <form className="text-zinc-300">
            <input
              type="text"
              onChange=""
              className="w-full p-1 bg-white border-2 rounded outline-none border-zinc-200"></input>
            <i className="absolute top-3 right-6 fa-solid fa-search " />
          </form>
        </div>
        <div className="flex flex-col">
          {props.options.map((option) => (
            <div
              key={option.value}
              className="px-4 py-2 cursor-pointer hover:bg-yellowTheme">
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Select;

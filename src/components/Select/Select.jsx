import { useMemo, useState } from "react";
import { useClickAway } from "../../hooks/useClickAway";

function Select(props) {
  //const recipesLength = useMemo(() => filterTodos(todos, tab), [todos, tab]);
  const Selection = {
    label: props.defaultValue.label,
    value: props.defaultValue.value,
  };

  const [search, setSearch] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const ref = useClickAway(() => {
    setIsExpanded(false);
  });

  const filteredOptions = useMemo(() => {
    if (search === "") return props.options;

    return props.options.filter((item) => {
      return item.value.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
  }, [props.options, search]);

  const hasFilter = search.length > 0;

  function expandSelect() {
    setIsExpanded(!isExpanded);
  }
  function forceColapse() {
    setIsExpanded(false);
  }

  function clearFilter() {
    setSearch("");
  }

  function addElement(option) {
    return () => {
      props.onChange(option);
      forceColapse();
    };
  }

  return (
    <>
      <div
        ref={ref}
        className={
          isExpanded
            ? "flex flex-col h-80 gap-3 overflow-hidden bg-white w-52 rounded-2xl"
            : "flex flex-col max-h-10 gap-3 overflow-hidden bg-white w-52 rounded-2xl"
        }>
        <div
          className="flex flex-row items-center justify-between px-4 py-2 cursor-pointer"
          onClick={expandSelect}>
          <span>{Selection.label}</span>
          {isExpanded ? (
            <i className="fa-solid fa-chevron-up" />
          ) : (
            <i className="fa-solid fa-chevron-down" />
          )}
        </div>
        <div className="relative flex flex-row px-4">
          <form className="text-zinc-300" onReset={clearFilter}>
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-1 bg-white border-2 rounded outline-none border-zinc-200"></input>
            {hasFilter && (
              <button type="reset">
                <i className="absolute cursor-pointer top-[11px] right-12 fa-solid fa-xmark" />
              </button>
            )}

            <i className="absolute top-[11px] right-6 fa-solid fa-search " />
          </form>
        </div>
        <div className="flex flex-col overflow-auto">
          {filteredOptions.map((option) => (
            <div
              key={option.value}
              onClick={addElement(option)}
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

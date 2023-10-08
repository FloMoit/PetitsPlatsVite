import logo from "../../assets/interface/logo.png";

function Header(props) {
  const { onSearch } = props;

  function changeHandler(event) {
    console.log(event.target.value);

    if (event.target.value.length < 3) {
      onSearch("");
    } else {
      onSearch(event.target.value);
    }
  }

  return (
    <>
      <div className="flex justify-start w-full h-auto">
        <img src={logo} alt="Logo" className="absolute w-auto top-10 left-14" />
        <div className="flex gap-5 flex-col w-full h-[48rem] min-h-full bg-[url('assets/interface/header-bg.png')] bg-no-repeat bg-cover justify-center items-center ">
          <h1 className="text-5xl leading-snug text-center text-yellowTheme font-['Anton'] ">
            CHERCHEZ PARMI PLUS DE 1500 RECETTES <br />
            DU QUOTIDIEN, SIMPLES ET DÉLICIEUSES
          </h1>
          <form
            className="relative flex justify-center w-1/2"
            onSubmit={(event) => {
              event.preventDefault();
            }}>
            <input
              className="w-full px-5 py-3 text-black bg-white rounded "
              type="text"
              name="search"
              onChange={changeHandler}
              placeholder="Rechercher une recette, un ingrédient, ..."
            />
            <button
              type="submit"
              className="absolute px-2 py-1 text-xl text-white bg-black rounded cursor-pointer right-[6px] top-[6px]">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Header;

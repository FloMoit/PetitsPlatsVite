import logo from "../../assets/interface/logo.png";

function Header() {
  return (
    <>
      <div className="flex justify-start w-full h-auto">
        <img src={logo} alt="Logo" className="absolute w-auto top-10 left-10" />
        <div className="flex gap-5 flex-col w-full h-[48rem] min-h-full bg-[url('assets/interface/header-bg.png')] bg-no-repeat bg-cover justify-center items-center ">
          <h1 className="text-5xl leading-snug text-center text-yellowTheme font-['Anton'] ">
            CHERCHEZ PARMI PLUS DE 1500 RECETTES <br />
            DU QUOTIDIEN,SIMPLES ET DÉLICIEUSES
          </h1>
          <div className="relative flex justify-center w-1/2 ">
            <input
              className="w-full px-5 py-3 text-black bg-white rounded "
              type="text"
              placeholder="Rechercher une recette"
            />
            <span className="absolute top-0 right-0">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;

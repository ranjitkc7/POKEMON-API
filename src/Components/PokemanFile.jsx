import React, { useEffect, useState } from "react";

const PokemanFile = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("")

  const Api = "https://pokeapi.co/api/v2/pokemon?limit=28";

  const pokemanData = async () => {
    try {
      const response = await fetch(Api);
      const data = await response.json();

      const eachPokeData = data.results.map(async (curPoke) => {
        const response = await fetch(curPoke.url);
        const data = await response.json();
        return data;
      });
      const detailsPokeData = await Promise.all(eachPokeData);
      setItems(detailsPokeData);
      console.log(detailsPokeData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error);
      console.log(error);
    }
  };
  useEffect(() => {
    pokemanData();
  }, []);

  const searchData = items.filter((curCard) => 
     curCard.name.toLowerCase().includes(search.toLowerCase())
  );
 
  if (isLoading) {
    return (
      <div className="font-[600] text-[1.3rem] pt-[13px] px-[14px]">
        Loading...
      </div>
    );
  }
  if (error) {
    return <h1>{error.message}</h1>;
  }
  return (
    <div
      className=" flex flex-col h-[100vh] 
    items-center justify-start pt-[1px]"
    >
      <h1 className="font-[700] text-[2.5rem] tracking-[1px]">
        Lets Catch Pokemons
      </h1>
      <input
        className="h-[2rem] w-[23rem] my-[1rem] rounded-[9px] px-[1rem] border-2
          border-slate-400" placeholder="Search Pokemon"
        type="text"
        value ={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <div className="grid my-[1rem] grid-cols-4 gap-[1rem]">
        {searchData.map((curData) => {
          return (
            <li
              className=" h-[24rem] w-[19rem] rounded-md flex flex-col 
            items-center justify-start bg-slate-100 shadow-md"
              key={curData.id}
            >
              <figure className="w-[10rem] mt-1 h-[10rem] rounded-full bg-green-50">
                <img className="h-[9rem] w-[9rem] object-contain"
                  src={curData.sprites.front_default || curData.sprites.front_shiny}
                  alt={curData.name}
                />
              </figure>
              <h1 className="font-[800] pt-1 text-[1.2rem]">{curData.name.toUpperCase()}</h1>
              <p className=" w-[10rem] text-[1.1rem] bg-green-500 px-3 text-center rounded-lg py-1">
                {
                 curData.types.map((curType) => curType.type.name.charAt(0).
                 toUpperCase() + curType.type.name.slice(1))
                 .join(", ")
                }
              </p>
              <div className="grid grid-cols-3 gap-2 pt-[1rem] font-[500]">
                <p>
                  <span>Height :</span>
                  <span>{curData.height}</span>
                </p>
                <p>
                  <span>Weigth :</span>
                  <span>{curData.weight}</span>
                </p><p>
                  <span>Speed :</span>
                  <span>{curData.stats[5].base_stat}</span>
                </p>
              </div>
              <div className="flex justify-between gap-[2.4rem] font-[550] text-[1.1rem] pt-[1rem]">
                <p className="flex flex-col">
                  <span className="text-[1rem]">{curData.base_experience}</span>
                  <span>Expeience </span>
                </p>
                <p  className="flex flex-col">
                  <span className="text-[1rem]">{curData.stats[1].base_stat}</span>
                  <span>Attack </span>
                </p>
                <p  className="flex flex-col">
                  <span className="text-[1rem]">{curData.abilities.map((curAbi) => 
                   curAbi.ability.name.charAt(0).toUpperCase() + curAbi.ability.name.slice(1))
                    .slice(0, 1)
                    .join(",")
                    }</span>
                  <span>Ablities </span>
                </p>
              </div>
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default PokemanFile;

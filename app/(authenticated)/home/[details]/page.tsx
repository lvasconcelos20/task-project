"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { use } from "react";

type Props = {
  params: Promise<{ details: string }>;
};

export default function DetailsPage({ params }: Props) {
  const { details: name } = use(params);
  const [pokemon, setPokemon] = useState<any>(null);

  useEffect(() => {
    if (name) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((res) => setPokemon(res.data))
        .catch((err) => console.error(err));
    }
  }, [name]);

  if (!pokemon) return <div className="p-10 text-lg">Carregando...</div>;

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-100 to-white p-10 flex flex-col items-center xl:justify-center">
      <h1 className="text-4xl font-extrabold capitalize text-[#004FAA] mb-6">
        {pokemon.name}
      </h1>

      <div className="bg-white shadow-xl rounded-xl p-6 flex flex-col md:flex-row items-center w-full max-w-4xl">
        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          className="w-64 h-64 object-contain"
        />

        <div className="md:ml-10 mt-6 md:mt-0 text-gray-800 w-full">
          <p><strong className="text-[#004FAA]">Número:</strong> #{pokemon.id}</p>
          <p><strong className="text-[#004FAA]">Altura:</strong> {pokemon.height / 10} m</p>
          <p><strong className="text-[#004FAA]">Peso:</strong> {pokemon.weight / 10} kg</p>

          <div className="mt-3">
            <p className="text-[#004FAA] font-semibold">Tipos:</p>
            <div className="flex gap-2 flex-wrap mt-1">
              {pokemon.types.map((t: any) => (
                <span
                  key={t.slot}
                  className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium capitalize"
                >
                  {t.type.name}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-3">
            <p className="text-[#004FAA] font-semibold">Habilidades:</p>
            <div className="flex gap-2 flex-wrap mt-1">
              {pokemon.abilities.map((a: any, i: number) => (
                <span
                  key={i}
                  className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium capitalize"
                >
                  {a.ability.name}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p className="text-[#004FAA] font-semibold mb-2">Status Base:</p>
            <div className="space-y-2">
              {pokemon.stats.map((stat: any, i: number) => (
                <div key={i}>
                  <p className="text-sm capitalize text-gray-700">
                    {stat.stat.name}:{" "}
                    <span className="font-bold text-gray-900">{stat.base_stat}</span>
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(stat.base_stat / 200) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

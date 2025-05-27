"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import PokemonCard from "@/components/molecules/Card/card";
import Input from "@/components/atoms/Input/input";
import Button from "@/components/atoms/Button/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonName, setPokemonName] = useState("");
  const router = useRouter();

  const pokemonsPerPage = 12;

  useEffect(() => {
    getPokemon();
  }, []);

  const getPokemon = () => {
    const endpoints = [];
    for (let i = 1; i < 50; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    }

    axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((response) => setPokemons(response));
  };

  const searchPokemon = () => {
    if (!pokemonName.trim()) {
      getPokemon();
      return;
    }

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
      .then((response) => {
        setPokemons([response]);
        setCurrentPage(1);
      })
      .catch(() => setPokemons([]));
  };

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
  const totalPages = Math.ceil(pokemons.length / pokemonsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const pokemonPickHandler = (pokemonName: string) => {
    router.push(`/home/${pokemonName}`);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-100 to-white pt-24 px-4 flex flex-col items-center">
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
        <Input
          placeholder="Pesquise pelo nome..."
          type="text"
          onChange={(event) => setPokemonName(event.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchPokemon()}
          className="xl:w-96 lg:w-96 md:w-80"
        />
        <Button
          onClick={searchPokemon}
          className="text-[#004FAA] bg-white border border-[#004FAA] hover:bg-blue-100 transition-all"
        >
          Buscar
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {currentPokemons.map((pokemon, key) => (
          <div
            key={key}
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => pokemonPickHandler(pokemon.data.name)}
          >
            <PokemonCard
              image={pokemon.data.sprites.front_default}
              name={pokemon.data.name}
              types={pokemon.data.types}
            />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="py-6">
          <Pagination>
            <PaginationContent className="text-[#004FAA]">
              <PaginationItem>
                <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={currentPage === i + 1}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}

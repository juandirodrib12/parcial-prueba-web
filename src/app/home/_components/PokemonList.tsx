'use client'

import { useState, useEffect } from 'react';
import { PokemonDetail } from './PokemonDetail'; 
import { Pokemon } from '../page';

export const PokemonList = ({ pokemonList }: { pokemonList: Pokemon[] }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [favorites, setFavorites] = useState<Pokemon[]>([]);
  const filteredPokemons = pokemons.filter(pokemon => !favorites.some(favorite => favorite.id === pokemon.id));

  useEffect(() => {
    setPokemons(pokemonList);
    setFavorites(JSON.parse(localStorage.getItem('favorites') || '[]'));
  }, [pokemonList]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="m-4 border border-gray-300 rounded-lg p-4">
        <div id="list-pokemons" className="flex flex-col items-center">
          <h2 className="text-lg font-bold mb-4 text-center">
            Pokémon
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPokemons.map((pokemon) => (
              <PokemonDetail
                key={pokemon.id}
                pokemon={pokemon}
                isFavorite={false}
                addFavorite={() => {
                  const updatedFavorites = [...favorites, pokemon];
                  setFavorites(updatedFavorites);
                  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
                }}
                removeFavorite={() => {}}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="m-4 border border-gray-300 rounded-lg p-4">
        <div id="favorites-pokemons" className="flex flex-col items-center">
          <h2 className="text-lg font-bold mb-4 text-center">
            Favoritos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.map((pokemon) => (
              <PokemonDetail
              key={pokemon.id}
              pokemon={pokemon}
              isFavorite={true}
              addFavorite={() => {}}
              removeFavorite={() => {
                const updatedFavorites = favorites.filter(favorite => favorite.id !== pokemon.id);
                setFavorites(updatedFavorites);
                localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
              }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
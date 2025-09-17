'use client'

import Image from "next/image";
import { Pokemon } from "../page";

interface PokemonProperties {
    pokemon: Pokemon;
    isFavorite: boolean;
    addFavorite: (pokemon: Pokemon) => void;
    removeFavorite: (pokemon: Pokemon) => void;
}

export const PokemonDetail = ({ pokemon, isFavorite, addFavorite, removeFavorite }: PokemonProperties) => {
    return (
        <div className="border border-gray-300 rounded-lg p-4 max-w-xs text-center bg-white">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
                {pokemon.name}
            </h2>
            <Image
                className="w-48 h-48 object-contain mx-auto"
                src={pokemon.image}
                alt={pokemon.name}
                width={200}
                height={200}
            />
            <div className="mt-5 flex flex-col gap-2 justify-center">
                <button
                    className={`px-2 py-1 rounded-lg border text-sm font-medium ${
                        isFavorite
                            ? "text-gray-500 border-gray-500 cursor-not-allowed"
                            : "text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
                    }`}
                    disabled={isFavorite}
                    onClick={() => addFavorite(pokemon)}
                >
                    Favorite
                </button>
                <button
                    className={`px-2 py-1 rounded-lg border text-sm font-medium ${
                        isFavorite
                            ? "text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                            : "text-gray-500 border-gray-500 cursor-not-allowed"
                    }`}
                    disabled={!isFavorite}
                    onClick={() => removeFavorite(pokemon)}
                >
                    Remove
                </button>
            </div>
        </div>
    );
};
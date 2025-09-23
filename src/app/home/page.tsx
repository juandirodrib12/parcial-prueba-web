import { PokemonList } from "./_components/PokemonGrid";

export interface Pokemon {
  id: number;
  name: string;
  image: string;
}

export default async function Home() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon");
  const data = await response.json();
  
  const pokemones: Pokemon[] = await Promise.all(
    data.results.map(async (pokemon: { name: string; url: string }) => {
      const pokemonResponse = await fetch(pokemon.url);
      const pokemonData = await pokemonResponse.json();
      return {
        id: pokemonData.id,
        name: pokemon.name,
        image: pokemonData.sprites.other.dream_world.front_default,
      };
    })
  );

  return (
    <div>
      <PokemonList pokemonList={pokemones} />
    </div>
  );
}
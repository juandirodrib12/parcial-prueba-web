'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm , SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { Pokemon } from '../page';
import { toast } from 'sonner';

const pokemonFormSchema = z.object({
    name: z.string().min(5).max(30),
    image: z.string().url(),
});

export type PokemonFormData = z.infer<typeof pokemonFormSchema>;

export function PokemonForm( { addPokemon }: { addPokemon: (pokemon: Pokemon) => void } ) {

    const { register, handleSubmit, formState: { errors }, reset } = useForm<PokemonFormData>({
        resolver: zodResolver(pokemonFormSchema),
        defaultValues: {
            name: "pikachu",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
        }
    });

    const onSubmit: SubmitHandler<PokemonFormData> = data => {
        const pokemon: Pokemon = {
            id: 20 + Math.floor(Math.random() * 1000), 
            name: data.name,
            image: data.image
        };
        addPokemon(pokemon);
        toast.success(`${pokemon.name} agregado con exito`);
        reset();
    };

    return (
        <div className="m-4 border border-gray-300 rounded-lg p-4">
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-black font-semibold mb-2">Name</label>
                    <input
                        id="name"
                        type="text"
                        {...register('name')}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-black font-semibold mb-2">Image URL</label>
                    <input
                        id="image"
                        type="text"
                        {...register('image')}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-blue-500 ${errors.image ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Add Pokemon
                </button>
            </form>
        </div>
    );
}
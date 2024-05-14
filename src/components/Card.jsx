import { useState, useEffect } from 'react';

async function apiCall(id) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    let data = await response.json();
    return data;
}

async function getPokemon(idArr) {
    const pokemonCards = await Promise.all(
        idArr.map(async (id, index) => {
            const response = await apiCall(id);
            return (
                <div className="card" key={index}>
                    <img src={response.sprites.front_default} alt={response.name} />
                    <div className="title">{response.name}</div>
                </div>
            );
        })
    );

    return pokemonCards;
}

function Card({ characterList }) {
    const [pokemonCards, setPokemonCards] = useState(null);

    useEffect(() => {
        let isMounted = true;

        async function fetchPokemon() {
            const cards = await getPokemon(characterList);
            if (isMounted) {
                setPokemonCards(cards);
            }
        }

        fetchPokemon();

        return () => {
            isMounted = false;
        };
    }, [characterList]);

    return <>{pokemonCards}</>;
}

export default Card;

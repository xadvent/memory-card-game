import { useState, useEffect } from 'react';
import propTypes from 'prop-types';

async function apiCall(id) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    let data = await response.json();
    return data;
}

const imgStyle = {
    width: 100 + "px",
}

const cardStyle = {
    border: "1px solid grey",
    "borderRadius": "20px",
    height: "200px",
    cursor: "pointer",
    "WebkitBoxShadow": "0px 10px 28px -15px rgba(0,0,0,0.75)",
    "MozBoxShadow": "0px 10px 28px -15px rgba(0,0,0,0.75)",
    "boxShadow": "0px 10px 28px -15px rgba(0,0,0,0.75)",
}


const cardNameStyle = {
    "marginTop": 30 + "px",
    "fontWeight": "bold",
    "letterSpacing": 1.5 + "px",
}

async function getPokemon(idArr) {
    const pokemonCards = await Promise.all(
        idArr.map(async (id, index) => {
            const response = await apiCall(id);
            return (
                <div className="card" key={index} style={cardStyle} >
                    <img src={response.sprites.other["official-artwork"].front_default} alt={response.name}
                        style={imgStyle} />
                    <div className="title" style={cardNameStyle}>{response.name.charAt(0).toUpperCase() + response.name.substring(1)}</div>
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

Card.propTypes = {
    characterList: propTypes.array
}

export default Card;

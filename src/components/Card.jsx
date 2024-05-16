import { useState, useEffect } from 'react';
import propTypes from 'prop-types';

async function apiCall(id) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    let data = await response.json();
    return data;
}

const imgStyle = {
    width: "100px",
};

const cardStyle = {
    border: "1px solid grey",
    borderRadius: "20px",
    height: "200px",
    cursor: "pointer",
    WebkitBoxShadow: "0px 10px 28px -15px rgba(0,0,0,0.75)",
    MozBoxShadow: "0px 10px 28px -15px rgba(0,0,0,0.75)",
    boxShadow: "0px 10px 28px -15px rgba(0,0,0,0.75)",
};

const cardNameStyle = {
    marginTop: "30px",
    fontWeight: "bold",
    letterSpacing: "1.5px",
};

function Card({ characterList, addAnswer }) {
    const [pokemonCards, setPokemonCards] = useState(null);

    async function getPokemon(idArr) {
        const pokemonCards = await Promise.all(
            idArr.map(async (id) => {
                const response = await apiCall(id);
                return {
                    id: response.id,
                    element: (
                        <div className="card" key={response.id} style={cardStyle} onClick={() => { addAnswer(response.id); shuffle() }}>
                            <img src={response.sprites.other["official-artwork"].front_default} alt={response.name}
                                style={imgStyle} />
                            <div className="title" style={cardNameStyle}>{response.name.charAt(0).toUpperCase() + response.name.substring(1)}</div>
                        </div>
                    )
                };
            })
        );

        return pokemonCards;
    }

    function shuffle() {
        setPokemonCards((prevCards) => {
            if (!prevCards) return prevCards;

            let currentIndex = prevCards.length;
            let newCards = [...prevCards];

            // While there remain elements to shuffle...
            while (currentIndex !== 0) {
                // Pick a remaining element...
                let randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                // And swap it with the current element.
                [newCards[currentIndex], newCards[randomIndex]] = [
                    newCards[randomIndex], newCards[currentIndex]];
            }

            return newCards;
        });
    }

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

    return <>{pokemonCards && pokemonCards.map(card => card.element)}</>;
}

Card.propTypes = {
    characterList: propTypes.array.isRequired,
    addAnswer: propTypes.func.isRequired,
};

export default Card;

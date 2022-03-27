const pokeCard = document.getElementById('poke-card');
const pokeName = document.getElementById('poke-name');
const pokeImg = document.getElementById('poke-img');
const pokeImgContainer = document.getElementById('img-container');
const pokeId = document.getElementById('poke-id');
const pokeTypes = document.getElementById('poke-types');
const pokeStats = document.getElementById('poke-stats');
const pokeMoves = document.getElementById('poke-moves');

const buscarPokemon = () => {
    const pokeName = document.getElementById("pokemon");
    let pokeInput = pokeName.value;
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeInput.toLowerCase()}`)
    .then(data => data.json())
    .then(response => datosPokemon(response))
    .catch(err => pokemonNoEncontrado())
}

const datosPokemon = data => {
    const sprite =  data.sprites.front_default;
    const { stats, types, moves } = data;
    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `Numero  #${data.id}`;
    pokemonTipos(types);
    pokemonStats(stats);
    pokemonMoves(moves);
}

const pokemonTipos = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const pokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}

const pokemonMoves = moves => {
    pokeMoves.innerHTML = '';    
    moves.forEach(move => {        
        const moveElementName = document.createElement("div");
        moveElementName.textContent = move.move.name;
        pokeMoves.appendChild(moveElementName);
    })
}

const pokemonNoEncontrado = () => {
    pokeName.textContent = 'Pokemon NO encontrado';
    pokeImg.setAttribute('src', 'sombraP.png');
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
    pokeMoves.innerHTML = '';
}
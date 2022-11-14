export default class PokeApi {
	URL_BASE = 'https://pokeapi.co/api/v2';
	GETPOKEMON = `${this.URL_BASE}/pokemon`;

	async getPokemons(url = this.GETPOKEMON) {
		const pokemons = [];
		let consult = await fetch(url);

		if (consult.status !== 200) {
			return;
		}
		let json = await consult.json();
		const results = json.results;

		for (let index in results) {
			const { url: urlPokemon, name } = results[index];
			consult = await fetch(urlPokemon);
			if (consult.status !== 200) {
				return;
			}
			const pokemon = await consult.json();

			consult = await fetch(pokemon.species.url);
			const { color } = await consult.json();

			pokemons.push({
				name,
				image: pokemon.sprites.front_default,
				color: color.name,
				url: urlPokemon,
				id: pokemon.id,
			});
		}

		return { pokemons, url_previ: json.previous, url_next: json.next };
	}

	async getPokemonByName(name) {
		const url = `${this.GETPOKEMON}/${name}`;
		let consult = await fetch(url);

		if (!consult.ok) {
			throw new Error('Busquedad sin exito por favor verfica si el nombre es correcto');
		}

		const json = await consult.json();

		const types = json.types.map((item) => item.type.name);
		const stats = json.stats.map((item) => {
			return { name: item.stat.name, value: item.base_stat };
		});

		const moves = [];

		while (moves.length !== 6 && json.moves.length !== 0) {
			const move = json.moves.shift();

			const consultMove = await fetch(move.move.url),
				jsonMove = await consultMove.json(),
				accuracy = jsonMove.accuracy;

			if (accuracy) {
				moves.push({
					name: move.move.name,
					accuracy,
				});
			}
		}

		consult = await fetch(json.species.url);
		const { color } = await consult.json();

		return {
			name: json.name,
			image: json.sprites.front_default,
			id: json.id,
			experience: json.base_experience,
			color: color.name,
			types,
			stats,
			moves,
		};
	}
}

import PokeApi from '../../repositories/PokeApi.js';
import { colorNametoRgb } from './constants.js';
import errorMessage from './errorMessage.js';
import pokeContainer from './pokeContainer.js';

const d = document,
	$main = d.querySelector('main'),
	pokeApi = new PokeApi();

const drawAllCard = async (url) => {
	d.querySelector('.loader').classList.remove('none');

	const { pokemons, url_previ, url_next } = await pokeApi.getPokemons(url);

	$main.innerHTML = pokeContainer();

	const $template = d.querySelector('#poke_container__template').content,
		$poke_section = d.querySelector('#poke_container'),
		$fragment = d.createDocumentFragment();
	for (let index in pokemons) {
		const { image, name, color, id } = pokemons[index];

		$template.querySelector('.poke_container__pokemon__body__name').textContent =
			name.toUpperCase();
		$template.querySelector('.poke_container__pokemon__img').setAttribute('src', image);
		$template.querySelector('.poke_container__pokemon__img').setAttribute('alt', name);
		$template
			.querySelector('.poke_container__pokemon__button')
			.setAttribute('href', `#/${name}`);
		$template.querySelector('.poke_container__pokemon__button').dataset.id = id;
		$template.querySelector('.poke_container__pokemon__button').dataset.name = name;
		$template.querySelector('.poke_container__pokemon__button').style.background =
			colorNametoRgb[color];

		$template.querySelector('.poke_container__pokemon').dataset.id = id;
		$template.querySelector('.poke_container__pokemon').dataset.name = name;

		const clone = d.importNode($template, true);
		$fragment.appendChild(clone);
	}

	d.querySelector('#poke_links__previous').setAttribute('data-url', url_previ);
	d.querySelector('#poke_links__next').setAttribute('data-url', url_next);
	d.querySelector('#poke_links__previous').classList.remove('d-none');
	d.querySelector('#poke_links__next').classList.remove('d-none');

	if (!url_previ) d.querySelector('#poke_links__previous').classList.add('d-none');

	if (!url_next) d.querySelector('#poke_links__next').classList.add('d-none');

	$poke_section.appendChild($fragment);
	d.querySelector('.loader').classList.add('none');
};

const drawAllCardByType = async (type) => {
	d.querySelector('.loader').classList.remove('none');

	try {
		const { pokemons } = await pokeApi.getPokemonsByType(type);

		$main.innerHTML = pokeContainer();

		const $template = d.querySelector('#poke_container__template').content,
			$poke_section = d.querySelector('#poke_container'),
			$fragment = d.createDocumentFragment();
		for (let index in pokemons) {
			const { image, name, color, id } = pokemons[index];

			$template.querySelector('.poke_container__pokemon__body__name').textContent =
				name.toUpperCase();
			$template.querySelector('.poke_container__pokemon__img').setAttribute('src', image);
			$template.querySelector('.poke_container__pokemon__img').setAttribute('alt', name);
			$template
				.querySelector('.poke_container__pokemon__button')
				.setAttribute('href', `#/${name}`);
			$template.querySelector('.poke_container__pokemon__button').dataset.id = id;
			$template.querySelector('.poke_container__pokemon__button').dataset.name = name;
			$template.querySelector('.poke_container__pokemon__button').style.background =
				colorNametoRgb[color];

			$template.querySelector('.poke_container__pokemon').dataset.id = id;
			$template.querySelector('.poke_container__pokemon').dataset.name = name;

			const clone = d.importNode($template, true);
			$fragment.appendChild(clone);
		}

		d.querySelector('#poke_links__previous').classList.add('d-none');

		d.querySelector('#poke_links__next').classList.add('d-none');

		$poke_section.appendChild($fragment);
	} catch (error) {
		$main.innerHTML = errorMessage(error.message);
	}
	d.querySelector('.loader').classList.add('none');
};

const drawCardByName = async (namepokemon) => {
	d.querySelector('.loader').classList.remove('none');
	try {
		const { image, name, color, id } = await pokeApi.getPokemonByName(namepokemon);

		$main.innerHTML = pokeContainer();
		const $template = d.querySelector('#poke_container__template').content,
			$poke_section = d.querySelector('#poke_container'),
			$fragment = d.createDocumentFragment();
		$template.querySelector('.poke_container__pokemon__body__name').textContent =
			name.toUpperCase();
		$template.querySelector('.poke_container__pokemon__img').setAttribute('src', image);
		$template.querySelector('.poke_container__pokemon__img').setAttribute('alt', name);
		$template
			.querySelector('.poke_container__pokemon__button')
			.setAttribute('href', `#/${name}`);
		$template.querySelector('.poke_container__pokemon__button').dataset.id = id;
		$template.querySelector('.poke_container__pokemon__button').dataset.name = name;
		$template.querySelector('.poke_container__pokemon__button').style.background =
			colorNametoRgb[color];

		$template.querySelector('.poke_container__pokemon').dataset.id = id;
		$template.querySelector('.poke_container__pokemon').dataset.name = name;

		const clone = d.importNode($template, true);
		$fragment.appendChild(clone);

		d.querySelector('#poke_links__previous').classList.add('d-none');

		d.querySelector('#poke_links__next').classList.add('d-none');

		$poke_section.appendChild($fragment);
	} catch (error) {
		$main.innerHTML = errorMessage(error.message);
	}
	d.querySelector('.loader').classList.add('none');
};

export { drawAllCard, drawCardByName, drawAllCardByType };

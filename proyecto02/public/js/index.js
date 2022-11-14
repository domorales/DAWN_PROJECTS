import { drawPokeDashboard } from './renderDashboard.js';
import { drawAllCard, drawCardByName } from './renderPokemons.js';

const d = document;
d.addEventListener('DOMContentLoaded', () => {
	if (!location.hash) {
		drawAllCard();
		return;
	}
	const name = location.hash.split('/')[1];
	drawPokeDashboard(name);
});

d.addEventListener('click', (event) => {
	if (
		event.target.matches('#poke_links__previous') ||
		event.target.matches('#poke_links__next')
	) {
		drawAllCard(event.target.dataset.url);
	}

	if (event.target.matches('.poke_container__pokemon__button')) {
		const name = event.target.dataset.name;
		d.querySelector(':root').style.setProperty('--scrollbar-color', 'red');
		drawPokeDashboard(name);
	}
});

d.addEventListener('submit', async (event) => {
	event.preventDefault();

	const $form = d.querySelector('#search__pokemon');
	if ($form === event.target) {
		const name = $form.name.value;
		if (!name) {
			drawAllCard();
			location.hash = '';
			return;
		}
		await drawCardByName(name);
		$form.name.value = '';
	}
});

window.addEventListener('hashchange', () => {
	if (!location.hash) {
		drawAllCard();
		return;
	}
	const name = location.hash.split('/')[1];
	drawPokeDashboard(name);
});

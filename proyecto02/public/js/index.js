import { drawAllCard, drawCardByName } from './renderPokemons.js';

const d = document;
d.addEventListener('DOMContentLoaded', () => {
	drawAllCard();
});

d.addEventListener('click', (event) => {
	if (
		event.target.matches('#poke_links__previous') ||
		event.target.matches('#poke_links__next')
	) {
		drawAllCard(event.target.dataset.url);
	}
});

d.addEventListener('submit', async (event) => {
	event.preventDefault();
	const $form = d.querySelector('#searh__pokemon');
	if ($form === event.target) {
		if (!$form.name.value) {
			drawAllCard();
			return;
		}
		await drawCardByName($form.name.value);
		$form.name.value = '';
	}
});

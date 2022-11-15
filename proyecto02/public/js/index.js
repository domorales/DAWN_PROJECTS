import { drawPokeDashboard } from './renderDashboard.js';
import { drawAllCard, drawAllCardByType, drawCardByName } from './renderPokemons.js';

const d = document,
	$filter = d.querySelector('#filter'),
	$inputText = d.querySelector('#search'),
	$selectType = d.querySelector('#filterType');

d.addEventListener('DOMContentLoaded', () => {
	if (!location.hash) {
		drawAllCard();
		return;
	}
	const name = location.hash.split('/')[1];
	drawPokeDashboard(name);
});

$filter.addEventListener('change', (event) => {
	const value = event.target.value;
	if (value === '1') {
		$selectType.style.display = 'none';
		$inputText.style.display = 'block';
		return;
	}

	if (value === '2') {
		$inputText.style.display = 'none';
		$selectType.style.display = 'block';
		return;
	}
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

		window.scrollTo(0, 0);
		drawPokeDashboard(name);
	}
});

d.addEventListener('submit', async (event) => {
	event.preventDefault();

	const $form = d.querySelector('#search__pokemon');
	if ($form === event.target) {
		if ($form.filter.value === '1') {
			const name = $form.name.value;
			if (!name) {
				drawAllCard();
				return;
			}

			await drawCardByName(name);
			$form.name.value = '';
			return;
		}

		if ($form.filter.value === '2') {
			const type = $form.type.value;
			if (!type) {
				drawAllCard();
				return;
			}
			await drawAllCardByType(type);
			$form.type.value = '-1';
			return;
		}
	}
});

window.addEventListener('hashchange', () => {
	$selectType.style.display = 'none';
	$inputText.style.display = 'block';
	$filter.value = '1';
	if (!location.hash) {
		drawAllCard();
		return;
	}
	const name = location.hash.split('/')[1];
	drawPokeDashboard(name);
});

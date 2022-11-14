import PokeApi from '../../repositories/PokeApi.js';
import { colorNametoRgb } from './constants.js';
import dashboardContainer from './dashboardContainer.js';
import errorMessage from './errorMessage.js';

const d = document,
	$main = d.querySelector('main');

const drawPokeDashboard = async (name) => {
	d.querySelector('.loader').classList.remove('none');
	try {
		const pokeApi = new PokeApi();
		const pokemon = await pokeApi.getPokemonByName(name);
		$main.innerHTML = dashboardContainer();
		$main.querySelectorAll('.dashboard__item').forEach((item) => {
			const color = colorNametoRgb[pokemon.color];
			item.style.borderColor = color;
		});

		drawPokeDashboardInfo(pokemon);
		drawPokeDashboardRadar(pokemon);
		drawPokeDashboardBar(pokemon);
	} catch (error) {
		$main.innerHTML = errorMessage(error.message);
	}
	d.querySelector('.loader').classList.add('none');
};

const drawPokeDashboardInfo = (pokemon) => {
	const $pokeInfo = $main.querySelector('.poke__info');

	$pokeInfo.querySelector(
		'.poke__info__item__name'
	).innerHTML = `NOMBRE: ${pokemon.name?.toUpperCase()}`;

	$pokeInfo.querySelector('.poke__info__item__types').innerHTML = `TIPO: ${pokemon.types
		.join(', ')
		?.toUpperCase()}`;
	$pokeInfo.querySelector(
		'.poke__info__item__experiencia'
	).innerHTML = `EXPERIENCIA: ${pokemon.experience}`;
};

const drawPokeDashboardRadar = (pokemon) => {
	const $pokeRadar = $main.querySelector('.poke__radar');

	$pokeRadar.querySelector('.poke__radar__image').setAttribute('src', pokemon.image);
	$pokeRadar.querySelector('.poke__radar__image').setAttribute('alt', pokemon.name);

	const color = colorNametoRgb[pokemon.color];
	const colotRGBA = color.replace(')', ',0.2)');

	const labelsStats = pokemon.stats.map((item) => item.name.toUpperCase());
	const valuesStats = pokemon.stats.map((item) => item.value);
	const data = {
		labels: labelsStats,
		datasets: [
			{
				label: 'HABILIDADES',
				data: valuesStats,
				fill: true,
				backgroundColor: colotRGBA,
				borderColor: color,
				borderWidth: 2,
				pointBackgroundColor: color,
				pointBorderColor: '#fff',
				pointHoverBackgroundColor: '#fff',
				pointHoverBorderColor: color,
			},
		],
	};

	const config = {
		type: 'radar',
		data,
		options: {
			plugins: {
				legend: {
					display: true,
					labels: {
						color: color,
						font: {
							size: 14,
						},
					},
				},
			},
			scales: {
				r: {
					angleLines: {
						color: 'white',
					},
					grid: {
						color: 'white',
					},
					pointLabels: {
						color: color,
						font: {
							size: 14,
						},
					},
					ticks: {
						color: color,
					},
				},
			},
		},
	};

	new Chart($pokeRadar.querySelector('#poke__radar__radar'), config);
};

const drawPokeDashboardBar = (pokemon) => {
	const { moves } = pokemon,
		labels = [],
		values = [];

	const color = colorNametoRgb[pokemon.color];
	const colotRGBA = color.replace(')', ',1)');

	for (let move of moves) {
		labels.push(move.name.toUpperCase());
		values.push(move.accuracy);
	}

	const data = {
		labels,
		datasets: [
			{
				label: 'PRECISION DE MOVIMIENTOS',
				data: values,
				backgroundColor: [
					colotRGBA,
					'rgba(54, 162, 235, 1)',
					'rgba(201, 203, 207, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(255, 159, 64, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 205, 86, 1)',
				],
				borderColor: [
					color,
					'rgb(255, 159, 64)',
					'rgb(255, 205, 86)',
					'rgb(75, 192, 192)',
					'rgb(54, 162, 235)',
					'rgb(153, 102, 255)',
					'rgb(201, 203, 207)',
				],
			},
		],
	};
	const config = {
		type: 'bar',
		data: data,
		maintainAspectRatio: false,
		options: {
			plugins: {
				legend: {
					display: true,
					labels: {
						color: color,
						font: {
							size: 14,
						},
					},
				},
			},
			scales: {
				y: {
					beginAtZero: true,
					grid: {
						color: 'white',
					},
					pointLabels: {
						color: color,
						font: {
							size: 14,
						},
					},
					ticks: {
						color: color,
					},
				},
				x: {
					grid: {
						color: 'white',
					},
					pointLabels: {
						color: color,
						font: {
							size: 14,
						},
					},
					ticks: {
						color: color,
					},
				},
			},
		},
	};

	new Chart($main.querySelector('#poke__moves__bar'), config);
};

export { drawPokeDashboard };

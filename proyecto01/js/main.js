const d = document;

const acctions_menu = () => {
	const $button_hamburguer = d.querySelector('.header__hamburguer'),
		$button_exit = d.querySelector('.header__nav__exit'),
		$nav_list = d.querySelector('.header__nav');

	d.addEventListener('click', (event) => {
		if (event.target.matches('.header__nav__list__item a') || event.target === $button_exit)
			$nav_list.classList.remove('header__nav-active');
		else if (event.target === $button_hamburguer)
			$nav_list.classList.add('header__nav-active');
	});
};

const actionsSlider = () => {
	const $projects_list = d.querySelector('.projects__list'),
		$projects = d.querySelectorAll('.projects__list__item'),
		$indicators = d.querySelectorAll('.projects__indicator__item '),
		interval = 3000;

	let position = 1,
		$indicator_previous = null,
		width = $projects[0].clientWidth;

	window.addEventListener('resize', () => {
		width = $projects[0].clientWidth;
	});

	$indicators[0].style.opacity = 1;
	$indicator_previous = $indicators[0];
	const moveSlider = () => {
		$indicator_previous.style.opacity = 0.5;

		if (position + 1 === $projects.length) {
			$indicators[0].style.opacity = 1;
			$indicator_previous = $indicators[0];
		}

		if ($indicators[position]) {
			$indicators[position].style.opacity = 1;
			$indicator_previous = $indicators[position];
		}
		$projects_list.style.transform = `translate(${-width * position}px)`;
		$projects_list.style.transition = `transform 0.8s`;

		position++;
		if (position === $projects.length) {
			setTimeout(() => {
				position = 1;
				$projects_list.style.transform = `translate(0px)`;
				$projects_list.style.transition = `transform 0s`;
			}, interval / 2);
			return;
		}
	};

	setInterval(() => {
		moveSlider();
	}, interval);
};

d.addEventListener('DOMContentLoaded', (event) => {
	acctions_menu();
	actionsSlider();
});

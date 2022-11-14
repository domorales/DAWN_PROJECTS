const dashboardContainer = () => {
	return `
    <section class="row justify-content-between  poke__info animate__animated animate__fadeIn animate__slow">
		<article class="col-11 col-md-3 poke__info__item dashboard__item">
			<h2 class="poke__info__item__name"></h2>
		</article>
		<article class="col-11 col-md-4 poke__info__item dashboard__item">
			<h3 class="poke__info__item__types"></h3>
		</article>
		<article class="col-11 col-md-3 poke__info__item dashboard__item">
			<h3 class="poke__info__item__experiencia"></h3>
		</article>
	</section>
	<section class="row justify-content-between poke__radar animate__animated animate__fadeIn animate__slow">
		<article class="col-11 col-md-5 dashboard__item">
			<div><img class="poke__radar__image" src="" alt="" /></div>
		</article>
		<article class="col-11 col-md-5 dashboard__item">
		 <div><canvas id="poke__radar__radar"></canvas></div>
		</article>
	</section>
	<section class="row poke__moves animate__animated animate__fadeIn animate__slow">
		<article class="col dashboard__item">
		<div><canvas id="poke__moves__bar"></canvas></div>
		</article>
	</section>
    `;
};

export default dashboardContainer;

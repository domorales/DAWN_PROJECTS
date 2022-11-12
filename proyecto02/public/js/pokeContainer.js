const pokeContainer = () => {
	return `
  	<h2 class="text-bg-danger m-5 text-center">
		Seleccione un POKEMON para visualizar sus estadisticas
	</h2>
	<section id="poke_container" class="m-5">
		<template id="poke_container__template">
			<article class="poke_container__pokemon card" data-id data-name>
				<img class="poke_container__pokemon__img card-img-top"" src="" alt="" />
				<div class="poke_container__pokemon__body card-body">
					<h3 class="poke_container__pokemon__body__name card-text"></h3>
				</div>
				<a href="" class="poke_container__pokemon__button btn btn-danger" data-id=""
					>Dashboard</a
				>
			</article>
		</template>
	</section>
	<section id="poke_links" class="d-flex justify-content-center gap-5 m-5">
		<i
			id="poke_links__previous"
			class="fa-solid fa-circle-chevron-left text-danger link"
			data-url></i>
		<i
			id="poke_links__next"
			class="fa-solid fa-circle-chevron-right text-danger link"
			data-url></i>
	</section>
    `;
};

export default pokeContainer;

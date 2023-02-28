<template>
	<div>
		<div class="header-image">
			<img src="@/assets/headerv2.png" />
		</div>

		<div class="page-content container">
			<p>
				Welkom bij de ultieme Formule 1 poule-app! Ben jij een die-hard Formule
				1-fan die ervan houdt om race-uitslagen te voorspellen? Dan is deze app
				perfect voor jou.
			</p>

			<h3>Hoe werkt het?</h3>
			<p>
				Zo werkt het: Voor de top 3 kwalificatie krijg je 1 punt voor elke
				juiste voorspelling en een extra bonuspunt als je ze alle drie correct
				hebt. Voor de top 10 racevoorspellingen krijg je 3 punten voor een
				correct voorspelde eindpositie, 1 punt als je er één positie naast zat
				en 1 punt voor een correct voorspelde snelste ronde of coureur van de
				dag.
			</p>

			<img src="@/assets/poule.png" />

			<p>
				Maar dat is niet alles. Je kunt ook de seizoenswinnaars voorspellen! Aan
				het einde van het seizoen krijg je 25 punten als je de winnende coureur
				correct voorspelt en nog eens 25 punten als je de winnende constructeur
				correct voorspelt.
			</p>

			<p>
				Dus waar wacht je op? Registreer je vandaag nog en begin met
				voorspellen!
			</p>

			<router-link
				:to="{ name: 'user_register' }"
				class="button button--primary"
				>Doe mee!</router-link
			>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.page-content {
	margin: 0 auto;
	padding-bottom: 16px;
	max-width: 500px;

	img {
		margin: 16px 0;
		width: 100%;
		border-radius: 5px;
	}
}

h3 {
	margin: 32px 0 8px;
}

p {
	margin-bottom: 16px;
	line-height: 130%;
	color: rgba(255, 255, 255, 0.8);
}

.button {
	margin: 32px 0 0;
}

.header-image {
	position: relative;
	margin: 0 0 16px;

	&:before {
		content: "";
		position: absolute;
		left: 0;
		bottom: 0;
		height: 80px;
		width: 100%;
		background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
	}

	img {
		width: 100%;
		object-fit: cover;
		aspect-ratio: 4 / 3;

		@media screen and (min-width: 768px) {
			aspect-ratio: 16 / 9;
		}
	}
}
</style>

<template>
	<div>
		<div class="header-image">
			<img src="@/assets/header.png" />
		</div>

		<div class="content container">
			<p>
				Welcome to the ultimate Formula 1 poule app! Are you a die-hard Formula
				1 fan who loves predicting race outcomes? If so, this app is perfect for
				you. Our app allows you to predict the top 3 qualifiers, top 10 racers,
				driver of the day, fastest lap, and even the season winners.
			</p>

			<p>
				Here's how it works: For the top 3 qualification, you get 1 point for
				every correct prediction and 4 bonus points if you get all three
				correct. For the top 10 race predictions, you get 3 points for a
				correctly predicted final position, 1 point if you were one position
				off, and 1 point for a correctly predicted fastest lap or driver of the
				day.
			</p>

			<p>
				But that's not all. You can also predict the season winners! At the end
				of the season, you will receive 25 points if you correctly predict the
				winning driver and another 25 points if you correctly predict the
				winning constructor.
			</p>

			<p>
				So what are you waiting for? Register to our Formula 1 poule today and
				start predicting!
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
p {
	margin-bottom: 16px;
	max-width: 500px;
	line-height: 130%;
}

.button {
	margin-bottom: 16px;
	max-width: 500px;
}

.header-image {
	position: relative;
	margin-bottom: 16px;

	&:before {
		content: "";
		position: absolute;
		left: 0;
		bottom: 0;
		height: 80px;
		width: 100%;
		background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
	}
}

img {
	width: 100%;
	aspect-ratio: 16 / 9;
	object-fit: cover;
}
</style>

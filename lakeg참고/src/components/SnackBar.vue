<template>
	<div class="text-center">
		<v-snackbar v-model="$store.state.snack.act" :timeout="3000" :color="$store.state.snack.color" bottom multiline vertical style="font-size:18px; font-weight:bold;">
			{{ $store.state.snack.msg }}
			<v-btn color="blue" text @click="$store.state.snack.act = false">
				X
			</v-btn>
		</v-snackbar>
	</div>
</template>

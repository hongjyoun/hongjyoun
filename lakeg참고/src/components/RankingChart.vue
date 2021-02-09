<script>
import { Line } from 'vue-chartjs';

export default {
	extends: Line,
	data() {
		return {
			colors: [
				'red',
				'orange',
				'yellow',
				'green',
				'blue',
				'navy',
				'purple',
				'teal',
				'darkgray',
				'salmon',
				'skyblue',
				'lime',
				'hotpink',
				'cyan',
				'olive',
				'brown',
				'tomato',
				'chocolate',
				'gold',
				'crimson',
				'siena',
				'magenta',
			],
		};
	},
	props: {
		labels: {
			type: Array,
			required: true,
		},
		series: {
			type: Array,
			required: true,
		},
		device: {
			type: String,
			required: true,
		},
	},

	methods: {
		changeIdToName_single(id) {
			if (this.$store.state.target.targetKeywords.length > 0) {
				const idx = this.$store.state.target.targetKeywords.findIndex(v => v.id == id);
				return this.$store.state.target.targetKeywords[idx];
			} else {
				return null;
			}
		},
	},
	mounted() {
		this.series.forEach((e, idx) => {
			if (e.name) {
				e.label = this.changeIdToName_single(e.name).keyword;
				e.backgroundColor = 'transparent';
				e.borderColor = this.colors[idx];
				e.lineTension = 0;
				// e.pointBackgroundColor = 'black';
			}
		});
		this.renderChart(
			{
				labels: this.labels,
				datasets: this.series,
			},
			{
				responsive: true,
				maintainAspectRatio: false,
				title: {
					display: true,
					text: `키워드별 하루 순위(${this.device})`,
				},
				scales: {
					yAxes: [
						{
							ticks: {
								// stepSize: 50,
								// maxTicksLimit: 3,
								reverse: true,
								min: 0,
								// max: this.yTicks.max,
							},
						},
					],
				},
			},
		);
	},
};
</script>

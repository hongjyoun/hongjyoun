<script>
import { Bar } from 'vue-chartjs';

export default {
	extends: Bar,
	props: {
		labels: {
			type: Array,
			required: true,
		},
		data: {
			type: Array,
			required: true,
		},
	},
	mounted() {
		this.renderChart(
			{
				labels: this.labels,
				datasets: [
					{
						label: '일별 총 작업량',
						backgroundColor: 'dodgerblue',
						data: this.data,
					},
				],
			},
			{
				responsive: true,
				maintainAspectRatio: false,
				title: {
					display: true,
					text: '일별 총 작업량',
				},
			},
		);
	},
};
</script>

<script>
import { HorizontalBar } from 'vue-chartjs';

export default {
	extends: HorizontalBar,
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
						label: '키워드별 총 작업량',
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
					text: '키워드별 총 작업량',
				},
			},
		);
	},
};
</script>

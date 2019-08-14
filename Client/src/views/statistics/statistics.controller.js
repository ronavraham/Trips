import angular from 'angular';

angular.module('trips')
.controller('StatisticsController', ($scope, $http, AuthenticationService) => {
	$scope.pieChart = () => {
		let svg = window.d3.select('#pie');
		let width = +svg.attr('width');
		let height = +svg.attr('height');
		let radius = Math.min(width, height) / 2;
		let g = svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

		let color = window.d3.scaleOrdinal(['#618cc9', '#a6c6f4', '#cfdff6', '#3f6dae', '#26518d']);

		let pie = window.d3.pie()
			.sort(null)
			.value((d) => { return d.count; });

		let path = window.d3.arc()
			.outerRadius(radius)
			.innerRadius(0);

		let label = window.d3.arc()
			.outerRadius(radius)
			.innerRadius(0);

		$http.get(`http://localhost:3000/api/trips/getUserTripsByTypes/${AuthenticationService.globals.currentUser.userid}`).then((res) => {
			let data = res.data;

			let arc = g.selectAll('.arc')
				.data(pie(data))
				.enter().append('g')
				.attr('class', 'arc');

			arc.append('path')
				.attr('d', path)
				.attr('fill', (d) => { return color(d.data.type); });

			arc.append('text')
				.attr('transform', (d) => { return 'translate(' + label.centroid(d) + ')'; })
				.attr('dy', '0.35em')
				.text((d) => { return d.data.type + ", " + d.data.count; });
		});
	};

	$scope.barChart = () => {
		let svg = window.d3.select('#bar');
		let margin = { top: 20, right: 20, bottom: 30, left: 40 };
		let width = +svg.attr('width') - margin.left - margin.right;
		let height = +svg.attr('height') - margin.top - margin.bottom;

		let x = window.d3.scaleBand().rangeRound([0, width]).padding(0.1);
		let y = window.d3.scaleLinear().rangeRound([height, 0]);

		let g = svg.append('g')
			.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

		$http.get('http://localhost:3000/api/trips/getViewsPerRegion').then((res) => {
			let data = res.data;

			x.domain(data.map((d) => { return d.region; }));
			y.domain([0, window.d3.max(data, (d) => { return d.views; })]);

			g.append('g')
				.attr('class', 'axis axis--x')
				.attr('transform', 'translate(0,' + height + ')')
				.attr("font-family", "Roboto")
				.call(window.d3.axisBottom(x));

			g.append('g')
				.attr('class', 'axis axis--y')
				.attr("font-family", "Roboto")
				.call(window.d3.axisLeft(y).ticks(10))
				.append('text')
				.attr('transform', 'rotate(-90)')
				.attr('y', 6)
				.attr('dy', '0.71em')
				.attr('text-anchor', 'end')
				.text('Views');

			g.selectAll('.bar')
				.data(data)
				.enter().append('rect')
				.attr('class', 'bar')
				.attr('x', (d) => { return x(d.region); })
				.attr('y', (d) => { return y(d.views); })
				.attr("fill", "#69b3a2")
				.attr('width', x.bandwidth())
				.attr('height', (d) => { return height - y(d.views); });
		});
	};

	$scope.pieChart();
	$scope.barChart();
});

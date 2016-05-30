angular
.module('app')
.directive('simpleLineChart', ['d3Factory', function(d3Factory) {
  return {
    restrict: 'EA',
    scope: {
      data: "="
    },
    link: function(scope, element, attrs) {
      var d3 = d3Factory.d3();

      // reconstructs graph on data change
      scope.$watch("data", function(newVal, oldVal) {

        var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 700 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;

        // var parseDate = d3.time.format('%d-%b-%y').parse;

        var x = d3.time.scale()
        .range([0, width]);

        var y = d3.scale.linear()
        .range([height, 0]);

        var xAxis = d3.svg.axis()
        .scale(x)
        .orient('bottom');

        var yAxis = d3.svg.axis()
        .scale(y)
        .orient('left');

        var line = d3.svg.line()
        .x(function(d) { return x(d.id); })
        .y(function(d) { return y(d.accuracy); });

        if (element.find('svg').length > 0) {
          element.find('svg').remove()
        }

        var svg = d3.select(element[0]).append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // Data

        x.domain(d3.extent(scope.data, function(d) { return d.id; }));
        y.domain(d3.extent(scope.data, function(d) { return d.accuracy; }));

        svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        // .call(xAxis)
        .append('text')
        .attr('x', 6)
        .attr('dx', width)
        .style('text-anchor', 'end')
        .text('Attempt');

        svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Accuracy');

        var line = d3.svg.line()
        .x(function(d) { return x(d.id); })
        .y(function(d) { return y(d.accuracy); });

        svg.append('path')
        .datum(scope.data)
        .attr('class', 'line')
        .attr('d', line);
      });
    }};
  }]);

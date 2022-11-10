/*


*/

import React, { useRef, useEffect, } from 'react';
import * as d3 from 'd3';

const colors = d3.scaleOrdinal(d3.schemeCategory10);

const App = (props) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.select('g').remove();

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    const margin = props.margin;
    const innerRadius = props.innerRadius;
    const outerRadius = Math.min(width - margin, height - margin) / 2;
    const chart = svg.append('g').attr('class', 'chart').attr('transform', "translate(" + (width / 2) + ", " + (height / 2) + ")")

    const arcGenerator = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const pieGenerator = d3
      .pie()
      .padAngle(0)
      .value((d) => d.value);

    const arc = chart
      .selectAll()
      .data(pieGenerator(props.data))
      .enter();

    arc
      .append('path')
      .attr('d', arcGenerator)
      .style('fill', (item, index) => colors(index))
      .style('stroke', '#fff')
      .style('stroke-width', props.line);

    arc
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text((d) => d.data.label + '-' + d.data.value)
      .style('fill', '#fff')
      .style('font-family', "HelveticaNeue Condensed Bold, sans-serif")
      //.style('fill', (_, i) => colors(props.data.length - i))
      .attr('transform', (d) => {
        const [x, y] = arcGenerator.centroid(d);
        return `translate(${x}, ${y})`;
      });

  }, [props.data]);

  return (
    <svg ref={svgRef} />
  );
}

export default React.memo(App);

App.defaultProps = {
  margin: 16,
  innerRadius: 48,
  line: 4,
};
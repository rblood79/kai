/*


*/

import React, { useRef, useEffect, } from 'react';
import { percentColor, gradient } from '../../util';
import * as d3 from 'd3';

const App = (props) => {
  const svgRef = useRef(null);
  const data = props.data;
  /*const colors = d3
    .scaleSequential()
    .interpolator(d3.interpolateWarm)
    .domain([0, props.data.length]);*/

  const colors = d3.scaleOrdinal(d3.schemeTableau10);



  const textSize = (svg, fsize, text) => {
    svg.append('g').attr('class', 'text').style('font-family', "HelveticaNeue Condensed Bold, sans-serif")
      .style('font-size', fsize).append('text').text(text);
    var size = svg.select('g.text').node().getBBox();
    svg.select('g.text').remove();
    return { width: size.width, height: size.height };
  }


  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('g').remove();




    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    const margin = {
      top: 16,
      bottom: 24,
      left: 16,
      right: 16
    };


    const chart = svg.append('g').attr('class', 'chart').attr('transform', `translate(${margin.left},${margin.top})`);

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom

    const xScale = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([0, chartWidth]);
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([chartHeight, 0]);

    chart.selectAll(".bar")
      .data(data)
      .enter()
      .append('rect')
      .classed('bar', true)
      .attr('x', d => xScale(d.label)+4)
      .attr('y', d => yScale(d.value))
      .attr('height', d => (chartHeight - yScale(d.value)))
      .attr('width', d => xScale.bandwidth()-8)
      .style('fill', (d, i) => colors(i));

    chart.selectAll('.bar-label')
      .data(data)
      .enter()
      .append('text')
      .classed('bar-label', true)
      .attr('x', d => xScale(d.label) + xScale.bandwidth() / 2)
      .attr('dx', 0)
      .attr('y', d => yScale(d.value))
      .attr('dy', -6)
      .attr('text-anchor', 'middle')
      .style("fill", "var(--colorText)")
      .text(d => d.value);

    const xAxis = d3.axisBottom()
      .scale(xScale);

    chart.append('g')
      .classed('x axis', true)
      .attr('transform', `translate(0,${chartHeight})`)
      .call(xAxis);

    const yAxis = d3.axisLeft()
      .ticks(5)
      .scale(yScale);

    chart.append('g')
      .classed('y axis', true)
      .attr('transform', 'translate(0,0)')
      .call(yAxis);

    chart.selectAll('.tick').select('text').style("fill", "var(--colorLabel)").style('font-size', 14).style('font-family', "HelveticaNeue Condensed Bold, sans-serif")

  }, [colors, data, props.innerRadius, props.line, props.margin]);

  return (
    <svg ref={svgRef} />
  );
}

export default React.memo(App);

App.defaultProps = {
  margin: 16,
  innerRadius: 48,
  line: 1,
};
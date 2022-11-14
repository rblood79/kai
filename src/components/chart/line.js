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
  const fontSize = 14;
  const parseDate = d3.timeParse("%Y-%m-%d");




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

    const maxLabel = d3.max(data, (d) => {
      return textSize(svg, fontSize, d.value).width;
    });

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    const margin = {
      top: 16,
      bottom: 36,
      left: maxLabel,
      right: 0
    };


    const chart = svg.append('g').attr('class', 'chart').attr('transform', `translate(${margin.left},${margin.top})`);

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const x = d3.scaleUtc()
      .domain(d3.extent(data, d => parseDate(d.date)))
      .range([margin.left, chartWidth]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)]).nice()
      .range([chartHeight, margin.top]);

    const d3Type = d3.line()
      .defined(d => {
        return !isNaN(d.value)
      })
      .x(d => {
        return x(parseDate(d.date))
      })
      .y(d => y(d.value));


    const xAxis = g => g
      .attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

    chart.append('g').call(xAxis);

    const yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))

    chart.append('g')
      .call(yAxis)

    chart.selectAll('.tick').select('text').style("fill", "var(--colorLabel)").style('font-size', 14).style('font-family', "HelveticaNeue Condensed Bold, sans-serif")

    chart.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', props.line)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('d', d3Type);

  }, [colors, data, parseDate, props.line, props.margin]);

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
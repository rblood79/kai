/*


*/

import React, { useRef, useEffect, } from 'react';
//import { percentColor, gradient } from '../../util';
import * as d3 from 'd3';

const App = (props) => {
  const svgRef = useRef(null);
  const data = props.data;
  /*const colors = d3
    .scaleSequential()
    .interpolator(d3.interpolateWarm)
    .domain([0, props.data.length]);*/

  const colors = d3.scaleOrdinal(d3.schemeTableau10);
  //const colors = d3.scaleSequential(d3.interpolateHslLong("#FF5A03", "#0F4DD8")).domain([0, 4]);
  

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
    //const margin = props.margin;
    //const outerRadius = Math.min(width - margin, height - margin) / 2;
    //const innerRadius = props.innerRadius;
    const outerRadius = width / 4;
    const innerRadius = outerRadius * 0.5;

    const total = d3.sum(data, (d) => {
      return d.value;
    });

    //const formatPercent = d3.format(".0%");

    const size = 4;
    const fontSize = 14;
    const padding = 24;
    const indent = 12;
    const gap = 14;
    const offset = 1;

    const textHeight = textSize(svg, fontSize, 'text').height;
    const legendWidth = (width / 2);
    const legendHeight = (padding * 2) + (data.length * textHeight) + ((data.length - 1) * gap);

    const chart = svg.append('g').attr('class', 'chart').attr('transform', "translate(" + (width / 4) + ", " + (height / 2) + ")")
    const legend = svg.append('g').attr('class', 'legend').attr('transform', "translate(" + (legendWidth) + ", " + (height / 2 - legendHeight / 2) + ")")

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
      .data(pieGenerator(data))
      .enter();

    arc
      .append('path')
      .attr('d', arcGenerator)
      .style('fill', (d, i) => {
        return colors(i)
      })
      .style('stroke', '#fff')
      .style('stroke-width', props.line);

    arc
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text((d) => d.data.value)
      .style('font-family', "HelveticaNeue Condensed Bold, sans-serif")
      .style('fill', '#fff')
      .attr('transform', (d) => {
        const [x, y] = arcGenerator.centroid(d);
        return `translate(${x}, ${y})`;
      });

    legend
      .append('rect')
      .attr("width", width / 2)
      .attr("height", legendHeight)
      .style("fill", "none")
    /*.style("stroke-width", 1)
    .style("stroke", "black");*/

    legend.selectAll("circles")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", padding)
      .attr("cy", (d, i) => padding + (i * (textHeight + gap)) + (textHeight / 2 - size / 2) + (size / 2))
      .attr("r", size)
      .style("fill", (d, i) => colors(i));

    legend.selectAll("labels")
      .data(data)
      .enter()
      .append("text")
      .attr("x", padding + indent)
      .attr("y", (d, i) => {
        return textHeight * 0.5 + padding + (i * (textHeight + gap)) + offset
      })
      //.style("fill", (d, i) => colors(i))
      .style("fill", "var(--colorLabel)")
      .text((d) => d.label)
      .style('font-family', "HelveticaNeue Condensed Bold, sans-serif")
      .style('font-size', fontSize)
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle")

    legend.selectAll("value")
      .data(data)
      .enter()
      .append("text")
      .attr("x", legendWidth)
      .attr("y", (d, i) => {
        return textHeight * 0.5 + padding + (i * (textHeight + gap)) + offset
      })
      //.style("fill", (d, i) => colors(i))
      .style("fill", "var(--colorText)")
      .text((d) => ((d.value / total) * 100).toFixed(2) + ' %')
      .style('font-family', "HelveticaNeue Condensed Bold, sans-serif")
      .style('font-size', fontSize)
      .attr("text-anchor", "end")
      .style("alignment-baseline", "middle")

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
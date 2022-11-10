/*


*/

import React, { useRef, useEffect, } from 'react';
import * as d3 from 'd3';

const App = (props) => {
  const svgRef = useRef(null);
  const data = props.data;
  /*const colors = d3
    .scaleSequential()
    .interpolator(d3.interpolateWarm)
    .domain([0, props.data.length]);*/

  const colors = d3.scaleOrdinal(d3.schemeCategory10);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.select('g').remove();

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    const margin = props.margin;
    const innerRadius = props.innerRadius;
    const outerRadius = Math.min(width - margin, height - margin) / 2;
    const chart = svg.append('g').attr('class', 'chart').attr('transform', "translate(" + (width / 2) + ", " + (height / 2) + ")")


  }, [colors, data, props.innerRadius, props.line, props.margin]);

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
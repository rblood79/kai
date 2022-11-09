/*


*/

import React, { useRef, useEffect, } from 'react';
import { animated, useSpring } from '@react-spring/web';
import * as d3 from 'd3';

const colors = d3.scaleOrdinal(d3.schemeCategory10);
const format = d3.format(".2f");
const animationDuration = 250;
const animationConfig = {
  to: async (next, cancel) => {
    await next({ t: 1 });
  },
  from: { t: 0 },
  config: { duration: animationDuration },
  reset: true
};

const App = (props) => {
    const svgRef = useRef(null);
    const data = props.data;

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.select('g').remove();
        const width = svgRef.current.clientWidth;
        const height = svgRef.current.clientHeight;
        console.log(data)
        const chart = svg.append('g').attr('class', 'chart').attr('transform', "translate(" + ((width + 0) / 2) + ", " + ((height - 0) / 2) + ")")

        chart.append('text').text('PIE Chart')
    }, [svgRef.current]);

    return (
        <svg ref={svgRef} />
    );
}

export default React.memo(App);

App.defaultProps = {

};
/*


*/

import React, { useRef, useEffect, } from 'react';
import * as d3 from 'd3';


const App = (props) => {
    const svgRef = useRef(null);

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.select('g').remove();
        const width = svgRef.current.clientWidth;
        const height = svgRef.current.clientHeight;
        console.log(width, height)
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
/*


*/

import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';


const App = (props) => {
    const svgRef = useRef(null);

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const width = svgRef.current.clientWidth;
        const height = svgRef.current.clientHeight;


    }, [svgRef.current]);

    return (
        <svg ref={svgRef} />
    );
}

export default App;

App.defaultProps = {

};
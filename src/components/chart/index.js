/*


*/

import { useRef, useEffect, useState } from 'react';
import { select, arc } from "d3";


const App = (props) => {
    const svgRef = useRef(null);

    const [data, setData] = useState([24, 30, 45, 70, 26]);
    

    useEffect(() => {
        //console.log(arc)
        const svg = select(svgRef.current);

        svg.style("width", "100%").style("height", "100%")
        
        svg
            .selectAll("circle")
            .data(data)
            .join(
                (enter) => enter.append("circle"),
                (update) => update.attr("class", "updated"),
                (exit) => exit.remove()
            )
            .attr("r", (value) => value)
            .attr("cx", (value) => value * 2)
            .attr("cy", (value) => value * 2)
            .attr("stroke", "red");
    }, [data]);

    return (
        <>
            <svg ref={svgRef}></svg>
            {/*<button onClick={() => { setData(data.map(el => el + 5)) }}>increase + 5</button>
            <button onClick={() => { setData(data.filter(el => el > 35)) }}>filter circle r should gt 35</button>*/}
        </>
    );
}

export default App;

App.defaultProps = {

};

/*


*/
import aircraftFront from '../../images/aircraftFront@3x.png';
import aircraftSide from '../../images/aircraftLeft@3x.png';
import aircraftTop from '../../images/aircraftTop@3x.png';

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

import styles from './itemDefect.module.scss';
import classNames from 'classnames';

const App = (props) => {
    const svgRef = useRef(null);
    const [data] = useState(props.data);

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll('g').remove();
        //
        const front = svg.append('g').attr('class', 'front');
        const side = svg.append('g').attr('class', 'side');
        const top = svg.append('g').attr('class', 'top');

        front.append('image')
            .attr('image-rendering', 'optimizeQuality')
            .attr("width", "100%")

        side.append('image').attr("xlink:href", aircraftSide)
            .attr('image-rendering', 'optimizeQuality')
            .attr("width", "100%")

        top.append('image').attr("xlink:href", aircraftTop)
            .attr('image-rendering', 'optimizeQuality')
            .attr("width", "100%")

        var img = new Image();
        img.src = aircraftFront;
        front.onload = function () {
            var height = this.height;
            front.select('image')
                .attr('height', height)
                .attr('xlink:href', aircraftFront)

        }

        console.log(front)


    }, [svgRef])

    return (
        <div className={styles.container}>
            <span className={styles.baseIcon}><i className={props.icon}></i></span>
            <div className={styles.list}>

                {/*<svg ref={svgRef} />*/}

                <div className={classNames(styles.item, styles.image)}>
                    <img className={styles.aircraft} src={aircraftFront} alt='aircraft' loading='lazy' />
                    <span className={styles.title}>Front</span>
                </div>
                <div className={classNames(styles.item, styles.image)}>
                    <img className={styles.aircraft} src={aircraftSide} alt='aircraft' loading='lazy' />
                    <span className={styles.title}>Side</span>
                </div>
                <div className={classNames(styles.item, styles.image)}>
                    <img className={styles.aircraft} src={aircraftTop} alt='aircraft' loading='lazy' />
                    <span className={styles.title}>Top</span>
                </div>
            </div>
        </div>
    )
}

export default React.memo(App);

App.defaultProps = {
    icon: 'ri-tools-fill'
};
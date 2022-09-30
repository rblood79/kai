/*


*/

import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';


const App = (props) => {
    const svgRef = useRef(null);

    const percToDeg = (perc) => {
        return perc * 360;
    };

    const percToRad = (perc) => {
        return degToRad(percToDeg(perc));
    };

    const degToRad = (deg) => {
        return deg * Math.PI / 180;
    };

    const Needle = (function () {
        function Needle(len, radius1) {
            this.len = len;
            this.radius = radius1;
        }

        Needle.prototype.drawOn = function (el, perc) {
            el
                .append('circle')
                .style('fill', '#363636')
                .attr('cx', 0)
                .attr('cy', 0)
                .attr('r', this.radius + 8);

            el
                .append('path')
                .style('fill', '#fff')
                .attr('class', 'needle')
                .attr('d', this.mkCmd(perc));

            el
                .append('circle')
                .style('fill', '#fff')
                .attr('cx', 0)
                .attr('cy', 0)
                .attr('r', this.radius);

            el
                .append('circle')
                .style('fill', '#E78A0C')
                .attr('cx', 0)
                .attr('cy', 0)
                .attr('r', this.radius - 2);
        };

        Needle.prototype.animateOn = function (el, perc) {
            let self;
            self = this;
            return el
                .transition()
                .delay(1000)
                //.ease('elastic')
                .duration(2000)
                .selectAll('.needle')
                .tween('progress', function () {
                    return function (percentOfPercent) {
                        let progress;
                        progress = percentOfPercent * perc;
                        return d3.select(this).attr('d', self.mkCmd(progress));
                    };
                });
        };

        Needle.prototype.mkCmd = function (perc) {
            let centerX, centerY, leftX, leftY, rightX, rightY, thetaRad, topX, topY;
            thetaRad = percToRad(perc / 2);
            centerX = 0;
            centerY = 0;
            topX = centerX - this.len * Math.cos(thetaRad);
            topY = centerY - this.len * Math.sin(thetaRad);
            leftX = centerX - this.radius * Math.cos(thetaRad - Math.PI / 2);
            leftY = centerY - this.radius * Math.sin(thetaRad - Math.PI / 2);
            rightX = centerX - this.radius * Math.cos(thetaRad + Math.PI / 2);
            rightY = centerY - this.radius * Math.sin(thetaRad + Math.PI / 2);
            return 'M ' + leftX + ' ' + leftY + ' L ' + topX + ' ' + topY + ' L ' + rightX + ' ' + rightY;
        };

        return Needle;
    })();

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const width = svgRef.current.clientWidth;
        const height = svgRef.current.clientHeight;
        const percent = props.percent / 100;
        const barWidth = props.barWidth;
        const numSections = props.colors.length;
        const sectionPerc = 1 / numSections / 2;
        const padRad = 0 / (numSections - 1);
        const chartInset = 16;
        let totalPercent = 0.75;
        let i = null;
        const radius = Math.min(width, height) / 2;

        svg.selectAll('g').remove();
        const chart = svg.append('g').attr('transform', "translate(" + ((width + 0) / 2) + ", " + ((height + 0) / 2) + ")")


        const arc = d3.arc()
            .outerRadius(radius)
            .innerRadius(radius - chartInset - barWidth - 16)
            .startAngle(4.71238898038469)
            .endAngle(7.853981633974483);
        chart
            .append('path')
            .style('fill', '#383838')
            .attr('d', arc);

        for (let sectionIndx = i = 1, ref = numSections; 1 <= ref ? i <= ref : i >= ref; sectionIndx = 1 <= ref ? ++i : --i) {

            const arcStartRad = percToRad(totalPercent);
            const arcEndRad = arcStartRad + percToRad(sectionPerc);
            totalPercent += sectionPerc;
            const startPadRad = sectionIndx === 0 ? 0 : padRad / 2;
            const endPadRad = sectionIndx === numSections ? 0 : padRad / 2;
            //console.log(arcStartRad + startPadRad, arcEndRad - endPadRad)
            const arc = d3
                .arc()
                .outerRadius(radius - chartInset)
                .innerRadius(radius - chartInset - barWidth)
                .startAngle(arcStartRad + startPadRad)
                .endAngle(arcEndRad - endPadRad);
            chart
                .append('path')
                .style('fill', props.colors[sectionIndx - 1])
                .attr('d', arc);
        }



        const needle = new Needle((height * 0.45) - barWidth, 6);

        needle.drawOn(chart, 0);

        needle.animateOn(chart, percent);

    }, [svgRef.current]);

    return (
        <svg ref={svgRef} />
    );
}

export default App;

App.defaultProps = {
    percent: 50,
    barWidth: 28,
    numSections: 2,
    colors: ['#E78A0C', '#f00', '#0f0'],
    needleColor: '#fff'
};
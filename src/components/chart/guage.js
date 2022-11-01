/*


*/

import React, { useRef, useEffect,} from 'react';
import * as d3 from 'd3';


const App = (props) => {
    const delay = 100;
    const duration = 1600;
    const easing = d3.easeExp;
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
        function Needle(len, radius) {
            this.len = len;
            this.radius = radius;
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
                .delay(delay)
                .duration(duration)
                .ease(easing)
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
        svg.select('g').remove();
        const width = svgRef.current.clientWidth;
        const height = svgRef.current.clientHeight;
        const percent = props.data / 100;
        const barWidth = props.barWidth;
        const inner = 16;
        const radius = width / 2; //Math.min(width, height) / 2;
        const pi = Math.PI;
        const piePercent = pi * percent;
        const range = 180;
        const colorScale = d3.scaleSequential(d3.interpolateHslLong("#FF5A03", "#0F4DD8")).domain([0, range]);
        const perToColor = colorScale((180 / 100) * props.data);
        const chart = svg.append('g').attr('class', 'chart').attr('transform', "translate(" + ((width + 0) / 2) + ", " + ((height - 24) / 1) + ")")

        const arcBase = d3.arc()
            .outerRadius(radius)
            .innerRadius(radius - inner - barWidth - 16)
            .startAngle(-pi / 2)
            .endAngle(pi / 2)

        chart
            .append('path')
            .style('fill', '#383838')
            .attr('d', arcBase);

        const arc = d3.arc()
            .innerRadius(radius - inner - barWidth)
            .outerRadius(radius - inner)
            .startAngle(function (d) { return d.startAngle; })
            .endAngle(function (d) { return d.endAngle; });

        const data = d3.range(range - 1).map(function (d, i) {
            return {
                startAngle: (-pi / 2) + (i * (pi / range)),
                endAngle: (-pi / 2) + ((i + 2) * (pi / range)),
                fill: colorScale(d)
            };
        });

        chart.append('g')
            .attr('filter', 'drop-shadow(4px 4px 8px #141414)')
            .selectAll('path').data(data).enter().append('path').attr("d", arc)
            .attr("fill", (d) => d.fill)


        const arcTween = (newAngle) => {
            return (d) => {
                var interpolate = d3.interpolate(d.endAngle, newAngle);
                return (t) => {
                    d.endAngle = interpolate(t);
                    return arcValue(d);
                };
            };
        }

        const arcValue = d3.arc()
            .outerRadius(radius - inner - 16)
            .innerRadius(0)
            .startAngle(-pi / 2)

        const foreground = chart.append("path")
            .datum({
                endAngle: -pi / 2,
            })
            .style("fill", "#FF5A03")
            .attr("d", arcValue);

        const needle = new Needle((width * 0.5) - barWidth, 6);
        needle.drawOn(chart, 0);

        props.active && foreground.transition()
            .delay(delay)
            .duration(duration)
            .ease(easing)
            .attrTween("d", arcTween((-pi / 2) + piePercent))
            .style("fill", perToColor);
            
        props.active && needle.animateOn(chart, percent);

    }, [props.active]);

    return (
        <svg ref={svgRef} />
    );
}

export default React.memo(App);

App.defaultProps = {
    percent: 50,
    barWidth: 28,
};
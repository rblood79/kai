
import { useNavigate } from "react-router-dom";
import * as d3 from 'd3';

/*const percentColor = (percent) => {
    const hue = ((percent * 0.01) * 204).toString(10);
    return 'hsl(' + hue + ', 86%, 48%)';
}*/

const percentColor = d3.scaleSequential(d3.interpolateHslLong("#FF5A03", "#0F4DD8")).domain([0, 100]);
const percentColor2 = d3.scaleSequential(d3.interpolateCubehelixLong("#FF5A03", "#0F4DD8")).domain([0, 100]);

const gradient = (percent, deg) => {
    return 'linear-gradient(' + deg + 'deg, ' + percentColor2(percent) + ' 0%, ' + percentColor(percent) + ' 100%)';
}

const numberPad = (n, width) => {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

const getType = (target) => {
    return Object.prototype.toString.call(target).slice(8, -1);
}

const useNav = () => {
    const navigate = useNavigate();
    return (url, state) => navigate(url, { state });
}

const useNavReplace = () => {
    const navigate = useNavigate();
    return (url, state) => navigate(url, { state, replace: true });
}

const useNavBack = () => {
    const navigate = useNavigate();
    return () => navigate(-1);
}

export { percentColor, percentColor2, gradient, numberPad, getType, useNav, useNavReplace, useNavBack };

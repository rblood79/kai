const rangeColor = (percent, start, end) => {
    let a = percent / 100,
        b = (end - start) * a,
        c = b + start;
    return 'hsl(' + c + ', 86%, 48%)';
}

const percentColor = (percent) => {
    const hue = ((percent * 0.01) * 192).toString(10);
    return 'hsl(' + hue + ', 86%, 48%)';
}

const gradient = (percent, deg) => {
    const hue = ((percent * 0.01) * 192).toString(10);
    return 'linear-gradient(' + deg + 'deg, hsl(' + hue + ' 86% 48%) 0%, hsl(' + hue + ', 86%, 24%) 100%)';
}

export { rangeColor, percentColor, gradient };

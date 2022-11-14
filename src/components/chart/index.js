import React from 'react';
import Guage from './guage';
import Donut from './donut';
import Bar from './bar';
import Line from './line';

import styles from './index.module.scss';

const App = (props) => {

    return (
        <div className={styles.container} style={{ height: props.height }}>
            {
                props.type === 'guage' ? <Guage {...props} /> :
                    props.type === 'donut' ? <Donut {...props} /> :
                        props.type === 'line' ? <Line {...props} /> :
                            props.type === 'bar' && <Bar {...props} /> 
            }
        </div>
    );
}

export default React.memo(App);

App.defaultProps = {
};
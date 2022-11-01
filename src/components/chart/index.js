import React from 'react';
import Guage from './guage';
import Pie from './pie';
import Bar from './bar';

import styles from './index.module.scss';

const App = (props) => {

    return (
        <div className={styles.container} style={{ height: props.height }}>
            {
                props.type === 'guage' ? <Guage {...props} /> :
                    props.type === 'pie' ? <Pie {...props} /> :
                        props.type === 'bar' && <Bar {...props} />
            }
        </div>
    );
}

export default React.memo(App);

App.defaultProps = {
};
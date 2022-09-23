

import { useEffect, useRef } from 'react';
import _ from 'lodash';

import styles from './swipeItem.module.scss';

const height = 48;

const App = (props) => {
    const viewport = useRef(null);

    const scroll = (e) => {
        viewport.current.scrollTop = e+'px';
    }
    const callback = (entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                console.log(entry.target.dataset.item)
                props.callBack(entry.target.dataset.item)
            }
        });
    };

    useEffect(() => {
        const list = Array.from(viewport.current.children);
        const observer = new IntersectionObserver(callback, {
            root: null,
            threshold: 1,
        });
        list.map((item) => {
            observer.observe(item);
            return () => {
                observer.disconnect(item); // *** Use the same element
            }
        })
        

    }, [viewport.current])

    useEffect(() => {
        //console.log('//', props.state)
        var findItem = props.data.findIndex((item) => item === props.set);
        //console.log(props.set, '>', findItem)
        scroll(100)
    }, [props.state])

    return (
        <div className={styles.container}>
            <ul className={styles.contents} ref={viewport} >
                {
                    props.data && props.data.map((item, index) => {
                        return (
                            <li className={styles.item} key={index} data-item={item}>
                                {item}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}

export default App;

App.defaultProps = {
    disabled: false,
    required: false,
};
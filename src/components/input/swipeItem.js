

import React, { useEffect, useRef } from 'react';

import styles from './swipeItem.module.scss';

const App = (props) => {
    const viewport = useRef(null);
    useEffect(() => {
        const list = Array.from(viewport.current.children);
        const callback = (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    //console.log(entry.target.dataset.item)
                    //setXX(entry.target.dataset.item)
                    props.callBack(entry.target.dataset.item)
                }
            });
        };

        const observer = new IntersectionObserver(callback, {
            root: null,
            threshold: 1,
        });

        const findIndex = props.data.indexOf(props.set)
        viewport.current.scrollTo(0, 40 * findIndex)
        
        list && list.map(item => {
            //const timer = setTimeout(() => index === findIndex && item.scrollIntoView({ behavior: "auto", block: "start" }), 480);
            //clearTimeout(timer);
            observer.observe(item);
            return () => {
                observer.disconnect(item); // *** Use the same element
            }
        })

    }, [props.data])

    useEffect(() => {
    }, [])

    return (
        <div className={styles.container}>
            <ul className={styles.contents} ref={viewport} >
                {
                    props.data && props.data.map((item, index) =>
                    (
                        <li className={styles.item} key={index} data-item={item} >
                            {item}
                        </li>
                    )
                    )
                }
            </ul>
        </div>
    );
}

export default React.memo(App);

App.defaultProps = {
};
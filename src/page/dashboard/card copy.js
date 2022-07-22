/*


*/
import { useState, useEffect, useRef, useCallback } from 'react';
import { useSpring, useSprings, animated } from '@react-spring/web';

import styles from './card.module.scss';
import classNames from 'classnames';

const SCROLL_THROTTLE_MS = 1000; // in ms

const App = () => {
    const [windowDimenion, detectHW] = useState({
        windWidth: window.innerWidth,
        windHeight: window.innerHeight,
    });

    const totalSubscribersCount = 98001;
    const waitListNumber = 0; // put some value to render post subscription screen
    const contentContainerRef = useRef(null);
    const clientWidthRef = useRef(0);
    const scrollInProgressRef = useRef(false);

    const [scrollXOffsetSpring, scrollXOffsetSpringApi] = useSpring(() => ({
        xOffset: 0
    }));

    const [backgroundSvgIntroStyles, backgroundSvgIntroStylesApi] = useSpring(
        () => ({ opacity: 1 })
    );

    const onScroll = useCallback((event) => {
        console.log(event.currentTarget.scrollLeft,'/',clientWidthRef)
        
        const xOffset = event.currentTarget.scrollLeft;
        const clientWidth = clientWidthRef.current;
        if (scrollInProgressRef.current) {
            return;
        } else {
            scrollInProgressRef.current = true;
            setTimeout(() => {
                scrollInProgressRef.current = false;
            }, SCROLL_THROTTLE_MS);
        }

        scrollXOffsetSpringApi.start({
            xOffset,
        });
        
        backgroundSvgIntroStylesApi.start({
            opacity: scrollXOffsetSpring.xOffset.to(
                [0, clientWidth, clientWidth + 1],
                [0, 0, 1]
            ),
        });
    })

    useEffect(() => {
        clientWidthRef.current = document.documentElement.clientWidth;
        contentContainerRef.current?.addEventListener('scroll', onScroll);

        return () => {
            contentContainerRef.current?.removeEventListener('scroll', onScroll);
        };
    }, [onScroll]);
    /*const detectSize = () => {
        detectHW({
            winWidth: window.innerWidth,
            winHeight: window.innerHeight,
        })
    }
    useEffect(() => {
        window.addEventListener('resize', detectSize)

        return () => {
            window.removeEventListener('resize', detectSize)
        }
    }, [windowDimenion])*/
    return (
        <section className={classNames(styles.container)} style={{ height: windowDimenion.windHeight - 118 }}>

            <div className={styles.controller}>
                <div className={classNames(styles.item, styles.active)}>list</div>
                <div className={classNames(styles.item)}>grid</div>
            </div>

            <div className={styles.contents} ref={contentContainerRef}>

                <div className={classNames(styles.item, styles.active)}>
                    <animated.div
                        className="absolute w-full h-full"
                        style={backgroundSvgIntroStyles}
                    >
                        <div>123456789</div>
                    </animated.div>
                    <h3 className={styles.title}>Average Rate</h3>
                </div>

                <div className={styles.item}>
                    <animated.div
                        className="absolute w-full h-full"
                        style={backgroundSvgIntroStyles}
                    >
                        <div>123456789</div>
                    </animated.div>
                    <h3 className={styles.title}>KF-21-001</h3>
                </div>
                <div className={styles.item}>
                    <h3 className={styles.title}>KF-21-002</h3>
                </div>
                <div className={styles.item}>
                    <h3 className={styles.title}>KF-21-003</h3>
                </div>
            </div>
        </section>
    );
}

export default App;

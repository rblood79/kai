/*


*/
import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useGesture, useDrag } from '@use-gesture/react'
import { a, useSpring, useSprings, animated, config } from '@react-spring/web';

import { List } from '../../components';

import Sheet from '../../components/sheet';

import gloval from '../../components/index.module.scss';
import styles from './list.module.scss';
import classNames from 'classnames';


import Header from '../../components/header';

const items = ['save item', 'open item', 'share item', 'delete item', 'cancel']
const height = items.length * 60 + 80;

const App = (props) => {
    /*const [{ y }, api] = useSpring(() => ({ y: height }))
    const open = ({ canceled }) => {
        api.start({ y: 0, immediate: false, config: canceled ? config.default : config.stiff })
    }
    const close = (velocity = 0) => {
        api.start({ y: height, immediate: false, config: { ...config.stiff, velocity } })
    }

    const bind = useDrag(
        ({ last, velocity: [, vy], direction: [, dy], movement: [, my], cancel, canceled }) => {
            if (my < -70) cancel()
            if (last) {
                my > height * 0.5 || (vy > 0.5 && dy > 0) ? close(vy) : open({ canceled })
                setNavState(false)
            }
            else api.start({ y: my, immediate: true })
        },
        { from: () => [0, y.get()], filterTaps: true, bounds: { top: 0 }, rubberband: true }
    )

    const display = y.to((py) => (py < height ? 'block' : 'none'))

    const bgStyle = {
        transform: y.to([0, height], ['translateY(-8%) scale(1.16)', 'translateY(0px) scale(1)']),
        opacity: y.to([0, height], [0.4, 1], 'clamp')
    }*/

    const clk = () => {
        console.log('click')
    }

    const navigate = useNavigate();
    const [navState, setNavState] = useState(false);
    const toggleNav = () => setNavState(!navState);

    const [data, setData] = useState([])

    useEffect(() => {
        setData(
            [
                {
                    id: '001',
                    title: '220218-KFX-001',
                    planTO: '17:30:40',
                    planLD: '18:30:00',
                    actualTO: '17:30:00',
                    actualLD: '18:00:00',
                    info: [
                        {
                            title: 'Tail No',
                            text: '20-001',
                        },
                        {
                            title: 'Flight Date',
                            text: '24 March 2021',
                        }
                    ],
                },
                {
                    id: '002',
                    title: '210218-KFX-002',
                    planTO: '11:30:40',
                    planLD: '11:30:00',
                    actualTO: '12:30:00',
                    actualLD: '12:00:00',
                    info: [
                        {
                            title: 'Tail No',
                            text: '20-001',
                        },
                        {
                            title: 'Flight Date',
                            text: '24 March 2021',
                        }
                    ],
                },
                {
                    id: '003',
                    title: '220224-KFX-003',
                    planTO: '11:30:40',
                    planLD: '11:30:00',
                    actualTO: '12:30:00',
                    actualLD: '12:00:00',
                    info: [
                        {
                            title: 'Tail No',
                            text: '20-001',
                        },
                        {
                            title: 'Flight Date',
                            text: '24 March 2021',
                        }
                    ],
                }
            ]
        )
    }, [])

    return (
        <>
            <Header title={'Flight List'} depth={1} right={'filter'} state={toggleNav} background={'#fff'} />
            <main className={styles.main}>
                <header className={styles.header}>
                    <div className={styles.title}>
                        {data && data.length} FIGHTERS WERE QUERIED<br />
                        DURING THIS<br />
                        PERIOD
                    </div>
                    <span className={styles.date}>25 JUNE 2020 - 19 OCTOBER 2021</span>
                </header>
                <List data={data} type={'F'} />
            </main>
            <Sheet title={'Conditional search'} state={navState} close={toggleNav}>
                <div onClick={() => clk()}>List 0</div>
                <div>List 1</div>
                <div>List 2</div>
            </Sheet>
            {/*
                    <div className={styles.list}>
                        <Link to='46'>link</Link>
                        <Link
                            to={{
                                pathname: "48",
                                state: { fromDashboard: true }
                            }}
                        >aaaa</Link>
                        <button onClick={() => navigate('15', { state: { id: 15, title: 'sabaoon' } })}>button</button>
                    </div>
                        */}

        </>

    );
}

export default App;

App.defaultProps = {

};
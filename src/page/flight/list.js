/*


*/
import React from 'react'
import { useState, useEffect } from 'react';

//import { useGesture, useDrag } from '@use-gesture/react'
//import { a, useSpring, useSprings, animated, config } from '@react-spring/web';

import { Input } from '../../components';
import Card from '../../components/card';
import Item from '../../components/item/item';
import ItemFlight from '../../components/item/itemFlight';

import Sheet from '../../components/sheet';

//import gloval from '../../components/index.module.scss';
import styles from './list.module.scss';
//import classNames from 'classnames';


import Header from '../../components/header';

//const items = ['save item', 'open item', 'share item', 'delete item', 'cancel']
//const height = items.length * 60 + 80;

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

    const [navState, setNavState] = useState(false);
    const toggleNav = () => setNavState(!navState);
    const [data, setData] = useState([]);
    const [sheet, setSheet] = useState(
        {
            range: '1d',
            startDate: '20000101',
            endDate: '20221231',
            base: '1Q',
        }
    );



    const listItem = data.map((item, index) => {
        return (
            <Card
                key={index}
                rightText={'detail'}
                rightType={'button'}
                header={Item}
                body={ItemFlight}
                data={item}
            />
        )
    });

    const filter = () => {
        console.log('filter', sheet)
    }

    useEffect(() => {
        setData(
            [
                {
                    id: '001',
                    title: 'KF-21-001',
                    header: [
                        {
                            title: 'Tail No',
                            text: '20-001',
                        },
                        {
                            title: 'Flight Date',
                            text: '24 March 2021',
                        }
                    ],
                    body: [
                        {
                            title: 'Plan',
                            to: '11:30:40',
                            ld: '11:30:00'
                        },
                        {
                            title: 'Actual',
                            to: '12:40:00',
                            ld: '12:30:00'
                        }
                    ]
                },
                {
                    id: '002',
                    title: 'KF-21-002',
                    header: [
                        {
                            title: 'Tail No',
                            text: '20-001',
                        },
                        {
                            title: 'Flight Date',
                            text: '24 March 2021',
                        }
                    ],
                    body: [
                        {
                            title: 'Plan',
                            to: '11:30:40',
                            ld: '11:30:00'
                        },
                        {
                            title: 'Actual',
                            to: '12:40:00',
                            ld: '12:30:00'
                        }
                    ]
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
                {data &&
                    <div className={styles.list}>
                        {listItem}
                    </div>
                }
            </main>
            <Sheet title={'Conditional Search'} state={navState} close={toggleNav} callBack={filter} height={'body'}>
                <Input label={'Flight Range'} type={'select'} value={'1Month'} />
                <Input label={'Flight Date'} type={'date'} value={['22. 06. 2011', '22. 06. 2020']} />
                <Input label={'Flight Time'} type={'time'} value={['11:30:00', '12:00:00']} />
                <Input label={'Air Base'} type={'select'} required={true} value={'Daegu'} />
                <Input label={'SQ'} disabled={true} value={'1Q'} />
            </Sheet>
        </>
    );
}

export default App;

App.defaultProps = {

};
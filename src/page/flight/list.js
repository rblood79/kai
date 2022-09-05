/*


*/
import React from 'react'
import { useState, useEffect } from 'react';

import moment from 'moment';

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

    const [navState, setNavState] = useState(false);
    const toggleNav = () => setNavState(!navState);
    const [data, setData] = useState([]);
    const [temp, setTemp] = useState({});
    const [sheet, setSheet] = useState(
        {
            range: '1d',
            startDate: '20000101',
            endDate: '20221231',
            base: 'daegu',
            sq: '4Q',
        }
    );

    const rangeData = [
        { id: '0', value: '1d', text: '1 Day' },
        { id: '1', value: '1w', text: '1 Week' },
        { id: '2', value: '1m', text: '1 Month' },
        { id: '3', value: '3m', text: '3 Month' },
        { id: '4', value: '6m', text: '6 Month' },
        { id: '5', value: '1y', text: '1 Year' },
    ]

    const baseData = [
        { id: '0', value: 'seoul', text: 'Seoul' },
        { id: '1', value: 'busan', text: 'Busan' },
        { id: '2', value: 'daegu', text: 'Daegu' },
        { id: '3', value: 'jeju', text: 'Jeju' },
        { id: '4', value: 'incheon', text: 'Incheon' },
    ]

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

    const cancle = () => {
        setTemp(JSON.parse(JSON.stringify(sheet)))
    }

    const apply = () => {
        setSheet(JSON.parse(JSON.stringify(temp)))
        toggleNav();
    }

    useEffect(() => {
        console.log('filter', sheet)
    }, [sheet])

    useEffect(() => {
        setTemp(JSON.parse(JSON.stringify(sheet)))
    }, [navState])

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
                    <span className={styles.date}>{moment(sheet.startDate).format('DD MMM YYYY')} - {moment(sheet.endDate).format('DD MMM YYYY')}</span>
                </header>
                {data &&
                    <div className={styles.list}>
                        {listItem}
                    </div>
                }
            </main>

            <Sheet title={'Conditional Search'} height={'body'} state={navState} close={setNavState} cancel={cancle} apply={apply} >
                <Input label={'Flight Range'} type={'select'} value={temp.range} data={rangeData} column={'range'} callBack={setTemp} />

                <Input label={'Flight Start'} type={'date'} value={temp.startDate} column={'startDate'}/>

                <Input label={'Flight End'} type={'date'} value={temp.endDate} column={'endDate'} />
                
                <Input label={'Air Base'} type={'select'} required={true} value={temp.base} data={baseData} column={'base'} callBack={setTemp} />
                <Input label={'SQ'} disabled={true} value={'1Q'} />
            </Sheet>
        </>
    );
}

export default App;

App.defaultProps = {

};
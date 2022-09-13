/*


*/
import React from 'react'
import { useState, useEffect } from 'react';

import _ from 'lodash';
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

    //filter result data
    const [result, setResult] = useState([]);

    //list data
    const [data, setData] = useState([
        {
            id: '001',
            header: [
                {
                    title: 'Tail No',
                    text: '20-001',
                },
                {
                    title: 'Flight Date',
                    text: '20220901',
                    type: 'date',
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
            header: [
                {
                    title: 'Tail No',
                    text: '20-001',
                },
                {
                    title: 'Flight Date',
                    text: '20220821',
                    type: 'date',
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
            id: '003',
            header: [
                {
                    title: 'Tail No',
                    text: '20-001',
                },
                {
                    title: 'Flight Date',
                    text: '20220830',
                    type: 'date',
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
            id: '004',
            header: [
                {
                    title: 'Tail No',
                    text: '20-022',
                },
                {
                    title: 'Flight Date',
                    text: '20210920',
                    type: 'date',
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
    ]);

    //filter empty data
    const [temp, setTemp] = useState({});

    //filter default data
    const [sheet, setSheet] = useState(
        {
            range: '1M',
            endDate: moment().format(),
            startDate: moment().add(-1, 'M'),
            base: 'seoul',
            sq: '4Q',
        }
    );

    //range list
    const rangeData = [
        { id: '0', value: '1D', text: '1 Day' },
        { id: '1', value: '1W', text: '1 Week' },
        { id: '2', value: '1M', text: '1 Month' },
        { id: '3', value: '3M', text: '3 Month' },
        { id: '4', value: '6M', text: '6 Month' },
        { id: '5', value: '1Y', text: '1 Year' },
    ]

    //base column list
    const baseData = [
        { id: '0', value: 'all', text: 'All' },
        { id: '1', value: 'seoul', text: 'Seoul' },
        { id: '2', value: 'busan', text: 'Busan' },
        { id: '3', value: 'daegu', text: 'Daegu' },
        { id: '4', value: 'jeju', text: 'Jeju' },
        { id: '5', value: 'incheon', text: 'Incheon' },
    ]

    //list component
    const listItem = data.map((item, index) => {
        return (
            <Card
                key={index}
                rightText={'detail'}
                rightType={'button'}
                rightLink={item.id}
                title={'KF-21-' + item.id}
                header={Item}
                body={ItemFlight}
                data={item}
            />
        )
    });

    //bottom sheet cancle
    const cancle = () => {
        setTemp(JSON.parse(JSON.stringify(sheet)))
    }

    //bottom sheet apply
    const apply = () => {
        setSheet(JSON.parse(JSON.stringify(temp)))
        toggleNav();
    }

    //bottom sheet range change
    useEffect(() => {
        const num = temp.range && temp.range.replace(/[^0-9]/g, '');
        const format = temp.range && temp.range.replace(/[^A-Z]/g, '');
        setTemp((prevState) => ({
            ...prevState,
            startDate: moment(temp.endDate).add(-num, format)
        }
        ));
    }, [temp.range, temp.endDate])

    useEffect(() => {
        const temp = _.filter(data, function (o) {
            return (
                moment(o.header[1].text) >= moment(sheet.startDate) && moment(o.header[1].text) <= moment(sheet.endDate) &&
                o.base === sheet.base
                //_.filter()
            )
        })
        setResult(temp);
    }, [data, sheet])

    useEffect(() => {
        navState && setTemp(JSON.parse(JSON.stringify(sheet)))
    }, [navState, sheet])

    useEffect(() => {

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
                {result &&
                    <div className={styles.list}>
                        {listItem}
                    </div>
                }
            </main>

            <Sheet title={'Conditional Search'} height={'body'} state={navState} close={setNavState} cancel={cancle} apply={apply} >

                <Input label={'Search Range'} type={'select'} value={temp.range} data={rangeData} column={'range'} callBack={setTemp} />

                <Input label={'Start Date'} type={'date'} value={temp.startDate} column={'startDate'} />

                <Input label={'End Date'} type={'date'} value={temp.endDate} column={'endDate'} />

                <Input label={'Air Base'} type={'select'} required={true} value={temp.base} data={baseData} column={'base'} callBack={setTemp} />
                
                <Input label={'SQ'} disabled={true} value={'1Q'} />
                
            </Sheet>
        </>
    );
}

export default App;

App.defaultProps = {

};


import React, { useEffect, useState } from 'react';
import { numberPad } from '../../util';

import moment from 'moment';

import Item from './swipeItem';

import styles from './index.module.scss';


const App = (props) => {
    //console.log(props.data, props.format)
    const [data, setData] = useState(
        {
            hour: moment(props.data, props.format).format('HH'),
            min: moment(props.data, props.format).format('mm'),
            sec: moment(props.data, props.format).format('ss'),
        }
    )
    const [hour, setHour] = useState([])
    const [min, setMin] = useState([])
    const [sec, setSec] = useState([])

    const fnHour = (e) => {
        setData(prevState => ({ ...prevState, 'hour': e }))
    }

    const fnMin = (e) => {
        setData(prevState => ({ ...prevState, 'min': e }))
    }

    const fnSec = (e) => {
        setData(prevState => ({ ...prevState, 'sec': e }))
    }

    useEffect(() => {
        props.callBack(data)
        //console.log(data)
    }, [data])

    useEffect(() => {
        const hour = [], min = [];
        for (let i = 0; i < 60; i++) {
            let num = i;
            num <= 23 && hour.push(numberPad(num, 2));
            min.push(numberPad(num, 2));
        }
        setHour(hour)
        setMin(min)
        setSec(min)
        //console.log(props)
    }, [])

    return (
        <div className={styles.picker}>
            <span className={styles.title}>Time</span>
            <Item data={hour} set={data.hour} callBack={fnHour} />
            <Item data={min} set={data.min} callBack={fnMin} />
            <Item data={sec} set={data.sec} callBack={fnSec} />
        </div>
    );
}

export default React.memo(App);

App.defaultProps = {

};
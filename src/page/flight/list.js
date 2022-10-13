/*


*/
import React from 'react'
import { useState, useEffect, useRef, useCallback } from 'react';

import moment from 'moment';

//import { useGesture, useDrag } from '@use-gesture/react'
//import { a, useSpring, useSprings, animated, config } from '@react-spring/web';

import { Api, Header, Input, Card, Sheet, Item, ItemFlight } from '../../components';

import styles from './list.module.scss';
//import classNames from 'classnames';


const App = (props) => {

  const [navState, setNavState] = useState(false);
  const toggleNav = () => setNavState(!navState);
  //list data
  const [data, setData] = useState(
    [
      {
        "id": "1",
        "title": "AAAAA-002",
        "header": [
          {
            "title": "Tail No",
            "text": "20-001"
          },
          {
            "title": "Flight Date",
            "text": "20220901",
            "type": "date"
          }
        ],
        "body": [
          {
            "title": "Plan",
            "to": "11:30:40",
            "ld": "11:30:00"
          },
          {
            "title": "Actual",
            "to": "12:40:00",
            "ld": "12:30:00"
          }
        ]
      },
      {
        "id": "2",
        "title": "BBBBB",
        "header": [
          {
            "title": "Tail No",
            "text": "20-001"
          },
          {
            "title": "Flight Date",
            "text": "20220821",
            "type": "date"
          }
        ],
        "body": [
          {
            "title": "Plan",
            "to": "11:30:40",
            "ld": "11:30:00"
          },
          {
            "title": "Actual",
            "to": "12:40:00",
            "ld": "12:30:00"
          }
        ]
      },
      {
        "id": "3",
        "title": "cCCCC",
        "header": [
          {
            "title": "Tail No",
            "text": "20-001"
          },
          {
            "title": "Flight Date",
            "text": "20220830",
            "type": "date"
          }
        ],
        "body": [
          {
            "title": "Plan",
            "to": "11:30:40",
            "ld": "11:30:00"
          },
          {
            "title": "Actual",
            "to": "12:40:00",
            "ld": "12:30:00"
          }
        ]
      },
      {
        "id": "4",
        "title": "DDwse",
        "header": [
          {
            "title": "Tail No",
            "text": "20-022"
          },
          {
            "title": "Flight Date",
            "text": "20210920",
            "type": "date"
          }
        ],
        "body": [
          {
            "title": "Plan",
            "to": "11:30:40",
            "ld": "11:30:00"
          },
          {
            "title": "Actual",
            "to": "12:40:00",
            "ld": "12:30:00"
          }
        ]
      }
    ]
  );
  //filter empty data
  const [temp, setTemp] = useState(null)

  //filter default data
  const [params, setParams] = useState(
    {
      range: '1M',
      endDate: moment().format('YYYYMMDDHHmmss'),
      startDate: moment().add(-1, 'M').format('YYYYMMDDHHmmss'),
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

  const onLoad = async () => {
    setTemp(JSON.parse(JSON.stringify(params)))
    try {
      const response = await Api({
        //baseURL: state.url,
        url: 'flight',
        method: 'get',
        params: params,
      });
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //bottom sheet cancle
  const cancle = () => {
    setParams(JSON.parse(JSON.stringify(temp)))
  }

  //bottom sheet apply
  const apply = () => {
    console.log('filter', params)
    onLoad();
    toggleNav();
  }

  //bottom sheet range change
  /*useEffect(() => {
      const num = filter.range && filter.range.replace(/[^0-9]/g, '');
      const format = filter.range && filter.range.replace(/[^A-Z]/g, '');

      setParams((prevState) => ({
          ...prevState,
          startDate: moment(filter.endDate).add(-num, format)
      }
      ));
  }, [filter.range, filter.endDate])*/


  // 초기 설정
  useEffect(() => {
    onLoad();
  }, [])

  const listItem = data && data.map((item, index) => {
    return (
      <Card
        key={index}
        rightText={'detail'}
        rightType={'button'}
        rightLink={item.id}
        title={item.title}
        header={Item}
        body={ItemFlight}
        data={item}
      />
    )
  });

  return (
    <>
      <Header title={'Flight List'} depth={1} right={'filter'} state={toggleNav} background={'var(--colorCard)'} />
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.title}>
            {data && data.length} FIGHTERS WERE QUERIED<br />
            DURING THIS<br />
            PERIOD
          </div>
          <span className={styles.date}>{moment(params.startDate, 'YYYYMMDDHHmmss').format('YYYY/MM/DD')} - {moment(params.endDate, 'YYYYMMDDHHmmss').format('YYYY/MM/DD')}</span>
        </header>
        <div className={styles.body}>
          {
            data ? listItem : <div>no data</div>
          }
        </div>
      </main>

      <Sheet title={'Conditional Search'} height={'body'} state={navState} close={setNavState} cancel={cancle} apply={apply} gap={48}>

        <Input label={'Search Range'} type={'select'} value={params.range} data={rangeData} column={'range'} callBack={setParams} />

        <Input label={'Start Date'} type={'date'} value={params.startDate} column={'startDate'} callBack={setParams} />

        <Input label={'End Date'} type={'date'} value={params.endDate} column={'endDate'} callBack={setParams} />

        <Input label={'Air Base'} type={'select'} required={true} value={params.base} data={baseData} column={'base'} callBack={setParams} />

        <Input label={'SQ'} value={params.sq} column={'sq'} callBack={setParams} />

      </Sheet>
    </>
  );
}

export default App;

App.defaultProps = {

};
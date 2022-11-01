
/*


*/
import React from 'react'
import { useState, useEffect } from 'react';

import moment from 'moment';
import { Api, Layout, Header, Top, Input, Card, Sheet, ItemList, ItemFlight, Decrypt } from '../../components';

//import classNames from 'classnames';

const App = (props) => {
  const [navState, setNavState] = useState(false);
  const toggleNav = () => setNavState(!navState);
  const [scrollTop, setScrollTop] = useState(true);
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
      checkTest: null,
      range: '1M',
      endDate: moment().format('YYYYMMDDHHmmss'),
      startDate: moment().add(-1, 'M').format('YYYYMMDDHHmmss'),
      base: 'seoul',
      sq: '4Q',
    }
  );

  //range list
  const rangeData = [
    { value: '1D', text: '1 Day' },
    { value: '1W', text: '1 Week' },
    { value: '1M', text: '1 Month' },
    { value: '3M', text: '3 Month' },
    { value: '6M', text: '6 Month' },
    { value: '1Y', text: '1 Year' },
  ]

  //base column list
  const baseData = [
    { value: 'all', text: 'All' },
    { value: 'seoul', text: 'Seoul' },
    { value: 'busan', text: 'Busan' },
    { value: 'daegu', text: 'Daegu' },
    { value: 'jeju', text: 'Jeju' },
    { value: 'incheon', text: 'Incheon' },
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
      setData(Decrypt(response.data));
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

  // 초기 설정
  useEffect(() => {
    onLoad();
  }, [])

  const ListItem = data && data.map((item, index) => {
    return (
      <Card
        key={index}
        rightText={'detail'}
        rightType={'button'}
        rightLink={item.id}
        title={item.title}
        gap={8}
      >
        <ItemList data={item.header} box={false} />
        <ItemFlight data={item.body} />
      </Card>
    )
  });

  return (
    <>
      <Top title={'Flight List'} depth={1} right={'filter'} state={toggleNav} background={'var(--colorCard)'} scrollTop={scrollTop} />
      <Layout scrollTop={setScrollTop}>
        <Header title={'FIGHTERS WERE QUERIED DURING THIS PERIOD'}
          comment={
            moment(params.startDate, 'YYYYMMDDHHmmss').format('YYYY/MM/DD') + ' - ' + moment(params.endDate, 'YYYYMMDDHHmmss').format('YYYY/MM/DD')
          }
        />
        {
          ListItem
        }
      </Layout>

      <Sheet title={'Conditional Search'} height={'body'}  gap={48} state={navState} close={setNavState} cancel={cancle} apply={apply}>
        <Input label={'Checkbox'} type={'checkbox'} value={params.checkTest} data={rangeData} column={'checkTest'} columns={3} onChange={setParams} />
        <Input label={'Radio item'} type={'radio'} value={params.range} data={rangeData} column={'range'} columns={2} onChange={setParams} />
        <Input label={'Search Range'} type={'select'} value={params.range} data={rangeData} column={'range'} onChange={setParams} />
        <Input label={'Start Date'} type={'date'} value={params.startDate} column={'startDate'} onChange={setParams} />
        <Input label={'End Date'} type={'date'} value={params.endDate} column={'endDate'} onChange={setParams} />
        <Input label={'Air Base'} type={'select'} required={true} value={params.base} data={baseData} column={'base'} onChange={setParams} />
        <Input label={'SQ'} value={params.sq} column={'sq'} onChange={setParams} />
      </Sheet>
    </>
  );
}

export default App;

App.defaultProps = {

};
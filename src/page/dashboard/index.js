/*


*/
import React, { useEffect, useState, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Api, Layout, Top, Bottom, Tab } from '../../components';
import { standalone } from '../../util';
import { userContext } from '../../context';

const App = () => {
    const { user } = useContext(userContext);
    const [type, setType] = useState('LIST');
    const [data, setData] = useState(null);

    const [params] = useState({
        id: user.id,
        group: user.group,
    })

    const fakeData = [
        {
            "id": "total",
            "label": "Average rate",
            "base": "11 base camp",
            "unit": "12",
            "value": "79.4",
            "flight": "220218-658KFX",
            "defect": "Turbine defect"
        },
        {
            "id": "1",
            "label": "KF-21-001",
            "intro": "18 June 2020",
            "oh": "2,125",
            "fh": "235",
            "value": "82.6",
            "status": "At Maintenance",
            "date": "11 June 2021",
        },
        {
            "id": "2",
            "label": "KF-21-002",
            "intro": "23 July 2021",
            "oh": "2,125",
            "fh": "235",
            "value": "18.02",
            "status": "At Maintenance",
            "date": "24 June 2021"
        },
        {
            "id": "3",
            "label": "KF-21-003",
            "intro": "18 October 2020",
            "oh": "4,825",
            "fh": "2695",
            "value": "88.02",
            "status": "At Maintenance",
            "date": "17 June 2021"
        },
        {
            "id": "4",
            "label": "KF-21-011",
            "intro": "18 June 2020",
            "oh": "2,125",
            "fh": "235",
            "value": "62.6",
            "status": "At Maintenance",
            "date": "11 June 2021",
        },
        {
            "id": "5",
            "label": "KF-21-001",
            "intro": "18 June 2020",
            "oh": "2,125",
            "fh": "235",
            "value": "82.66",
            "status": "At Maintenance",
            "date": "11 June 2021",
        },
        {
            "id": "6",
            "label": "KF-21-002",
            "intro": "23 July 2021",
            "oh": "2,125",
            "fh": "235",
            "value": "18.02",
            "status": "At Maintenance",
            "date": "24 June 2021"
        },
        {
            "id": "7",
            "label": "KF-21-003",
            "intro": "18 October 2020",
            "oh": "4,825",
            "fh": "2695",
            "value": "88.52",
            "status": "At Maintenance",
            "date": "17 June 2021"
        },
        {
            "id": "8",
            "label": "KF-21-011",
            "intro": "18 June 2020",
            "oh": "2,125",
            "fh": "235",
            "value": "62.42",
            "status": "At Maintenance",
            "date": "11 June 2021",
        },
        {
            "id": "9",
            "label": "KF-21-001",
            "intro": "18 June 2020",
            "oh": "2,125",
            "fh": "235",
            "value": "11.5",
            "status": "At Maintenance",
            "date": "11 June 2021",
        },
        {
            "id": "12",
            "label": "KF-21-002",
            "intro": "23 July 2021",
            "oh": "2,125",
            "fh": "235",
            "value": "68.22",
            "status": "At Maintenance",
            "date": "24 June 2021"
        },
        {
            "id": "13",
            "label": "KF-21-003",
            "intro": "18 October 2020",
            "oh": "4,825",
            "fh": "2695",
            "value": "68.12",
            "status": "At Maintenance",
            "date": "17 June 2021"
        },
        {
            "id": "14",
            "label": "KF-21-011",
            "intro": "18 June 2020",
            "oh": "2,125",
            "fh": "235",
            "value": "62.34",
            "status": "At Maintenance",
            "date": "11 June 2021",
        },
        {
            "id": "11",
            "label": "KF-21-001",
            "intro": "18 June 2020",
            "oh": "2,125",
            "fh": "235",
            "value": "82.61",
            "status": "At Maintenance",
            "date": "11 June 2021",
        },
        {
            "id": "22",
            "label": "KF-21-002",
            "intro": "23 July 2021",
            "oh": "2,125",
            "fh": "235",
            "value": "18.92",
            "status": "At Maintenance",
            "date": "24 June 2021"
        },
        {
            "id": "253",
            "label": "KF-21-003",
            "intro": "18 October 2020",
            "oh": "4,825",
            "fh": "2695",
            "value": "88.76",
            "status": "At Maintenance",
            "date": "17 June 2021"
        },
        {
            "id": "224",
            "label": "KF-21-011",
            "intro": "18 June 2020",
            "oh": "2,125",
            "fh": "235",
            "value": "62.61",
            "status": "At Maintenance",
            "date": "11 June 2021",
        },
        {
            "id": "122",
            "label": "KF-21-002",
            "intro": "23 July 2021",
            "oh": "2,125",
            "fh": "235",
            "value": "58.52",
            "status": "At Maintenance",
            "date": "24 June 2021"
        },
        {
            "id": "123",
            "label": "KF-21-003",
            "intro": "18 October 2020",
            "oh": "4,825",
            "fh": "2695",
            "value": "38.02",
            "status": "At Maintenance",
            "date": "17 June 2021"
        },
        {
            "id": "124",
            "label": "KF-21-011",
            "intro": "18 June 2020",
            "oh": "2,125",
            "fh": "235",
            "value": "92.6",
            "status": "At Maintenance",
            "date": "11 June 2021",
        }
    ]

    const onLoad = async () => {
        try {
            const response = await Api({
                //baseURL: 'https://jsonplaceholder.typicode.com/todos',
                //url: 'dashboard',
                method: 'get',
                params: params,
            });
            response.data && setData(response.data);
        } catch (error) {
            setData(fakeData);
            console.log(error);
        }
    };

    useEffect(() => {
        onLoad();
        return () => {
            //console.log('컴포넌트가 화면에서 사라짐');
        };
    }, [])
    return (
        <>
            <Top title={'KF-21 LIS'} depth={0} />
            <Layout height={'100%'} padding={'0px'} gap={'8px'} >
                {
                    data &&
                    <>
                        <Tab label={["LIST", "GRID"]} padding={'0px 48px'} onChange={setType} />
                        <Outlet context={{ type, data }} />
                    </>
                }
            </Layout>

            {standalone && <Bottom />}
        </>
    );
}

//export default App;
export default React.memo(App);

App.defaultProps = {
};
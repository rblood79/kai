/*


*/

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { Api, Layout, Top, Card, Sheet, Input, ItemList, Chart, ItemMaintenance, Decrypt } from '../../components';

const App = () => {
    const { id } = useParams();
    const [navState, setNavState] = useState(false);
    const toggleNav = () => setNavState(!navState);
    const [scrollTop, setScrollTop] = useState(true);
    //filter default data
    const [params, setParams] = useState(
        {
            range: '1M',
            endDate: moment().format('YYYYMMDDHHmmss'),
            startDate: moment().add(-1, 'M').format('YYYYMMDDHHmmss'),
        }
    );
    //filter empty data
    const [temp, setTemp] = useState(null)

    const [data, setData] = useState(
        {
            "id": "1",
            "title": "Result",
            "dataH": [
                {
                    "label": "Date Range",
                    "value": moment(params.startDate, 'YYYYMMDDHHmmss').format('YYYY.MM.DD') +' - '+ moment(params.endDate, 'YYYYMMDDHHmmss').format('YYYY.MM.DD')
                },
                {
                    "label": "Area Base",
                    "value": "18th Flyight Wing"
                }
            ],
            "dataC":
                [
                    { label: "Flight", value: 18 },
                    { label: "Maintenance", value: 6 },
                    { label: "Repair", value: 4 },
                    { label: "Landing", value: 7 },
                ],
                
            "dataM": {
                "id": "maintenance",
                "header": [
                    {
                        "label": "Area Base",
                        "value": "18th Flyight Wing"
                    },
                ],
                "body": [
                    {
                        "label": "KF-21-001",
                        "cycle": "18SVM",
                        "date": "24 MAY 2021",
                        "value": 18
                    },
                    {
                        "label": "KF-21-002",
                        "cycle": "18SVM",
                        "date": "24 MAY 2021",
                        "value": 89
                    },
                    {
                        "label": "KF-21-003",
                        "cycle": "18SVM",
                        "date": "24 MAY 2021",
                        "value": 66
                    }
                ]
            },
        }
    );
    //range list
    const rangeData = [
        { value: '1D', label: '1 Day' },
        { value: '1W', label: '1 Week' },
        { value: '1M', label: '1 Month' },
        { value: '3M', label: '3 Month' },
        { value: '6M', label: '6 Month' },
        { value: '1Y', label: '1 Year' },
    ]

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

    useEffect(() => {
        onLoad()
    }, [id]);

    return (
        <>
            {
                data && <>
                    <Top title={data.title} background={'var(--colorCard)'} depth={1} right={'filter'} state={toggleNav} scrollTop={scrollTop} />
                    <Layout scrollTop={setScrollTop}>

                        <Card
                            title={'Behavior Chart'}
                            gap={8}
                        >
                            <ItemList data={data.dataH} box={false} />
                            <Chart height={240} type={'donut'} data={data.dataC} active={true} />
                        </Card>

                        <Card
                            title={'Behavior Chart'}
                            gap={8}
                        >
                            <Chart height={240} type={'bar'} data={data.dataC} active={true} />
                        </Card>

                        <Card
                            title={'Aircraft Rate'}
                            gap={8}
                        >
                            <ItemList data={data.dataM.header} box={false} />
                            <ItemMaintenance data={data.dataM.body} />
                        </Card>

                    </Layout>
                    <Sheet title={'Conditional Search'} height={'body'} gap={48} state={navState} close={setNavState} cancel={cancle} apply={apply}>
                        <Input label={'Search Range'} type={'select'} value={params.range} data={rangeData} column={'range'} onChange={setParams} />
                        <Input label={'Start Date'} type={'date'} value={params.startDate} column={'startDate'} onChange={setParams} />
                        <Input label={'End Date'} type={'date'} value={params.endDate} column={'endDate'} onChange={setParams} />
                    </Sheet>
                </>
            }

        </>
    );
}

export default App;

App.defaultProps = {

};
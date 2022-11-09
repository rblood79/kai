/*


*/

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { Api, Layout, Top, Card, Sheet, Input, ItemList, Chart, ItemMaintenance } from '../../components';

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
            "title": "KF-21-001",

            "dataM": {
                "id": "maintenance",
                "header": [
                    {
                        "title": "Area Base",
                        "text": "18th Flyight Wing"
                    },
                    {
                        "title": "Maintenance No",
                        "text": "20-001"
                    }
                ],
                "body": [
                    {
                        "title": "KF-21-001",
                        "cycle": "18SVM",
                        "date": "24 MAY 2021",
                        "text": 18
                    },
                    {
                        "title": "KF-21-002",
                        "cycle": "18SVM",
                        "date": "24 MAY 2021",
                        "text": 89
                    },
                    {
                        "title": "KF-21-003",
                        "cycle": "18SVM",
                        "date": "24 MAY 2021",
                        "text": 66
                    }
                ]
            },
            "dataC":
                [
                    { title: "KFX-001", rate: 48 },
                    { title: "KFX-002", rate: 56 },
                    { title: "KFX-003", rate: 18 },
                ]
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
        try {
            const response = await Api({
                //baseURL: state.url,
                url: 'dashboard/' + id,
                method: 'get',
                params: {},
            });
            setData(response.data);
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
                            title={'Behavior Rate'}
                            gap={8}
                        >
                            <Chart height={400} type={'pie'} data={data.dataC} active={true} />
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
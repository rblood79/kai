
import { useState, useEffect, useMemo } from 'react';
import { Api, Layout, Top, Tab, Header, Card, ItemList } from '../../components';

const App = (props) => {
    const [scrollTop, setScrollTop] = useState(true);
    const [tab, setTab] = useState('All');
    const [data, setData] = useState([
        {
            id: '0',
            title: 'Tail part Repair',
            type: 'Maintenance',
            "header": [
                {
                    "label": "Defect No",
                    "value": "20-005-2615",
                },
                {
                    "label": "Defect Date",
                    "value": "20211015",
                    "type": "date"
                }
            ]
        },
        {
            id: '1',
            title: 'Turbine Lose',
            type: 'Replacement',
            "header": [
                {
                    "label": "Defect No",
                    "value": "20-005-2615",
                },
                {
                    "label": "Defect Date",
                    "value": "20211015",
                    "type": "date"
                }
            ]
        },
        {
            id: '2',
            title: 'Air Cond Change',
            type: 'Maintenance',
            "header": [
                {
                    "label": "Defect No",
                    "value": "20-005-2615",
                },
                {
                    "label": "Defect Date",
                    "value": "20211015",
                    "type": "date"
                }
            ]
        },
        {
            id: '3',
            title: 'Air Cond Change',
            type: 'Replacement',
            "header": [
                {
                    "label": "Defect No",
                    "value": "20-005-2615",
                },
                {
                    "label": "Defect Date",
                    "value": "20211015",
                    "type": "date"
                }
            ]
        },
        {
            id: '4',
            title: 'Tail part Repair',
            type: 'Maintenance',
            "header": [
                {
                    "label": "Defect No",
                    "value": "20-005-2615",
                },
                {
                    "label": "Defect Date",
                    "value": "20211015",
                    "type": "date"
                }
            ]
        },
        {
            id: '5',
            title: 'Turbine Lose',
            type: 'Replacement',
            "header": [
                {
                    "label": "Defect No",
                    "value": "20-005-2615",
                },
                {
                    "label": "Defect Date",
                    "value": "20211015",
                    "type": "date"
                }
            ]
        },
        {
            id: '6',
            title: 'Air Cond Change',
            type: 'Maintenance',
            "header": [
                {
                    "label": "Defect No",
                    "value": "20-005-2615",
                },
                {
                    "label": "Defect Date",
                    "value": "20211015",
                    "type": "date"
                }
            ]
        },
        {
            id: '7',
            title: 'Air Cond Change',
            type: 'Replacement',
            "header": [
                {
                    "label": "Defect No",
                    "value": "20-005-2615",
                },
                {
                    "label": "Defect Date",
                    "value": "20211015",
                    "type": "date"
                }
            ]
        }
    ]);

    const filterData = useMemo(() => {
        return tab !== 'All' ? data.filter(item => tab === item.type) : data;
    }, [tab, data]);

    const [params, setParams] = useState(
        {
            param0: 'aaaa',
            param1: 'bbbb',
        }
    );
    const listItem = filterData && filterData.map((item, index) => {
        return (
            <Card
                key={index}
                data={item}
                rightText={'detail'}
                rightType={'button'}
                rightBackground={'var(--colorEditable)'}
                rightLink={item.id}
                title={item.title}
                outline={false}
            >
                <ItemList data={item.header} box={false} />
            </Card>
        )
    });

    const onLoad = async () => {
        try {
            const response = await Api({
                //baseURL: state.url,
                url: 'defect',
                method: 'get',
                params: params,
            });
            setData(response.data);
        } catch (error) {
            console.log('load fail', error);
        }
    };
    // 초기 설정
    useEffect(() => {
        onLoad();
    }, [])

    return (
        <>
            <Top title={'Defect'} depth={1} background={'var(--colorCard)'} scrollTop={scrollTop} />
            <Layout scrollTop={setScrollTop} gap={16}>
                <Header title={'DEFECT FIGHTERS WERE QUERIED DURING THIS PERIOD'}
                    comment={
                        '2020-12-10'
                    }
                />
                <Tab label={["All", "Maintenance", "Replacement"]} onChange={setTab} />
                <Card>
                    {
                        data ? listItem : <div>no data</div>
                    }
                </Card>
            </Layout>
        </>
    );
}

export default App;

App.defaultProps = {

};
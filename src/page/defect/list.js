
import { useState, useEffect } from 'react';
import { Api, Layout, Top, Header, Card, ItemList } from '../../components';

const App = (props) => {
    const [scrollTop, setScrollTop] = useState(true);
    const [data, setData] = useState([
        {
            id: '0',
            title: 'Tail part Repair',
            "header": [
                {
                    "title": "Cause",
                    "text": "Tail Repair"
                },
                {
                    "title": "Defect No",
                    "text": "20-005-2615",
                },
                {
                    "title": "Defect Date",
                    "text": "20211015",
                    "type": "date"
                }
            ]
        },
        {
            id: '1',
            title: 'Turbine Lose',
            "header": [
                {
                    "title": "Cause",
                    "text": "Turbine Lose"
                },
                {
                    "title": "Defect No",
                    "text": "20-005-2615",
                },
                {
                    "title": "Defect Date",
                    "text": "20211015",
                    "type": "date"
                }
            ]
        },
        {
            id: '2',
            title: 'Air Cond Change',
            "header": [
                {
                    "title": "Cause",
                    "text": "Turbine Lose"
                },
                {
                    "title": "Defect No",
                    "text": "20-005-2615",
                },
                {
                    "title": "Defect Date",
                    "text": "20211015",
                    "type": "date"
                }
            ]
        },
        {
            id: '3',
            title: 'Air Cond Change',
            "header": [
                {
                    "title": "Cause",
                    "text": "Turbine Lose"
                },
                {
                    "title": "Defect No",
                    "text": "20-005-2615",
                },
                {
                    "title": "Defect Date",
                    "text": "20211015",
                    "type": "date"
                }
            ]
        },
        {
            id: '4',
            title: 'Tail part Repair',
            "header": [
                {
                    "title": "Cause",
                    "text": "Tail Repair"
                },
                {
                    "title": "Defect No",
                    "text": "20-005-2615",
                },
                {
                    "title": "Defect Date",
                    "text": "20211015",
                    "type": "date"
                }
            ]
        },
        {
            id: '5',
            title: 'Turbine Lose',
            "header": [
                {
                    "title": "Cause",
                    "text": "Turbine Lose"
                },
                {
                    "title": "Defect No",
                    "text": "20-005-2615",
                },
                {
                    "title": "Defect Date",
                    "text": "20211015",
                    "type": "date"
                }
            ]
        },
        {
            id: '6',
            title: 'Air Cond Change',
            "header": [
                {
                    "title": "Cause",
                    "text": "Turbine Lose"
                },
                {
                    "title": "Defect No",
                    "text": "20-005-2615",
                },
                {
                    "title": "Defect Date",
                    "text": "20211015",
                    "type": "date"
                }
            ]
        },
        {
            id: '7',
            title: 'Air Cond Change',
            "header": [
                {
                    "title": "Cause",
                    "text": "Turbine Lose"
                },
                {
                    "title": "Defect No",
                    "text": "20-005-2615",
                },
                {
                    "title": "Defect Date",
                    "text": "20211015",
                    "type": "date"
                }
            ]
        }
    ]);
    const [params, setParams] = useState(
        {
            param0: 'aaaa',
            param1: 'bbbb',
        }
    );
    const listItem = data && data.map((item, index) => {
        return (
            <Card
                key={index}
                data={item}
                rightText={'detail'}
                rightType={'button'}
                rightLink={item.id}
                title={item.title}
            >
                <ItemList data={item.header} box={false} />
            </Card>
        )
    });
    const onLoad = async () => {
        try {
            console.log('loading')
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
            <Layout scrollTop={setScrollTop}>
                <Header title={'DEFECT FIGHTERS WERE QUERIED DURING THIS PERIOD'}
                    comment={
                        '2020-12-10'
                    }
                />
                {
                    data ? listItem : <div>no data</div>
                }
            </Layout>
        </>
    );
}

export default App;

App.defaultProps = {

};
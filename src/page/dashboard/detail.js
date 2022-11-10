/*


*/

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Api, Layout, Top, Card, ItemList, ItemOverview, ItemFlight, ItemDefect, ItemMaintenance, ItemConsume } from '../../components';

const App = () => {
    const { id } = useParams();
    const [scrollTop, setScrollTop] = useState(true);
    const [data, setData] = useState(
        {
            "id": "1",
            "title": "KF-21-001",
            "intro": "18 June 2020",
            "oh": "2,125",
            "fh": "235",
            "rate": "82.6",
            "status": "At Maintenance",
            "date": "11 June 2021",

            "dataF": {
                "id": "flight",
                "header": [
                    {
                        "label": "Tail No",
                        "value": "20-001"
                    },
                    {
                        "label": "Flight Date",
                        "value": "24 March 2021"
                    }
                ],
                "body": [
                    {
                        "label": "Plan",
                        "to": "11:30:40",
                        "ld": "11:30:00"
                    },
                    {
                        "label": "Actual",
                        "to": "12:40:00",
                        "ld": "12:30:00"
                    }
                ]
            },
            "dataD": {
                "id": "defect",
                "header": [
                    {
                        "label": "Cause",
                        "value": "Turbine Lose"
                    },
                    {
                        "label": "Defect No",
                        "value": "20-001"
                    },
                    {
                        "label": "Defect Date",
                        "value": "28 June 2021"
                    }
                ],
                "body": []
            },
            "dataM": {
                "id": "maintenance",
                "header": [
                    {
                        "label": "Cause",
                        "value": "Turbine Defect"
                    },
                    {
                        "label": "Maintenance No",
                        "value": "20-001"
                    },
                    {
                        "label": "Maintenance Date",
                        "value": "28 June 2021"
                    }
                ],
                "body": [
                    {
                        "label": "EVERY 60 DAYS(I)",
                        "cycle": "18SVM",
                        "date": "24 MAY 2021",
                        "value": 18
                    },
                    {
                        "label": "EVERY 18 MONTHS(I)",
                        "cycle": "18SVM",
                        "date": "24 MAY 2021",
                        "value": 89
                    },
                    {
                        "label": "EVERY 36 MONTHS(I)",
                        "cycle": "18SVM",
                        "date": "24 MAY 2021",
                        "value": 66
                    }
                ]
            },
            "dataC": {
                "id": "consume",
                "header": [
                    {
                        "label": "Content",
                        "value": "Turbine Change & Maintenance"
                    },
                    {
                        "label": "Consume No",
                        "value": "20-001"
                    },
                    {
                        "label": "Consume Date",
                        "value": "28 June 2021"
                    }
                ],
                "body": [
                    {
                        "label": "EVERY 60 DAYS(I)",
                        "cycle": "18SVM",
                        "date": "24 MAY 2021",
                        "value": 18
                    }
                ]
            }
        }
    );

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
                    <Top title={data.title} background={'var(--colorCard)'} depth={1} scrollTop={scrollTop} />
                    <Layout scrollTop={setScrollTop}>
                        <ItemOverview
                            data={data}
                        />
                        <Card
                            rightText={'more'}
                            rightType={'button'}
                            rightLink={'/flight'}
                            title={'Flight No'}
                            gap={8}
                        >
                            <ItemList data={data.dataF.header} box={false}/>
                            <ItemFlight data={data.dataF.body} />
                        </Card>
                        <Card
                            rightText={'more'}
                            rightType={'button'}
                            rightLink={'/defect'}
                            title={'Defect'}
                            gap={8}
                        >
                            <ItemList data={data.dataD.header} box={false}/>
                            <ItemDefect data={data.dataD.body} />
                        </Card>
                        <Card
                            rightText={'more'}
                            rightType={'button'}
                            rightLink={'/maintenance'}
                            title={'Maintenance'}
                            gap={8}
                        >
                            <ItemList data={data.dataM.header} box={false}/>
                            <ItemMaintenance data={data.dataM.body} />
                        </Card>
                        <Card
                            rightText={'more'}
                            rightType={'button'}
                            rightLink={'/consume'}
                            title={'Consume'}
                            gap={8}
                        >
                            <ItemList data={data.dataC.header} box={false}/>
                            <ItemConsume data={data.dataC.body} />
                        </Card>
                    </Layout>
                </>
            }

        </>
    );
}

export default App;

App.defaultProps = {

};
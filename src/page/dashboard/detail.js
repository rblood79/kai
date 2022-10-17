/*


*/

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Api, Layout, Top, Card, Item, ItemOverview, ItemFlight, ItemDefect, ItemMaintenance, ItemConsume } from '../../components';

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
                        "title": "Tail No",
                        "text": "20-001"
                    },
                    {
                        "title": "Flight Date",
                        "text": "24 March 2021"
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
            "dataD": {
                "id": "defect",
                "header": [
                    {
                        "title": "Cause",
                        "text": "Turbine Lose"
                    },
                    {
                        "title": "Defect No",
                        "text": "20-001"
                    },
                    {
                        "title": "Defect Date",
                        "text": "28 June 2021"
                    }
                ],
                "body": []
            },
            "dataM": {
                "id": "maintenance",
                "header": [
                    {
                        "title": "Cause",
                        "text": "Turbine Defect"
                    },
                    {
                        "title": "Maintenance No",
                        "text": "20-001"
                    },
                    {
                        "title": "Maintenance Date",
                        "text": "28 June 2021"
                    }
                ],
                "body": [
                    {
                        "title": "EVERY 60 DAYS(I)",
                        "cycle": "18SVM",
                        "date": "24 MAY 2021",
                        "text": 18
                    },
                    {
                        "title": "EVERY 18 MONTHS(I)",
                        "cycle": "18SVM",
                        "date": "24 MAY 2021",
                        "text": 89
                    },
                    {
                        "title": "EVERY 36 MONTHS(I)",
                        "cycle": "18SVM",
                        "date": "24 MAY 2021",
                        "text": 66
                    }
                ]
            },
            "dataC": {
                "id": "consume",
                "header": [
                    {
                        "title": "Content",
                        "text": "Turbine Change & Maintenance"
                    },
                    {
                        "title": "Consume No",
                        "text": "20-001"
                    },
                    {
                        "title": "Consume Date",
                        "text": "28 June 2021"
                    }
                ],
                "body": [
                    {
                        "title": "EVERY 60 DAYS(I)",
                        "cycle": "18SVM",
                        "date": "24 MAY 2021",
                        "text": 18
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
                            header={Item}
                            body={ItemFlight}
                            data={data.dataF}
                        />
                        <Card
                            rightText={'more'}
                            rightType={'button'}
                            rightLink={'/defect'}
                            title={'Defect'}
                            header={Item}
                            body={ItemDefect}
                            data={data.dataD}
                        />
                        <Card
                            rightText={'more'}
                            rightType={'button'}
                            rightLink={'/maintenance'}
                            title={'Maintenance'}
                            header={Item}
                            body={ItemMaintenance}
                            data={data.dataM}
                        />
                        <Card
                            rightText={'more'}
                            rightType={'button'}
                            rightLink={'/consume'}
                            title={'Consume'}
                            header={Item}
                            body={ItemConsume}
                            data={data.dataC}
                        />
                    </Layout>
                </>
            }

        </>
    );
}

export default App;

App.defaultProps = {

};
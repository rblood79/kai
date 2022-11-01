/*


*/

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Api, Layout, Top, Card, ItemList, Chart, ItemMaintenance } from '../../components';

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
                    { aaa: 56, bbbb: 18, vvv: 48 },
                    { aaa: 56, bbbb: 18, vvv: 48 },
                    { aaa: 56, bbbb: 18, vvv: 48 },
                ]
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

                        <Card
                            title={'Behavior Rate'}
                            gap={8}
                        >
                            <Chart height={400} type={'pie'} data={data.dataC} active={true} />
                        </Card>

                        <Card
                            /*rightText={'more'}
                            rightType={'button'}
                            rightLink={'/maintenance'}*/
                            title={'Aircraft Rate'}
                            gap={8}
                        >
                            <ItemList data={data.dataM.header} box={false} />
                            <ItemMaintenance data={data.dataM.body} />
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
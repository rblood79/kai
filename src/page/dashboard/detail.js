/*


*/

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Api, Header, Card, Item, ItemOverview, ItemFlight, ItemDefect, ItemMaintenance, ItemConsume } from '../../components';

import styles from './detail.module.scss';
//import classNames from 'classnames';

const App = () => {
    const { id } = useParams();

    const [data, setData] = useState(null);

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
                    <Header title={data.title} background={'#f8f8f8'} depth={1} />
                    <main className={styles.main}>
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
                    </main>
                </>
            }

        </>
    );
}

export default App;

App.defaultProps = {

};
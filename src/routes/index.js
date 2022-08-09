import * as React from "react";
import { useRoutes } from "react-router-dom";

import NotFound from '../page/404';
import Sign from '../page/sign';
import Dashboard from '../page/dashboard';
import Flight from '../page/flight';
import FlightList from '../page/flight/list';
import FlightDetail from '../page/flight/detail';

const App = (props) => {
    let element = useRoutes([

        { path: "*", element: <NotFound /> },
        { path: "/", element: <Sign /> },
        { path: "dashboard", element: <Dashboard /> },
        {
            path: "flight",
            element: <Flight />,
            children: [
                {
                    path: "",
                    element: <FlightList />,
                },
                {
                    path: ":id",
                    element: <FlightDetail />
                },
            ],
        },
    ]);

    return element;
}

export default App
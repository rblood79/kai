//import logo from './logo.svg';
import { useState, useEffect, useRef, useContext } from 'react';
import { useTransition, animated, easings } from 'react-spring';
import { useLocation, Routes, Route } from "react-router-dom";
//context
import context from './context';

import classNames from 'classnames';
import './App.scss';

import NotFound from './page/404';
import Sign from './page/sign';
import Notifycation from './page/notify';
//dashboard
import Dashboard from './page/dashboard';
import DashboardList from './page/dashboard/list';
import DashboardDetail from './page/dashboard/detail';
//flight
import Flight from './page/flight';
import FlightList from './page/flight/list';
import FlightDetail from './page/flight/detail';
import FlightEdit from './page/flight/edit';
//defect
import Defect from './page/defect';
import DefectList from './page/defect/list';
import DefectDetail from './page/defect/detail';

//maintenance
import Maintenance from './page/maintenance';
import MaintenanceList from './page/maintenance/list';

//extenal
import Extenal from './page/extenal';
import ExtenalList from './page/extenal/list';

//order
import Order from './page/order';
import OrderList from './page/order/list';

//schedule
import Schedule from './page/schedule';
import ScheduleList from './page/schedule/list';

//tci
import Tci from './page/tci';
import TciList from './page/tci/list';

//loc
import Loc from './page/loc';
import LocList from './page/loc/list';


const App = () => {
  const state = useContext(context);
  const { user } = state;
  const viewport = useRef(null);
  const location = useLocation();
  const [direction, setDirection] = useState(0);

  const transitions = useTransition(location, {
    from: { transform: direction < window.history.state.idx ? 'translate3d(100%,0,0)' : 'translate3d(-100%,0,0)' },
    enter: { transform: 'translate3d(0%,0,0)' },
    leave: { transform: direction < window.history.state.idx ? 'translate3d(-50%,0,0)' : 'translate3d(50%,0,0)' },
    config: {
      duration: 480,
      easing: easings.easeInOutQuart,
    },
    onRest: () => {
      // direction
      setDirection(window.history.state.idx)
    },
  })


  useEffect(() => {
    //console.log(user.id)
  }, [])

  // swipe cancle
  useEffect(() => {
    viewport.current.addEventListener('touchstart', (e) => {
      if (e.pageX > 16 && e.pageX < window.innerWidth - 16) return;
      e.preventDefault();
    })
  }, [viewport])

  return (
    <div className="App" ref={viewport}>
      <div className='container'>
        {transitions((styles, item) => (
          <animated.div className={classNames('contents', location.pathname !== '/' && 'sub')} style={styles}>
            <Routes location={item}>
              {
                !user.id ?
                  <Route path="/" element={<Sign />} /> :
                  <>
                    <Route exact path="/" element={<Dashboard />} >
                      <Route path="" element={<DashboardList />} />
                    </Route>
                    <Route path=":id" element={<DashboardDetail />} />

                    <Route path="*" element={<NotFound />} />
                    <Route path="notify" element={<Notifycation />} />

                    <Route path="flight" element={<Flight />}>
                      <Route path="" element={<FlightList />} />
                      <Route path=":id" element={<FlightDetail />} />
                      <Route path=":id/edit" element={<FlightEdit />} />
                    </Route>

                    <Route path="defect" element={<Defect />}>
                      <Route path="" element={<DefectList />} />
                      <Route path=":id" element={<DefectDetail />} />
                    </Route>

                    <Route path="maintenance" element={<Maintenance />}>
                      <Route path="" element={<MaintenanceList />} />
                    </Route>

                    <Route path="extenal" element={<Extenal />}>
                      <Route path="" element={<ExtenalList />} />
                    </Route>

                    <Route path="order" element={<Order />}>
                      <Route path="" element={<OrderList />} />
                    </Route>

                    <Route path="schedule" element={<Schedule />}>
                      <Route path="" element={<ScheduleList />} />
                    </Route>

                    <Route path="tci" element={<Tci />}>
                      <Route path="" element={<TciList />} />
                    </Route>

                    <Route path="loc" element={<Loc />}>
                      <Route path="" element={<LocList />} />
                    </Route>
                  </>
              }
            </Routes>
          </animated.div>
        ))}

      </div>
    </div>
  );
}

export default App;

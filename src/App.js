/*
* @date         : 2022-11-01
* @description  : App routes & routes set
* @parameter    : none
*/

import './App.scss';
import classNames from 'classnames';
//context
import { userContext } from './context';

//util
import { isIOS, orientation } from './util';

//default library
import { useState, useEffect, useRef, useContext } from 'react';
import { useTransition, animated, easings } from 'react-spring';
import { useLocation, Routes, Route } from "react-router-dom";

//404
import NotFound from './page/404';

//Landing
import Landing from './page/landing';

//sign
import Sign from './page/sign';

//Notifycation
import Notifycation from './page/notify';

//dashboard
import Dashboard from './page/dashboard';
import DashboardList from './page/dashboard/list';
import DashboardItem from './page/dashboard/item';
import DashboardDetail from './page/dashboard/detail';
import DashboardTotal from './page/dashboard/total';


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
  const { user } = useContext(userContext);
  const authenticated = user != null;
  const viewport = useRef(null);
  /*
  * @description  : route transition
  * @parameter    : none
  */
  const location = useLocation();
  //const navigate = useNavigate();
  const [dimensions, setDimensions] = useState({ main: 0, body: 0 });
  const [duration] = useState(480)
  const [direction, setDirection] = useState(0);

  const transitions = useTransition(location, {
    from: { transform: direction < window.history.state.idx ? 'translate3d(100%,0,0)' : 'translate3d(-100%,0,0)' },
    enter: { transform: 'translate3d(0%,0,0)' },
    leave: { transform: direction < window.history.state.idx ? 'translate3d(-50%,0,0)' : 'translate3d(50%,0,0)' },
    config: {
      duration: authenticated ? duration : 0,
      easing: easings.easeInOutQuart,
    },
    onStart: () => {
      //setDuration(0)
    },
    onRest: () => {
      setDirection(window.history.state.idx);
      //setDuration(480)
      let timer = setTimeout(() => {
        setDimensions({
          main: viewport.current.children[0].children[0].clientHeight,
          body: viewport.current.children[0].children[0].lastChild.children[0].clientHeight
        })
      }, 120);
      return () => { clearTimeout(timer) }
    },
  })

  /*window.addEventListener('resize', function () {
    console.log(orientation)
  });
  return () => { clearTimeout(window.removeEventListener('resize')) }*/
  /*
  * @description  : default useEffect
  * @parameter    : none
  */
  /*useEffect(() => {
    authenticated && location.pathname === '/sign' && navigate('/dashboard', { replace: true })
  }, [authenticated, location, navigate])*/

  /*
  * @description  : web brouser left right swipe cancle
  * @parameter    : none
  */
  useEffect(() => {
    isIOS && viewport.current.addEventListener('touchstart', (e) => {
      if (e.pageX > 16 && e.pageX < window.innerWidth - 16) return;
      e.preventDefault();
    }, { passive: false })
    return () => {
      
    };
  }, [])

  /*
  * @description  : App routes
  * @parameter    : none
  */
  return (
    <div className="App" ref={viewport}>
      <div className='container'>
        {
          transitions((styles, item) => {
            return (
              <animated.div className={classNames('contents', dimensions.main < dimensions.body && 'sub')} style={styles}>
                <Routes location={item}>
                  <Route path="*" element={<NotFound />} />
                  {!authenticated ?
                    <Route path="sign" element={<Sign />} /> :
                    <>
                      <Route path="sign" element={<Landing />} />
                      <Route path="dashboard" element={<Dashboard replace />} >
                        <Route path="" element={<DashboardList />}>
                          <Route path="" element={<DashboardItem />} />
                        </Route>
                      </Route>
                      <Route path="dashboard/:id" element={<DashboardDetail />} />
                      <Route path="dashboard/total" element={<DashboardTotal />} />

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

                      <Route path="notify" element={<Notifycation />} />
                    </>
                  }
                </Routes>
              </animated.div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;

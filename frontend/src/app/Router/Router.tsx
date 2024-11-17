import CreateChannel from 'pages/CreateChannel';
import { Route, Routes } from 'react-router-dom';
import Homepage from '../../pages';
import CreateChannel2 from 'pages/CreateChannel2';

const AppRouter = () => {
   return (
      <>
         <Routes>
            <Route
               path='/'
               element={<Homepage />}
            />
            <Route
               path='/create-channel'
               element={<CreateChannel />}
            />
            <Route
               path='/create-channel2'
               element={<CreateChannel2 />}
            />
         </Routes>
      </>
   );
};

export default AppRouter;

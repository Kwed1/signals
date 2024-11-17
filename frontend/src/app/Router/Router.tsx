import { Route, Routes } from 'react-router-dom';
import Homepage from '../../pages';
import CreateChannel from 'pages/CreateChannel';

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
         </Routes>
      </>
   );
};

export default AppRouter;

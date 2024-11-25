import CreateChannel from 'pages/CreateChannel';
import { Route, Routes } from 'react-router-dom';
import Homepage from '../../pages';
import ChannelsList from 'pages/ChannelsList';
import Users from 'pages/Users';

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
               path='/channels'
               element={<ChannelsList />}
            />
            <Route
               path='/users'
                  element={<Users />}
            />
         </Routes>
      </>
   );
};

export default AppRouter;

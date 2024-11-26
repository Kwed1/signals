import CreateChannel from 'pages/CreateChannel';
import { Route, Routes } from 'react-router-dom';
import Homepage from '../../pages';
import ChannelsList from 'pages/ChannelsList';
import Users from 'pages/Users';
import UpdateChannel from 'pages/UpdateChannel';

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
               path='/update-channel'
               element={<UpdateChannel />}
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

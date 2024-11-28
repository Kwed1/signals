import ChannelsList from 'pages/ChannelsList'
import CreateChannel from 'pages/CreateChannel'
import SubscriptionPage from 'pages/Subscription'
import Users from 'pages/Users'
import { Route, Routes } from 'react-router-dom'
import Homepage from '../../pages'

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
            <Route
               path='/packages'
                  element={<SubscriptionPage />}
            />
         </Routes>
      </>
   );
};

export default AppRouter;

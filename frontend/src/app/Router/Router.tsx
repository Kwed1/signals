import ChannelsList from 'pages/ChannelsList'
import CreateChannel from 'pages/CreateChannel'
import SubscriptionPage from 'pages/Subscription'
import UpdateChannel from 'pages/UpdateChannel'
import Users from 'pages/Users'
import { Route, Routes } from 'react-router-dom'
import useUserStore from 'shared/store/useUserStore'
import Homepage from '../../pages'
import ProtectedRoute from './components/ProtectedRoute'

const AppRouter = () => {
   const { userData } = useUserStore();

   return (
      <>
         <Routes>
            <Route
               path='/'
               element={<Homepage />}
            />
            <Route
               path='/create-channel'
               element={
                  <ProtectedRoute isAllowed={userData?.is_admin as boolean}>
                     <CreateChannel />
                  </ProtectedRoute>
               }
            />
            <Route
               path='/update-channel'
               element={
                  <ProtectedRoute isAllowed={userData?.is_admin as boolean}>
                     <UpdateChannel />
                  </ProtectedRoute>
               }
            />
            <Route
               path='/channels'
               element={
                  <ProtectedRoute isAllowed={userData?.is_admin as boolean}>
                     <ChannelsList />
                  </ProtectedRoute>
               }
            />
            <Route
               path='/users'
               element={
                  <ProtectedRoute isAllowed={userData?.is_admin as boolean}>
                     <Users />
                  </ProtectedRoute>
               }
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

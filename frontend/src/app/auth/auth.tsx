import axios from 'axios'
import useTokenStore from 'shared/store/useTokenStore'
import { useTelegram } from '../../shared/hooks/useTelegram'
import { authTokenInt, JwtDecode } from './types/auth'
import useUserStore from 'shared/store/useUserStore';
import { jwtDecode } from 'jwt-decode';

export const useSignIn = () => {
   const { user, userId } = useTelegram();
   const {setToken} = useTokenStore();
   const {setUserData} = useUserStore();

   const signIn = async () => {
      const res = await axios<authTokenInt>(
         'https://signalapi.devmainops.store/auth/sign-in/',
         {
            method: 'POST',
            data: {
               user_id: userId,
               username: user,
            },
         },
      );
      if (res && res?.data?.token) {
         setToken(res?.data?.token);
         setUserData(jwtDecode<JwtDecode>(res.data.token));
      }
   };

   return { signIn };
};

import axios from 'axios'
import useTokenStore from 'shared/store/useTokenStore'
import { useTelegram } from '../../shared/hooks/useTelegram'
import { authTokenInt } from './types/auth'

export const useSignIn = () => {
   const { user, userId } = useTelegram();
   const {setToken} = useTokenStore()

   const signIn = async () => {
      const res = await axios<authTokenInt>(
         'http://95.169.201.222:8003/auth/sign-in/',
         {
            method: 'POST',
            data: {
               user_id: userId,
               username: user,
            },
         },
      );
      if (res && res?.data?.token) setToken(res?.data?.token)
   };

   return { signIn };
};

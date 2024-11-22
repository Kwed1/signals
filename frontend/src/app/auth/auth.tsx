import axios from 'axios';
import { useTelegram } from '../../shared/hooks/useTelegram';
import { authTokenInt } from './types/auth';

export const useSignIn = () => {
   const { user, userId } = useTelegram();

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
      const data = {
         token: res?.data?.token,
      };
      return data;
   };

   return { signIn };
};

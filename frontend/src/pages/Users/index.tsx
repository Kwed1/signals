import cancelIcon from 'assets/icons/cancel-icon.png';
import okeyIcon from 'assets/icons/okey-icon.png';
import styles from './Users.module.scss';
import AdminNav from 'shared/ui/AdminNav/AdminNav';
import { useEffect } from 'react';
import useTokenStore from 'shared/store/useTokenStore';
import useApi from 'shared/utils/ApiResponseHandler';
import { User } from 'shared/types';
import useUsersStore from 'shared/store/useUsersStore';

export default function Users() {
   
   const {users, setUsers} = useUsersStore();
   const {getToken} = useTokenStore();
   let _accessToken = getToken();

   const api = useApi();

   const fetchUsers = async() => {
      const res = await api<User[]>({url: '/user/', method: 'GET'});
      if(res) {
         setUsers(res);
      }
   }

   useEffect(() => {
      if(users.length > 0) return;
      if(_accessToken) {
         fetchUsers();
      }
   }, [_accessToken])

   return (
      <>
         <div className={styles.Users}>
            <p className={styles.pageHeading}>Users</p>
            <table>
               <thead>
                  <tr>
                     <th>Name</th>
                     <th>Sub date</th>
                     <th>Subs</th>
                  </tr>
               </thead>
               <tbody>
                  {users?.map((user, index) => (
                     <tr key={index}>
                        <td>{user.username}</td>
                        <td>{user.end_at.split('T')[0]}</td>
                        <td>
                           {user.subscription !== null ? (
                              <img
                                 src={okeyIcon}
                                 alt=''
                              />
                           ) : (
                              <img
                                 src={cancelIcon}
                                 alt=''
                              />
                           )}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         <AdminNav/>
      </>
   );
}

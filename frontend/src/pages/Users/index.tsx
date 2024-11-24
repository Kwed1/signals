import cancelIcon from 'assets/icons/cancel-icon.png';
import okeyIcon from 'assets/icons/okey-icon.png';
import styles from './Users.module.scss';

export default function Users() {
   const users = [
      { name: 'Morgan Martinez', subDate: '2024-10-21', isActive: true },
      { name: 'Morgan Martinez', subDate: '2024-10-21', isActive: false },
      { name: 'Morgan Martinez', subDate: '2024-10-21', isActive: true },
      { name: 'Morgan Martinez', subDate: '2024-10-21', isActive: false },
      { name: 'Morgan Martinez', subDate: '2024-10-21', isActive: true },
      { name: 'Morgan Martinez', subDate: '2024-10-21', isActive: false },
   ];

   return (
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
               {users.map((user, index) => (
                  <tr key={index}>
                     <td>{user.name}</td>
                     <td>{user.subDate}</td>
                     <td>
                        {user.isActive ? (
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
   );
}

import PageHeading from 'shared/ui/PageHeading/PageHeading';
import styles from './Users.module.scss';
import cancelIcon from 'assets/icons/cancel-icon.png';
import okeyIcon from 'assets/icons/okey-icon.png';

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
         <PageHeading text='Users' />
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
                        {
                            user.isActive ? (
                                <img src={okeyIcon} alt="" />
                            ) : (
                                <img src={cancelIcon} alt="" />
                            )
                        }
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}

import useUserStore from 'shared/store/useUserStore';
import styles from './Profile.module.scss';

export default function Profile() {
   const { userData } = useUserStore();

   return (
      <div className={styles.profile}>
         <div className={styles.avatar}></div>
         <p className={styles.nickname}>{userData && userData.sub}</p>
      </div>
   );
}

import useUserStore from 'shared/store/useUserStore';
import styles from './Profile.module.scss';

export default function Profile() {
   const { userData, userAvatar } = useUserStore();

   return (
      <div className={styles.profile}>
         <p className={styles.nickname}>{userData && userData.sub}</p>
         <div className={styles.avatar}>
            {userAvatar && <img width={'100%'} height={'100%'} src={userAvatar} alt="" loading='lazy'/>}
         </div>
      </div>
   );
}

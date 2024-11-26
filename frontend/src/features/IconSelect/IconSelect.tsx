import useChannelsStore from 'shared/store/useChannelsStore';
import Icon from 'shared/ui/Icon/Icon';
import styles from './IconSelect.module.scss';
import { icons } from './data';
import useModalsStore from 'shared/store/useModalsStore';

export default function IconSelect() {
   const { selectedIcon, setSelectedIcon } = useChannelsStore();
   const {setIconModalOpen} = useModalsStore();

   return (
      <div className={styles.overlay} onClick={() => setIconModalOpen(false)}>
         <div className={styles.modal}>
            <div className={styles.container}>
                {icons.map(icon => (
                   <div
                      className={`${styles.iconWrapper} ${selectedIcon === icon ? styles.selected : ''}`}
                      onClick={() => {
                        setSelectedIcon(icon);
                        setIconModalOpen(false)
                      }}
                   >
                      <Icon
                         className={styles.icon}
                         id={icon}
                         lineColor={selectedIcon === icon ? '#FFCC00' : '#fff'}
                      />
                   </div>
                ))}
            </div>
         </div>
      </div>
   );
}

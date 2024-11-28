import useChannelsStore from 'shared/store/useChannelsStore';
import Icon from 'shared/ui/Icon/Icon';
import styles from './IconSelect.module.scss';
import { icons } from './data';
import useModalsStore from 'shared/store/useModalsStore';

interface IconSelectProps {
    onIconChange: (icon: string) => void;
}

export default function IconSelect({onIconChange}: IconSelectProps) {
   const { setIconSelected, selectedChannel } = useChannelsStore();
   const {setIconModalOpen} = useModalsStore();

   return (
      <div className={styles.overlay} onClick={() => setIconModalOpen(false)}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.container}>
                {icons.map(icon => (
                   <div
                      className={`${styles.iconWrapper} ${selectedChannel?.icon_type === icon ? styles.selected : ''}`}
                      onClick={() => {
                        setIconSelected(icon);
                        setIconModalOpen(false)
                        onIconChange(icon);
                      }}
                   >
                      <Icon
                         className={styles.icon}
                         id={icon}
                         lineColor={selectedChannel?.icon_type === icon ? '#FFCC00' : '#fff'}
                      />
                   </div>
                ))}
            </div>
         </div>
      </div>
   );
}

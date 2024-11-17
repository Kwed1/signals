import PageHeading from 'shared/ui/PageHeading/PageHeading';
import styles from './ChannelsList.module.scss';
import Search from 'entities/Search/Search';
import ChannelCard from 'entities/ChannelCard/ChannelCard';

export default function ChannelsList() {
    return (
        <div className={styles.ChannelsList}>
            <PageHeading text='Channel'/>
            <Search/>
            <div className={styles.list}>
                <ChannelCard/>
                <ChannelCard/>
                <ChannelCard/>
                <ChannelCard/>
                <ChannelCard/>
                <ChannelCard/>
                <ChannelCard/>
                <ChannelCard/>
            </div>
        </div>
    )
}
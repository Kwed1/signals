import PageHeading from 'shared/ui/PageHeading/PageHeading';
import styles from './ChannelsList.module.scss';
import Search from 'entities/Search/Search';
import ChannelCard from 'entities/ChannelCard/ChannelCard';
import useModalsStore from 'shared/store/useModalsStore';
import ChoiceModal from 'features/ChoiceModal/ChoiceModal';

export default function ChannelsList() {

    const {choiceModalOpen} = useModalsStore();

    return (
        <>
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
            {choiceModalOpen && <ChoiceModal/>}
        </>
    )
}
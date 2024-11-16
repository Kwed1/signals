import styles from './Search.module.scss';
import seachIcon from 'assets/icons/search.svg';

export default function Search() {
    return (
        <div className={styles.search}>
            <img width={20} height={20} src={seachIcon} alt="" />
            <input className={styles.input} type="text" placeholder='Search...'/>
        </div>
    )
}
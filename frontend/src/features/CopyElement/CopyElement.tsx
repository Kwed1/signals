import styles from './CopyElement.module.scss';
import documentIcon from 'assets/icons/document.svg';

interface CopyElementProps {
    name: string;
    text: string;
}

export default function CopyElement({name, text}: CopyElementProps) {
    return (
        <div className={styles.element}>
            <p className={styles.name}>{name}</p>
            <div className={styles.wrapper}>
                <div>
                    <p className={styles.text}>{text}</p>
                    <img width={24} height={24} src={documentIcon} alt="" />
                </div>
            </div>
        </div>
    )
}
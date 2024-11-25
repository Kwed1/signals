import styles from './CopyElement.module.scss';
import documentIcon from 'assets/icons/document.svg';

interface CopyElementProps {
    name: string;
    text: string;
    value: string | number;
    onValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CopyElement({name, text, value, onValueChange}: CopyElementProps) {
    return (
        <div className={styles.element}>
            <p className={styles.name}>{name}</p>
            <div className={styles.wrapper}>
                <div>
                    <input className={styles.text} value={value} onChange={onValueChange} placeholder={`Example: ${text}`}/>
                    <img width={24} height={24} src={documentIcon} alt="" />
                </div>
            </div>
        </div>
    )
}
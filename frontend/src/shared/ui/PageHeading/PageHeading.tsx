import styles from './PageHeading.module.scss';

interface PageHeadingProps {
    text: string;
}

export default function PageHeading({text}: PageHeadingProps) {
    return <h3 className={styles.heading}>{text}</h3>
}
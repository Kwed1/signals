import { Direction } from 'shared/types';
import styles from './Switch.module.scss';
import { Dispatch, SetStateAction, useEffect } from 'react';

interface SwitchProps {
    direction: Direction;
    setDirection: Dispatch<SetStateAction<Direction>>;
}

export default function Switch({direction, setDirection}: SwitchProps) {

    useEffect(() => {
        console.log(direction)
    }, [direction])

    return (
        <label className={styles.switch}>
            <input type="checkbox" checked={direction === Direction.SHORT ? true : false} onClick={() => setDirection(direction === Direction.SHORT ? Direction.LONG : Direction.SHORT)}/>
            <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
    )
}
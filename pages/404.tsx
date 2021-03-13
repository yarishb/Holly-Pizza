import Pizza from '../components/PizzaRotate/Pizza';
import styles from '../styles/404.module.scss';
import {useRef} from 'react';

export default function undefinedPage() {
    const ref = useRef()

    return (
        <>
            <div className={styles.full}>
                <div className={styles.main}>
                    <div className={styles.main__number}>4</div>
                    <Pizza pizzaRef={ref} style={{position: "relative", marginLeft: 0}}/>
                    <div className={styles.main__number}>4</div>
                </div>
            </div>
        </>
    )
}

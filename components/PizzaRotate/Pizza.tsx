import styles from './pizza.module.scss';

export default function Pizza({pizzaRef=undefined, style=null}) {
    return (
        <>
            <div className={styles.pizza}>
                <div ref={pizzaRef} className={styles.pizza__img} style={style}/>
            </div>
        </>
    )
}

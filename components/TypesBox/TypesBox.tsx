import styles from "../../styles/adminNewPizza.module.scss";

export default function TypesBox({remove=false, fields, removeCategory=null}) {
    return (
        <div className={styles.form__categoryBox}>
            <div className={styles.form__categoryBox__categoryField}>Категорії:</div>
            <div className={styles.form__categories}>
                {
                    fields.map((data: string, idx: number) =>
                        <>
                            <div key={idx} className={`${styles.form__categories__category} ${styles.boxShadow}`}>
                                {remove && <div onClick={() => removeCategory(data)} className={styles.form__categories__categoryDelete}>x</div>}
                                {data}
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}
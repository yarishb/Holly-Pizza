import Axios from "axios";
import {Fields} from "../../../interfaces/newPizza";
import {useEffect, useState} from "react";
import styles from "../../../styles/pizza.module.scss";

import {useRouter} from "next/router";
import {NextPageContext} from "next";
import Image from "next/image";
import Head from "next/head";
import Back from "../../../components/Back/Back";
import TypesBox from "../../../components/TypesBox/TypesBox";

interface PizzaNextPageProps extends NextPageContext {
    query: {
        id: string
    }
}


export default function Pizza({pizzaResData}) {
    const [pizzaData, setPizzaData] = useState<Fields>()

    useEffect(() => {
        setPizzaData(pizzaResData)
    }, [pizzaResData])

    if (pizzaData) {
        return (
            <>
                <Head>
                    <title>Admin Pizza | {pizzaData.name}</title>
                </Head>
                <Back />
                <div className={styles.pizzaPage}>
                    <Image src={`${pizzaData.image}`}  width="500" height="450" />
                    <div className={styles.pizzaPage__info}>
                        <div className={styles.pizzaPage__info__top}>
                            <div className={styles.pizzaPage__info__top__name}>
                                {pizzaData.name}
                            </div>
                            <div className={styles.pizzaPage__info__top__buttons}>
                                <div className={styles.pizzaPage__info__top__button}>
                                    &#127;
                                </div>
                                <div className={styles.pizzaPage__info__top__button}></div>
                            </div>
                        </div>
                        <div className={styles.pizzaPage__info__desc}>
                            {pizzaData.description}
                        </div>
                        <div className={styles.pizzaPage__info__includes}>
                            <div>
                                <div className={styles.pizzaPage__info__includes__title}>
                                    жири / 100г
                                </div>
                                <div className={styles.pizzaPage__info__includes__item}>
                                    {pizzaData.fat} г
                                </div>
                            </div>
                            <div>
                                <div className={styles.pizzaPage__info__includes__title}>
                                    білки / 100г
                                </div>
                                <div className={styles.pizzaPage__info__includes__item}>
                                    {pizzaData.protein} г
                                </div>
                            </div>
                            <div>
                                <div className={styles.pizzaPage__info__includes__title}>
                                    вугл. / 100г
                                </div>
                                <div className={styles.pizzaPage__info__includes__item}>
                                    {pizzaData.carbohydrates} г
                                </div>
                            </div>
                            <div>
                                <div className={styles.pizzaPage__info__includes__title}>
                                    вага
                                </div>
                                <div className={styles.pizzaPage__info__includes__item}>
                                    {pizzaData.weight} г
                                </div>
                            </div>
                        </div>
                        <div className={styles.pizzaPage__info__size}>
                            <div className={styles.pizzaPage__info__size__sizeTitle}>Розмір: </div>
                            <div className={styles.pizzaPage__info__size__sizeItem}>
                                {pizzaData.size === 'medium' ? "Середня" : pizzaData.size === 'small' ? "Мала" : "Велика"}
                            </div>
                        </div>
                        <div className={styles.pizzaPage__info__orders}>
                            <div className={styles.pizzaPage__info__size__sizeTitle}> Замовлень:</div>
                            <div className={styles.pizzaPage__info__size__sizeItem}>{pizzaData.orders}</div>
                        </div>
                        <div className={styles.pizzaPage__info__typeBox}>
                            <TypesBox fields={pizzaData.category} remove={false} removeCategory={null}/>
                            </div>
                        <div className={styles.pizzaPage__info__price}>
                            {pizzaData.price} грн
                        </div> 
                    </div>
                </div>
            </>
        )
    }

    return (
        <></>
    )
}

Pizza.getInitialProps = async({query}: PizzaNextPageProps) => {
    const body = {"id": query.id, "name": ''}
    
    const resData = await Axios.post(`${process.env.API_URL}/pizzas/getPizza`, body)
    const pizzaResData: Fields = resData.data[0]

    return {
        pizzaResData
    }
}

import {useEffect, useState} from 'react';
import Axios from 'axios';
import {Fields, PizzasRes} from '../../../interfaces/newPizza';
import AdminSearch from '../AdminSearcher/AdminSearch';
import styles from './adminPizza.module.scss';
import Link from "next/link";
import Image from 'next/image'
import {ErrorInterface, ErrorResponse} from "../../../interfaces/error";
import Error from '../../Error/Error'

interface FindPizza {
    pizzaName: string,
    pizzaId: string
}

export default function AdminPizza() {
    const [data, setData] = useState<Fields[]>()
    const [findPizza, setFindPizza] = useState<FindPizza>({
        pizzaName: '',
        pizzaId: ''
    })
    const [error, setError] = useState<ErrorInterface>({
        text: '',
        status: 0,
        open: false
    })

    const setErrorHandler = (msg: string, status: number) => {
        setError({
            open: true,
            text: msg,
            status: status
        })
    }

    useEffect(() => {
        Axios.post(`${process.env.API_URL}/pizzas`).then((data: PizzasRes) => {
            setData(data.data.reverse())
        })
    }, [])


    const findPizzaInputHandler = (e) => {
        e.preventDefault()
        const value: string = e.target.value

        setFindPizza({
            ...findPizza,
            [e.target.name]: value
        })
    }

    const submit = async(e) => {
        e.preventDefault()
        if  (findPizza.pizzaName !== '' || findPizza.pizzaId !== '') {
            try {
                const body = {"id": findPizza.pizzaId, "name": findPizza.pizzaName}
                const data: PizzasRes = await Axios.post(`${process.env.API_URL}/pizzas/getPizza`, body)
                data && setData(data.data.reverse())
            } catch (err) {
                const errResData: ErrorResponse = err.response.data
                setErrorHandler(errResData.msg, errResData.status)
            }
        } else {
            setErrorHandler('Введіть поля пошуку', 400)
        }
    }


    return (
        <>
            <Error status={error.status} text={error.text} open={error.open}/>
            <AdminSearch
                firstInputData={{
                    placeholder: "Знайти піцу за назвою", 
                    name: "pizzaName", 
                    value: findPizza.pizzaName, 
                    searchInputHandler: findPizzaInputHandler
                }} 

                secondInputData={{
                    placeholder: "Знайти піцу за id",
                    name: "pizzaId",
                    value: findPizza.pizzaId,
                    searchInputHandler: findPizzaInputHandler
                }}

                submit={submit}
            />
            <Link href={'/admin/newPizza'}><button className={styles.addPizza}>Нова піца</button></Link>
            <div className={styles.pizzas}>
                {data && data.map((pizza: Fields, idx: number) => {
                    return (
                        <div className={styles.pizzas__pizzaEl} key={idx}>
                            <Image className={styles.pizzas__pizzaEl__pizzaImage} src={`${pizza.image}`}  width="230" height="230" />
                            <div className={styles.pizzas__pizzaEl__name}>{pizza.name}</div>
                            <div className={styles.pizzas__pizzaEl__description}>{pizza.description}</div>
                            <div className={styles.categories}>
                                {typeof pizza.category === "object" &&
                                    pizza.category.map((category: string, idx:number) => {
                                        return (
                                            <div key={idx} className={styles.categories__category}>{category}</div>
                                        )
                                })}
                            </div>
                            <div className={styles.pizzas__pizzaEl__bottom}>
                                <div className={styles.pizzas__pizzaEl__bottom__priceAndWeight}>
                                    <div className={styles.pizzas__pizzaEl__bottom__priceAndWeight__weight}>{pizza.weight} г</div>
                                    <div className={styles.pizzas__pizzaEl__bottom__priceAndWeight__price}>{pizza.price} ₴</div>
                                </div>
                                <Link href={`/admin/pizza/[id]`} as={`/admin/pizza/${pizza.id}`}><button className={styles.pizzas__pizzaEl__bottom__more}>Редагувати</button></Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

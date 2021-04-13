import {useEffect, useState} from 'react';
import Axios from 'axios';
import {Fields, PizzasRes} from '../../../interfaces/newPizza';
import AdminSearch from '../AdminSearcher/AdminSearch';
import styles from './adminPizza.module.scss';
import Link from "next/link";
import Image from 'next/image'
import {ErrorInterface, ErrorResponse} from "../../../interfaces/error";
import Error from '../../Error/Error'
import PizzaCard from '../../PizzaCard/PizzaCard';


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
        Axios.get(`${process.env.API_URL}/pizzas`).then((data: PizzasRes) => {
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
                        <PizzaCard pizza={pizza} idx={pizza.id} buttonType={'change'}/>
                    )
                })}
            </div>
        </>
    )
}

import {useEffect, useState} from 'react';
import Axios from 'axios';
import {Fields, PizzasRes} from '../../../interfaces/newPizza';
import AdminSearch from '../AdminSearcher/AdminSearch';
import styles from './adminPizza.module.scss';
import Link from "next/link";
import Image from 'next/image'

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
    
    useEffect(() => {
        Axios.post(`${process.env.API_URL}/pizzas`).then((data: PizzasRes) => {
            setData(data.data)   
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

    const submit = (e) => {
        e.preventDefault()

        try {
            const body = {"id": findPizza.pizzaId, "name": findPizza.pizzaName}
            Axios.post(`${process.env.API_URL}/pizzas/getPizza`, body).then((data: PizzasRes) => {
                setData(data.data)
            })
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div>
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
            <div>
                {data && <Image src={`${data[data.length-1].image}`}  width="500" height="500" />}
            </div>
            <Link href={'/admin/newPizza'}><button className={styles.addPizza}>Нова піца</button></Link>
        </div>
    )
}

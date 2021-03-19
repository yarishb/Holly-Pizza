import Axios from "axios";
import {Fields} from "../../../interfaces/newPizza";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {NextPageContext} from "next";

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


    return (
        <div>
            {pizzaData.name}
        </div>

    )
}

Pizza.getInitialProps = async({query, req}: PizzaNextPageProps) => {
    if (!req) {
        return {
            pizzaResData: null
        }
    }
    const body = {"id": query.id, "name": ''}
    const resData = await Axios.post(`${process.env.API_URL}/pizzas/getPizza`, body)
    const pizzaResData: Fields = resData.data[0]
    return {
        pizzaResData
    }
}

import React, { useState, useEffect } from "react"
import styles from "./TopSalesCorousel.module.scss"
import Axios from "axios"
import { PizzaFields, PizzasRes } from "../../interfaces/newPizza"
import PizzaCard from "../PizzaCard/PizzaCard"

export default function TopSalesCorousel() {
	const [pizzas, setPizzas] = useState<PizzaFields[]>([])
	const [index, setIndex] = useState<number>(1)

	useEffect(() => {
		const pizzasReq = Axios.post(`${process.env.API_URL}/pizzas/`)
		pizzasReq.then((res: PizzasRes) => {
			;(async () => {
				const filtered: Array<PizzaFields> | any = await filterAllWithCategory(
					res.data,
					"Топ продаж",
					pizzas
				)

				setPizzas(filtered)
			})()
		})
	}, [])

	const showPizzaWithIndex = idx => {
		if (pizzas[idx]) {
			return (
				<PizzaCard pizza={pizzas[idx]} idx={pizzas[idx].id} buttonType={"change"} />
			)
		}
	}

	return (
		<>
			<div className={styles.header}>Топ продаж</div>
			<div className={styles.pizzas}>
				{showPizzaWithIndex(index - 1)}
				{showPizzaWithIndex(index)}
				{showPizzaWithIndex(index + 1)}
			</div>
		</>
	)
}

const filterAllWithCategory = (data, category, pizzas) => {
	return new Promise(resolve => {
		const res: PizzaFields[] = []
		for (let i = 0, max = data.length; i <= max; i++) {
			const current: PizzaFields = data[i]
			if (current) {
				current.categories.forEach(el => {
					if (el === category && !pizzas.includes(current)) {
						res.push(current)
					}
				})
			}
		}

		resolve(res)
	})
}

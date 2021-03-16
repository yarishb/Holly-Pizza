import {Fields} from "../interfaces/newPizza";

interface createPizzaReturn {
    status: boolean,
    message: string
}

class Checker {
     public createPizzaChecker(image, newPizza: Fields): createPizzaReturn  {
        const { name, description, price, categories, carbohydrates, protein, fat, weight } = newPizza
        
        if (!image) return {status: false, message: "Загрузіть фото піци."}
        if (!name) return {status: false,message: "Введіть назву піци."}
        if (!description) return {status: false, message: "Введіть опис піци."}
        if (!price) return {status: false, message: "Введіть ціну піци."}
        if (!categories) return {status: false, message: "Введіть категорії піци."}
        if (!weight) return {status: false, message: "Введіть вагу піци."}
        if (!protein) return {status: false, message: "Введіть кількість білків на 100г піци."}
        if (!fat) return {status: false, message: "Введіть кількість жирів на 100г піци."}
        if (!carbohydrates) return {status: false, message: "Введіть кількість вуглеводів на 100г піци."}


        return {status: true, message: "All the fields are entered"}
    }

    public passwordChecker(password: string, passwordCheck: string): string {
        let msg = ''
        const letterRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])");
        const numericRegex = new RegExp("(?=.*[0-9])");


        if (password.length < 7) msg = "Пароль повинен містити якнайменш 7 знаків.";

        if (letterRegex.test(password) == false) msg = "Пароль повинен містити великі та малі букви.";

        if (numericRegex.test(password) === false) msg = "Пароль повинен містити числа.";

        if (password !== passwordCheck) msg = "Паролі не співпадають.";

        return msg
    }

}


export default Checker
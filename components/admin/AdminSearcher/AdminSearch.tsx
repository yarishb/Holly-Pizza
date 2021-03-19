import Button from '../../Button/Button';
import Input from '../../Input/Input';
import styles from './AdminSearch.module.scss';

interface InputData {
    placeholder: string,
    name: string,
    value: string,
    searchInputHandler: any
}

interface DataIn {
    firstInputData: InputData,
    secondInputData: InputData,
    submit: any
}

export default function AdminSearch({firstInputData, secondInputData, submit}: DataIn) {
    return (
        <>
            <div className={styles.adminSearch}>
                <form onSubmit={(e) => submit(e)} className={styles.adminSearch__form}>
                    <Input 
                        placeholder={firstInputData.placeholder} 
                        name={firstInputData.name} 
                        value={firstInputData.value} 
                        onChange={firstInputData.searchInputHandler} 
                        type={'text'}
                    />
                    <Input 
                        placeholder={secondInputData.placeholder} 
                        name={secondInputData.name} 
                        value={secondInputData.value} 
                        onChange={secondInputData.searchInputHandler} 
                        type={'text'}
                    />
                    <button type={'submit'} className={styles.adminSearch__form__submit}>Знайти</button>
                </form>
            </div>  
        </>
    )
}

import { InputHTMLAttributes, TextareaHTMLAttributes } from "react"
import styles from "./styles.module.scss"

// aqui nós definimos o tipo do input props para passarmos para os
// atributos que vamos receber no componente
interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}

// mesma função da classe acima porem para o TextArea
interface TextAreaProps extends TextareaHTMLAttributes<HTMLInputElement>{}


export function Input({...rest}:InputProps){
    return(
        <input className={styles.input} {...rest}/>
    )
}

export function TextArea({...rest}:TextAreaProps){
    return(
        <textarea className={styles.input} {...rest}></textarea>
    )
}
import Head from "next/head"
import { Header } from "../../components/Header"
import styles from "./styles.module.scss"

export default function Category() {
    return (
        <>
            <Head>
                <title>Nova Categoria - Sujeito Pizzaria</title>
            </Head>

            <div>
                <Header/>

                <main className={styles.container}>
                    <h1>Cadastrar Categorias</h1>

                    <form className={styles.form}>
                        <input 
                            type="text"
                            placeholder="Digite o Nome da Categoria" 
                            className={styles.input}
                        />

                        <button
                            className={styles.buttonAdd} 
                            type="submit"
                        >
                            Cadastrar
                        </button>
                    </form>
                </main>
            </div>
        </>

    )
}
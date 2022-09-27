import Head from "next/head"
import Image from "next/image"
import styles from "../../../styles/home.module.scss"

import logoImg from "../../../public/logo.svg"

import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"

import Link from "next/link"
import { UseAuth } from "../../contexts/AuthContext"
import { FormEvent, useState } from "react"
import { toast } from "react-toastify"

export default function SignUp() {

    const { signUp } = UseAuth()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSignUp(event: FormEvent){
        event.preventDefault()

        if(name === '' || password === '' || email=== ''){
            toast.warn("Preencha direito  🙄")
            return
        }

        const data = { name, email, password }
        setLoading(true)
        await signUp(data)
        setLoading(false)
    }

    return (
        <>
            <Head>
                <title>Faça Seu Cadastro Agora</title>
            </Head>

            <div className={styles.conatinerCenter}>
                <Image src={logoImg} />

                <div className={styles.login}>
                    <h1>Criando sua conta</h1>

                    <form onSubmit={handleSignUp}>
                        <Input
                            placeholder="Digite Seu Nome"
                            type="text"
                            value={name}
                            onChange={ e => setName(e.target.value)}
                        />
                        <Input
                            placeholder="Digite Seu E-mail"
                            type="text"
                            value={email}
                            onChange={ e => setEmail(e.target.value)}
                        />
                        <Input
                            placeholder="Digite Sua Senha"
                            type="password"
                            value={password}
                            onChange={ e => setPassword(e.target.value)}
                        />

                        <Button
                            loading={loading}
                            type="submit"
                        >
                            Cadastrar
                        </Button>
                    </form>

                    <Link href="/">
                        <a className={styles.text}>Já possui uma conta? Faça Login</a>
                    </Link>
                </div>
            </div>
        </>
    )
}

import Head from "next/head"
import Image from "next/image"
import { FormEvent, useState } from 'react'
import Link from "next/link"
import { toast } from "react-toastify"

import logoImg from "../../public/logo.svg"

import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"


import { UseAuth } from "../contexts/AuthContext"
import styles from "../../styles/home.module.scss"
import { canSSRGuest } from "../utils/canSSRGuest"


export default function Home() {

	const { signIn } = UseAuth()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [loading, setLoading] = useState(false)

	async function handleLogin(event: FormEvent){
		event.preventDefault()

		if(email === '' || password === ''){
			toast.warn("Preencha direito 🙄")
			return
		}

		let data = {
			email,
			password
		}

		setLoading(true) // apenas para fazer a animação de login.
		await signIn(data)
		setLoading(false)
	}

	return (
		<>
			<Head>
				<title>Sujieto Pizza - Faça seu login</title>
			</Head>

			<div className={styles.conatinerCenter}>
				<Image src={logoImg} />

				<div className={styles.login}>
					<form onSubmit={handleLogin}>
						<Input
							placeholder="Digite Seu E-mail"
							type="text"
							value={email}
							onChange={(e)=> setEmail(e.target.value)}
						/>
						<Input
							placeholder="Digite Sua Senha"
							type="password"
							value={password}
							onChange={(e)=> setPassword(e.target.value)}
						/>

						<Button
							loading={loading}
							type="submit"
						>
							Acessar
						</Button>
					</form>

					<Link href="/signup">
						<a className={styles.text}>Não possui uma conta? Cadastre-Se!</a>
					</Link>
				</div>
			</div>
		</>
	)
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
	return{
		props:{}
	}
})
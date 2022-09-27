import { createContext, ReactNode, useState, useEffect, useContext } from 'react'
import { destroyCookie, setCookie, parseCookies } from "nookies"
import Router from 'next/router';
import { api } from "../services/apiClient"
import { toast } from 'react-toastify'


type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type SignUpProps = {
    name: string
    email: string
    password: string
}

type AuthContextData = {
    user: UserProps | undefined;
    isAutheticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>
    signOut: () => void
    signUp: (credentials: SignUpProps) => Promise<void>
}

type AuthProviderProps = {
    children: ReactNode
}


export const AuthContext = createContext<AuthContextData>({} as AuthContextData)


export function signOut() {
    try {
        destroyCookie(undefined, "@nextauth.token")
        Router.push('/')
    } catch (err) {
        console.log(err)
    }
}


export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserProps>()
    const isAutheticated = !!user // dois pontos de !! convertem um objeot para booleano

    useEffect(() => {


        // tentar pegar algo no cookie

        const { '@nextauth.token': token } = parseCookies()

        if(token){
            api.get('me').then( response => {
                const { id, name, email } = response.data

                setUser({ id, name, email })
            })
            .catch(() =>{
                // se der erro deslogamos o user

                signOut()
            })
        }

    }, [])

    async function signIn({ email, password }: SignInProps) {
        try {
            const response = await api.post("/session", {
                email,
                password
            })


            // console.log(response.data);

            const { id, name, token } = response.data

            setCookie(undefined, "@nextauth.token", token, {
                maxAge: 60 * 60 * 24 * 30,
                //quais caminhos terão acesso ao cookie dexando barra todos terão acesso 
                path: "/",
            })

            setUser({
                id,
                name,
                email
            })

            // Passar para as proximasrequisições o nosso token.
            // @ts-ignore
            api.defaults.headers["Authorization"] = `Bearer ${token}`

            toast.success("Bem-vindo Ao Sujeito-Pizza 😋")

            Router.push("/dashboard")

        } catch (err) {
            toast.error("Foi mal, não foi possivel entrar 😢")
        }
    }

    async function signUp({ email, name, password }: SignUpProps) {
        try {

            const response = await api.post("/users", {
                name,
                email,
                password
            })

            console.log("Dados cadastrados -> ", response);

            Router.push('/')
            toast.success("Obaaa mais um novo integrante 😍")

        } catch (err) {
            console.log(err);
            toast.error("Muito Provavelmente essa conta já existe 🤦‍♂️")
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAutheticated, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}

export function UseAuth() {

    const context = useContext(AuthContext)

    return context
}
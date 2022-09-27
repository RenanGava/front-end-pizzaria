import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { parseCookies, destroyCookie } from 'nookies'
import { AuthTokenError } from "../services/errors/AuthTokenError"

// função para páginas apenas user logas para ter acesso
export function canSSRAuth<P>(fn: GetServerSideProps<P>){
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> =>{
        const cookies = parseCookies(ctx)

        const token = cookies['@nextauth.token']

        if (!token) {
            return {
                redirect: {
                    destination: "/",
                    permanent: false
                }
            }
        }

        // lembrando que só passamos o contexto para esses métodos e funções por que
        // estamos no servidor do next para recebermos e manipularmos o 
        // token e os parametro recebidos por ele.
        try {
            return await fn(ctx)
        }
        catch (err) {
            if (err instanceof AuthTokenError) {
                destroyCookie(ctx, "@nextauth.token")

                return {
                    redirect: {
                        destination: '/',
                        permanent: false
                    }
                }
            }
        }

    }
}
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { parseCookies } from 'nookies'

// função para paginas que serão acessadas por visitantes.
//@ts-ignore
export function canSSRGuest<P>(fn:GetServerSideProps<P>){
    return async (ctx: GetServerSidePropsContext):Promise<GetServerSidePropsResult<P>> =>{

        const cookies = parseCookies(ctx)
        // se tentar acessar a página tendo um login salvo vamos redirecionar ele
        // para outra página.
        if(cookies["@nextauth.token"]){
            return {
                redirect:{
                    destination: "/dashboard",
                    // esse paramentro é para dizer que nào é sempre que vai acontercer
                    permanent: false 
                }
            }
        }
        
        return await fn(ctx)
    }
}
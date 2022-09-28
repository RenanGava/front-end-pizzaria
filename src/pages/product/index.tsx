import styles from './styles.module.scss';
import Head from 'next/head';
import { Header } from '../../components/Header';
import { canSSRAuth } from '../../utils/canSSRAuth';
import { FiUpload } from "react-icons/fi"
import { useState, ChangeEvent, FormEvent } from 'react';
import { setupAPIClient } from '../../services/api';
import { toast } from 'react-toastify';


type ItemProps = {
    id: String
    name: String
}

interface CategoryProps {
    categoryList: ItemProps[]
}


export default function Product({ categoryList }: CategoryProps) {

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [] = useState()

    const [avatarUrl, setAvatarUrl] = useState('')
    const [imageAvatar, setImageAvatar] = useState(null)

    const [categories, setCategories] = useState(categoryList || [])
    const [categorySelected, setCategorySelected] = useState(0)

    function handleFile(event: ChangeEvent<HTMLInputElement>) {
        // o ChangeEvent é do tipo onChange e passamos o generic
        // para ele para dizer que é do tipo HTMLInputElement
        // assim temos acesso a todos os metodos e atributos
        // que o input possa ter como event.target  entro outros do tipo

        if (!event.target.files) {
            return
        }

        // como é um array e vamos enivar apenas uma imagen
        // colocamos o event.target.files[0] para pegar a primeira imagem no array
        const image = event.target.files[0]

        if (!image) {
            return
        }

        if (image.type === 'image/jpeg' || image.type === 'image/png') {
            setImageAvatar(image);
            // utilizando o URL.createObjectURL() e dentro do parenteses passando o
            // objeto que queremos criar a url será retornado para o seAvatarUrl
            setAvatarUrl(URL.createObjectURL(event.target.files[0]))
        }
    }

    function handleChangeCategory(event:ChangeEvent<HTMLSelectElement>){
        console.log(categories[event.target.value]);

        const selectedValue = Number(event.target.value)

        setCategorySelected(selectedValue)
        
    }

    async function handleRegister(event: FormEvent){
        event.preventDefault()

        try {
            // utilizando o FormData nós podemos preencher o multiPart form data
            // que colocamos no insomnia para enviar formularios com
            // imagens e outros dados juntos.
            const data = new FormData()

            if(name === '' || price === '' || description === '' || imageAvatar === null){
                toast.warning("Preencha Todos os Campos Por favor 😊")
                return
            }

            // para add um valor ou imagem dentro do data usamos o append
            // passamos primeiro o nome do campo que vamos preencher
            // depois passamos o valor, objeto ou imagem que ele vai receber.
            data.append("name", name)
            data.append("price", price)
            data.append("description", description)
            //@ts-ignore
            data.append("category_id", categories[categorySelected].id)
            // aqui passamos a nossa imagem
            // lembrando que criamos uma url para ela usando o metodo
            // URL.createObjectURL() para assim conseguir cadastrar a imagem
            // no banco de dados.
            data.append("file", imageAvatar)


            const apiClient = setupAPIClient()

            await apiClient.post("/product", data)

            toast.success("Produto Cadastrado com Sucesso ✌")

        } catch (err) {
            console.log(err);
            toast.error("Ocorreu algum Erro ao Cadastrar!! 😢")
        }

    }

    return (
        <>
            <Head>
                <title>Novo Produto - Sujeito Pizza</title>
            </Head>

            <div>
                <Header />


                <main className={styles.container}>
                    <h1>Novo Produto</h1>

                    <form className={styles.form} onSubmit={handleRegister}>

                        <label className={styles.labelAvatar}>
                            <span>
                                <FiUpload size={25} color="#FFF" />
                            </span>

                            <input
                                type="file"
                                accept='image/png, image/jpeg'
                                onChange={handleFile}
                            />

                            {
                                avatarUrl && (
                                    <img
                                        className={styles.preview}
                                        src={avatarUrl}
                                        alt='foto do produto'
                                        width={250}
                                        height={250}
                                    />
                                )
                            }
                        </label>


                        <select value={categorySelected} onChange={handleChangeCategory}>
                            {
                                categories.map((item, index) => {
                                    return (
                                        <option key={index} value={index}>
                                            {item.name}
                                        </option>
                                    )
                                })
                            }
                        </select>

                        <input
                            type="text"
                            placeholder='Digite o Nome do Produto'
                            className={styles.input}
                            value={name}
                            onChange={e => setName(e.target.value)}

                        />
                        <input
                            type="text"
                            placeholder='Preço do Produto'
                            className={styles.input}
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                        <textarea
                            placeholder='Descreva Seu Pruduto'
                            className={styles.input}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
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

export const getServerSideProps = canSSRAuth(async (ctx) => {

    // como estamos do lado do servidor temos que passar o contexto par a API
    const apiClient = setupAPIClient(ctx)

    const response = await apiClient.get("/category")



    return {
        props: {
            categoryList: response.data
        }
    }
})
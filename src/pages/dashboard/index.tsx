import { canSSRAuth } from "../../utils/canSSRAuth"
import { Header } from "../../components/Header"
import { FiRefreshCcw } from "react-icons/fi"
import styles from './styles.module.scss'
import Head from "next/head"
import { setupAPIClient } from "../../services/api"
import { useState } from "react"

import Modal from "react-modal"
import { ModalOrder } from "../../components/ModalOrder"

type OrderProps = {
    id: string;
    table: number | string;
    status: boolean;
    draft: boolean
    name: string | null;
}

interface HomeProps {
    orders: OrderProps[]
}

export type OrderItemProps = {
    id: string;
    amount: number;
    order_id: string;
    product_id: string;
    product: {
        id: string;
        name: string;
        price: string;
        description: string;
        banner: string
    };
    order: {
        id: string;
        table: number;
        status: boolean;
        draft: boolean;
        name: string;
    }

}

export default function Dashboard({ orders }: HomeProps) {

    const [orderList, setOrderList] = useState(orders || [])
    const [modalItem, setModalItem] = useState<OrderItemProps[]>()
    const [modalIsVisible, setModalIsVisible] = useState(false)

    function handleCloseModal() {
        setModalIsVisible(false)
    }

    async function handleOpenModalView(id: string) {

        const apiClient = setupAPIClient()

        const response = await apiClient.get('/order/detail', {
            params: {
                order_id: id
            }
        })

        setModalItem(response.data)
        setModalIsVisible(true)
    }


    return (
        <>
            <Head>
                <title>Painel - Sujeito Pizzaria</title>
            </Head>

            <div>
                <Header />
                <main className={styles.container}>
                    <div className={styles.containerHeader}>
                        <h1>Últimos Pedidos</h1>

                        <button>
                            <FiRefreshCcw size={25} color="#3fffa3" />
                        </button>
                    </div>

                    <article className={styles.listOrders}>
                        {
                            orderList.map((item) => {
                                return (
                                    <section key={item.id} className={styles.orderItem}>
                                        <button onClick={() => handleOpenModalView(item.id)}>
                                            <span>Mesa {item.table}</span>
                                        </button>
                                    </section>
                                )
                            })
                        }
                    </article>
                </main>

                { modalIsVisible && (
                    <ModalOrder
                        isOpen={modalIsVisible}
                        onRequestClose={handleCloseModal}
                        order={modalItem}
                    />
                )}
            </div>
        </>
    )
}

// aqui passamos a tag que envolve toda nossa aplicação
// no caso do next e o tag com id "__next" e do react puro id "root"
Modal.setAppElement("#__next")

export const getServerSideProps = canSSRAuth(async (ctx) => {

    // como não vamos fazer nada que use autenticação não
    // precisamos passar o cont
    const apiClient = setupAPIClient(ctx)

    const response = await apiClient.get('/order')

    // console.log(response.data);


    return {
        props: {
            orders: response.data
        }
    }
})
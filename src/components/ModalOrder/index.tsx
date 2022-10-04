import Modal from "react-modal"
import style from "./styles.module.scss"

import { FiX } from "react-icons/fi"
import { OrderItemProps } from "../../pages/dashboard";

interface ModalOrderProps{
    isOpen: boolean;
    onRequestClose: () => void;
    order: OrderItemProps[]
}

export function ModalOrder({ isOpen, onRequestClose, order }: ModalOrderProps) {

    console.log(order);
    

    const customStyles = {
        content: {
            top: "50%",
            bottom: "auto",
            left: "50%",
            right: "auto",
            padding: "30px",
            backgroundColor: "#1d1d2e",
            transform: "translate(-50%, -50%)"
        }
    }

    return(
        <Modal 
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
        >
            <button
                type="button"
                onClick={onRequestClose}
                className="react-modal-close"
                style={{ background: "transparent", border:0}}
            >
                <FiX size={45} color="#f34748"/>
            </button>

            <div className={style.container}>
                <h2>Detalhes do Pedido</h2>
                <span className={style.table}>
                    Mesa: <strong>{order[0].order.table}</strong>
                </span>
                {order.map( item => {
                    return(
                        <section 
                            key={item.id}
                            className={style.containerItem}
                        >
                            <span> {item.amount} - {item.product.name}</span>
                            <span className={style.description}>{item.product.description}</span>
                        </section>
                    );
                })}
            </div>
        </Modal>
    )
}
import styles from "./styles.module.scss"
import Link from "next/link"
import { FiLogOut } from "react-icons/fi"
import { UseAuth } from "../../contexts/AuthContext"


export function Header() {

    const { signOut } = UseAuth()

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href={'/dashboard'}>
                    <img src="/logo.svg" width={190} height={60}/>
                </Link>

                <nav className={styles.menuNav}>
                    <Link href={'/category'}>
                        <a href="#">Categoria</a>
                    </Link>

                    <Link href={'/product'}>
                        <a href="#">Cardapio</a>
                    </Link>

                    <button onClick={signOut}>
                        <FiLogOut color="#FFF" size={24}/>
                    </button>
                </nav>
            </div>
        </header>
    )
}
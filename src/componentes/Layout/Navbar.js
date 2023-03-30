import {Link} from 'react-router-dom'
import styles from './Navbar.module.css'
import Container from './Container'

function Navbar(){
    return(
        <nav className={styles.navbar}>
            <Container>
            <ul>
                <li>
                    <Link to="/"><span>Loja do Mirante</span></Link>
                </li>
                <li>
                    <Link to="/venda">Venda</Link>
                </li>
                <li>
                    <Link to="/produtos">Produtos</Link>
                </li>
                <li>
                    <Link to="/tipo_produto">Tipo de Produtos</Link>
                 
                </li>
                <li>
                    <Link to="/relatorio">Relatório</Link>
                </li>
                <li>
                    
                </li>
            </ul>
            </Container>
        </nav>
    )
}

export default Navbar
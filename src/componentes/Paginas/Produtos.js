import {useEffect, useState} from 'react'
import LinkButton from '../Layout/LinkButton';
import { FiTrash2 } from "react-icons/fi";
import styles from './Produtos.module.css'

function Produtos(){

    const [data, setData] = useState([])

    const getProdutos = async () => {
        fetch("http://localhost/Projeto/CRUD/index.php")
        .then((response) => response.json())
        .then((responseJson) => (
            //console.log(responseJson),
            setData(responseJson.records)
        ));
    }

    const apagarProduto = async (codProduto) => {
        await fetch("http://localhost/Projeto/CRUD/excluir.php?codigo=" + codProduto)
        .then((response) => response.json())
        .then((responseJson) => {
            
            setTimeout(() =>{
                window.location.reload(true);
            }, 3000)
        })
        .catch(() => {
            
            setTimeout(() =>{
                window.location.reload(true);
            }, 3000)
        })
    }

    useEffect(() => {
        getProdutos();

    }, [])
    return(
        <div className={styles.container}>
            <div className={styles.titulo}>
            <h1>Lista de Produtos</h1>
            <LinkButton type="btn" to='/cadastrar' text="Cadastrar"/>
            </div>
            <div className={styles.table}>
                <table>
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Nome</th>
                            <th>Valor</th>
                            <th>Tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(data).map(produto => (
                            <tr key={produto.codigo}>
                                <td className={styles.btn_tab}>{produto.codigo}</td>
                                <td className={styles.btn_tab}>{produto.nome}</td>
                                <td className={styles.btn_tab}>{produto.valor}</td>
                                <td className={styles.btn_tab}>{produto.tipo} - {produto.nomeTipo}</td>                                
                                <td className={styles.btn_link}>
                                    <LinkButton type="visu" to={'/visualizar/' + produto.codigo} text="Visualizar"/>                                   
                                </td>
                                <td className={styles.btn_link}>
                                    <LinkButton type="alt" to={'/alterar/' + produto.codigo} text="Alterar"/>
                                </td>
                                <td className={styles.btn_link}>
                                    <button className={styles.exc} onClick={() => apagarProduto(produto.codigo)}><FiTrash2/></button>
                                </td>                                
                            </tr>
                        ))}
                    </tbody>
                </table>  
            </div>
        </div>
    )
}

export default Produtos
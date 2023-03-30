import styles from './Tipo.module.css'
import LinkButton from '../Layout/LinkButton'
import { useState, useEffect } from 'react'
import { FiTrash2 } from "react-icons/fi";

function Tipo(){

    const [data, setData] = useState([])


    const getProdutos = async () => {
        fetch("http://localhost/Projeto/CRUD2/tipo.php")
        .then((response) => response.json())
        .then((responseJson) => (
            //console.log(responseJson),
            setData(responseJson.records)
        ));
    }

    const apagarProduto = async (codProduto) => {
        await fetch("http://localhost/Projeto/CRUD2/excluir_tipo.php?codigo=" + codProduto)
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
        <div>
        <div className={styles.titulo}>
        <h1>Tipos de Produto</h1>
        <LinkButton type="btn" to='/cadastrar_tipo' text="Cadastrar"/>
        </div>

        <div className={styles.table}>
                <table>
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Nome</th>
                            <th>Percentual de Imposto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(data).map(produto => (
                            <tr key={produto.codigo}>
                                <td className={styles.btn_tab}>{produto.codigo}</td>
                                <td className={styles.btn_tab}>{produto.nome}</td>
                                <td className={styles.btn_tab}>{produto.percentual_imposto}</td>
                                
                                <td className={styles.btn_link}>
                                    <LinkButton type="visu" to={'/visualizar_tipo/' + produto.codigo} text="Visualizar"/>                                   
                                </td>
                                <td className={styles.btn_link}>
                                    <LinkButton type="alt" to={'/editar_tipo/' + produto.codigo} text="Alterar"/>
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

export default Tipo
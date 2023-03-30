import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import LinkButton from '../Layout/LinkButton'
import styles from './Pedidos.module.css'

function Visualizar(){

    const {codigo} = useParams()

    const [data, setData] = useState([]);

    useEffect(() => {
        const getProduto = async () => {
            await fetch("http://localhost/Projeto/Relatorio/visualizar_relatorio.php?codigo=" + codigo)
            .then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson.records)
                console.log(responseJson.records)
            })
        }
        
        getProduto();
    }, [codigo]);

    return(
        <div>
            <div className={styles.titulo}>
            <h1>Pedido 0{codigo}</h1>
            <LinkButton type="btn" to='/relatorio' text="Voltar"/>
            </div>

            <div className={styles.table}>
                <table >
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Pedido</th>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(data).map(produtos => (
                        <tr key={produtos.codigo}>
                            <td className={styles.btn_tab}>{produtos.codigo}</td>
                            <td className={styles.btn_tab}>{produtos.pedido}</td>
                            <td className={styles.btn_tab}>{produtos.produto} - {produtos.nome}</td>
                            <td className={styles.btn_tab}>{produtos.quantidade}</td>
                            <td className={styles.btn_tab}>{produtos.total}</td>
                        </tr>
                    ))}
                        
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default Visualizar
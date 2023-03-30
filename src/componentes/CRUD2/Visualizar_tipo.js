import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import LinkButton from '../Layout/LinkButton'

import styles from './Visualizar.module.css'

function Visualizar_tipo(){

    const {codigo} = useParams()

    const [data, setData] = useState([]);

    useEffect(() => {
        const getProduto = async () => {
            await fetch("http://localhost/Projeto/CRUD2/visualizar_tipo.php?codigo=" + codigo)
            .then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson.produto)
            })
        }
        
        getProduto();
    }, [codigo]);

    return(
        <div>
            <div className={styles.titulo}>
            <h1>Item {data.codigo}</h1>
            <LinkButton type="btn" to='/tipo_produto' text="Voltar"/>
            </div>

            <div className={styles.cad}>
                <p className={styles.nome}>
                    Codigo: 
                </p>
                <p className={styles.data}>
                    {data.codigo}
                </p>
                <p className={styles.nome}>
                    Nome: 
                </p>
                <p className={styles.data}>
                    {data.nome}
                </p>
                <p className={styles.nome}>
                    Percentual de Imposto: 
                </p>
                <p className={styles.data}>
                    {data.percentual_imposto}
                </p>
            </div>
        </div>
    )
}

export default Visualizar_tipo
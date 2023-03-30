import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import LinkButton from '../Layout/LinkButton'

import styles from './Visualizar.module.css'

function Visualizar(){

    const {codigo} = useParams()

    const [data, setData] = useState([]);

    useEffect(() => {
        const getProduto = async () => {
            await fetch("http://localhost/Projeto/CRUD/visualizar.php?codigo=" + codigo)
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
            <LinkButton type="btn" to='/produtos' text="Voltar"/>
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
                    Valor: 
                </p>
                <p className={styles.data}>
                    {data.valor}
                </p>
                <p className={styles.nome}>
                    Tipo: 
                </p>
                <p className={styles.data}>
                    {data.tipo}
                </p>
            </div>
        </div>
    )
}

export default Visualizar
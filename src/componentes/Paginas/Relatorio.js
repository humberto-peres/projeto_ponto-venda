import React, { useEffect, useState } from 'react'
import styles from './Relatorio.module.css'
import LinkButton from '../Layout/LinkButton'

function Relatorio(){

    const [data, setData] = useState([])

    const getPedido = async () => {
        fetch("http://localhost/Projeto/Relatorio/relatorio.php")
        .then((response) => response.json())
        .then((responseJson) => (
            //console.log(responseJson)
            setData(responseJson.records)

        ));
    }

    useEffect(() => {
        getPedido();
    }, [])

    
    return(
        <div>
            <div className={styles.titulo}>
            <h1>Relatório</h1>
            </div>
            <div className={styles.table}>
                <table>
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Data</th>
                            <th>Total</th>

                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(data).map(pedidos => (
                            <tr key={pedidos.codigo}>
                                <td className={styles.btn_tab}>{pedidos.codigo}</td>
                                <td className={styles.btn_tab}>{pedidos.data}</td>
                                <td className={styles.btn_tab}>{pedidos.total}</td>                            
                                <td className={styles.btn_link}>
                                    <LinkButton type="visu" to={'/visualizar_relatorio/' + pedidos.codigo} text="Visualizar"/>                                   
                                </td>                                
                            </tr>
                        ))}
                        

                            
                            
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Relatorio
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import LinkButton from "../Layout/LinkButton"
import styles from './Editar.module.css'
import Message from "../Layout/Message"
import Input from "../Form/Input"
import Button from "../Form/Button"

function Editar_tipo(){

    const {codigo} = useParams()

    const [nome, setNome] = useState('');
    const [percentual_imposto, setPercentual_imposto] = useState(0);

    const [message, setMessage] =useState();
    const [type, setType] = useState();

    const editProduto = async e => {
        e.preventDefault();
        setMessage('')
        
        await fetch("http://localhost/Projeto/CRUD2/editar_tipo.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({codigo, nome, percentual_imposto})
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            setMessage('Produto editado com sucesso!')
            setType('success')
        })
        .catch(() => {
            setMessage("Não foi possível editar o produto!")
            setType("error")
            console.log("nao")
        })
    }

    useEffect(() => {
        const getProduto = async () => {
            await fetch("http://localhost/Projeto/CRUD2/visualizar_tipo.php?codigo=" + codigo)
            .then((response) => response.json())
            .then((responseJson) => {
                setNome(responseJson.produto.nome)
                setPercentual_imposto(responseJson.produto.percentual_tipo)
            })
        }
        
        getProduto();
    }, [codigo]);



    return(
        <div>
            <div className={styles.titulo}>
            <h1>Editar tipo de produto</h1>
            <LinkButton type="btn" to='/tipo_produto' text="Voltar"/>
            </div>

            {message && <Message type={type} msg={message}/>}
            <form onSubmit={editProduto}>
                <Input type="number" text="Codigo" name="codigo" placeholder="Digite o codigo" value={codigo} disabled="disabled"></Input>
                <Input type="text" text="Nome" name="nome" placeholder="Digite o nome" value={nome} onChange={e => setNome(e.target.value)} required="required" min="0.01"></Input>
                <Input type="number" text="Percentual de imposto" step="0.001" name="percentual_imposto" placeholder="Digite o percentual de imposto" value={percentual_imposto} onChange={e => setPercentual_imposto(e.target.value)} required="required" min="1"></Input>

                
                <Button text="Editar"></Button>
            </form>
        </div>
    )
}

export default Editar_tipo
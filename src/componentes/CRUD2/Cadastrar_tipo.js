import React, { useState } from "react"
import Message from '../Layout/Message'
import styles from './Cadastrar.module.css'
import Input from "../Form/Input";
import Button from "../Form/Button";
import LinkButton from "../Layout/LinkButton";
function Cadastrar_tipo(){

    const [tipo_produto, setProduto] = useState({
        nome: '',
        percentual_imposto: ''
    });

    const [message, setMessage] = useState()
    const [type, setType] = useState()


    //Cadastrar Produto
    const cadProduto = async e =>{
        setMessage('')
        e.preventDefault();
        
        await fetch("http://localhost/Projeto/CRUD2/cadastrar_tipo.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({tipo_produto})
        })
        .then((response) => response.json())
        .then((responseJson) => {
                setMessage('Produto cadastrado com sucesso!')
                setType('success')
                setTimeout(() =>{
                    window.location.reload(true);
                }, 3000)
        })
        .catch(() => {
            setMessage("Não foi possível cadastrar o produto!")
            setType("error")
        })
    }
    
    const valorInput = e => setProduto({...tipo_produto, [e.target.name]: e.target.value});

    return(
        <div>
            <div className={styles.titulo}>
            <h1>Cadastrar tipo</h1>
            <LinkButton type="btn" to='/tipo_produto' text="Voltar"/>
            </div>
            <div className={styles.form}>
                {message && <Message type={type} msg={message}/>}
                <form onSubmit={cadProduto}>
                    <Input type="text" text="Nome" name="nome" placeholder="Digite o nome" onChange={valorInput} required="required"></Input>
                    <Input type="number" text="Percentual de imposto" step="0.001" name="percentual_imposto" placeholder="Digite o valor"  onChange={valorInput} required="required" min="1"></Input>
                    <Button text="Cadastrar"></Button>
                </form>
            </div>
        </div>
    )
}

export default Cadastrar_tipo
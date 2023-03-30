import React, { useEffect, useState } from "react"
import Message from '../Layout/Message'
import LinkButton from "../Layout/LinkButton";
import styles from './Cadastrar.module.css'
import Input from "../Form/Input";
import Button from "../Form/Button";
function Cadastrar(){

    const [produto, setProduto] = useState({
        nome: '',
        valor: '',
        tipo: ''
    });

    const [message, setMessage] = useState()
    const [type, setType] = useState()


    //Cadastrar Produto
    const cadProduto = async e =>{
        setMessage('')
        e.preventDefault();
        
        await fetch("http://localhost/Projeto/CRUD/cadastrar.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({produto})
        })
        .then((response) => response.json())
        .then((responseJson) => {
                setMessage('Produto cadastrado com sucesso!')
                setType('success')
        })
        .catch(err => console.log(err))
    }
    
    const valorInput = e => setProduto({...produto, [e.target.name]: e.target.value});

    const [data, setData] = useState([])
    const getProdutos = async () => {
        fetch("http://localhost/Projeto/CRUD2/tipo.php")
        .then((response) => response.json())
        .then((responseJson) => (
            //console.log(responseJson)
            setData(responseJson.records)

        ));
    }

    useEffect(() => {
        getProdutos();
    }, [])

    return(
        <div>
            <div className={styles.titulo}>
            <h1>Cadastrar produto</h1>
            <LinkButton type="btn" to='/produtos' text="Voltar"/>
            </div>
            <div className={styles.form}>
                {message && <Message type={type} msg={message}/>}
                <form onSubmit={cadProduto}>
                    <Input type="text" text="Nome" name="nome" placeholder="Digite o nome" onChange={valorInput} required="required"></Input>
                    <Input type="number" text="Valor" step="0.001" name="valor" placeholder="Digite o valor"  onChange={valorInput} required="required" min="1"></Input>
                    <div className={styles.form_control}>
                    <label className={styles.label} placeholder="Escolha um tipo">Tipo</label>
                    <select name="tipo" onChange={valorInput} required="required">
                                <option value="">Selecione</option>
                            {Object.values(data).map(produto => (
                                <option key={produto.codigo} value={produto.codigo}>{produto.codigo} - {produto.nome}</option>
                                
                            ))}
                            </select>
                    </div>
                    <Button text="Cadastrar"></Button>
                    
                </form>
            </div>
        </div>
    )
}

export default Cadastrar
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import LinkButton from "../Layout/LinkButton"
import styles from './Editar.module.css'
import Message from "../Layout/Message"
import Input from "../Form/Input"
import Button from "../Form/Button"

function Editar(props){

    const {codigo} = useParams()

    const [nome, setNome] = useState('');
    const [valor, setValor] = useState(0);
    const [tipo, setTipo] = useState(0);

    const [message, setMessage] =useState();
    const [type, setType] = useState();

    const editProduto = async e => {
        e.preventDefault();
        setMessage('')
        
        await fetch("http://localhost/Projeto/CRUD/editar.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({codigo, nome, valor, tipo})
        })
        .then((response) => response.json())
        .then((responseJson) => {
            setMessage('Produto editado com sucesso!')
            setType('success')
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        const getProduto = async () => {
            await fetch("http://localhost/Projeto/CRUD/visualizar.php?codigo=" + codigo)
            .then((response) => response.json())
            .then((responseJson) => {
                setNome(responseJson.produto.nome)
                setValor(responseJson.produto.valor)
                setTipo(responseJson.produto.tipo)
            })
        }
        
        getProduto();
    }, [codigo]);

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
            <h1>Editar produto</h1>
            <LinkButton type="btn" to='/produtos' text="Voltar"/>
            </div>

            {message && <Message type={type} msg={message}/>}

            <form onSubmit={editProduto}>
                <Input type="number" text="Codigo" name="codigo" placeholder="Digite o codigo" value={codigo} disabled="disabled"></Input>
                <Input type="text" text="Nome" name="nome" placeholder="Digite o nome" value={nome} onChange={e => setNome(e.target.value)} required="required"></Input>
                <Input type="number" text="Valor" name="valor" step="0.001" placeholder="Digite o valor" value={valor} onChange={e => setValor(e.target.value)} required="required" min="0"></Input>

                <div className={styles.form_control}>
                    <label className={styles.label} placeholder="Escolha um tipo">Tipo</label>
                    <select name="tipo" onChange={e => setTipo(e.target.value)} required="required">
                                <option value={tipo}>{tipo}</option>
                            {Object.values(data).map(produto => (
                                <option key={produto.codigo} value={produto.codigo}>{produto.codigo} - {produto.nome}</option>
                                
                            ))}
                            </select>
                    </div>
                <Button text="Editar"></Button>
            </form>
        </div>
    )
}

export default Editar
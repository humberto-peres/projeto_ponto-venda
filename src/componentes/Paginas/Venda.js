import styles from './Venda.module.css'
import React, { useEffect, useState } from 'react'
import Message from '../Layout/Message';


function Venda(){
    const [data, setData] = useState([])
    const [carrinho, setCarrrinho] = useState([])
    const [imposto, setImposto] = useState([])
    const [perc, setPerc] = useState([])   
    const [teste, setTeste] = useState('')
    const [selecteditem, setSelectedItem] = useState()
    const [quantidade, setQuant] = useState(0)
    const [total, setTot] = useState()
    const [pedido, setPedido] = useState()
    const [produto, setProduto] = useState()
    const [message, setMessage] = useState()
    const [type, setType] = useState()
    const [cod, setCod] = useState()

    //mostrar produtos no select
    const getProdutos = async () => {
        fetch("http://localhost/Projeto/CRUD/index.php")
        .then((response) => response.json())
        .then((responseJson) => (
            //console.log(responseJson)
            setData(responseJson.records)

        ));
    }
    useEffect(() => {
        getProdutos();
    }, [])
    //

    //pegar codigo do produto selecionado
    const handleChange = (e) => {
        setSelectedItem(e.target.value)
        setProduto(e.target.value)       
    }
    //

    //resgatar o codigo do próximo pedido
    const getCod = async () => {
        fetch("http://localhost/Projeto/Venda/cod.php")
        .then((response) => response.json())
        .then((responseJson) => (
            setCod(responseJson)

        ));
    }
    useEffect(() => {
        getCod();
    }, [])
    //

    //mostrar itens no carrrinho
    const getCarrinho = async () => {
        fetch("http://localhost/Projeto/Venda/carrinho.php")
        .then((response) => response.json())
        .then((responseJson) => (
            //console.log(responseJson),
            setCarrrinho(responseJson.records)

        ))
        .catch(console.log("erro"))
    }
    useEffect(() => {
        getCarrinho();
    }, [])
    //
   
    //Trazer os valores do produto selecionado
    const pegarProduto = async (c) => {
            
        await fetch("http://localhost/Projeto/CRUD/visualizar.php?codigo=" + c)
        .then((response) => response.json())
        .then((responseJson) => {
            setTeste(responseJson.produto.valor)
            pegarPerc(responseJson.produto.tipo)
        })  
    } 
    //

    //Trazer o percentual do impsoto do produto selecionado
    const pegarPerc = async (a) => {
            
        await fetch("http://localhost/Projeto/CRUD2/visualizar_tipo.php?codigo=" + a)
        .then((response) => response.json())
        .then((responseJson) => {
            setPerc(responseJson.produto.percentual_imposto)
        })
    } 
    //

    //Define os valores para colocar dentro do carrinho
    const pegar = () => {
        setQuant(quantidade)
        setTot(teste*quantidade)
        setPedido(cod + 1)
        setProduto(selecteditem)
        setImposto(teste*quantidade*(perc/100))
    }
    //

    //Inclui um produto no carrinho
    const incluir = async e =>{
        e.preventDefault();
        
        const data = {pedido, produto, quantidade, total, imposto}
        await fetch("http://localhost/Projeto/Venda/incluir.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setMessage("Produto incluido com sucesso!")
            setType("success")
            setTimeout(() =>{
                window.location.reload(true);
            }, 1000)
        })
        .catch(err => console.log(err))
    }
    //
    
    //Conclui uma venda e adiona no relatorio
    const concluir = async e => {
        setMessage('')
        e.preventDefault();
        
        const data = {total_pedido}
        await fetch("http://localhost/Projeto/Venda/concluir.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((responseJson) => {
            setMessage('Produto concluido com sucesso!')
            setType('success')
            setTimeout(() =>{
                window.location.reload(true);
            }, 1000)
        })
        .catch(() => {
            setMessage("Não foi possível concluir o pedido!")
            setType("error")
        })
    }
    //

    //Calcular o valor total do pedido
    let total_pedido = 0
    Object.values(carrinho).map(produtos => (
        total_pedido+= parseFloat(produtos.total)
    ))
    //

    //Calcular o valor do imposto estimado
    let imp = 0
    Object.values(carrinho).map(produtos => (
        imp+= parseFloat(produtos.imposto)
    ))
    //
    
    return(
        <div>
        <section className={styles.corpo}>
            <div className={styles.container}>
                {message && <Message type={type} msg={message}/>}
                <form onSubmit={incluir}>
                    <div className={styles.form_control}>
                        <div className={styles.primeiro}>
                            <label htmlFor="produto">Produto</label>
                            <select name="nproduto" id="iproduto" value={selecteditem} onChange={handleChange}>
                                <option>Selecione</option>
                            {Object.values(data).map(produto => (
                                <option key={produto.codigo} value={produto.codigo}>{produto.codigo} - {produto.nome}</option>
                                
                            ))}
                            </select>
                        </div>

                    <div className={styles.primeiro}>
                    <label>Quantidade</label>
                    <input
                        onFocus={() => pegarProduto(selecteditem)} 
                        name="quantidade" 
                        type='number' 
                        value={quantidade} 
                        onChange={(e) => setQuant(e.target.value)}
                        min="1"
                        >
                    </input>

                    <label>Valor</label>
                    <input 
                        name="produto" 
                        type='text' 
                        value={`R$ ${teste}`}
                        readOnly
                        >
                    </input>

                    <label>Total</label>
                    <input 
                        name="total" 
                        type='text' 
                        value={`R$ ${teste*quantidade}`}
                        readOnly
                        >                            
                    </input>
                  
                    </div>
                   
                    <button type='submit' className={styles.incluir} onClick={pegar}>Incluir</button>
                    </div>
                </form>                
            </div>
        </section>
        <aside className={styles.lateral}>            
            <table className={styles.tabela}>
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Valor un.</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(carrinho).map(produtos => (
                        <tr key={produtos.codigo}>
                            <td className={styles.prod}>{produtos.produto} - {produtos.nome}</td>
                            <td className={styles.prod}>{produtos.quantidade}</td>
                            <td className={styles.prod}>{produtos.total/produtos.quantidade}</td>
                            <td className={styles.prod}>{produtos.total}</td>  
                        </tr>
                    ))}
                        <tr className={styles.imp}>
                            <td>Imposto estimado: </td>
                            <td ></td>
                            <td></td>
                            <td>{imp}</td>
                        </tr>                        
                </tbody>
            </table>            
            <div> 
            <button type='submit' onClick={concluir} className={styles.concluir}>Concluir Venda</button>
            </div>         
        </aside>
    </div>
    )
}

export default Venda
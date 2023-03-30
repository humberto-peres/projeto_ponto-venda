import {BrowserRouter as Router} from 'react-router-dom'
import {Routes, Route} from 'react-router'

import Navbar from './componentes/Layout/Navbar'
import Container from './componentes/Layout/Container'

import Loja from './componentes/Paginas/Loja'
import Venda from './componentes/Paginas/Venda'
import Produtos from './componentes/Paginas/Produtos'
import Tipo from './componentes/Paginas/Tipo'
import Relatorio from './componentes/Paginas/Relatorio'
import Cadastrar from './componentes/CRUD/Cadastrar'
import Visualizar from './componentes/CRUD/Visualizar'
import Editar from './componentes/CRUD/Editar'
import CadastrarTipo from './componentes/CRUD2/Cadastrar_tipo'
import VisualizarTipo from './componentes/CRUD2/Visualizar_tipo'
import EditarTipo from './componentes/CRUD2/Editar_tipo'
import Teste from './componentes/Paginas/Pedidos'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
          <Container customClass="min-height">
            <Routes>
            <Route path="/" element={<Loja/>}></Route>
              <Route path="/venda" element={<Venda/>}></Route>
              <Route path="/produtos" element={<Produtos/>}></Route>
              <Route path="/tipo_produto" element={<Tipo/>}></Route>
              <Route path="/relatorio" element={<Relatorio/>}></Route>
              <Route path="/cadastrar" element={<Cadastrar/>}></Route>
              <Route path="/cadastrar_tipo" element={<CadastrarTipo/>}></Route>

              
              <Route path="/visualizar/:codigo" element={<Visualizar/>}></Route>
              <Route path="/visualizar_tipo/:codigo" element={<VisualizarTipo/>}></Route>

              <Route path="/alterar/:codigo" element={<Editar/>}></Route>
              <Route path="/editar_tipo/:codigo" element={<EditarTipo/>}></Route>

              <Route path="/visualizar_relatorio/:codigo" element={<Teste/>}></Route>


            </Routes>
          </Container>
      </Router>
    </div>
  );
}

export default App;

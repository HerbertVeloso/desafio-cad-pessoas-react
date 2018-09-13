import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

import './style.css';

import Titulo from './components/Titulo';
import Lista from './components/Lista';
import Home from './views/Home';
import Info from './views/Info';
import EditView from './views/EditView';
import Nova from './views/Nova';

export default class AppShell extends Component{
  constructor(props){
    super(props);
    this.state = {
      pessoa: {
        nome: '',
        nascimento: '',
        rg: '',
        cpf: '',
        endereco: '',
        cep: '',
        bairro: '',
        cidade: '',
        estado: ''
      },
      listaDePessoas: []
    };

    this.handlerChangePessoa = this.handlerChangePessoa.bind(this);
    this.cadastrarPessoa = this.cadastrarPessoa.bind(this);
  };

  handlerChangePessoa(event){
    const target = event.target;
    const name = target.name;

    this.setState({
      pessoa: {
        ...this.state.pessoa,[name]: target.value
      }
    });
  };

  cadastrarPessoa(event){
    const endPoint = `https://learn-firebase-6ad07.firebaseio.com/desafio/herbert/pessoas.json`;
    let dado = { pessoa: this.state.pessoa };
    const config = {
      header: {
        'Content-Type': 'application/json'
      }
    }
    axios.post(endPoint, dado, config).then(res => {
      let tempListaDePessoas = this.state.listaDePessoas;

      tempListaDePessoas.push({ pessoa: this.state.pessoa, id: res.data.name });
      this.setState({ listaDePessoas: tempListaDePessoas, pessoa: {} });

      console.log('Funcionou o axios');
      console.log(tempListaDePessoas);
    });
  };

  componentDidMount() {
    const endPoint = `https://learn-firebase-6ad07.firebaseio.com/desafio/herbert/pessoas.json`;
    axios.get(endPoint).then(
      res => {
        if(res.data !== null && res.data !== undefined){
          let dados = Object.keys(res.data).map(item => {
            res.data[item].id = item;
            return res.data[item];
          });

          this.setState({ listaDePessoas: dados, pessoa: {} });
        };
    });
  };

  render(){
    return(
      <div className='app'>
        <Titulo />
        <main className='main'>
          <Lista listaDePessoas={this.state.listaDePessoas} />
          <Switch>
            <Route exact path='/' component={ Home } />
            <Route path='/info/:id' render={(props) => <Info {...props} listaDePessoas={this.state.listaDePessoas} />} />
            <Route path='/editar' component={ EditView } />
            <Route exact path='/nova' render={(props) => <Nova {...props} handlerChangePessoa={this.handlerChangePessoa} pessoa={this.state.pessoa} cadastrarPessoa={this.cadastrarPessoa} />} />
          </Switch>
        </main>
      </div>
    );
  };
};

// class AppShell extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       pessoa: {
//         nome: '',
//         nascimento: '',
//         rg: '',
//         cpf: '',
//         endereco: '',
//         cep: '',
//         bairro: '',
//         cidade: '',
//         estado: ''
//       },
//       listaDePessoas: []
//     };
//     this.handlerChangePessoa = this.handlerChangePessoa.bind(this);
//   };
//   handlerChangePessoa(event){
//     console.log(event)
//     this.setState({ 
//       pessoa: {
//         nome: event.target.value 
//       }
//     });
//   };
//   cadastrarPessoa(event){
//     const endPoint = `https://learn-firebase-6ad07.firebaseio.com/desafio/${nomeDoCandidato}/pessoas.json`;
//     let dado = { name: this.state.pessoa };
//     const config = {
//       header: {
//         'Content-Type': 'application/json'
//       }
//     }
//     axios.post(endPoint, dado, config).then(res => {
//       let tempListaDePessoas = this.state.listaDePessoas;

//       tempListaDePessoas.push({ text: this.state.pessoa, id: res.data.name });
//       this.setState({ listaDePessoas: tempListaDePessoas, pessoa: {} });
//     });
//   };
//   componentDidMount() {
//     const endPoint = `https://learn-firebase-6ad07.firebaseio.com/`;
//     const url = `${nomeDoCandidato}/pessoas.json`;
//     axios.get(endPoint + url).then(res => console.log(res));
//   };

//   render() {
//     return (
//       <div>
//         <header>
//           <h1>Cadastro de Pessoas</h1>
//         </header>
//         <main>
//           <Lista listaDePessoas={this.state.listaDePessoas} />
//           <Nova 
//             handlerChangePessoa={this.handlerChangePessoa}
//             pessoa={this.state.pessoa}
//             cadastrarPessoa={this.cadastrarPessoa}
//           />
//         </main>
        
//       </div>
//     );
//   }
// }

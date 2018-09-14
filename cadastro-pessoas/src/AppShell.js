import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

import './style.css';

import Titulo from './components/Titulo';
import Lista from './components/Lista';
import Home from './views/Home';
import Info from './views/Info';
import Edit from './views/Edit';
import Nova from './views/Nova';

export default class AppShell extends Component{
  constructor(props){
    super(props);
    this.state = {
      listaDePessoas: [],
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
        }
    };

    this.handlerChangePessoa = this.handlerChangePessoa.bind(this);
    this.cadastrarPessoa = this.cadastrarPessoa.bind(this);
    this.importarPessoa = this.importarPessoa.bind(this);
    this.atualizarPessoa = this.atualizarPessoa.bind(this);
    this.excluirPessoa = this.excluirPessoa.bind(this);
    this.getPessoa = this.getPessoa.bind(this);
  };

  excluirPessoa(id){
    const endPoint = `https://learn-firebase-6ad07.firebaseio.com/desafio/herbert/pessoas/`;
    axios.delete(endPoint + id + '.json').then(console.log('Excluiu'));
  };

  handlerChangePessoa(event){
    const target = event.target;
    const name = target.name;

    this.setState({
      pessoa: { ...this.state.pessoa,[name]: target.value }
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
      const tempListaDePessoas = this.state.listaDePessoas;
      dado.pessoa.id = res.data.name;
      tempListaDePessoas.push(dado);
      this.setState({ listaDePessoas: tempListaDePessoas, pessoa: {} });
    });
  };

  importarPessoa(dados){
    this.setState({ pessoa: dados });
  }

  atualizarPessoa(event){
    const endPoint = `https://learn-firebase-6ad07.firebaseio.com/desafio/herbert/pessoas/`;
    let dado = { pessoa: this.state.pessoa };
    const id = dado.pessoa.id;
    delete dado.pessoa.id;
    const config = {
      header: {
        'Content-Type': 'application/json'
      }
    }
      axios.put(endPoint + id + '.json', dado, config).then(res => this.setState({ pessoa: {} }));
  };

  getPessoa(id){
     return this.state.listaDePessoas.find(item => item.pessoa.id === id);
  };

  componentDidMount() {
    const endPoint = `https://learn-firebase-6ad07.firebaseio.com/desafio/herbert/pessoas.json`;
    axios.get(endPoint).then(
      res => {
        if(res.data !== null && res.data !== undefined){
          let dados = Object.keys(res.data).map(item => {
            res.data[item].pessoa.id = item;
            return res.data[item];
          });
          this.setState({ listaDePessoas: dados });
        };
    });
  };
  componentWillUpdate() {
    const endPoint = `https://learn-firebase-6ad07.firebaseio.com/desafio/herbert/pessoas.json`;
    axios.get(endPoint).then(
      res => {
        if(res.data !== null && res.data !== undefined){
          let dados = Object.keys(res.data).map(item => {
            res.data[item].pessoa.id = item;
            return res.data[item];
          });
          this.setState({ listaDePessoas: dados });
        };
    });
  }

  render(){
    return(
      <div className='app'>
        <Titulo />
        <main className='main'>
          <Lista listaDePessoas={this.state.listaDePessoas} />
          <Switch>
            <Route exact path='/' component={ Home } />
            <Route path='/info/:id' render={(props) => <Info {...props} getPessoa={this.getPessoa} excluirPessoa={this.excluirPessoa} />} />
            <Route path='/edit/:id' render={(props) => <Edit {...props} getPessoa={this.getPessoa} importarPessoa={this.importarPessoa} handlerChangePessoa={this.handlerChangePessoa} pessoa={this.state.pessoa} atualizarPessoa={this.atualizarPessoa} />} />
            <Route exact path='/nova' render={(props) => <Nova {...props} handlerChangePessoa={this.handlerChangePessoa} pessoa={this.state.pessoa} cadastrarPessoa={this.cadastrarPessoa} />} />
          </Switch>
        </main>
      </div>
    );
  };
};
import React from 'react';
import { Link } from 'react-router-dom';

import Subtitulo from '../components/Subtitulo';

export default class Info extends React.Component{
    render(){
        const id = this.props.match.params.id;
        const dados = this.props.getPessoa(id);
        return(
            <section className='view'>
                <Subtitulo text='Informações do Usuário' />
                <div>
                    <p>Nome: <span>{ dados.pessoa.nome }</span></p>
                    <p>Nascimento: <span>{ dados.pessoa.nascimento }</span></p>
                    <p>RG: <span>{ dados.pessoa.rg }</span></p>
                    <p>CPF: <span>{ dados.pessoa.cpf }</span></p>
                    <p>Endereço: <span>{ dados.pessoa.endereco }</span></p>
                    <p>CEP: <span>{ dados.pessoa.cep }</span></p>
                    <p>Bairro: <span>{ dados.pessoa.bairro }</span></p>
                    <p>Cidade: <span>{ dados.pessoa.cidade }</span></p>
                    <p>Estado: <span>{ dados.pessoa.estado }</span></p>
                </div>
                <Link className='button' to={`/edit/${this.props.match.params.id}`} >Editar</Link>
                <Link className='button' to='/nova'>Novo</Link>
                {/* <button className='button' onClick={this.props.excluirPessoa(id)}>Excluir</button> */}
            </section>
        );
    };
};
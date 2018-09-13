import React from 'react';

import FormCad from '../components/FormCad';

export default class Nova extends React.Component{
    render(){
        return(
            <section className='view'>
                <h2>Cadastrar Pessoa</h2>
                <FormCad handlerChangePessoa={ this.props.handlerChangePessoa } pessoa={this.props.pessoa} cadastrarPessoa={ this.props.cadastrarPessoa } />
            </section>
        );
    };
};
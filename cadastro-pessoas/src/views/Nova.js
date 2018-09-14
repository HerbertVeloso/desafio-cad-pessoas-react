import React from 'react';

import Subtitulo from '../components/Subtitulo';
import FormCad from '../components/FormCad';

export default class Nova extends React.Component{
    render(){
        return(
            <section className='view'>
                <Subtitulo text='Cadastrar Usuário' />
                <FormCad handlerChangePessoa={ this.props.handlerChangePessoa } pessoa={this.props.pessoa} cadastrarPessoa={ this.props.cadastrarPessoa } />
            </section>
        );
    };
};
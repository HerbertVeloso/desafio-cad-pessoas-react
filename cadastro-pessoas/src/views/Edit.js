import React from 'react';

import Subtitulo from '../components/Subtitulo';
import FormEdit from '../components/FormEdit';

export default class Edit extends React.Component{
    render(){
        const id = this.props.match.params.id;
        return(
            <section className='view'>
                <Subtitulo text='Editar Usuário' />
                <FormEdit getPessoa={this.props.getPessoa} id={id} importarPessoa={this.props.importarPessoa} handlerChangePessoa={this.props.handlerChangePessoa} pessoa={this.props.pessoa} atualizarPessoa={this.props.atualizarPessoa} />
            </section>
        );
    };
};
import React from 'react';

export default class Info extends React.Component{
    render(){
        return(
            <section className='view'>
                <h2>Pessoa Selecionada</h2>
                {
                    console.log(this.props.match.params.id)}
                }
                <div>
                    <p>Nome: <span></span></p>
                    <p>Nascimento: <span></span></p>
                    <p>RG: <span></span></p>
                    <p>CPF: <span></span></p>
                    <p>Endereço: <span></span></p>
                    <p>CEP: <span></span></p>
                    <p>Bairro: <span></span></p>
                    <p>Cidade: <span></span></p>
                    <p>Estado: <span></span></p>
                </div>
            </section>
        );
    };
};
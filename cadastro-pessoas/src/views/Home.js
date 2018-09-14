import React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component{
    render(){
        return(
            <section className='view'>
                <Link className='button' to='/nova'>Cadastrar Novo Usuário</Link>
            </section>
        );
    };
};
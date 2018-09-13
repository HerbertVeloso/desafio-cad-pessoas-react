import React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component{
    render(){
        return(
            <section>
                <Link to='/nova'>Cadastrar</Link>
            </section>
        );
    };
};
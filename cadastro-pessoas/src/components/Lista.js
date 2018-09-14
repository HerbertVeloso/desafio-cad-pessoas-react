import React from 'react';
import { Link } from 'react-router-dom';

export default class Lista extends React.Component{
    render(){
        return(
            <aside className='lista'>
                {this.props.listaDePessoas.map(
                    item => {
                        return  <Link to={`/info/${item.pessoa.id}`} key={item.pessoa.id}>{ item.pessoa.nome }</Link>;
                    }
                )}
            </aside>
        );
    };
};
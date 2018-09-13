import React from 'react';
import { Link } from 'react-router-dom';

export default class Lista extends React.Component{
    render(){
        return(
            <aside className='lista'>
                {this.props.listaDePessoas.map(
                    item => {
                        console.log(item.pessoa);
                        const ir = '/info/' + item.id;
                        return  <Link to={ir} key={item.id}>{ item.pessoa.nome }</Link>;
                    }
                )}
            </aside>
        );
    };
};
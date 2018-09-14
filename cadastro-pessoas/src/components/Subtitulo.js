import React from 'react';

export default class Subtitulo extends React.Component{
    render(){
        return <h2 className='subtitulo'>{ this.props.text }</h2>
    };
};
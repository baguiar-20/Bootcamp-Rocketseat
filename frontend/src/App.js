import React, { useState, useEffect } from 'react';

import './App.css'

import Header from './components/Header'

import api from './services/api'

// componete
// propriedade
// estado e imutabilidade

export default function App(){
    const [projects, setProjects] = useState([])
    // useState
    // 1. variavel
    // 2. funcao para atualizarmos esse valor 

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data)   
        })
    }, [])

    async function handleAddProject(){
        // setProjects([...projects,`Novo projeto ${Date.now()}`] )
        const response = await api.post('projects', {
            "title": `Novo projeto ${Date.now()}`,
            "owner": "Brenda"
        })
        const project = response.data

        setProjects([...projects, project])
    }

    return (
    <>

        <Header title = 'Projects'/>

        <ul>
            {projects.map(projects => <li key={projects.id}>{projects.title}</li>)}
        </ul>
        <button type= "button" onClick ={handleAddProject}>Adicionar projeto</button>
        </>
    )
}

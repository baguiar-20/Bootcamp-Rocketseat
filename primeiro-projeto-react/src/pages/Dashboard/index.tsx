import React, {useState, FormEvent} from "react";

import { Title, Form, Repository} from './styles'
import LogoImg from '../../assets/logo.svg'
import {FiChevronRight} from 'react-icons/fi'
import api from '../../services/api'

interface Repository{
    full_name: string;
    description: string;
    owner:{
        login: string;
        avatar_url: string;
    };
}

const Dashboard: React.FC = () =>{

    const [newRepo, setNewRepo] = useState('');
    const [repositories, setRepositories] = useState<Repository[]>([]);

    async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void>{
        console.log(newRepo);
        event.preventDefault();
        const response = await api.get<Repository>(`repos/${newRepo}`)
        //adicao novo repositorio
        //consumir api do github
        //salvar novo repositorio no estado
        //console.log(response.data);
        const repository = response.data;
        setRepositories([...repositories, repository]);
        setNewRepo('');
    }


    return (
        <>
        <img src={LogoImg} alt="Github Explorer"/>
        <Title>Explore respositorios no Github</Title>

        <Form onSubmit={handleAddRepository}>
            <input 
            value={newRepo}
            onChange={(e) => setNewRepo(e.target.value)}
            placeholder="Digite o nome do repositorio"/>
            <button type="submit">Pesquisar</button>
        </Form>

        <Repository>
            {repositories.map(repository=>(
                <a key={repository.full_name} href="teste">
                    <img 
                        src={repository.owner.avatar_url} 
                        alt={repository.owner.login} />
                    <div>
                        <strong>{repository.full_name}</strong>
                        <p>{repository.description}</p>
                    </div>
                <FiChevronRight size={20}/>
                </a> 

            ))}
               
        </Repository>


        </> 
    ) 

}

export default Dashboard;
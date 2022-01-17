import React, {useState, FormEvent} from "react";
import {Link} from 'react-router-dom';

import { Title, Form, Repository, Error} from './styles'
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
    const [inputError, setInputErro] = useState('');
    const [repositories, setRepositories] = useState<Repository[]>([]);

    async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void>{
        event.preventDefault();
        if(!newRepo){
            setInputErro('Digite o autor/nome do repositorio');
            return;
        }
        
        try{
            const response = await api.get<Repository>(`repos/${newRepo}`)
            const repository = response.data;
            setRepositories([...repositories, repository]);
            setNewRepo('');
            setInputErro('');
        }catch(err){
            setInputErro('Erro na busca por esse repositorio')
        }
        
        //adicao novo repositorio
        //consumir api do github
        //salvar novo repositorio no estado
        //console.log(response.data);
        
    }


    return (
        <>
        <img src={LogoImg} alt="Github Explorer"/>
        <Title>Explore respositorios no Github</Title>

        <Form hasError = {!!inputError} onSubmit={handleAddRepository}>
            <input 
            value={newRepo}
            onChange={(e) => setNewRepo(e.target.value)}
            placeholder="Digite o nome do repositorio"/>
            <button type="submit">Pesquisar</button>
        </Form>

        {inputError && <Error>{inputError}</Error>}

        <Repository>
            {repositories.map(repository=>(
                <Link key={repository.full_name} to={`/repository/${repository.full_name}`}>
                    <img 
                        src={repository.owner.avatar_url} 
                        alt={repository.owner.login} />
                    <div>
                        <strong>{repository.full_name}</strong>
                        <p>{repository.description}</p>
                    </div>
                <FiChevronRight size={20}/>
                </Link> 

            ))}
               
        </Repository>


        </> 
    ) 

}

export default Dashboard;
import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const resource = 'repositories';

  const [repositories, setRepositories]  = useState([]);

  useEffect(() => {
    api.get(resource).then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {

    const sufixo = Date.now();
    const response = await api.post(resource, {
        title: `Novo repositório ${sufixo}`,
	      url: `https://github.com/rodrigo-luiz-duarte/reposiotirio-${sufixo}`,
	      techs: [
          "NodeJS",
          "Javascript",
          "Express",
          "ReactJS"
        ]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    
    const response = await api.delete(resource + `/${id}`);

    if (response.status === 204) {
      const newRepositories = [...repositories];
      const repositoryIndex = newRepositories.findIndex(repository => repository.id === id);

      if (repositoryIndex < 0) {
        console.log('Repository not found');
      }

      newRepositories.splice(repositoryIndex, 1);

      setRepositories(newRepositories);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => 
          <div key={repository.id}>
            <li>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
              </button>
            </li>
          </div>
          )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import '../index.css'; // import the CSS file

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [repos, setRepos] = useState([]);
  const [sortOrder, setSortOrder] = useState('stars');

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await axios.get(`https://api.github.com/users/${searchTerm}/repos?sort=${sortOrder}`);
    setRepos(response.data);
  }

  const handleSortOrder = (e) => {
    setSortOrder(e.target.value);
  }

  return (
    <div className="search-container">
      <Form className="search-form" onSubmit={handleSearch}>
        <Form.Label>Search for a GitHub user</Form.Label>
        <Form.Control type="text" placeholder="Enter username" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <Form.Label>Sort by</Form.Label>
        <Form.Control as="select" value={sortOrder} onChange={handleSortOrder}>
          <option value="stars">Stars</option>
          <option value="forks">Forks</option>
        </Form.Control>
        <Button type="Submit">Search</Button>
      </Form>
      <div className="repos-container">
        {repos.map((repo) => (
          <ListGroup.Item key={repo.id} className="repo-item">
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
            <p>{repo.description}</p>
            <p>Stars: {repo.stargazers_count}</p>
            <p>Forks: {repo.forks_count}</p>
          </ListGroup.Item>
        ))}
      </div>
    </div>
  );
}

export default Search;

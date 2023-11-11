// Front-end code using React

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';



function ArticleView() {
    const [pass_key, setPassKey] = useState('');
    const { link_name } = useParams();
    const [content, setContent] = useState('');
    const [err, setErr] = useState('');
    const retrieveContent = (link_name, pass_key) => {
      return axios
        .get(`http://localhost:3000/api/link/${link_name}/${pass_key}`)
        .then((response) => {
          const data = response.data;
          setContent(data);
        })
        .catch((error) => {
          console.error('Error:', error);
          console.log('ERROR:', error.message);
          setErr("Try again");
        });
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      retrieveContent(link_name, pass_key);
};

  return (
    <div className='beautiful-box'>
  
      {(content || err) ? (
        <p className="box-paragraph" style={{ fontSize: `20.6px` }}>
        {content || err}
      </p>
      ) : (
    <form id="retrive" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="pass_key">Your Link Name is : {link_name}</label>
          <input
            className='input-pass'
            type="password"
            placeholder="Pass key For This Link :"
            value={pass_key}
            onChange={(e) => setPassKey(e.target.value)}
            required
          />
          <button type='submit'>Retrieve Content</button>
        </div>
    </form>
      )}
      </div>
  );
}

export default ArticleView;

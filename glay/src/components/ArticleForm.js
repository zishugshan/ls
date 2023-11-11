// components/ArticleForm.js
import React , { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'

const ArticleForm = () => {
    const [linkData, setLinkData] = useState({
        link_name: '',
        content: '',
        pass_key: '',
        
      });
      
      const navigate = useNavigate();
    

      const handleChange = (e) => {
        const { name, value } = e.target;
        setLinkData({ ...linkData, [name]: value });
      };
        const handleSubmit = async (e) => {
            e.preventDefault();
    
        try {
          const response = await fetch('http://localhost:3000/api/link', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(linkData),
          });
    
          if (response.ok) {
            // Reset the form
            setLinkData({
              link_name: '',
              content: '',
              pass_key: '',
            });

            navigate(`/link/${linkData.link_name}`);
          } else {
            alert('Failed to submit your data. Please try again later.');
          }
        } catch (error) {
          console.error('Error submitting your data:', error);
        }
      };

      
        // ... Rest of your code
      



  return (
    <form id="success"  onSubmit={handleSubmit}>
        <div>
          <label htmlFor="link_name">Your Link Name :</label>
          <input
            placeholder='a_link_example_name'
            type="text"
            id="link_name"
            name="link_name"
            value={linkData.link_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Description :</label>
          <textarea
            id="content"
            name="content"
            value={linkData.content}
            onChange={handleChange}
            required
          />
        </div>
        <div></div>
        <div>
          <label htmlFor="pass_key">Pass key For This Link :</label>
          <input
            placeholder='pass key for the link'
            type="password"
            id="pass_key"
            name="pass_key"
            value={linkData.pass_key}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <button type="submit">Next</button>
        </div>
    </form>
  );
};
export default ArticleForm;

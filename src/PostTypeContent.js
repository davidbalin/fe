

import axios from 'axios';
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';




import Navbar from './Navbar';

import Contents from './Contents';

import Search from './Search';


function PostTypeContent() {
  const { type } = useParams();

  
  

  const [content, setContent] = useState("default");
  const [posts, setPosts] = useState([]);
  const [language, setLanguage] = useState('en');
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState(''); // Add this line

  const [resetSearch, setResetSearch] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // new state


  const [defaultContent, setDefaultContent] = useState(null); // new state

  const [translations, setTranslations] = useState({}); // New state variable


  





  useEffect(() => {
    axios.get(`https://ukrainetest.flywheelsites.com/wp-json/wp/v2/${type}?lang=${language}`)
      .then(res => {
        // Check if the post has the default taxonomy and if it is not empty
        const defaultPost = res.data.find(post => post.default && post.default.length > 0);
        
        if (defaultPost) {
          setDefaultContent(defaultPost.content.rendered);
          setTranslations(defaultPost.translations); // Store the translations
        } else {
          setDefaultContent("no default content");
        }

        const nonDefaultPosts = res.data.filter(post => !post.default || post.default.length === 0);
        setPosts(nonDefaultPosts);
      })
      .catch(err => console.log(err));
  }, [language, type]);
  console.log(posts);

  


  const handleContentChange = (newContent) => {
    setContent(newContent);
  };


  const handleBackClick = () => {
    setContent("default");
    setHasSearched(false);
  };

  const handleBackToDefaultClick = () => {
    setContent("default");
    setResults([]);
    setQuery('');
    setResetSearch(true);
    setHasSearched(false);
  };

  const resetSearchHandled = () => {
    setResetSearch(false);
  };


  const handleLanguageChange = async (newLanguage) => {
    setLanguage(newLanguage);
    // Fetch the translated content
    const response = await axios.get(`https://ukrainetest.flywheelsites.com/wp-json/wp/v2/${type}/${translations[newLanguage]}?lang=${newLanguage}`);
    setDefaultContent(response.data.content.rendered);
  }

  


  const search = async (query) => {
    try {
      console.log(query);
      setQuery(query);
      const response = await axios.get(`https://ukrainetest.flywheelsites.com/wp-json/wp/v2/posts?search=${query}`);
      console.log(response.data);
      setHasSearched(true);
      setResults(response.data);
      setContent("searchResults");
    } catch (error) {
      console.error(error);
    }
  };


 





















  return (
    <div className="">
      <>
  {/*  This site was created in Webflow. https://www.webflow.com  */}
  {/*  Last Published: Tue Jun 27 2023 20:45:03 GMT+0000 (Coordinated Universal Time)  */}
  <meta charSet="utf-8" />
  <title>Ukraine to USA Resources</title>
  <meta content="Ukraine to USA Resources" property="og:title" />
  <meta content="Ukraine to USA Resources" property="twitter:title" />
  <meta content="width=device-width, initial-scale=1" name="viewport" />
  <meta content="Webflow" name="generator" />
  <link href="css/normalize.css" rel="stylesheet" type="text/css" />
  <link href="css/webflow.css" rel="stylesheet" type="text/css" />
  <link
    href="css/refugeehubbuild.webflow.css"
    rel="stylesheet"
    type="text/css"
  />
  <link href="https://fonts.googleapis.com" rel="preconnect" />
  <link
    href="https://fonts.gstatic.com"
    rel="preconnect"
    crossOrigin="anonymous"
  />
  <link href="images/favicon.png" rel="shortcut icon" type="image/x-icon" />
  <link href="images/webclip.svg" rel="apple-touch-icon" />
  <Navbar className="styleguide_sidebar" onLinkClick={handleContentChange} posts={posts} type={type}/>
  {/* <div className="styleguide_sidebar">
    <div className="styleguide_list">
      <h1 className="text-big">Ukraine -&gt; USA</h1>
      <div className="nav-menu-wrapper">
        <div className="nav-link-wrapper">
          <a href="#" className="styleguide_link">
            <strong className="bold-text-2">VISA</strong>
          </a>
          <a href="#" className="styleguide_link">
            <strong className="bold-text-2">Legal</strong>
          </a>
          <a href="#" className="styleguide_link">
            <strong className="bold-text-2">Employment</strong>
          </a>
          <a href="#" className="styleguide_link">
            <strong className="bold-text-2">Culture</strong>
          </a>
          <a href="#" className="styleguide_link">
            <strong className="bold-text-2">Community</strong>
          </a>
          <a href="#" className="styleguide_link">
            <strong className="bold-text-2">Blog</strong>
          </a>
        </div>
        <a href="index.html" className="styleguide_link">
          Back to home
        </a>
      </div>
    </div>
  </div> */}
  <div className="div-block-8 not-listening">
  
  

    <div className="w-layout-blockcontainer w-container">
      <div className="country-title">
        <h1 className="heading-3">{type}</h1>
      </div>
      <div className="div-block-12">
        <a href="#" className="link-block-20 w-inline-block">
          <div className="w-layout-grid grid-3">
            <div
              id="w-node-_11a73301-557e-9d1a-54e4-ee4d2c6667b6-e0625fb8"
              className="text-block-21"
            >
              Search
            </div>
            <img
              src="images/material-symbols_search.svg"
              loading="lazy"
              id="w-node-_11a73301-557e-9d1a-54e4-ee4d2c6667b8-e0625fb8"
              alt=""
              className="image-59"
            />
          </div>
        </a>
        <a href="#" className="link-block-20 w-inline-block">
          <div className="w-layout-grid grid-3">
            <div
              id="w-node-_030a50c1-9261-2d32-fbb8-36b52495a11c-e0625fb8"
              className="text-block-21"
            >
              Ask AI
            </div>
            <img
              src="images/mdi_magic.svg"
              loading="lazy"
              id="w-node-_030a50c1-9261-2d32-fbb8-36b52495a11e-e0625fb8"
              alt=""
              className="image-58"
            />
          </div>
        </a>
      </div>
      <div>
        <div className="w-layout-grid grid-5">
          
          <div>
            <Search query={query} onQueryChange={setQuery} onSearch={search} resetSearch={resetSearch} resetSearchHandled={resetSearchHandled} />
          </div>
          <div
            id="w-node-_5e6c8d7d-800c-6ba7-74cb-7dde86b0c080-e0625fb8"
            className="div-block-13"
          >
            <a
              id="w-node-_7c9bd441-0aae-a0af-0675-06cc9a9e549f-e0625fb8"
              href="ukraine-ai.html"
              className="link-block-20 w-inline-block"
            >
              <div className="w-layout-grid grid-3">
                <div
                  id="w-node-_7c9bd441-0aae-a0af-0675-06cc9a9e54a1-e0625fb8"
                  className="text-block-21"
                >
                  Ask AI
                </div>
                <img
                  src="images/mdi_magic.svg"
                  loading="lazy"
                  id="w-node-_7c9bd441-0aae-a0af-0675-06cc9a9e54a3-e0625fb8"
                  alt=""
                  className="image-58"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="div-block-6">
        
        <a
          id="w-node-_049fd62e-9840-648c-7650-c63f74ab0635-e0625fb8"
          href="#"
          className="link"
        >
          VISA
        </a>
        <a href="#" className="link">
          Legal
        </a>
        <a href="#" className="link">
          Employment
        </a>
        <a href="#" className="link">
          Culture
        </a>
        <a href="#" className="link">
          Community
        </a>
        <a href="#" className="link">
          Blog
        </a>
      </div>
      <div className="div-block-7">
      
      {/* <select  class = "select-dropdown"onChange={e => handleLanguageChange(e.target.value)}>
          <option value="en">English</option>
          <option value="ru">Russian</option>
          <option value="uk">Ukrainian</option>
      </select> */}
        


        <Contents className = "content-for-website" content = {content} onBackClick={handleBackClick} 
        posts={posts} results = {results} onBackToDefaultClick={handleBackToDefaultClick} searchQuery={query} 
        hasSearched={hasSearched} defaultContent={defaultContent}  />
      </div>
    </div>
  </div>
  <div
    data-collapse="all"
    data-animation="over-right"
    data-duration={400}
    id="Top"
    data-easing="ease"
    data-easing2="ease"
    role="banner"
    className="navbar navbar-3 w-nav"
  >
    <div className="div-block-22">
  <div data-hover="false" data-delay={0} className="w-dropdown">
    <div className="w-dropdown-toggle">
      <div className="w-icon-dropdown-toggle" />
      <div className="text-block-22">
        <select
          className="select-dropdown"
          onChange={e => handleLanguageChange(e.target.value)}
        >
          <option value="en">EN</option>
          <option value="ru">Рус</option>
          <option value="uk">Укр</option>
        </select>
      </div>
    </div>
    <nav className="w-dropdown-list">
      <a href="#" className="dropdown-link-3 linkoo w-dropdown-link">
        Рус
      </a>
      <a href="#" className="dropdown-link-4 linkoo w-dropdown-link">
        Укр
      </a>
    </nav>
  </div>
</div>
    <nav role="navigation" className="nav-menu-12 w-nav-menu">
      <img
        src="images/Ralphie.png"
        width={100}
        sizes="100vw"
        srcSet="images/Ralphie-p-500.png 500w, images/Ralphie.png 618w"
        alt=""
        className="image-7"
      />
      <a href="#" className="nav-link-19 w-nav-link">
        newsletter
      </a>
      <a
        href="#"
        className="nav-link-19 w-hidden-main w-hidden-medium w-hidden-small w-hidden-tiny w-nav-link"
      >
        Layout 2
      </a>
      <a href="#" className="nav-link-19 w-nav-link">
        read more
      </a>
      <a
        href="#"
        className="nav-link-19 w-hidden-main w-hidden-medium w-hidden-small w-hidden-tiny w-nav-link"
      >
        Portfolio
      </a>
      <a
        data-ix="fade-in-on-click"
        href="#"
        className="nav-link-19 w-hidden-main w-hidden-medium w-hidden-small w-hidden-tiny w-nav-link"
      >
        Newsletter
      </a>
      <a
        href="#"
        className="nav-link-19 w-hidden-main w-hidden-medium w-hidden-small w-hidden-tiny w-nav-link"
      >
        Journal
      </a>
      <a
        href="https://orangecattle.com"
        target="_blank"
        className="nav-link-19 w-nav-link"
      >
        contact
      </a>
    </nav>
    <div className="div-block-11">
      <a href="/" className="link-block-22 w-inline-block" />
    </div>
  </div>
</>

        
    </div>
  );
}

export default PostTypeContent;

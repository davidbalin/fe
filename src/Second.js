import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes, Outlet, BrowserRouter} from 'react-router-dom';
import PostTypeContent from './PostTypeContent';
import Navbar from './Navbar';
import Contents from './Contents';
import Search from './Search'; 
import NavbarMain from './NavbarMain';
import LanguageContext from './LanguageContext';
import Home from './Home';


//import i18n 


const Second = () => {
  const [postTypesPosts, setPostTypesPosts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  



  const [content, setContent] = useState("default");
  const [posts, setPosts] = useState([]);
  const [language, setLanguage] = useState('fr');
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState(''); // Add this line

  const [resetSearch, setResetSearch] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // new state




  useEffect(() => {
    axios.get(`https://ukrainetest.flywheelsites.com/wp-json/wp/v2/posts?lang=${language}`)
      .then(res => setPosts(res.data))
      .catch(err => console.log(err));
  }, [language]);



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


  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };


  const search = async (query) => {
    try {
      console.log(query);
      setQuery(query);
  
      const response = await axios.get(`https://ukrainetest.flywheelsites.com/wp-json/wp/v2/search/?search=${query}`);
      console.log(response.data);
      setHasSearched(true);
      
      // We'll map through the results and make a request for each
      const fullResults = await Promise.all(response.data.map(async (result) => {
        const resultResponse = await axios.get(result._links.self[0].href);
        return resultResponse.data;
      }));
  
      setResults(fullResults);
      setContent("searchResults");
    } catch (error) {
      console.error(error);
    }
  };




  useEffect(() => {
    const excludeTypes = ['Pages', 'Media', 'Navigation Menu Items', 'Reusable blocks', 'Templates', 'Template Parts', 'Navigation Menus','Posts', 'Patterns'];
    setIsLoading(true);

    axios.get('https://ukrainetest.flywheelsites.com/wp-json/wp/v2/types')
      .then((response) => {
        const postTypes = Object.values(response.data)
          .filter(type => !excludeTypes.includes(type.name) && type._links && type._links['wp:items'] && type._links['wp:items'][0] && type._links['wp:items'][0].href);

        console.log(postTypes);

        const postPromises = postTypes.map(type =>
          axios.get(type._links['wp:items'][0].href)
            .then(response => {
              return { [type.name]: response.data.map(post => post.title.rendered) };
            })
        );

        Promise.all(postPromises)
          .then(postArrays => {
            const combinedPosts = Object.assign({}, ...postArrays);
            setPostTypesPosts(combinedPosts);
            
          });

          setIsLoading(false);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div className ="body-3">
    {isLoading ? (
      <div className="loading-screen">
        
        {/* You can replace the above with a spinner or any loading animation you prefer */}
      </div>
    ) : (<> 
      
  <NavbarMain posts={Object.keys(postTypesPosts)} />
  <Routes>
    <Route path="/" element={
      <>
        <div className="">
      <>
  
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
  {/* <Navbar onLinkClick={handleContentChange} posts={posts} /> */}
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
        <h1 className="heading-3">Ukraine -&gt; WA</h1>
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
  {Object.keys(postTypesPosts).reverse().map((postType) => (
    <Link to={`/wa/${postType}`} className="styleguide_link" key={postType}>
      {postType}
    </Link>
  ))}
</div>
      <div className="div-block-7">
      
        {/* <select className="select-dropdown" onChange={e => handleLanguageChange(e.target.value)}>
          <option value="en">English</option>
          <option value="ru">Russian</option>
          <option value="uk">Ukrainian</option>
        </select> */}
        


          <Contents content = {content} onBackClick={handleBackClick} 
        posts={posts} results = {results} onBackToDefaultClick={handleBackToDefaultClick} searchQuery={query} 
        hasSearched={hasSearched}  />


        <p>Welcome to Washington State!</p>
 
        
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
          <div className="text-block-22">EN</div> 
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
   
    <div className="div-block-11">
      <a href="/" className="link-block-22 w-inline-block" />
    </div>
  </div>
</>

        
    </div>
  


         
        {/* other homepage components */}
      </>
    }/>
    {Object.entries(postTypesPosts).map(([postType], index) => (
              <Route path={`/:type`} key={index} element={<PostTypeContent />} />

    ))}
  </Routes> </> )}

 


    



    </div>

    

    

  );
}

export default Second;

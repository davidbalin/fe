const Navbar = ({ onLinkClick, posts, type }) => {
  // Make sure posts are available and sort them
  const sortedPosts = posts && [...posts].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div>
      <div className="styleguide_sidebar">
        <div className="styleguide_list">
          <h1 className="text-big">{type}</h1>
          <div className="nav-menu-wrapper">
            <div className="nav-link-wrapper">
              {sortedPosts && sortedPosts.map(post => (
                post.title && <a 
                  href="#" 
                  className="styleguide_link"  
                  onClick={() => onLinkClick(post.title.rendered)} 
                  key={post.id}
                >
                  <strong className="bold-text-2">{post.title.rendered}</strong>
                </a>
              ))}
            </div>
            <a href="./" className="styleguide_link">
              Back to home
            </a>
          </div>
        </div>
      </div>
    </div>
  ); 
}

export default Navbar;

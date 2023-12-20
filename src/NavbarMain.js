import { Link } from 'react-router-dom';

const NavbarMain = ({ posts }) => {
  // Create a copy of the array before reversing, because reverse() modifies the original array
  const reversedPosts = [...posts].reverse();
  
  return (
    <div className="styleguide_sidebar">
      <div className="styleguide_list">
        <h1 className="text-big">Ukraine -&gt; WA</h1>
        <div className="nav-menu-wrapper">
          <div className="nav-link-wrapper">
            {reversedPosts.map((postType) => (
                          <Link to={`/wa/${postType}`} className="styleguide_link" key={postType}>

                <strong className="bold-text-2">{postType}</strong>
              </Link>
            ))}
          </div>
          <Link to="/" className="styleguide_link">Back to home</Link>
        </div>
      </div>
    </div>
  );
}

export default NavbarMain;
 
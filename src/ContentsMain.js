import React, { useState } from 'react';

const ContentsMain = ({ content, posts, results, onBackClick, onBackToDefaultClick, searchQuery, hasSearched  }) => {
    const [selectedSearchResult, setSelectedSearchResult] = useState(null);
    const displayContent = posts.find(post => post.title.rendered === content);

    const handleSearchResultClick = (post) => {
        setSelectedSearchResult(post);
    };

    const handleBackToResultsClick = () => {
        setSelectedSearchResult(null);
    };

    const extractPreview = (content, term) => {
        const lowerCaseContent = content.toLowerCase();
        const lowerCaseTerm = term.toLowerCase();

        const index = lowerCaseContent.indexOf(lowerCaseTerm);

        if (index !== -1) {
            const start = Math.max(index - 100, 0);
            const end = Math.min(index + term.length + 100, content.length);

            return '...' + content.substring(start, end) + '...';
        }

        return content;
    };

    if (selectedSearchResult) {
        return (
            <div>
                <button onClick={handleBackToResultsClick}>Back to search results</button>
                <div dangerouslySetInnerHTML={{ __html: selectedSearchResult.content.rendered }} />
            </div>
        );
    }

    if (results && results.length > 0) {
        return (
            <div>
                <button onClick={onBackToDefaultClick}>Back to Resources Page</button>
                {results.map((result) => (
                    <div key={result.id} onClick={() => handleSearchResultClick(result)}>
                        

                        <h3>{result.title.rendered}</h3>
                        <p dangerouslySetInnerHTML={{ __html: extractPreview(result.content.rendered, searchQuery) }} />
                    </div>
                ))}
                
            </div>
        );
    }

    if (hasSearched && (!results || results.length === 0)) {
        return (
            <div>
                <button onClick={onBackToDefaultClick}>Back to Resources Page</button>
                <p>No search results</p>
            </div>
        );
    }

    return (
        <div>
            {content !== "default" && <button onClick={onBackClick}>Back</button>}
            {displayContent 
                ? <div dangerouslySetInnerHTML={{__html: displayContent.content.rendered}} />
                : <p>
                    <p>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                          varius enim in eros elementum tristique.
                        </p>
                    </p>
                </p>
            }
        </div>
    );
};

export default ContentsMain;

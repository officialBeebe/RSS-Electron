import React from 'react';
import PropTypes from 'prop-types';

function NewsCard({ data }) {

    const { title, publisher, link, pubDate, description, category } = data || {};

    const getColor = (category) => {
        switch (category) {
            case 'News':
                return '#1E90FF'; // DodgerBlue, representing trust and reliability
            case 'Technology':
                return '#32CD32'; // LimeGreen, representing growth and innovation
            case 'Science':
                return '#FFD700'; // Gold, symbolizing discovery and knowledge
            case 'Investigative Journalism':
                return '#FF6347'; // Tomato, reflecting urgency and intensity
            case 'Cybersecurity':
                return '#708090'; // SlateGray, representing protection and security
            default:
                return '#D3D3D3'; // LightGray, neutral for undefined categories
        }
    };

    const handleCardClick = () => {
        if (link) {
            window.electron.openExternal(link);
        }
    };

    const truncateDescription = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <div
            className='news-card'
            style={{ backgroundColor: getColor(category), cursor: 'pointer' }}
            onClick={handleCardClick}
            role="button" // Indicate that this div acts as a button
            aria-label={`News card: ${title} from ${publisher}. Published on ${new Date(pubDate).toLocaleDateString()}. Click to read more.`}
        >
            <fieldset>
                <legend className='news-card-publisher'>{publisher}</legend>
                <div className='news-card-grid'>
                    <h3 className='news-card-title'>{title}</h3>
                    <p className='news-card-description'>{truncateDescription(description, 350)}</p>
                    <p className='news-card-date'>{new Date(pubDate).toLocaleDateString()}</p>
                </div>
            </fieldset>
        </div>
    );
}

NewsCard.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.string.isRequired,
        publisher: PropTypes.string.isRequired,
        link: PropTypes.string,
        pubDate: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
    }).isRequired,
};

export default NewsCard;

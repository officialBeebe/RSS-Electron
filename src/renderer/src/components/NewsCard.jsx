import React from 'react';
import PropTypes from 'prop-types';

function NewsCard({ data }) {

    const { title, publisher, link, pubDate, description, category } = data || {};

    const getColor = (category) => {
        switch (category) {
            case 'World News':
                return '#1E90FF'; // DodgerBlue, representing trust and reliability

            case 'Local News':
                return '#1E90FF'; // DodgerBlue, same as World News for consistency

            case 'Journalism':
                return '#FF6347'; // Tomato, reflecting urgency and intensity

            case 'Cybersecurity':
                return '#708090'; // SlateGray, representing protection and security

            case 'Technology':
                return '#32CD32'; // LimeGreen, representing growth and innovation

            case 'Science':
                return '#FFD700'; // Gold, symbolizing discovery and knowledge

            case 'Business & Finance':
                return '#2E8B57'; // SeaGreen, representing stability and growth

            case 'Entertainment':
                return '#FF69B4'; // HotPink, representing creativity and excitement

            case 'Sports':
                return '#FF4500'; // OrangeRed, representing energy and action

            case 'Health & Wellness':
                return '#8A2BE2'; // BlueViolet, representing well-being

            case 'Lifestyle':
                return '#FFB6C1'; // LightPink, representing lifestyle and light topics

            case 'Politics':
                return '#8B0000'; // DarkRed, representing seriousness and formality

            case 'Education':
                return '#6A5ACD'; // SlateBlue, representing wisdom and knowledge

            case 'Environment & Nature':
                return '#228B22'; // ForestGreen, representing nature

            case 'Culture & Society':
                return '#9370DB'; // MediumPurple, representing diverse perspectives

            case 'Automotive':
                return '#4682B4'; // SteelBlue, representing technology and innovation

            case 'Gaming':
                return '#FF4500'; // OrangeRed, representing excitement and fun

            case 'Travel':
                return '#20B2AA'; // LightSeaGreen, representing exploration

            case 'Real Estate':
                return '#A52A2A'; // Brown, representing earth and stability

            case 'Opinion & Editorial':
                return '#B22222'; // FireBrick, representing strong viewpoints

            case 'Art & Design':
                return '#D2691E'; // Chocolate, representing creativity

            case 'Other':
                return '#D3D3D3'; // LightGray, neutral for undefined categories

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
        if (text?.length > maxLength) {
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

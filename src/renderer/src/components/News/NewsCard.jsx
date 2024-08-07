import PropTypes from 'prop-types';
import './NewsCard.css';

function NewsCard({ data }) {

    const { title, publisher, link, pubDate, description, category } = data || {};

    const concatCategory = (category) => {
        let concat = category.split(' ').join('-').toLowerCase();
        return concat;
    }

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
            className={`news-card ${concatCategory(category)}`}
            style={{ cursor: 'pointer' }}
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

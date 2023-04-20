import PropTypes from 'prop-types';
import './StatisticsCard.css';



const StatisticCard = ({ color, title, count }) => {
    <div>
        {/* data = {Data}/ */}
        {/* <p>color: {color}</p> */}
        <p>title: {title}</p>
        <p>count: {count}</p>
        
        

    </div>
    return (
        <div className="statistics-card" style={{backgroundColor: color}}>

          <div className="statistics-card-content">
            <div className="statistics-card-title">{title}</div>
            <div className="statistics-card-value">{count}</div>
          </div>
        </div>
      );
    
};

StatisticCard.propTypes = {
    color: PropTypes.string,    
    title: PropTypes.string,

};

StatisticCard.defaultProps = {
    color: 'White',
    title: 'total',
    count: '0',
};

export default StatisticCard;

import PropTypes from 'prop-types';



const StatisticCard = ({ color, title, count }) => (
    <div>
        {/* data = {Data}/ */}
      
        {/* <p>color: {color}</p> */}
        <p>title: {title}</p>
        <p>count: {count}</p>
        

    </div>
    
);

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

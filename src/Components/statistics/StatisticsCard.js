import PropTypes from 'prop-types';
import './StatisticsCard.css';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import EqualizerIcon from '@mui/icons-material/Equalizer';

const StatisticCard = ({ color, title, count, icon }) => {
  let iconComponent;
  switch (icon) {
    case 'check':
      iconComponent = <CheckIcon className="statistics-card-icon" />;
      break;
    case 'error':
      iconComponent = <ErrorIcon className="statistics-card-icon" />;
      break;
    case 'equalizer':
      iconComponent = <EqualizerIcon className="statistics-card-icon" />;
      break;
    default:
      iconComponent = null;
  }

  return (
    <div className="statistics-card" style={{backgroundColor: color}}>
      {iconComponent}
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
  icon: PropTypes.oneOf(['check', 'error', 'equalizer']),
};

StatisticCard.defaultProps = {
  color: 'White',
  title: 'total',
  count: '0',
  icon: null,
};

export default StatisticCard;
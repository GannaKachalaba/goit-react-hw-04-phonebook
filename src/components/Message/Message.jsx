import PropTypes from 'prop-types';
import css from 'components/Message/Message.module.css';

const Message = ({ text }) => {
  return (
    <div className={css.wrapper}>
      <p className={css.text}>{text}</p>
    </div>
  );
};

Message.prototype = {
  text: PropTypes.string.isRequired,
};

export default Message;

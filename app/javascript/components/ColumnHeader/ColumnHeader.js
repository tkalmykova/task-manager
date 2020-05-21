import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';

import useStyles from './useStyles';

const ColumnHeader = ({ column, onLoadMore }) => {
  const styles = useStyles();

  const {
    id,
    title,
    cards,
    meta: { totalCount, currentPage, totalPages },
  } = column;

  const count = cards.length;

  const handleLoadMore = () => onLoadMore(id, currentPage + 1);

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <b>{title}</b> ({count}/{totalCount || '…'})
      </div>
      <div className={styles.actions}>
        {currentPage !== totalPages && (
          <IconButton aria-label="Load more" onClick={() => handleLoadMore()}>
            <SystemUpdateAltIcon fontSize="small" />
          </IconButton>
        )}
      </div>
    </div>
  );
};

ColumnHeader.propTypes = {
  column: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    cards: PropTypes.array,
    meta: PropTypes.shape({
      totalCount: PropTypes.number,
      currentPage: PropTypes.number,
      totalPages: PropTypes.number,
    }),
  }),
  onLoadMore: PropTypes.func,
};

ColumnHeader.defaultProps = {
  column: PropTypes.shape({
    id: 0,
    title: ' ',
    cards: [],
    meta: PropTypes.shape({
      totalCount: 0,
      currentPage: 0,
      totalPages: 0,
    }),
  }),
  onLoadMore: () => {},
};

export default ColumnHeader;

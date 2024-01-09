import React from 'react';
import Empty from '../Empty';

const ShowComponent = ({hasElse = false, condition = false, children}) => {
  const arrChildren = React.Children.toArray(children);

  if (condition) {
    return arrChildren[0];
  } else {
    return hasElse ? arrChildren[1] : <Empty />;
  }
};

export default ShowComponent;

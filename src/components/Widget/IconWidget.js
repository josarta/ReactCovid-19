import React from 'react';
import classNames from 'classnames';
import { Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

import PropTypes from '../../utils/propTypes';



const IconWidget = ({
  bgColor,
  icon: Icon,
  iconProps,
  title,
  valor,
  subtitle,
  className,
  ...restProps
}) => {
  const classes = classNames('cr-widget', className, {
    [`bg-${bgColor}`]: bgColor,
  });
  return (
    <Card inverse className={classes} {...restProps}>
      <CardBody className="cr-widget__icon">
        <Icon size={50} {...iconProps} />
      </CardBody>
      <CardBody>
        <CardTitle>{valor}</CardTitle>
        <CardSubtitle>{subtitle}</CardSubtitle>
      </CardBody>
    </Card>
  );
};

IconWidget.propTypes = {
  bgColor: PropTypes.string,
  icon: PropTypes.component,
  iconProps: PropTypes.object,
  title: PropTypes.string,
  valor: PropTypes.string,
  subtitle: PropTypes.string,
};

IconWidget.defaultProps = {
  bgColor: 'success',
  icon: 'span',
  iconProps: { size: 50 },
};

export default IconWidget;

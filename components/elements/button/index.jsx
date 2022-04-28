/* eslint-disable no-nested-ternary */
import classnames from 'classnames';
import Link from 'next/link';

const Button = (props) => {
  const {
    href, onClick, className, children, isExternal, isDisabled,
  } = props;

  const disabledClass = isDisabled ? 'is-disabled' : '';
  const classProps = classnames(`dh-btn ${disabledClass}`, className);

  const component = isDisabled ? (
    <a className={classProps} onClick={() => {}}>
      {children}
    </a>
  )
    : href && !isExternal ? (
      <Link href={href}>
        <a className={classProps}>
          {children}
        </a>
      </Link>
    ) : href && isExternal ? (
      <a className={classProps} href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    ) : (
      <a onClick={onClick} className={classProps}>
        {children}
      </a>
    );

  return component;
};

export default Button;

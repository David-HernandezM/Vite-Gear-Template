import { JSX } from 'react';
import { Account } from './account';
import styles from './Header.module.scss';

type Props = {
  isAccountVisible: boolean;
  children: JSX.Element
};

function Header({ isAccountVisible, children }: Props) {
  return (
    <header className={styles.header}>
      {children}
      {isAccountVisible && <Account />}
    </header>
  );
}

export { Header };

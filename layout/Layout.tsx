import React, {ReactNode, useState} from 'react'
import Link from "next/link";
import {Inter} from 'next/font/google'
import styles from './Layout.module.scss'
import cn from 'classnames'
import {
  BarcodeOutlined,
  NumberOutlined,
  KeyOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from "@ant-design/icons";
import {useRouter} from "next/router";

const inter = Inter({subsets: ['latin', 'cyrillic']})

interface LayoutProps {
  children: ReactNode
}

const MenuItems = [
  {
    path: '/',
    icon: <BarcodeOutlined style={{fontSize: 24}}/>,
    label: 'Генератор артикулов'
  },
  {
    path: '/password',
    icon: <KeyOutlined style={{fontSize: 24}}/>,
    label: 'Генератор паролей'
  },
  {
    path: '/number',
    icon: <NumberOutlined style={{fontSize: 24}}/>,
    label: 'Генератор чисел'
  }
]

const Layout = ({children}: LayoutProps) => {
  const [active, setActive] = useState<boolean>(false)
  const router = useRouter();

  const toggleActive = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    setActive(!active)
  }

  return (
    <div className={cn(inter.className, styles.layout, {
      [styles.active]: active
    })}>
      <aside className={styles.sidebar}>
        <nav className={styles.navbar}>
          <ul className={styles.list}>
            <li className={styles.trigger}>
              <Link
                href='#'
                className={styles.item}
                onClick={toggleActive}
              >
                {active ? <MenuFoldOutlined style={{fontSize: 24}}/> : <MenuUnfoldOutlined style={{fontSize: 24}}/>}
                {active && <span className={styles.label}>Меню</span>}
              </Link>
            </li>
            {MenuItems.map(item =>
              <li key={item.path}>
                <Link href={item.path} className={cn(styles.item, {
                  [styles.activeItem]: router.pathname === item.path
                })}>
                  {item.icon}
                  {active && <span className={styles.label}>{item.label}</span>}
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </aside>
      <main className={styles.content}>{children}</main>
    </div>
  )
}

export default Layout

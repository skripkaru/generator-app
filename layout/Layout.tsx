import {ReactNode, useState} from 'react'
import Link from "next/link";
import {Inter} from 'next/font/google'
import styles from './Layout.module.scss'
import cn from 'classnames'
import {HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {Button} from "antd";

const inter = Inter({subsets: ['latin', 'cyrillic']})

interface LayoutProps {
  children: ReactNode
}

const Layout = ({children}: LayoutProps) => {
  const [active, setActive] = useState(false)

  return (
    <div className={cn(inter.className, styles.layout, {
      [styles.active]: active
    })}>
      <aside className={styles.sidebar}>
        <nav className={styles.navbar}>
          <ul className={styles.list}>
            <li>
              <Button
                className={styles.item}
                type='text'
                onClick={() => setActive(!active)}
              >
                {active ? <MenuFoldOutlined/> : <MenuUnfoldOutlined/>}
                {active && 'Меню'}
              </Button>
            </li>
            <li>
              <Link href='/' className={styles.item}>
                <Button
                  className={styles.item}
                  type='text'
                >
                  <HomeOutlined/>
                  {active && 'Главная'}
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className={styles.content}>{children}</main>
    </div>
  )
}

export default Layout

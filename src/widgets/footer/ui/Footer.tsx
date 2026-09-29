import { Text, YeahubLogo } from '@/shared/ui'
import style from './style.module.css'
import { Link } from 'react-router'
import Figma from '@/shared/assets/images/Figma.png'
import GitHub from '@/shared/assets/images/Github_white.png'
import Telegram from '@/shared/assets/images/Telegram_white.png'

const FOOTER_TEXT_COLOR = '#8C8C8C'

export const Footer = () => {
  return (
    <footer className={style.footer}>
      <Link to="/">
        <YeahubLogo theme="white" layout="text" />
      </Link>
      <div>
        <Text size={16} style={{ marginBlockEnd: 'var(--size-16)' }}>
          Выбери, каким будет IT завтра, вместе с нами
        </Text>
        <Text size={12} color={FOOTER_TEXT_COLOR}>
          YeaHub — это полностью открытый проект, призванный объединить и улучшить IT-сферу. Наш
          исходный код доступен для просмотра на GitHub. Дизайн проекта также открыт для
          ознакомления в Figma.
        </Text>
      </div>
      <div className={style.last}>
        <div className={style['socials-container']}>
          <Text color={FOOTER_TEXT_COLOR}>Ищите нас и в других соцсетях @yeahub_it</Text>
          <a href="#" target="_blank" className={style.social}>
            <img src={Figma} alt="Figam link." />
          </a>
          <a href="#" target="_blank" className={style.social}>
            <img src={GitHub} alt="GitHub link." />
          </a>
          <a href="#" target="_blank" className={style.social}>
            <img src={Telegram} alt="Telegram link." />
          </a>
        </div>
        <Text color={FOOTER_TEXT_COLOR}>@2026 YeaHub</Text>
      </div>
    </footer>
  )
}

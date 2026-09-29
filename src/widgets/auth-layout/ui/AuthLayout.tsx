import { Link, Outlet } from 'react-router'
import style from './style.module.css'
import { MarkerLi, Text, YeahubLogo } from '@/shared/ui'
import { useBreakpoints } from '@/shared/lib/hooks'
import Marker from '../../../shared/assets/icons/list-check-mark.svg'

export const AuthLayout = () => {
  const { isDesktop } = useBreakpoints()
  return (
    <div className={style.layout}>
      {isDesktop && (
        <div className={style.banner}>
          <div>
            <Link to="/">
              <YeahubLogo theme="white" />
            </Link>
            <Text size={16} style={{ marginBlockStart: '8px' }}>
              YeaHub объединяет IT-специалистов
            </Text>
          </div>
          <div className={style['list-container']}>
            <Text as="h2" size={24} style={{ marginBlockEnd: '14px' }}>
              Стань частью сообщества YeaHub и получи:
            </Text>
            <ul className={style['banner-list']}>
              <MarkerLi marker={<img src={Marker} />}>
                <Text size={16}>Пошаговый план обучения</Text>
              </MarkerLi>
              <MarkerLi marker={<img src={Marker} />}>
                <Text size={16}>Карьерный рост</Text>
              </MarkerLi>
              <MarkerLi marker={<img src={Marker} />}>
                <Text size={16}>Большое сообщество специалистов</Text>
              </MarkerLi>
              <MarkerLi marker={<img src={Marker} />}>
                <Text size={16}>Обучение с ментором</Text>
              </MarkerLi>
              <MarkerLi marker={<img src={Marker} />}>
                <Text size={16}>Возможность прохождения стажировки</Text>
              </MarkerLi>
            </ul>
          </div>
        </div>
      )}
      <div className={style.container}>
        {!isDesktop && (
          <Link to="/">
            <YeahubLogo size="small" style={{ position: 'absolute', inset: '20px 10px' }} />
          </Link>
        )}
        <Outlet />
      </div>
    </div>
  )
}

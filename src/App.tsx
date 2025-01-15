import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router'
import './App.css'

import type { MenuProps } from 'antd';
import { Menu } from 'antd'
type MenuItem = Required<MenuProps>['items'][number]
const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState('');
  const MenuItems: MenuItem[]  = [
    {
      // label: (
      //   <a 
      //   className={'color-red' }
      //   onClick={() => {
      //     console.log(current)
      //     navigate('fabric')
      //     setCurrent('fabric')
      //   }}
      //   >
      //     Fabrics
      //   </a>
      // ),
      label: 'Fabrics',
      key: 'fabric',
    },
    {
      // label: (
      //   <a onClick={() => {
      //     navigate('cropper')
      //     setCurrent('cropper')
      //   }}>
      //     cropper
      //   </a>
      // ),
      label: 'Cropper',
      key: 'cropper',
    }
  ]
  useEffect(() => {
    const pathName = location.pathname.split('/')[1]
    setCurrent(pathName || 'fabric')
    return () => {
      console.log('unmount')
    }
  }, [])
  const handleMenuItemClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key)
    navigate(e.key)
  };
  return (
    <div className="App">
      <Menu
        theme={'dark'}
        onClick={handleMenuItemClick}
        mode="horizontal"
        defaultSelectedKeys={['fabric']}
        selectedKeys={[current]}
        items={MenuItems}
      />
    </div>
  )
}

export default App

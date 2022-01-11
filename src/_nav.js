import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilHome,
  cilInbox,
  cilList,
  cilSettings,
  cilSpeedometer,
  cilTransfer,
  cilUser,
} from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  // {
  //   component: CNavItem,
  //   name: 'Login',
  //   to: '/login',
  //   icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  // },
  {
    component: CNavItem,
    name: 'Objective2',
    to: '/objective2',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'Objective',
  //   to: '/objective',
  //   icon: <CIcon icon={cilInbox} customClassName="nav-icon" />,
  // },
  {
    component: CNavItem,
    name: 'User',
    to: '/user',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Emotion',
    to: '/emotion',
    icon: <CIcon icon={cilInbox} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'client List',
    to: '/clientList',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'New Product',
  //   to: '/newProduct',
  // },
  {
    component: CNavItem,
    name: 'Configuration',
    to: '/configuration',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'Register',
  //   to: '/register',
  //   icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  // },
  {
    component: CNavItem,
    name: 'Meeting',
    to: '/meeting',
    icon: <CIcon icon={cilTransfer} customClassName="nav-icon" />,
  },
]

export default _nav

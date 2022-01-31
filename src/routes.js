import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Notifications
// const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))

// const Widgets = React.lazy(() => import('./views/widgets/Widgets'))
const Configuration = React.lazy(() => import('./views/pages/configuration/Configuration'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Home = React.lazy(() => import('./views/pages/home/Home.jsx'))
const User = React.lazy(() => import('./views/pages/user/User.jsx'))
const Emotion = React.lazy(() => import('./views/pages/emotion/Emotion'))
const Meeting = React.lazy(() => import('./views/pages/meeting/Meeting'))
const ClientList = React.lazy(() => import('./views/pages/clientList/ClientList.jsx'))
const ProductList = React.lazy(() => import('./views/pages/productList/ProductList'))
const NewProduct = React.lazy(() => import('./views/pages/newProduct/NewProduct'))
const Objective = React.lazy(() => import('./views/pages/objective/Objective'))
const Objective2 = React.lazy(() => import('./views/pages/objective2/Objective2'))
const CreateNewRef = React.lazy(() => import('./views/pages/objective/createNewRef'))
const Details = React.lazy(() => import('./views/pages/ViewsDetails/Views'))
const EditRef = React.lazy(() => import('./views/pages/EditRef/EditRef'))

//Header
// const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/home', name: 'Home', component: Home },
  { path: '/user', name: 'User', exact: true, component: User },
  { path: '/emotion', name: 'Emotion', exact: true, component: Emotion },
  { path: '/meeting', name: 'Transaction', exact: true, component: Meeting },
  { path: '/clientList', name: 'ClientList', exact: true, component: ClientList },
  { path: '/productList', name: 'ProductList', exact: true, component: ProductList },
  { path: '/base', name: 'Base', component: Cards, exact: true },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/configuration', name: 'Configuration', exact: true, component: Configuration },
  { path: '/newProduct', name: 'NewProduct', exact: true, component: NewProduct },
  { path: '/objective', name: 'Objective', exact: true, component: Objective },
  { path: '/objective2', name: 'Objective2', exact: true, component: Objective2 },
  {
    path: '/objective2/createNewRef',
    name: 'Create New Ref',
    exact: true,
    component: CreateNewRef,
  },
  { path: '/:id/details', name: 'Details', component: Details },
  { path: '/details/:id/edit', name: 'Edit Reference Objective', exact: true, component: EditRef },
]

export default routes

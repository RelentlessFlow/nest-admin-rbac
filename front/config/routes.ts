export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/test',
    name: 'list.test',
    icon: 'smile',
    component: './Test',
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './SearchTable',
  },
  {
    path: '/admin_t',
    name: 'admin_t',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin_t',
        redirect: '/admin/sub-page',
      },
      {
        path: '/admin_t/sub-page',
        name: 'sub-page',
        component: './Admin',
      },
    ],
  },
  {
    path: 'admin',
    name: 'list.admin',
    icon: 'laptop',
    routes: [
      {
        path: '/admin',
        redirect: '/admin/role',
      },
      {
        path: '/admin/role',
        name: 'role',
        component: './Admin/Role'
      },
      {
        path: '/admin/menu',
        name: 'menu',
        component: './Admin/Menu'
      },
      {
        path: '/admin/resource',
        name: 'resource',
        component: './Admin/Resource'
      },
    ]
  },
  {

  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];

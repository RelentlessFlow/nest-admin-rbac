export const roles = [
  {
    name: 'admin',
    description: 'Administrator',
  },
  {
    name: 'user',
    description: 'General user',
  },
];

export const resources = [
  {
    name: 'user',
    description: 'User',
    methods: ['get', 'post', 'put', 'delete'],
  },
  {
    name: 'article',
    description: 'Article',
    methods: ['get', 'post', 'put', 'delete'],
  },
  {
    name: 'category',
    description: 'Category',
    methods: ['get', 'post', 'put', 'delete'],
  },
];

export const permissions = [
  {
    role: 'admin',
    resource: 'user',
    action: '*',
    possession: 'any',
  },
  {
    role: 'admin',
    resource: 'article',
    action: '*',
    possession: 'any',
  },
  {
    role: 'admin',
    resource: 'category',
    action: '*',
    possession: 'any',
  },
  {
    role: 'user',
    resource: 'user',
    action: ['get', 'put'],
    possession: 'own',
  },
  {
    role: 'user',
    resource: 'article',
    action: ['get', 'post'],
    possession: 'any',
  },
  {
    role: 'user',
    resource: 'category',
    action: ['get'],
    possession: 'any',
  },
];

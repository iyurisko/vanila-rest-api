
const authRoutes =  [
  {
    method: 'POST',
    url: '/auth/signin',
    controller: "auth"
  },
  {
    method: 'POST',
    url: '/api/signout',
    controller: "auth"
  },
  {
    method: 'POST',
    url: '/api/signup',
    controller: "auth"
  },
];

export default authRoutes;
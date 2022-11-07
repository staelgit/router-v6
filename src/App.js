import React from 'react';
import { Link, Navigate, Outlet, useParams, useRoutes } from 'react-router-dom';

const users = [0, 1, 2, 3, 4];
const isUserExist = (userId) => users.some((uid) => uid === Number(userId));

function MainPage() {
   return (
      <>
         <h2>Main Page</h2>
      </>
   );
}

function UsersLayout() {
   return (
      <>
         <h2>Users Layout</h2>
         <p>
            <Link to="/">Main Page</Link>
         </p>
         <Outlet />
      </>
   );
}

function UsersList() {
   return (
      <>
         <h2>User List Page</h2>
         <ul>
            {users.map((uid) => (
               <li key={uid}>
                  <Link to={`/users/${uid}`}>{`User ${uid}`}</Link>
               </li>
            ))}
         </ul>
      </>
   );
}

function UserPage() {
   const { userId } = useParams();

   if (!isUserExist(userId)) return <Navigate to={'/users'} />;

   return (
      <>
         <h2>User Page</h2>
         <ul>
            <li>
               <Link to="/users">Users List page</Link>
            </li>
            <li>
               <Link to="../edit">Edit this user</Link>
            </li>
         </ul>
         <p>{`userId: ${userId}`}</p>
      </>
   );
}

function UserEditPage() {
   const { userId } = useParams();

   if (!isUserExist(userId)) return <Navigate to={'/users'} />;

   return (
      <>
         <h2>Edit User Page</h2>
         <ul>
            <li>
               <Link to={`/users/${userId}`}>User profile Page</Link>
            </li>
            <li>
               <Link
                  to={
                     isUserExist(Number(userId) + 1)
                        ? `/users/${Number(userId) + 1}`
                        : `/users/${users[0]}`
                  }
               >
                  Another User
               </Link>
            </li>
            <li>
               <Link to="/users">Users List page</Link>
            </li>
         </ul>
      </>
   );
}

const elements = [
   {
      path: '/',
      element: <MainPage />
   },
   {
      path: 'users',
      element: <UsersLayout />,
      children: [
         {
            path: '',
            element: <UsersList />
         },
         {
            path: ':userId',
            element: <Outlet />,
            children: [
               {
                  index: true,
                  element: <Navigate to={'profile'} />
               },
               {
                  path: 'profile',
                  element: <UserPage />
               },
               {
                  path: 'edit',
                  element: <UserEditPage />
               },
               {
                  path: '*',
                  element: <Navigate to={'profile'} />
               }
            ]
         }
      ]
   },
   {
      path: '*',
      element: <Navigate to={'/'} />
   }
];

function App() {
   const routes = useRoutes(elements);

   return (
      <>
         <h1>App Layout v6</h1>
         <Link to="/users">Users list Page</Link>
         {routes}
      </>
   );
}

export default App;

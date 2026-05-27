import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './layouts/Layout';
import AuthLayout from './layouts/AuthLayout';
import DashLayout from './layouts/DashLayout';
import ArticlePage from './pages/LandingPages/ArticlePage';
import HomePage from './pages/LandingPages/HomePage';
import AboutPage from './pages/LandingPages/AboutPage';
import ArticleListPage from './pages/LandingPages/ArticleListPage';
import NotFoundPage from './pages/NotFoundPage';
import SignUpPage from './pages/AuthPages/SignUpPage';
import SignInPage from './pages/AuthPages/SignInPage';
import DashboardPage from './pages/DashboardPages/DashboardPage';
import ReportsPage from './pages/DashboardPages/ReportsPage';
import UsersPage from './pages/DashboardPages/UsersPage';

const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />, 
    children: [
      { path: '', element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'articles', element: <ArticleListPage /> },
      { path: 'articles/:name', element: <ArticlePage /> },
    ],
  },
  {
    path: 'signup',
    element: <AuthLayout />,
    children: [{ index: true, element: <SignUpPage /> }],
  },
  {
    path: 'signin',
    element: <AuthLayout />,
    children: [{ index: true, element: <SignInPage /> }],
  },
  {
    path: 'dashboard',
    element: <DashLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'users', element: <UsersPage /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
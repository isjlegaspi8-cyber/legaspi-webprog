import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
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
import DashArticleListPage from './pages/DashboardPages/DashArticleListPage';

const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user') || 'null');
  } catch {
    return null;
  }
};

const RequireAuth = ({ children }) => {
  const user = getCurrentUser();
  if (!user) return <Navigate to="/signin" replace />;
  // Block viewers from accessing protected routes (should not be able to sign in)
  if (user.role === 'Viewer') return <Navigate to="/signin" replace />;
  return children;
};

const RequireAdmin = ({ children }) => {
  const user = getCurrentUser();
  if (!user) return <Navigate to="/signin" replace />;
  return user.role === 'Admin' ? children : <Navigate to="/dashboard" replace />;
};

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
    element: (
      <RequireAuth>
        <DashLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'articles', element: <DashArticleListPage /> },
      { path: 'users', element: (
          <RequireAdmin>
            <UsersPage />
          </RequireAdmin>
        ) },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
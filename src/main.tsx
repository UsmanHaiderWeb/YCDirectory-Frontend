import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, Outlet, RouteObject, RouterProvider } from "react-router-dom";
import { ClerkProvider } from '@clerk/clerk-react'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { neobrutalism } from '@clerk/themes'
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import LandingPage from "./components/LandingPage";
import CreatorsPage from "./components/CreatorsPage";
import MostLikedBlogs from "./components/MostLikedBlogs";
import CreateBlogPage from "./components/CreateBlogPage";
import BlogPage from "./components/BlogPage";
import SingleCreatorPage from "./components/SingleCreatorPage";
import Notfound from "./components/Notfound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import DashBoard from "./components/DashBoard";
import { Provider } from 'react-redux'
import ReduxStore from "./components/ReduxStore/Store";

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk publishable key to the .env.local file')
}

ash
const client = new ApolloClient({
    uri: 'https://ycdirectory-backend.vercel.app/graphql',
    cache: new InMemoryCache()
})

const queryclient = new QueryClient();


const routes: RouteObject[] = [
    {
        path: '/', element: <App />, children: [
            {path: '/', element: <LandingPage />, children: [
                {path: '/:search'},
            ]},
            {path: '/creators', element: <CreatorsPage />, children: [
                {path: '/creators/search/:name', element: <CreatorsPage />},
            ]},
            {path: '/most-liked-blogs', element: <MostLikedBlogs />},
            {path: '/create', element: <CreateBlogPage />},
            {path: '/blog/:id', element: <BlogPage />},
            {path: '/creators/:id', element: <SingleCreatorPage />},
            {path: '/:name/dashboard', element: <DashBoard />},
            {path: '/*', element: <Notfound />},
        ],
    },
    {path: '/sign-in/*', element: <SignInForm />},
    {path: '/sign-up/*', element: <SignUpForm />},
]

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ClerkProvider
            publishableKey={PUBLISHABLE_KEY}
            afterSignOutUrl="/"
            appearance={{
                baseTheme: neobrutalism
            }}
        >
            <Provider store={ReduxStore}>
                <QueryClientProvider client={queryclient}>
                    <ApolloProvider client={client}>
                        <RouterProvider router={router}>
                            <Outlet />
                        </RouterProvider>
                    </ApolloProvider>
                    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
                </QueryClientProvider>
            </Provider>
        </ClerkProvider>
    </React.StrictMode>
);
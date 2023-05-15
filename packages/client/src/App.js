import React from 'react'
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom'
import { MainLayout } from 'layouts'
import { Cart, CartPage } from 'components/cart'
import { HomePage } from 'components/home'
import { LoginPage } from 'components/login'
import { AdminPage } from 'components/admin'
import { LocationsPage } from 'components/locations'
import { ProductsPage, ProductPage } from 'components/products'
import { ContactPage } from 'components/contact'
import { CheckoutPage } from 'components/checkout'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <MainLayout>
        <HomePage />
      </MainLayout>
    )
  },
  {
    path: '/login',
    element: (
      <MainLayout>
        <LoginPage />
      </MainLayout>
    )
  },
  {
    path: '/admin',
    element: (
      <MainLayout>
        <AdminPage />
      </MainLayout>
    )
  },
  {
    path: '/products/:productId',
    element: (
      <MainLayout>
        <ProductPage />
      </MainLayout>
    )
  },
  {
    path: '/item',
    loader: () => redirect('/shop')
  },
  {
    path: '/stores',
    element: (
      <MainLayout>
        <LocationsPage />
      </MainLayout>
    )
  },
  {
    path: '/shop/:category',
    element: (
      <MainLayout>
        <ProductsPage />
      </MainLayout>
    )
  },
  {
    path: '/shop',
    element: (
      <MainLayout>
        <ProductsPage />
      </MainLayout>
    )
  },
  {
    path: '/contact',
    element: (
      <MainLayout>
        <ContactPage />
      </MainLayout>
    )
  },
  {
    path: '/cart',
    element: (
      <MainLayout>
        <CartPage />
      </MainLayout>
    )
  },
  {
    path: '/checkout',
    element: (
      <MainLayout>
        <CheckoutPage />
      </MainLayout>
    )
  },
  {
    path: '*',
    loader: () => redirect('/')
  }
])

export const App = () => (
  <Cart>
    <RouterProvider router={router} />
  </Cart>
)

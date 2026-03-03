import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './state/store/store.tsx'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK!);

createRoot(document.getElementById('root')!).render(
  <Elements stripe={stripePromise} >
    <Provider store={store} >
      <App />
    </Provider>
  </Elements>
)

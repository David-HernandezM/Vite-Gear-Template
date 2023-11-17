import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useApi, useAccount } from '@gear-js/react-hooks';
import { ApiLoader } from "./components";
import { withProviders } from './hocs';
import ErrorPage from './routes';
import Root from "./routes/root";
import Index from './routes';
import ContractTest from "./routes/contract-test";

import './App.css';

export default function Component() {
  const [appReady, setAppReady] = useState(false);
  const api = useApi();
  const account = useAccount();
  const isApiReady = api.isApiReady;
  const isAccountReady = account.isAccountReady;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root isAccountReady={isAccountReady}/>,
      errorElement: <ErrorPage />,  
      children: [
        {
          errorElement: <ErrorPage />,
          children: [
            {
              index: true,
              element: <Index />
            },
            {
              path: "contract",
              element: <ContractTest account={account} gearApi={api} />,
            }
          ]
        }
      ]
    },
  ]);

  useEffect(() => {
    if (isApiReady && isAccountReady) {
      setAppReady(true);
    }
  }, [isApiReady, isAccountReady]);

  return (
    <>
      {
      appReady 
      ? <RouterProvider router={router} />
      : <ApiLoader />
      }
    </>
  );
}

export const App = withProviders(Component);


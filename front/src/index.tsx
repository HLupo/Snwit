import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from 'react-dom/client';
import { Provider, useDispatch } from 'react-redux';
import { store } from "./store/store";
import Router from './routes/Router';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { useEffect } from 'react';
import { setCurrentMetamaskAccount } from 'store/slices/appSlice';
import { setUser, User } from 'store/slices/userSlice';
import { useNavigate } from 'react-router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const persistor = persistStore(store);

const Loading: React.FC = () => {
  const dispatch = useDispatch();

  const getUserByAddress = async (address: string) => {
    const res = await fetch('http://localhost:8080/getUserByAddress/' + address, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })

    if (res.status === 200) {
      const data = await res.json();
      return data.user;
    }
    else return null;
  }

  useEffect(() => {
    const { ethereum } = window;


    if (ethereum) {
      ethereum.on("accountsChanged", async (accounts: string) => {
        dispatch(setCurrentMetamaskAccount(accounts[0]));
        if (accounts[0] && accounts[0] != "") {
          const user: User = await getUserByAddress(accounts);
          if (user) dispatch(setUser(user));
          else dispatch(setUser(null));
        }
      });
    }
  });

  return <div>{"Loading..."}</div>;
}

root.render(
  <ChakraProvider>
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  </ChakraProvider >
);

reportWebVitals();

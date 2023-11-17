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















// This part already work


// import { useState, useEffect } from 'react'
// import reactLogo from './assets/images/react.svg'
// import viteLogo from '/vite.svg'
// import gearLogo from './assets/images/logo.svg'
// import { useAccount, useApi, useAlert } from "@gear-js/react-hooks";
// import { ProgramMetadata, decodeAddress, encodeAddress, encodePayload, PayloadType } from '@gear-js/api';
// import { web3FromSource } from '@polkadot/extension-dapp';
// import { withProviders } from './hocs';
// import { readStateWithPayload } from './utils';
// import { Header, ApiLoader } from './components';
// import { ADDRESS, CONTRACT } from './consts';
// import './App.css'


// import  { AnyJson } from '@polkadot/types/types/codec';
// import { Value } from '@gear-js/react-hooks/dist/esm/context/Account';





// /*
// MessageTest,

// pub enum RutzoStateQuery{
//     //GameInformationById(u64),
//     //PlayerInformation(UserDataState),
    
//     GetText,
//     GetNumber,
//     GetAddress,
//     SendAddress(UserId),
//     #[default]
//     All
// }


// pub enum RutzoStateReply {
//     Text(String),
//     Number(u64),
//     Address(UserId),
//     UserSendAddress(UserId),
//     All(ContractState)
// }


// pub enum RutzoAction {
//     MessageTest,
//     PlayGame {
//         token_id: TokenId,
//         power: String
//     },
//     MintCard {
//         token_id: u8
//     },
//     SetNFTAddress(ActorId),
//     Register,
//     AddNftForSale {
//         token_metadata: TokenMetadata
//     },
//     BuyNFT(TokenId),
//     ApproveMinter(ActorId),
//     DelegateApprovedUser(ActorId)
// }


// api.programState
//       .read({ programId: programIDNFT, payload: "" }, metadata)
//       .then((result) => {
//         setFullState(result.toJSON());

//         const games = fullState[1];

//         if (games.games.length > 0) {
//           const finalValue = games.games[games.games.length - 1];

//           if (finalValue.matchState.finished.winner === account?.address) {
//             alert.success(`YOU WIN!`);
//           } else {
//             alert.error("YOU LOSE!");
//           }
//         } else {
//           console.log("Void");
//         }
//       })
//       .catch(({ err }: any) => console.log(err));
// */

// //function App() {
// function Component() {
//   const [count, setCount] = useState(0);
//   const [appReady, setAppReady] = useState(false);
//   const account = useAccount();
//   const api = useApi();
//   const isApiReady = api.isApiReady;
//   const isAccountReady = account.isAccountReady;
//   const metadata = ProgramMetadata.from(CONTRACT.METADATA);
//   const alert = useAlert();

//   const message: any = {
//     destination: CONTRACT.PROGRAMID, // programId
//     payload: { MessageTest: null }, // Add your data
//     gasLimit: 2097839268,
//     value: 0,
//   };

//   const signer = async () => {
//     const localaccount = account.account?.address;
//     const isVisibleAccount = account.accounts.some(
//       (visibleAccount) => visibleAccount.address === localaccount
//     );

//     if (isVisibleAccount) {
//       // Create a message extrinsic
//       const transferExtrinsic = await api.api.message.send(message, metadata);

//       const injector = await web3FromSource(account.accounts[0].meta.source);

//       transferExtrinsic
//         .signAndSend(
//           account.accounts[0].address,
//           { signer: injector.signer },
//           ({ status }) => {
//             if (status.isInBlock) {
//               console.log(
//                 `Completed at block hash #${status.asInBlock.toString()}`
//               );
//               alert.success(`Block hash #${status.asInBlock.toString()}`);
              
//             } else {
//               console.log(`Current status: ${status.type}`);
//               if (status.type === "Finalized") {
//                 alert.success(status.type);
//               }
//             }
//           }
//         )
//         .catch((error: any) => {
//           console.log(":( transaction failed", error);
//         });
//     } else {
//       alert.error("Account not available to sign");
//     }
//   }

//   const readState = async () => {
//     console.log("RESULTADO DEL ESTADO: ");
//     api.api.programState
//       .read({ programId: CONTRACT.PROGRAMID, payload: { All: null } }, metadata)
//       .then((result) => {
//         console.log(result.toJSON());
//         console.log("Actual account");
//         console.log(account.account);
//         console.log("Accounts:");
//         console.log(account.accounts);
//         console.log("Account in Accounts[0]");
//         console.log(account.accounts[0]);
//       })
//       .catch(({ err }: any) => console.log(err));


//       /*
//     const x = (value: AnyJson) => {
//       console.log("Se llamo a la funcion!!");
//       console.log(value);
//     }
    
//     console.log("LEYENDO DESDE LA FUNCIOOOON!!-------------------------------------------");
//     await readStateWithPayload(x, CONTRACT.PROGRAMID, CONTRACT.METADATA, { GetText: null });
//     */
//   }

//   useEffect(() => {
//     if (api.isApiReady && account.isAccountReady) {   
      
//       setAppReady(true);
//     }
//   }, [isApiReady, isAccountReady]);

//   function MainPage() {
//     return (
//       <>
//         <div>
//           <a href="https://vitejs.dev" target="_blank">
//             <img src={viteLogo} className="logo" alt="Vite logo" />
//           </a>
//           <a href="https://react.dev" target="_blank">
//             <img src={reactLogo} className="logo react" alt="React logo" />
//           </a>
//           <a href="https://vara-network.io/" target="_blank">
//             <img src={gearLogo} className="logo gear" alt="Gear logo" />
//           </a>
//         </div>
//         <h1>Vite + React + Gear</h1>
//         <div className="card">
//           <button onClick={() => setCount((count) => count + 1)}>
//             count is {count}
//           </button>
//           <p>
//             Edit <code>src/App.tsx</code> and save to test HMR
//           </p>
//         </div>
//         <p className="read-the-docs">
//           Click on the Vite, React and Gear logos to learn more
//         </p>
//         <div>
//           <button onClick={readState}>read state</button>
//           <button onClick={signer}>send message</button>
//         </div>
//         <GasData gearApi={api} account={account}/>
//       </>
//     );
//   }

//   return (
//     <>
//       <Header isAccountVisible={isAccountReady} />
//       <main>{appReady ? <MainPage />: <ApiLoader />}</main>
//     </>
//   )
// }

// export const App = withProviders(Component);














// import { GearApi } from "@gear-js/api";
// import { Button } from "@gear-js/ui";

// interface IGearApi {
//   api: import("@gear-js/api").GearApi;
//   isApiReady: boolean;
// };

// type GasDataProps = {
//   gearApi: IGearApi,
//   account: Value
// }



// function GasData({gearApi, account}: GasDataProps) {
//   const [minlimit, setMinlimit] = useState<any | undefined>(0);
//   const [reserved, setReserved] = useState<any | undefined>(0);
//   const [burned, setBurned] = useState<any | undefined>(0);
//   const [maybereturned, setMaybereturned] = useState<any | undefined>(0);
//   const [waited, setWaited] = useState<any | undefined>();

//   const getGasData = async () => {
//     /*
//     const gearApi = await GearApi.create({
//       providerAddress: ADDRESS.NODE,
//     });

//     const payload: PayloadType = { MessageTest: null };
//     const gas = await gearApi.program.calculateGas.handle(
//       `0x${"eaee0180c37581cadedafb9eb59d8ecdf68be2f93bcb021124963f7ba7f7b90d"}`,
//       CONTRACT.PROGRAMID,
//       payload,
//       0,
//       true,
//       ProgramMetadata.from(CONTRACT.METADATA)
//     );
//     */

//     const payload: PayloadType = { MessageTest: null };
//     const gas = await gearApi.api.program.calculateGas.handle(
//       `0x${"eaee0180c37581cadedafb9eb59d8ecdf68be2f93bcb021124963f7ba7f7b90d"}`,
//       CONTRACT.PROGRAMID,
//       payload,
//       0,
//       true,
//       ProgramMetadata.from(CONTRACT.METADATA)
//     );

//     console.log(gas.toHuman());
//     console.log("Account passed: ");
//     console.log(account.account);

//     setMinlimit(gas.toHuman().min_limit);
//     setMaybereturned(gas.toHuman().maybereturned);
//     setBurned(gas.toHuman().burned);
//     setReserved(gas.toHuman().reserved);
//     setWaited(gas.toHuman().waited);
//   };

//   return (
//     <div className="gasdata">
//       <h1>Gas fee</h1>
//       <p> Minlimit: {minlimit}</p>
//       <p> Reserved: {reserved}</p>
//       <p> Burned: {burned}</p>
//       <p> May be returned: {maybereturned}</p>
//       <p> Waited: {waited}</p>
//       <Button text="Get Gas Data" onClick={getGasData} />
//     </div>
//   );
// }

// export { GasData };

import { useState } from "react";
import { GasData } from "../components/vara-lab/gas-data/GasData";
import { GearHooks } from "../types";
import { PayloadType, ProgramMetadata } from "@gear-js/api";
import { CONTRACT } from "../consts";
import { formatAddress } from "../utils";
import { Button } from "@gear-js/ui";
import { web3FromSource } from '@polkadot/extension-dapp';
import { useAlert } from "@gear-js/react-hooks";

/*
pub enum PingAction {
    Ping,
    Pong
}
*/

export default function ContractTest({account, gearApi}: GearHooks) {
    const [payloadForGasData, setPayloadForGasData] = useState<PayloadType>({ Ping: null });
    const [contractState, setContractState] = useState("");
    const metadata = ProgramMetadata.from(CONTRACT.METADATA);
    const alert = useAlert();
    const accountMetaSource = account.account?.meta.source ?? "0x00";
    const accountAddress = account.account?.address ?? "0x00";

    console.log("Direccion del wey sin format:");
    console.log(accountAddress);
    console.log("Direccion con el format:");
    console.log(formatAddress(accountAddress));

    function payloadForGasDataByIndex(idx: number) {
        if (idx == 1) {
            setPayloadForGasData({ Ping: null });
        } else {
            setPayloadForGasData({ Pong: null });
        }
    }


    const signer = async (payload: PayloadType) => {
      console.log("With account: ");
      console.log(account.account?.address);
      const message: any = {
          destination: formatAddress(CONTRACT.PROGRAMID), // programId
          payload,
          gasLimit: 2097839268,
          value: 0
      };
      const localaccount = account.account?.address;
      const isVisibleAccount = account.accounts.some(
        (visibleAccount) => visibleAccount.address === localaccount
      );
  
      
      if (isVisibleAccount) {
        // Create a message extrinsic
        const transferExtrinsic = await gearApi.api.message.send(message, metadata);

        const injector = await web3FromSource(accountMetaSource);
  
        transferExtrinsic
          .signAndSend(
            accountAddress,
            { signer: injector.signer },
            ({ status }) => {
              if (status.isInBlock) {
                console.log(
                  `Completed at block hash #${status.asInBlock.toString()}`
                );
                alert.success(`Block hash #${status.asInBlock.toString()}`);
                
              } else {
                console.log(`Current status: ${status.type}`);
                if (status.type === "Finalized") {
                  alert.success(status.type);
                }
              }
            }
          )
          .catch((error: any) => {
            console.log(":( transaction failed", error);
          });
      } else {
        alert.error("Account not available to sign");
      }
    }
  
    const readState = async () => {
      console.log("RESULTADO DEL ESTADO: ");
      gearApi.api.programState
        .read({ programId: CONTRACT.PROGRAMID, payload: { All: null } }, metadata)
        .then((result) => {
          setContractState(JSON.stringify(result.toJSON()));
        })
        .catch(({ err }: any) => console.log(err));
    }
  
  return (
    <>
      <h2>Component Tests, contract: Ping</h2>
      <div>
          <div>
              <Button text="Ping calculation" onClick={() => {payloadForGasDataByIndex(1)}} />
              <Button text="Pong calculation" onClick={() => {payloadForGasDataByIndex(2)}} />
          </div>
          <GasData 
              api={gearApi}
              payload={{ Ping: null }}//{payloadForGasData}
              metadata={ProgramMetadata.from(CONTRACT.METADATA)}
              userAddress={formatAddress(accountAddress)}
          />
      </div>
      <br />
      <div>
          <button onClick={() => {signer({ Ping: null })}}>Send Ping</button>
          <button onClick={() => {signer({ Pong: null })}}>Send Pong</button>
      </div>
      <br />
      <h2>Reading state</h2>
      <p>{contractState}</p>
      <br />
      <button onClick={readState}>Read state</button>
    </>
  );
}
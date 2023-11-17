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
    const [payloadForGasData, setPayloadForGasData] = useState<PayloadType | null>(null);
    const [contractState, setContractState] = useState("");
    const metadata = ProgramMetadata.from(CONTRACT.METADATA);
    const alert = useAlert();

    function payloadForGasDataByIndex(idx: number) {
        if (idx == 1) {
            setPayloadForGasData({ Ping: null });
        } else {
            setPayloadForGasData({ Pong: null });
        }
    }

    const signer = async (payload: PayloadType) => {
        const message: any = {
            destination: formatAddress(CONTRACT.PROGRAMID), // programId
            payload, // Add your data
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

          const injector = await web3FromSource(formatAddress(account.account?.meta.source));
    
          transferExtrinsic
            .signAndSend(
              account.accounts[0].address,
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
          .read({ programId: formatAddress(CONTRACT.PROGRAMID), payload: { All: null } }, metadata)
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
                    payload={payloadForGasData}
                    metadata={ProgramMetadata.from(CONTRACT.METADATA)}
                    contractAddress={formatAddress(CONTRACT.PROGRAMID)}
                    userAddress={formatAddress(account.account?.address)}
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
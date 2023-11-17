import { useState } from "react";
import { PayloadType, ProgramMetadata } from "@gear-js/api";
import { GearApiHook } from "../../../types";
import { Button } from "@gear-js/ui";
import { HexString } from "@gear-js/api";
import { CONTRACT } from "../../../consts";

interface GasDataProps {
    api: GearApiHook;
    payload: PayloadType;
    metadata: ProgramMetadata
    userAddress: `0x${string}`;
}

function GasData({api, payload, metadata, userAddress}: GasDataProps) {
  const [minlimit, setMinlimit] = useState<any | undefined>(0);
  const [reserved, setReserved] = useState<any | undefined>(0);
  const [burned, setBurned] = useState<any | undefined>(0);
  const [maybereturned, setMaybereturned] = useState<any | undefined>(0);
  const [waited, setWaited] = useState<any | undefined>();

  console.log("ACCOUNT ADDRESS GIVEN: ");
  console.log(userAddress);
  
  

  const metadata2 = ProgramMetadata.from(CONTRACT.METADATA);
  const getGasData = async () => {
    const gas = await api.api.program.calculateGas.handle(
      `0x${"eaee0180c37581cadedafb9eb59d8ecdf68be2f93bcb021124963f7ba7f7b90d"}`,//userAddress,
      CONTRACT.PROGRAMID,
      payload,
      0,
      true,
      metadata
    );

    console.log(gas.toHuman());

    setMinlimit(gas.toHuman().min_limit);
    setMaybereturned(gas.toHuman().maybereturned);
    setBurned(gas.toHuman().burned);
    setReserved(gas.toHuman().reserved);
    setWaited(gas.toHuman().waited);
  };

  return (
    <div className="gasdata">
      <h1>Gas fee</h1>
      <p> Minlimit: {minlimit}</p>
      <p> Reserved: {reserved}</p>
      <p> Burned: {burned}</p>
      <p> May be returned: {maybereturned}</p>
      <p> Waited: {waited}</p>
      <Button text="Get Gas Data" onClick={getGasData} />
    </div>
  );
}

export { GasData };




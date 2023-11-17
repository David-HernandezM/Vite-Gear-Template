import { useState } from "react";
import { PayloadType, ProgramMetadata } from "@gear-js/api";
import { GearApiHook } from "../../../types";
import { Button } from "@gear-js/ui";
import { HexString } from "@gear-js/api";

interface GasDataProps {
    api: GearApiHook;
    payload: PayloadType;
    metadata: ProgramMetadata
    contractAddress: HexString;
    userAddress: HexString;
}

function GasData({api, payload, metadata, contractAddress, userAddress}: GasDataProps) {
  const [minlimit, setMinlimit] = useState<any | undefined>(0);
  const [reserved, setReserved] = useState<any | undefined>(0);
  const [burned, setBurned] = useState<any | undefined>(0);
  const [maybereturned, setMaybereturned] = useState<any | undefined>(0);
  const [waited, setWaited] = useState<any | undefined>();

  const getGasData = async () => {
    const gas = await api.api.program.calculateGas.handle(
      userAddress,
      contractAddress,
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
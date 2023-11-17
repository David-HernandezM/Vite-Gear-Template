import { 
  Outlet, 
  NavLink,
} from "react-router-dom";

import { Header } from "../components";

interface RootProps {
  isAccountReady: boolean
}

export default function Root({isAccountReady}: RootProps) {
  return (
    <>
      <Header isAccountVisible={isAccountReady}>
        <div>
          <NavLink to={'contract'}>
            <h2>Contract</h2>
          </NavLink>
        </div>
      </Header>
      <div>
        <Outlet />
      </div>
    </>
  );
}


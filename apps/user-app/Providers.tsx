"use client"
import {RecoilRoot} from 'recoil';
const Providers = ({children} : {children:React.ReactNode}) => {
  return <RecoilRoot>
    {children}
  </RecoilRoot>
}

export default Providers
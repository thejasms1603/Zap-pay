import { Button } from "./button"

interface AppbarProps{
    user? :{
        name?: string | null;
    }
    onSignin: any;
    onSignout: any
}
const appbar = ({user, onSignin, onSignout} : AppbarProps) => {
  return (
    <div className="flex justify-between border-b border-slate-400 px-4">
        <div className=" capitalize text-lg font-bold flex flex-col justify-center py-2 px-2">
        ZapPay
        </div>
        <div className="flex flex-col justify-center pt-4">
            <Button onClick={user ? onSignout : onSignin}>
                {user ? "Logout" : "Login"}
            </Button>
        </div>
    </div>
  )
}

export default appbar
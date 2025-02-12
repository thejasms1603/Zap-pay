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
    <div className="flex justify-between border-b px-4">
        <div className=" capitalize text-lg font-bold flex flex-col justify-center py-2">
        Zap Pay
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
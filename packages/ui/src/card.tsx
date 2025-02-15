interface cardProps {
  title: string;
  children? : React.ReactNode

}

const Card = ({title, children} : cardProps) : JSX.Element => {
  return (
    <div className="border p-4 border-slate-400">
      <h1 className="text-xl border-b pb-2">
        {title}
      </h1>
      <p>{children}</p>
    </div>
  )
}

export default Card
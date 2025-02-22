interface IProps {
  groupedShop: Record<string, IBrand[]>
  count :number
}

export default function InitCharShop({groupedShop, count}: IProps) {
  const chars = Object.keys(groupedShop)
  return (
   <div></div>
  )
}

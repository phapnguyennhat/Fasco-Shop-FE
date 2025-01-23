
export default function Collection() {
  const collection = [
    {
      name: 'All Products',
      value: 'ALLPRODUCT',
    },
    {
      name: 'Best Seller',
      value: 'BESTSELLER'
    },
    {
      name: 'New Arrivals',
      value: 'NEWARRIVAL',
    },
    {
      name: 'Price: Low to High',
      value: 'LOWTOHIGH'
    },
    {
      name: 'Price: High to Low',
      value: 'HIGHTOLOW'
    }
  ]
  return (
    <select className=" relative" >
      {collection.map((item ,index)=>(
        <option value={item.value} key={index} >{item.name}</option>
      ))}
    </select>
  )
}

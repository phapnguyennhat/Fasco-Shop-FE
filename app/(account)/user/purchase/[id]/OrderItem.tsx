import Image from "next/image"


interface IProps{
  orderItem: IOrderItem
}
export default function OrderItem({orderItem}: IProps) {
  const {price,quantity,varient} = orderItem
  const {product,valueAttrs} = varient
  const valueAttrHasImage = valueAttrs.find(item =>item.image!==null)
  const image= valueAttrHasImage?.image

  const varientValue = valueAttrs.map(item => item.value).join(", ");
  
  
  return (
      <li className=" border-b pb-2 mb-[22px] w-full" >
          <div className=" w-full gap-3 inline-flex justify-between" >
              <Image
                  alt="varient image"
                  width={82}
                  height={82}
                  className="size-[82px] object-cover  border "
                  src={image?.url || '/images/NOT_FOUND_IMG.png'}
              />
              <div className=" w-[80%]" >
                <p className="text-black " >{product.name}</p>
                <p className=" text-sm text-gray-500" >
                  <span>Variation:</span> {' '}
                  <span>{varientValue}</span>
                </p>
                <p className=" text-sm text-black" >x <span>{orderItem.quantity}</span></p>
              </div>
              <div className=" text-sm text-black" >${price}</div>
          </div>
      </li>
  );
}

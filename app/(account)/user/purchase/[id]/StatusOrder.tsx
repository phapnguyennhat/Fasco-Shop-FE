
interface IProps{
  order: IOrder
}
export default function StatusOrder({order}: IProps) {
  return (
      <div className=" mb-[30px] sm:pr-2 sm:border-r-2 md:pr-0 md:border-r-0 lg:pr-4 lg:border-r-2 ">
          <h6 className=" mb-[20px] font-volkhov text-2xl sm:text-[30px] md:leading-[30px] lg:text-[36px] lg:leading-[36px] ">
              Status
          </h6>

          <div className="  flex justify-between" >
            <span>Create Time </span>
            <span>{order.createAt}</span>
          </div>

          <div className="  flex justify-between">
            <span>Last Update Time </span>
            <span>{order.updateAt}</span>
          </div>
            <div className="  text-black">{order.status}</div>
      </div>

    
  );
}

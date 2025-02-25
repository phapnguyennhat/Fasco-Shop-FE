interface IProps {
  brand: IBrand
}
export default function ShopCard({brand}: IProps) {
  return (
      <li className="  w-full   inline-flex flex-col items-center">
          <div className=" overflow-hidden px-4 border w-full  mb-[8px] md:mb-[20px] sm:h-[160px] md:h-[120px] h-[100px]  flex items-center">
              <img
                  src={brand.image.url}
                  alt={brand.name}
                //   width={300}
                //   height={300}
                loading="lazy"
                  className=" object-cover     h-auto "
              />
          </div>
          <div className=" text-black text-center text-base md:text-xl">
              {brand.name}
          </div>
      </li>
  );
}

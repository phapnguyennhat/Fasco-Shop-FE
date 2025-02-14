'use client'
import { createFavorite, deleteFavoriteAbulk } from "@/app/action"
import debounce from "lodash.debounce"
import Image from "next/image"
import { memo, useCallback, useEffect, useState } from "react"
import { FaStar } from "react-icons/fa"

interface IProps{
  isFavorite: boolean
  productId: string
}
 function FavoriteProduct({isFavorite, productId}: IProps) {
  const [favorite, setFavorite] = useState(isFavorite)

  useEffect(()=>{
    setFavorite(isFavorite)
  },[isFavorite])


   useEffect(() => {
          if(favorite!==isFavorite){
            debounceFavorite(productId,favorite)
          }
          // Cleanup: Hủy debounce khi unmount để tránh memory leak
          return () => debounceFavorite.cancel();
        }, [favorite, productId]);


  const debounceFavorite = useCallback(debounce( async(productId: string, favorite: boolean)=>{
    if(favorite){
      await createFavorite(productId)
    }else{
      await deleteFavoriteAbulk([productId])
    }
  },1500),[])
  
  return (
      <div>
          {favorite ? (
              <button
                  onClick={() => setFavorite(false)}
                  className=" size-[20px]"
              >
                  {' '}
                  <FaStar
                      color="black"
                      className=" size-[20px]"
                      width={20}
                      height={20}
                  />
              </button>
          ) : (
              <button
                  onClick={() => setFavorite(true)}
                  className=" size-[20px]"
              >
                  <Image
                      src={'/icons/favorite.png'}
                      alt="icon star"
                      width={20}
                      height={20}
                      className="size-[20px] "
                  />
              </button>
          )}
      </div>
  );
}


export default memo(FavoriteProduct)
import { Star } from 'lucide-react';

export default function StarRating({
  children, starRating
}: Readonly<{ children: React.ReactNode, starRating: number }>)  {
  const renderStars = ()=>{
    const stars = [];
    const fullStars = Math.floor(starRating)
    const remaining = starRating - fullStars;

    for (let i = 0; i < fullStars; i++) {
      stars.push( children);
    }

    if (remaining > 0) {
      stars.push(<PartialStar remaining={remaining} />);
    }

    const emptyStars = 5 - fullStars - (remaining > 0 ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<EmptyStar />);
    }
    return stars
  }

  const FullStar = ()=>{
    return children
  }

  const PartialStar = ({remaining}: {remaining:number})=>{
    const percentageFilled = Math.round(remaining * 100); 
    return (
      <div className="relative">
          {children}
        <div
          className="absolute top-0 right-0 h-full"
          style={{
            width: `${100-percentageFilled}%`,
            backgroundColor: "white",
            clipPath: "inset(0 0 0 0)",
          }}
        />
      </div>
    );
  }

  const EmptyStar = ()=>{
   return  <Star/>
  }
  
  return (
    <div className=' flex items-center' >{renderStars()}</div>
  )
}

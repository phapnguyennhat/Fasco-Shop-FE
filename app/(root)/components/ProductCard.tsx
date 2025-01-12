import Image from 'next/image';

export default function ProductCard({ image }: { image: string }) {
    return (
        <div>
            <Image
                src={`/images/products/${image}`}
                width={366}
                height={244}
                alt={image}
                className="lg:w-[366px] lg:h-[244px] rounded-[10px]"
            />
            <h6>
                Shiny Dress
            </h6>
        </div>
    );
}

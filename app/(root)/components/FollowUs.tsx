import Image from "next/image";

export default function FollowUs() {
    return (
		<section className="  mb-[60px] md:mb-[100px] lg:mb-[150px] flex flex-col  items-center ">
			<h2 className="  text-center mb-2 md:mb-4 lg:mb-[20px] font-volkhov text-xl md:text-4xl lg:text-[46px] lg:leading-[46px] ">
				Follow Us On Instagram
			</h2>
			<p className="ml-5 md:mx-auto max-w-[614px] text-[#8A8A8A] text-sm md:text-center   md:text-base mb-[40px] md:mb-[60px] lg:mb-[100px]">
				Hey there, fashion lovers! Want to elevate your style game?
				Follow us on Instagram for daily
				inspiration and expert tips on how to coordinate clothes like a
				pro. From mixing colors and patterns to nailing the perfect
				outfit for any occasion, our posts will keep you in the loop on
				the latest trends and timeless looks. Join our community now and
				unlock the secrets to a wardrobe that turns heads—see you on the there!
			</p>

			<ul className="  flex items-center ">
				<li className=" ">
					<Image
						src={'/images/follow1.png'}
						width={320}
						height={308}
						alt="follow image 1"
						className=" w-auto h-auto"
					/>
				</li>
				<li>
					<Image
						src={'/images/follow2.png'}
						width={256}
						height={380}
						alt="follow image 1"
						className=" w-auto h-auto"
					/>
				</li>
				<li>
					<Image
						src={'/images/follow3.png'}
						width={256}
						height={308}
						alt="follow image 1"
						className=" w-auto h-auto"
					/>
				</li>
				<li>
					<Image
						src={'/images/follow4.png'}
						width={256}
						height={380}
						alt="follow image 1"
						className=" w-auto h-auto"
					/>
				</li>
				<li>
					<Image
						src={'/images/follow5.png'}
						width={256}
						height={308}
						alt="follow image 1"
						className=" w-auto h-auto"
					/>
				</li>
				<li>
					<Image
						src={'/images/follow6.png'}
						width={256}
						height={380}
						alt="follow image 1"
						className=" w-auto h-auto"
					/>
				</li>
			</ul>
		</section>
	);
}

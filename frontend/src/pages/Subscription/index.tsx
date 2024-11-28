import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { DiamondPackage, FreePackage, GoldPackage } from './ui/Boxes'
export default function SubscriptionPage() {

	const array = [
		<FreePackage/>,
		<GoldPackage/>,
		<DiamondPackage/>
	]

	return (
		<div className='w-full flex justify-center'>
			<div className='max-w-[360px] w-full'>
					<p className='text-center mt-[5vh] text-[20px] font-bold'>
						Discover new <span className='text-myColors-50'>CryptoTweet</span> features!
					</p>

					<Swiper
							slidesPerView={1} 
							spaceBetween={20}
							pagination={{
								clickable: true,
							}}
							navigation={true}
							modules={[Pagination, Navigation]}
							className="mySwiper"
						>
						{array.map((item, index) => (
							<SwiperSlide key={index}>
								{item}
							</SwiperSlide>
						))}
					</Swiper>
			</div>
		</div>
	)
}
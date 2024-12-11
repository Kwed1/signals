import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { DiamondPackage, FreePackage, GoldPackage } from './ui/Boxes'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTelegram } from 'shared/hooks/useTelegram'

export default function SubscriptionPage() {

	const navigate = useNavigate();
	const {tg} = useTelegram();

	useEffect(() => {
		const handleBackButton = () => {
			navigate(-1);
		}
		
		if(tg?.BackButton) {
			tg.BackButton.show();
			tg.BackButton.onClick(handleBackButton);
		}

		return () => {
			if(tg?.BackButton) {
				tg.BackButton.offClick(handleBackButton);
				tg.BackButton.hide();
			}
		}

	}, [])

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
					modules={[Navigation]}
					className="mySwiper"
				>
					{array.map((item, index) => (
						<SwiperSlide 
							key={index}
							className={index === 0 ? 'h-[75vh] flex justify-center items-center' : ''}
						>
							{item}
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	)
}

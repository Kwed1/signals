import CalendarIcon from '../../../assets/subscribe/calendar.png';
import CrownIcon from '../../../assets/subscribe/crown.png';
import DiamondIcon from '../../../assets/subscribe/diamond.png';
import GalochkIcon from '../../../assets/subscribe/galochka.png';
import GiveIcon from '../../../assets/subscribe/give.png';
import RiseIcon from '../../../assets/subscribe/rise.png';
import SetUpIcon from '../../../assets/subscribe/setup.png';
export const FreePackage = () => {
   return (
      <div className='w-full flex flex-col items-center rounded-[10px] border-2 border-myColors-100 mt-10 pt-[48px] p-5 '>
         <div className='flex flex-col items-center w-full justify-between'>
            <div className='flex flex-col gap-2 items-center mb-9'>
               <p className='text-[40px] font-[900] bg-silver-gradient bg-clip-text text-transparent mb-4'>
                  FREE
               </p>
               <div className='text-[12px] text-center max-w-[80px] w-full bg-myColors-100 rounded-full p-[10px]'>
                  3 days
               </div>
            </div>
            <button className='bg-silver-gradient w-full text-black p-3 rounded-xl text-xl'>
               Subscribe
            </button>
         </div>
      </div>
   );
};

export const GoldPackage = () => {
   return (
      <div className='w-full flex flex-col items-center rounded-[10px] border-2 border-myColors-100 mt-10 h-fit pt-[48px] p-5'>
         <div className='flex flex-col items-center w-full'>
            <div className='flex flex-col gap-2 items-center mb-9'>
               <p className='text-[40px] font-[900] bg-gold-gradient bg-clip-text text-transparent mb-4'>
                  30$
               </p>
               <div className='text-[12px] text-center max-w-[90px] w-full bg-myColors-100 rounded-full p-[10px]'>
                  One month
               </div>
            </div>
            <p className='max-w-[222px] text-[16px] text-center leading-6 text-myColors-50 mb-5'>
               Accurate signals. <br /> Pump swing 2x-8x signals. <br /> Long & Short setups. <br />
               Access to analytics. <br /> Gem dex signals
            </p>
            <div className='flex flex-col items-center w-full gap-4'>
               <button className='bg-gold-gradient w-full text-black p-3 rounded-xl text-xl'>
                  Subscribe
               </button>
               <button className='bg-trans-gradient w-full text-white p-4 rounded-xl text-xl font-bold flex gap-1 justify-center'>
                  <img
                     src={CalendarIcon}
                     alt=''
                  />
                  <p>
                     Daily <span className='text-myColors-50'>signals 20+</span>
                  </p>
               </button>
            </div>
         </div>
      </div>
   );
};

export const DiamondPackage = () => {
   return (
      <div className='w-full flex flex-col items-center rounded-[10px] border-2 border-myColors-100 mt-10 pt-[48px] p-5 max-h-[545px]'>
         <div className='flex flex-col items-center w-full gap-9 h-full min-h-[75vh]'>
            <div className='flex flex-col gap-2 items-center'>
               <p className='text-[40px] font-[900] bg-diamond-gradient bg-clip-text text-transparent p-1'>
                  300$
               </p>
               <div className='text-[12px] text-center max-w-[90px] w-full bg-myColors-100 rounded-full p-[10px]'>
                  A year
               </div>
            </div>
            <div className='flex flex-col items-center w-full gap-[18px]'>
               <button className='bg-diamond-gradient w-full text-black py-[17px] px-[11px] rounded-xl text-xl'>
                  Subscribe
               </button>
               <div className='bg-trans1-gradient w-full text-white p-3 rounded-xl text-base flex flex-col gap-2'>
                  <div className='flex gap-2 items-center'>
                     <img
                        src={DiamondIcon}
                        className='w-[30px] h-[30px]'
                        alt=''
                     />
                     <p>
                        Exclusive{' '}
                        <span className='text-myColors-150 font-extrabold'>
                           Signals with big profit
                        </span>
                     </p>
                  </div>
                  <div className='flex gap-2 items-center'>
                     <img
                        src={RiseIcon}
                        className='w-[30px] h-[30px]'
                        alt=''
                     />
                     <p>
                        Signals for{' '}
                        <span className='text-myColors-150 font-extrabold'>pumps 2x-8x</span>{' '}
                        on CEX/DEX exchanges
                     </p>
                  </div>
                  <div className='flex gap-2 items-center'>
                     <img
                        src={SetUpIcon}
                        className='w-[30px] h-[30px]'
                        alt=''
                     />
                     <p className='text-myColors-150 font-extrabold'>Pump coin setups</p>
                  </div>
                  <div className='flex gap-2 items-center'>
                     <img
                        src={GalochkIcon}
                        className='w-[30px] h-[30px]'
                        alt=''
                     />
                     <p>
                        <span className='text-myColors-150 font-extrabold'>Access</span> to
                        analytics
                     </p>
                  </div>
                  <div className='flex gap-2 items-center'>
                     <img
                        src={CrownIcon}
                        className='w-[30px] h-[30px]'
                        alt=''
                     />
                     <p>
                        <span className='text-myColors-150 font-extrabold'>VIP</span> Training
                     </p>
                  </div>
                  <div className='flex gap-2 items-center'>
                     <img
                        src={GiveIcon}
                        className='w-[30px] h-[30px]'
                        alt=''
                     />
                     <p className='text-myColors-150 font-extrabold'>
                        Competitions and Giveaways
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

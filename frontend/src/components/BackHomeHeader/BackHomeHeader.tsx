export default function BackHomeHeader() {
  return (
        <div className='w-full p-2'>
            <a href="/" className='text-2xl text-red-500 font-bold flex items-center'>
                <div className="bg-[url('/src/assets/logored.png')] w-[50px] h-[50px]
                    bg-cover
                "></div>

                <h2>
                    StokVault
                </h2>
            </a>
        </div>
  )
}
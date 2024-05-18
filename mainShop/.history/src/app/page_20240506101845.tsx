import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const products = [
    { name: "CUTWORK POPLIN DRESS", price: "Rs.9,950.00", image: "./image/product/image1.png" },
    { name: "CUTWORK POPLIN DRESS", price: "Rs.9,950.00", image: "./image/product/image1.png" },
    { name: "CUTWORK POPLIN DRESS", price: "Rs.9,950.00", image: "./image/product/image1.png" },
    { name: "CUTWORK POPLIN DRESS", price: "Rs.9,950.00", image: "./image/product/image1.png" },
  ];

  return (
    <main>
      <div className="relative h-[580px] my-6">
        <Image src="/image/young-friends-sitting-curb-city.svg" alt="Studio Collection" layout="fill" objectFit="cover" />
        <div className="absolute inset-x-0 bottom-10 text-center text-white pb-12">
          <div className="text-2xl text-white font-light">
            <span>SPRING SUMMER</span>
          </div>
          <div className="text-4xl text-white ">
            <span>TELL ME MORE</span>
          </div>
          <div className="mt-4">
            <Link
              href={{
                pathname: '/search',
                query: { tags: ['women'] },
              }}
              className="btn mr-2 bg-white text-black hover:bg-gray-200 hover:text-black text-base"
            >
              SHOP MEN
            </Link>
            <Link
              href={{
                pathname: '/search',
                query: { tags: ['men'] },
              }}
              className="btn bg-white text-black hover:bg-gray-200 hover:text-black text-base"
            >
              SHOP WOMEN
            </Link>
          </div>
        </div>
      </div>

      <div className="p-5 rounded mt-3 text-center my-2">
        <h3 className="bestseller text-3xl font-[350] mb-2">BEST SELLER</h3>
        <button type="button" className="btn btn-outli">VIEW ALL</button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mx-10">
        {products.map((product, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 cursor-pointer hover:-translate-y-2 transition-all relative">
            <div className="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-4 right-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18px"
                className="fill-gray-800 inline-block"
                viewBox="0 0 64 64"
              >
                <path
                  d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                  data-original="#000000"
                />
              </svg>
            </div>
            <div className="w-11/12 h-[220px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
              <img
                src={product.image}
                alt="Product 1"
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                {product.name}
              </h3>
              <p className="text-gray-500 text-sm mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <h4 className="text-lg text-gray-700 font-bold mt-4">{product.price}</h4>
            </div>
            <div className="flex mt-[5px] flex-row justify-center gap-1 justify-self-center">
              <div className="border-[3px] border-indigo-500/75 w-[30px] h-[30px] bg-[#ece7e7]"></div>
              <div className="border-[3px] border-indigo-500/75  w-[30px] h-[30px] bg-[#161313]"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative h-[580px] my-6">
        <Image src="/image/image-collection.svg" alt="Studio Collection" layout="fill" objectFit="cover" />
        <div className="absolute inset-x-0 bottom-10 text-center text-white pb-12">
          <div className="text-2xl font-light">
            <span>NEW IN</span>
          </div>
          <div className="text-4xl">
            <span>STUDIO COLLECTION</span>
          </div>
          <div className="mt-4">
            <Link 
             className="btn bg-white text-black hover:bg-gray-200 hover:text-black text-base">SHOP NOW</Link>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mx-10">
        {products.map((product, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 cursor-pointer hover:-translate-y-2 transition-all relative">
            <div className="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-4 right-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18px"
                className="fill-gray-800 inline-block"
                viewBox="0 0 64 64"
              >
                <path
                  d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                  data-original="#000000"
                />
              </svg>
            </div>
            <div className="w-11/12 h-[220px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
              <img
                src={product.image}
                alt="Product 1"
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                {product.name}
              </h3>
              <p className="text-gray-500 text-sm mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <h4 className="text-lg text-gray-700 font-bold mt-4">{product.price}</h4>
            </div>
            <div className="flex mt-[5px] flex-row justify-center gap-1 justify-self-center">
              <div className="border-[3px] border-indigo-500/75 w-[30px] h-[30px] bg-[#ece7e7]"></div>
              <div className="border-[3px] border-indigo-500/75  w-[30px] h-[30px] bg-[#161313]"></div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

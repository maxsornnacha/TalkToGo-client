import Image from "next/image"

export default function WorldPost(){

    return(
    <div className="bg-gray-200 min-h-screen h-auto pb-10 flex flex-col items-center">
        <div className="flex flex-col w-4/6 gap-4 bg-gray-200 ">
            {/* Input form */}
            <div className="bg-white h-10 w-full mt-3 mb-0 w-4/6 py-8 pb-20 ps-2 grid grid-cols-12">
                <Image className="bg-white inline rounded-full h-10 w-10 inline me-2 col-span-1" src={'/earth-74015.jpg'} width={30} height={40} alt="Profile picture"/>
                <button className="py-2 ps-2 w-full bg-gray-200 outline-none col-span-10 text-black rounded-md text-start text-gray-500">คุณคิดอะไรอยู่ มาแชร์ความคิดกัน</button>     
            </div>

            {/* Post Card */}
            <div className="bg-white h-auto w-full w-4/6 pt-4 pb-3 grid grid-cols-12">
                <div className="col-span-12 bg-white">
                <Image className="bg-white rounded-full h-10 w-10 inline-block me-2 ms-2" src={'/earth-74015.jpg'} width={30} height={40} alt="Profile picture"/>
                <p className="inline-block text-black bg-white">Sornnacha Buranapongwattana - <span className="bg-white text-black">11.20 PM</span></p>
                <p className="my-2 mx-2 bg-white text-black">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                 ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not
                  only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
                
                  <Image className="w-full" src={'/maple.jpg'} width={590} height={600} alt="Post picture"/>
                </div>

                <div className="pt-3 bg-white text-black col-span-12 flex flex-row justify-between items-center">
                <div className="flex flex-row w-52 items-center bg-white text-black">
                <Image className="bg-white inline-block me-2" src={'/like1.png'} width={40} height={40} alt="Profile picture"/>
                <p className="bg-white text-black font-seimibold">20 Likes</p>
                </div>
                <span className="bg-white text-black ms-60">
                    1 <span className="bg-white text-black">ความคิดเห็น</span>
                </span>
                <div > 
                </div>              
                </div>
                <div className="bg-white text-black flex flex-wrap border-t-2 col-span-12 mt-2 py-2">
                        <button className="bg-white text-black flex-1">ถูกใจ</button>
                        <button className="bg-white text-black flex-1">แสดงความคิดเห็น</button>
                </div>
                 </div>

              {/* Post Card */}
              <div className="bg-white h-auto w-full w-4/6 pt-4 pb-3 grid grid-cols-12">
                <div className="col-span-12 bg-white">
                <Image className="bg-white rounded-full h-10 w-10 inline-block me-2 ms-2" src={'/earth-74015.jpg'} width={30} height={40} alt="Profile picture"/>
                <p className="inline-block text-black bg-white">Sornnacha Buranapongwattana - <span className="bg-white text-black">11.20 PM</span></p>
                <p className="my-2 mx-2 bg-white text-black">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                 ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not
                  only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
                
                  <Image className="w-full" src={'/maple.jpg'} width={590} height={600} alt="Post picture"/>
            
                </div>

                <div className="pt-3 bg-white text-black col-span-12 flex flex-row justify-between items-center">
                <div className="flex flex-row w-52 items-center bg-white text-black">
                <Image className="bg-white inline-block me-2" src={'/like1.png'} width={40} height={40} alt="Profile picture"/>
                <p className="bg-white text-black font-seimibold">20 Likes</p>
                </div>
                <span className="bg-white text-black ms-60">
                    1 <span className="bg-white text-black">ความคิดเห็น</span>
                </span>
                <div > 
                </div>              
                </div>
                <div className="bg-white text-black flex flex-wrap border-t-2 col-span-12 mt-2 py-2">
                        <button className="bg-white text-black flex-1">ถูกใจ</button>
                        <button className="bg-white text-black flex-1">แสดงความคิดเห็น</button>
                </div>
                 </div>

                    
              {/* Post Card */}
              <div className="bg-white h-auto w-full w-4/6 pt-4 pb-3 grid grid-cols-12">
                <div className="col-span-12 bg-white">
                <Image className="bg-white rounded-full h-10 w-10 inline-block me-2 ms-2" src={'/earth-74015.jpg'} width={30} height={40} alt="Profile picture"/>
                <p className="inline-block text-black bg-white">Sornnacha Buranapongwattana - <span className="bg-white text-black">11.20 PM</span></p>
                <p className="my-2 mx-2 bg-white text-black">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                 ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not
                  only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
                
                  <Image className="w-full" src={'/maple.jpg'} width={590} height={600} alt="Post picture"/>
            
                </div>

                <div className="pt-3 bg-white text-black col-span-12 flex flex-row justify-between items-center">
                <div className="flex flex-row w-52 items-center bg-white text-black">
                <Image className="bg-white inline-block me-2" src={'/like1.png'} width={40} height={40} alt="Profile picture"/>
                <p className="bg-white text-black font-seimibold">20 Likes</p>
                </div>
                <span className="bg-white text-black ms-60">
                    1 <span className="bg-white text-black">ความคิดเห็น</span>
                </span>
                <div > 
                </div>              
                </div>
                <div className="bg-white text-black flex flex-wrap border-t-2 col-span-12 mt-2 py-2">
                        <button className="bg-white text-black flex-1">ถูกใจ</button>
                        <button className="bg-white text-black flex-1">แสดงความคิดเห็น</button>
                </div>
                 </div>

                 
                      {/* Post Card */}
            <div className="bg-white h-auto w-full w-4/6 pt-4 pb-3 grid grid-cols-12">
                <div className="col-span-12 bg-white">
                <Image className="bg-white rounded-full h-10 w-10 inline-block me-2 ms-2" src={'/earth-74015.jpg'} width={30} height={40} alt="Profile picture"/>
                <p className="inline-block text-black bg-white">Sornnacha Buranapongwattana - <span className="bg-white text-black">11.20 PM</span></p>
                <p className="my-2 mx-2 bg-white text-black">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                 ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not
                  only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
                
                  <Image className="w-full" src={'/maple.jpg'} width={590} height={600} alt="Post picture"/>
            
                </div>

                <div className="pt-3 bg-white text-black col-span-12 flex flex-row justify-between items-center">
                <div className="flex flex-row w-52 items-center bg-white text-black">
                <Image className="bg-white inline-block me-2" src={'/like1.png'} width={40} height={40} alt="Profile picture"/>
                <p className="bg-white text-black font-seimibold">20 Likes</p>
                </div>
                <span className="bg-white text-black ms-60">
                    1 <span className="bg-white text-black">ความคิดเห็น</span>
                </span>
                <div > 
                </div>              
                </div>
                <div className="bg-white text-black flex flex-wrap border-t-2 col-span-12 mt-2 py-2">
                        <button className="bg-white text-black flex-1">ถูกใจ</button>
                        <button className="bg-white text-black flex-1">แสดงความคิดเห็น</button>
                </div>
                 </div>
        </div>
    </div>
    )
}
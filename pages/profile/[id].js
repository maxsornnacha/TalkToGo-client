import axios from 'axios'
import { useState,useEffect } from "react"
import { useRouter } from 'next/router'
import Navbar from '@/components/Navbars/NavbarOther'
import Link from 'next/link'
import LikeSystem from '@/components/Likes/LikeSystem'
import UserDataFetching from '@/services/UserDataFetching'
import MenuBarOn from '@/components/Menus/MenuBarOnLeft'
import AddFriends from '@/components/Friends/AddFriends'
import Chatroom from '@/components/Chats/ChatsProfile'
import { io } from 'socket.io-client'
import CommentForm from '@/components/Posts/CommentForm'
import AllFriendList from '@/components/Friends/AllFriendList'
const socket = io(process.env.API_SOCKET_URL)



export default function Profile(){
  const router = useRouter()
  const {id}= router.query
  const [toggle,setToggle] = useState('posts')
  const [accountData,setAccountData]= useState(null)
  const [posts,setposts] = useState(null)
  const [accountLogin,setAccountLogin] = useState(null)
  const [likeCount,setLikeCount] = useState(null)
  const [menuToggle,setMenuToggle] = useState(false)
  const [toggleComment,setToggleComment] = useState(false)
  const [numberOfFriends,setNumberOfFriends] = useState(0)
  const [chatroomToggle,setChatroomToggle] = useState(false)
  

  const fetchData = async () => {
    await axios.get(`${process.env.API_URL}/signle-account-data/${id}`)
    .then( (response)=>{
    setAccountData(response.data)
  }).catch((error)=>{
  })
};

  const fetchPostOfTheAccount = async ()=>{
    await axios.get(`${process.env.API_URL}/display-post-profile/${id}`)
    .then( (response)=>{
      setposts(response.data.reverse())
  }).catch((error)=>{
  })
  }

  const fetchAccount = async ()=>{
    if(await UserDataFetching()){
      setAccountLogin(await UserDataFetching())
    }else{
      router.push('/')
    }

  }

  const friendNumberUpdate=()=>{
    axios.get(`${process.env.API_URL}/all-friends-get/${accountData._id}`)
    .then((response)=>{
      setNumberOfFriends((response.data).length)
    })
    .catch((error)=>{
        //ดึงข้อมูลไม่สำเร็จ
    })
}
  

    useEffect(() => {
      if (id) {
        fetchData();
        fetchPostOfTheAccount();
      }
      fetchAccount();
      setToggle('posts')
      setChatroomToggle(false)
      },[id]);

      useEffect(()=>{
        if(accountData){
          friendNumberUpdate();
        }
      },[accountData])

      //จัดการไลค์ต่อ
    const handleLike=(like,postID,check)=>{
     
      if(like === 1){
        
          socket.emit('like',1,postID)
          
          socket.on('like',(like,postID)=>{
              if(check){
                  setLikeCount((prev)=>{
                      return {...prev,[postID]:0}
                  })
              }else{
                  setLikeCount((prev)=>{
                      return {...prev,[postID]:like}
                  })
              }
     
          })

      }else if(like === 0) {
          
          socket.emit('unlike',0,postID)

          socket.on('unlike',async (unlike,postID)=>{
            
            if(check){
                  setLikeCount((prev)=>{
                   return {...prev,[postID]:-1}
                  })
              }else{
                  setLikeCount((prev)=>{
                  return {...prev,[postID]:unlike}
                  })
              } 
          })
      }
  }   

  useEffect(()=>{
    handleLike()
  },[])

  const handleMenuToggle=(toggleData)=>{
    setMenuToggle(toggleData)
  }

  const handleToggleCommentCancel=(toggleData)=>{
    setToggleComment(toggleData)

}

useEffect(()=>{

  const handleCommentData = (commentData) => {
    setposts((prev) =>
          prev.map((post) =>
              post.postID === commentData.postID
                  ? {
                        ...post,
                        comments: [...post.comments, commentData],
                    }
                  : post
          )
      );
  };

  // Add the event listener
  socket.on('commentData', handleCommentData);

  // Clean up the event listener when the component unmounts
  return () => {
      socket.off('commentData', handleCommentData);
  };

},[])


    //Update Comment when toggle close the comment card
    const handleUpdateComment=(postID,commentData)=>{

      setposts((posts)=>{
          const result = posts.map((singlePost)=>{
              if(singlePost.postID === postID){
                  return {...singlePost, comments:commentData}
              }else{
                  return singlePost
              }
          })
          return result
      })

  }

  const handleChatroomToggle=(data)=>{
    setChatroomToggle(data)
}
  
  const handleCloseChat=(data)=>{
    setChatroomToggle(data)
  }


    return(
    <div className="min-h-screen h-auto bg-gray-900 text-[1.1rem]">
       <div className="sticky w-full top-0 z-50 shadow-md">
       <Navbar userData={accountLogin} menuToggle={handleMenuToggle} menuStatus={menuToggle} />
       </div>
    
    { accountLogin ?
    <div className='grid grid-cols-12 h-full  py-3 '>

            {menuToggle &&
                <div className="lg:hidden text-black fixed w-full top-12 col-span-12 lg:col-span-6 z-20">
                <MenuBarOn  userData={accountLogin} />
                 </div>
            }


            {/* section1 */}
          <div className='col-span-12 hidden md:block lg:block md:col-span-3 lg:col-span-2 bg-gray-800 sticky top-14 h-screen'>
               <MenuBarOn  userData={accountLogin} />
          </div>

             {/* section2 Option:All posts*/}
       {toggle === 'posts' && posts && !chatroomToggle &&
          <div className='col-span-12 md:col-span-9 lg:col-span-7 bg-gray-100 '>
            
            {/* แสดง profile เมื่อหน้าจออยู่ขนาดกลาง และเล็ก */}
            {accountData &&
          <div className='mt-5 h-auto pb-3 bg-gray-100 text-gray-900  h-2/6 lg:hidden '>
                <div className='flex-1 flex justify-center'>
                <img src={accountData.accountImage?accountData.accountImage:'/defaultProfile.png'} className='h-56 w-56 rounded-full'/>
                </div>
            <div className='flex flex-col justify-center flex-1 gap-1 bg-gray-100 py-4 px-2 font-semibold'>
                <div>
                   ชื่อ: {accountData.firstname} {accountData.lastname}
                </div>
                <div>
                    ชื่อผู้ใช้งาน: {accountData.username}
                </div>
                 <div>
                   จำนวนเพื่อน : {numberOfFriends} 
                 </div>
                 <div>
                   จำนวนโพสต์ : {posts && posts.length}
                  </div>
            </div>
            <div className='mt-5 flex bg-gray-800 text-gray-200 py-2 justify-center'>
              <div>
              <button onClick={()=>{setToggle('posts'); setChatroomToggle(false)}} className={toggle === 'posts' && !chatroomToggle?'py-4 px-2 me-4 bg-gray-900 text-white shadow-md':'py-4 px-2 shadow-md me-3 text-gray-300'}>
              โพสต์ทั้งหมด
              </button>
              </div>
              <div>
              <button onClick={()=>{setToggle('friends'); setChatroomToggle(false)}} className={toggle === 'friends' && !chatroomToggle?'py-4 px-2 me-4 bg-gray-900 text-white shadow-md':'py-4 px-2 shadow-md text-gray-300'}>
              เพื่อนทั้งหมด
              </button>
              </div>
            </div>
            {accountLogin.accountData.id !== accountData.id &&
              <div className='text-center bg-gray-800 py-3'>
              <AddFriends handleChatroomToggle={handleChatroomToggle} senderID={accountLogin.accountData._id} getterID={accountData._id}/>
              </div>
            }
          </div>
          }

          <div className=" w-full  md:ps-5 lg:ps-5  py-5">
            {accountData &&
               <h1 className="text-[2.5rem] text-center pb-1 text-gray-900">โพสต์ของ {accountData.firstname}</h1>
            }
           </div>
        
            {/* Post Card */}
          <div className='flex flex-col items-center '>
          {toggle === 'posts' && posts &&
        posts.map((item,index)=>{
         return(
           <div className="md:border border-t border-b border-gray-200 bg-white h-auto lg:w-9/12 md:w-11/12 w-full lg:mx-3  pt-4  grid grid-cols-12 md:rounded-md lg:rounded-md mb-4" key={item.postID}>
           <div className="col-span-12 bg-white">
           <div className="flex gap-1">

           <div>
           <Link href={`/profile/${item.accountID}`}>
           <img className="bg-white rounded-full h-8 w-8 lg:h-10 lg:w-10 inline-block me-2 ms-2" src={item.accountImage} alt="Profile picture"/>
           </Link>
           </div>
           <div className="md:mt-2">
           <p className="inline-block text-black bg-white text-[1.0rem] font-semibold  px-1">{item.firstname} {item.lastname}<span className="bg-white text-black text-[1.0rem] font-semibold "> - {item.currentTime} &nbsp;{item.currentDate}</span></p>
           </div>
           </div>
           <p className="my-5 mx-2 bg-white text-black text-[1.0rem] font-semibold  px-1">
             {item.content}
           </p>
           {item.image &&
              <img className="w-full h-auto" src={item.image}  alt="Post picture"/>
            }
           </div>

           <div className="pt-3 bg-white text-black col-span-12 flex flex-row justify-between items-center pe-2 my-4">
           <div className="flex flex-row w-52 items-center bg-white text-black">
           <img className=" inline-block h-10 w-10 mx-2 " src={'/like1.png'}  alt="Profile picture"/>
           <p className="bg-white text-black font-seimibold  text-[1.0rem] font-semibold ">{item.likes.length+(likeCount && likeCount[item.postID] || 0)} Likes</p>
           </div>
           <span className="bg-white text-black text-[1.0rem] font-semibold">
           {item.comments.length} <span className="bg-white text-black text-[1.0rem] font-semibold cursor-pointer" onClick={()=>setToggleComment(index)} >ความคิดเห็น</span>
           </span>            
           </div>
           {accountLogin &&
           <div className="bg-white text-black flex flex-wrap border-t-2 col-span-12 mt-2 text-[1.0rem] font-semibold ">
                   <LikeSystem  accountID={accountLogin.accountData.id} postID={item.postID} handleLike={handleLike}/>
                   <button className="bg-white text-black flex-1  " onClick={()=>{setToggleComment(index)}}>แสดงความคิดเห็น</button>
           </div>
           }
            {toggleComment === index &&
           <div className="overlay z-[100]">
               <CommentForm handleUpdateComment={handleUpdateComment} like={item.likes.length+(likeCount && likeCount[item.postID] || 0)} post={posts[index]} postID={item.postID} postComments={item.comments} toggleCancel={handleToggleCommentCancel} accountData={accountLogin.accountData} key={item.postID}/>
           </div>
            }
            </div>
            
         )

        })
        }
        </div>

        {toggle === 'posts' && posts && posts.length< 1 &&
      
         <div className='h-screen bg-gray-100  w-full text-gray-500 flex justify-center pt-56'>
           <div className='text-[1.5rem]'>ยังไม่มีโพสต์</div>
         </div>

        }
        
     </div>
}


          {/* section 2 Option:Friends */}
          {toggle === 'friends' && !chatroomToggle &&
          <div className='col-span-12 md:col-span-9 lg:col-span-7 bg-gray-100  '>
             
             {/* แสดง profile เมื่อหน้าจออยู่ขนาดกลาง และเล็ก */}
            {accountData &&
          <div className='mt-5 lg:p-2 h-auto pb-3 bg-gray-100 text-gray-900   h-2/6 lg:hidden '>
                <div className='flex-1 flex justify-center'>
                <img src={accountData.accountImage?accountData.accountImage:'/defaultProfile.png'} className='h-56 w-56 rounded-full'/>
                </div>
            <div className='flex flex-col justify-center flex-1 gap-1 bg-gray-100 py-4 px-2 font-semibold'>
                <div>
                   ชื่อ: {accountData.firstname} {accountData.lastname}
                </div>
                <div>
                    ชื่อผู้ใช้งาน: {accountData.username}
                </div>
                 <div>
                   จำนวนเพื่อน : {numberOfFriends} 
                 </div>
                 <div>
                   จำนวนโพสต์ : {posts && posts.length}
                  </div>
            </div>
            <div className='mt-5 flex bg-gray-800 py-2 justify-center'>
              <div>
              <button onClick={()=>{setToggle('posts'); setChatroomToggle(false)}} className={toggle === 'posts' && !chatroomToggle?'py-4 px-2 me-4 bg-gray-900 text-white shadow-md':'py-4 px-2 shadow-md me-3 text-gray-300'}>
              โพสต์ทั้งหมด
              </button>
              </div>
              <div>
              <button onClick={()=>{setToggle('friends'); setChatroomToggle(false)}} className={toggle === 'friends' && !chatroomToggle?'py-4 px-2 me-4 bg-gray-900 text-white shadow-md':'py-4 px-2 shadow-md text-gray-300'}>
              เพื่อนทั้งหมด
              </button>
              </div>
            </div>
            {accountLogin.accountData.id !== accountData.id &&
              <div className='text-center bg-gray-800 py-3'>
              <AddFriends handleChatroomToggle={handleChatroomToggle} senderID={accountLogin.accountData._id} getterID={accountData._id}/>
              </div>
            }
          </div>
          }
             <div className=" w-full  md:ps-5 lg:ps-5  py-5 min-h-screen h-auto">
               <h1 className="text-[2.5rem] text-center pb-1 text-gray-900">เพื่อนทั้งหมด</h1>
               <div>
                  <AllFriendList accountLogin={accountLogin} accountID={accountData._id}  />
                </div>
             </div>
          
          </div>
            }

            {/* section 2 option:chatRoom */}
        {chatroomToggle &&
          <div className='md:col-span-9 lg:col-span-7 col-span-12 w-full'>
          <div className='w-full'>
          <Chatroom handleCloseChat={handleCloseChat}  senderData={accountLogin} getterData={accountData}/>
          </div>
          </div>
         }
     
          {/* section3 */}
          {accountData &&
          <div className='p-2 h-auto pb-3 bg-gray-800 text-gray-300 col-span-12 hidden lg:block  lg:col-span-3 h-2/6 md:sticky lg:sticky top-16'>
                <div className='flex-1 flex justify-center'>
                <img src={accountData.accountImage?accountData.accountImage:'/defaultProfile.png'} className='h-56 w-56 rounded-full'/>
                </div>
            <div className='flex flex-col justify-center flex-1 gap-1 bg-gray-800 py-4 px-2 font-semibold'>
                <div>
                   ชื่อ: {accountData.firstname} {accountData.lastname}
                </div>
                <div>
                    ชื่อผู้ใช้งาน: {accountData.username}
                </div>
                 <div>
                   จำนวนเพื่อน : {numberOfFriends} 
                 </div>
                 <div>
                   จำนวนโพสต์ : {posts && posts.length}
                  </div>
            </div>
            <div className=' flex bg-gray-800 py-2 justify-center'>
            <div>
              <button onClick={()=>{setToggle('posts'); setChatroomToggle(false)}} className={toggle === 'posts' && !chatroomToggle?'py-4 px-2 me-4 bg-gray-900 text-white shadow-md':'py-4 px-2 shadow-md me-3 text-gray-300'}>
              โพสต์ทั้งหมด
              </button>
              </div>
              <div>
              <button onClick={()=>{setToggle('friends'); setChatroomToggle(false)}} className={toggle === 'friends' && !chatroomToggle?'py-4 px-2 me-4 bg-gray-900 text-white shadow-md':'py-4 px-2 shadow-md text-gray-300'}>
              เพื่อนทั้งหมด
              </button>
              </div>
            </div>
            {accountLogin.accountData.id !== accountData.id &&
              <div className='text-center'>
              <AddFriends handleChatroomToggle={handleChatroomToggle} senderID={accountLogin.accountData._id} getterID={accountData._id}/>
              </div>
            }
          </div>
          }
    </div>
     :
     <div className='bg-gray-100 text-white h-screen flex-col text-center mt-20'>
           <div>You have not signed in, please sign in ......</div>
         <div>We are redirecting you to the login page</div>
     </div>
     }
    </div>
    )
}
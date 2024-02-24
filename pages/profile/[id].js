import axios from 'axios'
import { useState,useEffect } from "react"
import { useRouter } from 'next/router'
import Navbar from '@/components/Navbars/NavbarProfile'
import Link from 'next/link'
import LikeSystem from '@/components/Likes/LikeSystem'
import UserDataFetching from '@/services/UserDataFetching'
import MenuBarOn from '@/components/Menus/MenuBarOnLeft'
import AddFriends from '@/components/Friends/AddFriends'
import { io } from 'socket.io-client'
import CommentForm from '@/components/Posts/CommentForm'
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
  

    useEffect(() => {
      if (id) {
        fetchData();
        fetchPostOfTheAccount();
      }
      fetchAccount();
      },[id]);

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

    return(
    <div className="min-h-screen h-auto bg-gray-900">
       <div className="sticky w-full top-0 z-50">
       <Navbar userData={accountLogin} menuToggle={handleMenuToggle} menuStatus={menuToggle} />
       </div>
    
    { accountLogin ?
    <div className='grid grid-cols-12 h-full gap-3 py-3'>

            {menuToggle &&
                <div className="lg:hidden text-black fixed w-full top-9 col-span-12 lg:col-span-6 z-20">
                <MenuBarOn  userData={accountLogin} />
                 </div>
            }

          <div className='col-span-12 md:col-span-1 lg:col-span-2'>
          </div>

          {/* section1 */}
          {accountData &&
          <div className='h-screen pb-3 bg-white col-span-12 md:col-span-4  lg:col-span-3 h-2/6 md:sticky lg:sticky top-20'>
                <div className='flex-1'>
                <img src={accountData.accountImage?accountData.accountImage:'/defaultProfile.png'} className=' h-56 w-full'/>
                </div>
            <div className='flex flex-col justify-center flex-1 bg-white py-4 px-2'>
                <div>
                   ชื่อ: {accountData.firstname} {accountData.lastname}
                </div>
                <div>
                    ชื่อผู้ใช้งาน: {accountData.username}
                </div>
                 <div>
                   จำนวนเพื่อน : {(accountData.friends).length} 
                 </div>
                 <div>
                   จำนวนโพสต์ : {posts && posts.length}
                  </div>
            </div>
            <div className=' flex bg-white py-2 justify-center'>
              <div>
              <button onClick={()=>setToggle('posts')} className={toggle === 'posts'?'py-4 px-2 me-4 bg-yellow-100 shadow-md':'py-4 px-2 shadow-md me-3'}>
              โพสต์ทั้งหมด
              </button>
              </div>
              <div>
              <button onClick={()=>setToggle('friends')} className={toggle === 'friends'?'py-4 px-2 me-4 bg-yellow-100 shadow-md':'py-4 px-2 shadow-md'}>
              เพื่อนทั้งหมด
              </button>
              </div>
            </div>
            {accountLogin.accountData.id !== accountData.id &&
              <div className='text-center'>
              <AddFriends senderID={accountLogin.accountData._id} getterID={accountData._id}/>
              </div>
            }
          </div>
          }

             {/* section2 */}
          <div className='col-span-12 md:col-span-6 lg:col-span-5'>
        
          
             {/* Post Card */}
             {toggle === 'posts' && posts &&
             posts.map((item,index)=>{
              return(
                <div className="border-yellow-200 border-2 bg-white h-auto w-auto  pt-4  grid grid-cols-12 md:rounded-md lg:rounded-md mb-4" key={item.postID}>
                <div className="col-span-12 bg-white">
                <div className="flex gap-1">
   
                <div>
                <Link href={`/profile/${item.accountID}`}>
                <img className="bg-white rounded-full h-8 w-8 lg:h-10 lg:w-10 inline-block me-2 ms-2" src={item.accountImage} alt="Profile picture"/>
                </Link>
                </div>
                <div className="md:mt-2">
                <p className="inline-block text-black bg-white text-[0.8rem]  px-1">{item.firstname} {item.lastname}<span className="bg-white text-black text-[0.8rem] "> - {item.currentTime} &nbsp;{item.currentDate}</span></p>
                </div>
                </div>
                <p className="my-5 mx-2 bg-white text-black text-[0.8rem]  px-1">
                  {item.content}
                </p>
                {item.image &&
                   <img className="w-full h-auto rounded-md" src={item.image}  alt="Post picture"/>
                 }
                </div>
   
                <div className="pt-3 bg-white text-black col-span-12 flex flex-row justify-between items-center pe-2">
                <div className="flex flex-row w-52 items-center bg-white text-black">
                <img className="bg-white inline-block me-2 h-6 w-6 lg:h-6 lg:w-6 ms-2  p-1 " src={'/like.png'}  alt="Profile picture"/>
                <p className="bg-white text-black font-seimibold  text-[0.8rem] ">{item.likes.length+(likeCount && likeCount[item.postID] || 0)} Likes</p>
                </div>
                <span className="bg-white text-black text-[0.9rem]">
                {item.comments.length} <span className="bg-white text-black text-[0.8rem] cursor-pointer" onClick={()=>setToggleComment(index)} >ความคิดเห็น</span>
                </span>            
                </div>
                {accountLogin &&
                <div className="bg-white text-black flex flex-wrap border-t-2 col-span-12 mt-2">
                        <LikeSystem  accountID={accountLogin.accountData.id} postID={item.postID} handleLike={handleLike}/>
                        <button className="bg-white text-black flex-1  text-[0.9rem]" onClick={()=>{setToggleComment(index)}}>แสดงความคิดเห็น</button>
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

             {posts && posts.length< 1 &&
           
              <div className='h-screen w-full text-white flex justify-center pt-20'>
                <div>ยังไม่มีโพสต์</div>
              </div>

             }
             
          </div>

          <div className='col-span-12 md:col-span-1 lg:col-span-2'>
          </div>

             
    </div>
     :
     <div className='bg-gray-900 text-white h-screen flex-col text-center mt-20'>
           <div>You have not signed in, please sign in ......</div>
         <div>We are redirecting you to the login page</div>
     </div>
     }
    </div>
    )
}
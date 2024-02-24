import Postform from "./PostForm"
import { useState,useEffect } from "react"
import LikeSystem from "../Likes/LikeSystem"
import axios from "axios"
import Link from "next/link"
import { io } from "socket.io-client"
import CommentForm from "./CommentForm"
const socket = io(process.env.API_SOCKET_URL)



export default function WorldPost(props){
    const [toggleForm,setToggleForm] = useState(false)
    const [posts,setPosts] = useState([])
    const [likeCount,setLikeCount] = useState(null)
    const [toggleComment,setToggleComment] = useState(false)

    //จัดการไลค์ต่อ
    const handleLike=(like,postID,check)=>{
       
        if(like === 1){
            console.log('1')
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

    useEffect(()=>{
        const fetch=()=>{
            axios.get(`${process.env.API_URL}/display-post`)
            .then((response)=>{
                setPosts(response.data.reverse())
            })
            .catch((error)=>{
                console.log(error.response.data.error)
            })
        }

        fetch()
       
    },[])



    const handleToggleCancel=(toggleData)=>[
        setToggleForm(toggleData)
    ]

    const handleToggleCommentCancel=(toggleData)=>{
        setToggleComment(toggleData)

    }

    useEffect(()=>{
        
        const handleCommentData = (commentData) => {
            setPosts((prev) =>
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

        setPosts((posts)=>{
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
    <div className="bg-gray-900 min-h-screen h-auto pb-10 flex flex-col items-center">
   
        <div className=" w-full  md:ps-5 lg:ps-5  py-5">
               <h1 className="font-bold text-[1.4rem] text-center pb-1 text-white">WORLDPOST</h1>
               <h1 className="font-bold text-[0.5rem] text-center"><span className="bg-yellow-200 text-yellow-200 rounded-lg">........................................</span></h1>
        </div>
        

        
        <div className="flex flex-col w-full md:w-5/6 lg:w-5/6 gap-4">
            {/* Input form */}
            <div className="border-yellow-200 border-2 bg-white flex h-10 w-full mt-3 mb-0  py-8 pb-20 ps-2 grid grid-cols-12 md:rounded-md lg:rounded-md">
                <div className="col-span-11 flex">
                <Link href={`/profile/${props.userData.accountData.id}`}>
                <img className="bg-white inline rounded-full h-8 w-8 lg:h-10 lg:w-10 inline col-span-1" src={props.userData?props.userData.accountData.accountImage:'/defaultProfile.png'} alt="Profile picture"/>
                </Link>
                <button onClick={()=>setToggleForm(true)} className="py-2 ps-2 ms-2 w-full bg-gray-900 outline-none col-span-10  rounded-md text-start text-white text-[0.9rem]  overflow-x-auto scrollbar-hide">คุณคิดอะไรอยู่ มาแชร์ความคิดกัน</button>   
                </div>  
            </div>

            {/* Post Card */}
            {posts.length !== 0? 
            posts.map((item,index)=>{
                
                return(
                <div className="border-yellow-200 border-2 bg-white h-auto w-full pt-4  grid grid-cols-12 md:rounded-md lg:rounded-md" key={item.postID}>
                 <div className="col-span-12 bg-white">
                 <div className="flex gap-1">
 
                 <div>
                <Link href={`/profile/${item.accountID}`}>
                 <img className=" rounded-full h-8 w-8 lg:h-10 lg:w-10 inline-block me-2 ms-2" src={item.accountImage} alt="Profile picture"/>
                 </Link>
                 </div>
                 <div className="md:mt-2">
                 <p className="inline-block text-black bg-white text-[0.9rem]  px-1">{item.firstname} {item.lastname}<span className="text-[0.9rem] "> - {item.currentTime} &nbsp;{item.currentDate}</span></p>
                 </div>
                 </div>
                 <p className="my-5 mx-2 text-black text-[0.9rem]  px-1">
                    {item.content}            
                 </p>
                 {item.image &&
                   <img className="w-full h-auto rounded-md" src={item.image}  alt="Post picture"/>
                 }
                </div>
 
                 <div className="pt-3 text-white bg-white  col-span-12 flex flex-row justify-between items-center me-2">
                 <div className="flex flex-row w-52 items-center text-black bg-white">
                 <img className="bg-white inline-block h-6 w-6 lg:h-6 lg:w-6 ms-2  p-1 " src={'/like.png'}  alt="Profile picture"/>
                 <p className="ms-2 text-black bg-white font-seimibold  text-[0.9rem] ">{item.likes.length+(likeCount && likeCount[item.postID] || 0)} Likes</p>
                 </div>
                 <span className="text-black bg-white text-[0.9rem]">
                     {item.comments.length} <span className="text-black bg-white text-[0.9rem] cursor-pointer" onClick={()=>setToggleComment(index)}>ความคิดเห็น</span>
                 </span>            
                 </div>
 
                 <div className="text-black bg-white flex flex-wrap border-t col-span-12 my-3">
                         <LikeSystem accountID={props.userData.accountData.id} postID={item.postID} handleLike={handleLike}/>
                         <button className="text-black bg-white flex-1  text-[0.9rem]" onClick={()=>{setToggleComment(index)}}>แสดงความคิดเห็น</button>
                 </div>
                 {toggleComment === index &&
                <div className="overlay z-[100]">
                    <CommentForm handleUpdateComment={handleUpdateComment} like={item.likes.length+(likeCount && likeCount[item.postID] || 0)} post={posts[index]} postID={item.postID} postComments={item.comments}  toggleCancel={handleToggleCommentCancel} accountData={props.userData.accountData} key={item.postID}/>
                </div>
                 }
                  </div>  
            )
            })
            :
            <div className="h-screen flex text-black justify-center mt-20">
                <div>คุณยังไม่มีโพสต์บนฟีต มาร่วมแชร์ความคิดกันเถอะ</div>
            </div>
            }

                
        </div>

        {toggleForm  &&
        <div className="overlay z-[100]">
        <Postform toggleCancel={handleToggleCancel} accountData={props.userData.accountData}/>
        </div> 
      }
   
    </div>
    )
}
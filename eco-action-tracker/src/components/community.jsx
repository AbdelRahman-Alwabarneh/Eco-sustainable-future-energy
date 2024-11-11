"use client";

import React, { useState, useEffect } from 'react';
import { Search, Battery, CornerDownRight, ImageIcon, Award, Zap, Send, Bike, BarChart2, ThumbsUp, MessageSquare, Share2, Users, Calendar, Bookmark, MoreHorizontal, Sun, Moon, ChevronUp } from 'lucide-react';
import axios from 'axios';

const EcoGymEnergyPage = ({ user, posts }) => {
    const [energyGenerated, setEnergyGenerated] = useState(0);
    const [powerSaved, setPowerSaved] = useState(25);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [newPostContent, setNewPostContent] = useState('');
    const [newComments, setNewComments] = useState({});
    const [newReplies, setNewReplies] = useState({});
    const [newPostImage, setNewPostImage] = useState('');
    const [showImageInput, setShowImageInput] = useState(false);


    // const [posts, setPosts] = useState([
    //     {
    //         id: 1,
    //         author: "Sarah Green",
    //         avatar: "https://i.pravatar.cc/150?img=1",
    //         role: "Fitness Enthusiast & Eco Warrior",
    //         time: "2h",
    //         content: "Just finished a 1-hour cycling session and generated 0.5 kWh of clean energy! 💪🌿 #EcoGymLife",
    //         image: "https://miro.medium.com/v2/resize:fit:750/1*EUTTuD-BqLf4OAoWi9k-gg.png",
    //         likes: 89,
    //         comments: []
    //     },
    //     {
    //         id: 2,
    //         author: "Mike Power",
    //         avatar: "https://i.pravatar.cc/150?img=2",
    //         role: "Gym Owner & Sustainability Advocate",
    //         time: "1d",
    //         content: "Excited to announce that our gym has officially gone 100% off-grid thanks to our members' workouts! 🎉🔋 #SustainableEnergy",
    //         likes: 156,
    //         comments: []
    //     },
    //     {
    //         id: 3,
    //         author: "Emily Watts",
    //         avatar: "https://i.pravatar.cc/150?img=3",
    //         role: "Environmental Engineer",
    //         time: "3d",
    //         content: "New study shows that gyms equipped with energy-generating equipment can reduce a city's carbon footprint by up to 5%! 📊🌍 #GreenTech",
    //         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsQc7f3-ZNhNw8bdxLyunhGsLoNo2sMiMeCA&s",
    //         likes: 203,
    //         comments: []
    //     },
    //     {
    //         id: 4,
    //         author: "Alex Trainer",
    //         avatar: "https://i.pravatar.cc/150?img=4",
    //         role: "Fitness Coach & Energy Ambassador",
    //         time: "5d",
    //         content: "Today's challenge: Generate enough energy during your workout to charge your phone! Who's in? 📱💪 #WorkoutChallenge",
    //         likes: 78,
    //         comments: []
    //     },
    //     {
    //         id: 5,
    //         author: "TechGreen Solutions",
    //         avatar: "https://i.pravatar.cc/150?img=5",
    //         role: "Energy Technology Company",
    //         time: "1w",
    //         content: "Unveiling our latest eco-gym equipment: The PowerCycle 3000! Convert your sweat into watts more efficiently than ever before. 🚴‍♂️⚡ #GreenInnovation",
    //         image: "https://media.licdn.com/dms/image/D4D12AQGUnyjF-jrLYA/article-cover_image-shrink_720_1280/0/1715960160346?e=2147483647&v=beta&t=Hr6YNqMYyV2RGx0cSQ5ZaaijotM_3-90gWR95qfR-KY",
    //         likes: 312,
    //         comments: []
    //     },
    //     {
    //         id: 6,
    //         author: "Eco City Council",
    //         avatar: "https://i.pravatar.cc/150?img=6",
    //         role: "Local Government",
    //         time: "1w",
    //         content: "We're offering tax incentives for gyms that implement energy-generating equipment! Let's power our city with fitness. 🏙️💡 #GreenInitiative",
    //         likes: 189,
    //         comments: []
    //     },
    //     {
    //         id: 7,
    //         author: "Dr. Fit Einstein",
    //         avatar: "https://i.pravatar.cc/150?img=7",
    //         role: "Sports Scientist",
    //         time: "2w",
    //         content: "New research: Regular workouts on energy-generating equipment can improve fitness 15% faster due to increased resistance. Science meets sustainability! 🧪🏋️‍♀️ #FitnessScience",
    //         likes: 245,
    //         comments: []
    //     },
    //     {
    //         id: 8,
    //         author: "GreenGym Chronicles",
    //         avatar: "https://i.pravatar.cc/150?img=8",
    //         role: "Eco-Fitness Blog",
    //         time: "2w",
    //         content: "From Calories to Kilowatts: How one gym member powered their home for a day with a month of workouts! Read the full story on our blog. 📖⚡ #SuccessStory",
    //         image: "https://media.licdn.com/dms/image/D5612AQEvCyC_sxha6w/article-cover_image-shrink_600_2000/0/1671044835531?e=2147483647&v=beta&t=5nrD9JeySdKSXzCasTLSWt0pyOc8rcJ3uLqIHDsVHaI",
    //         likes: 167,
    //         comments: []
    //     },
    //     {
    //         id: 9,
    //         author: "Zoe Lightning",
    //         avatar: "https://i.pravatar.cc/150?img=9",
    //         role: "Olympic Athlete & Green Advocate",
    //         time: "3w",
    //         content: "Training for gold and generating green energy! 🥇⚡ Proud to announce my partnership with EcoGym to promote sustainable fitness worldwide. #OlympicSpirit #GreenAthlete",
    //         likes: 521,
    //         comments: []
    //     },
    //     {
    //         id: 10,
    //         author: "EcoTech Institute",
    //         avatar: "https://i.pravatar.cc/150?img=10",
    //         role: "Renewable Energy Education",
    //         time: "3w",
    //         content: "Now offering a new course: 'Gym-Based Energy Systems Engineering'! Turn your passion for fitness into a career in sustainable energy. Enroll now! 🎓🔋 #GreenCareers",
    //         likes: 134,
    //         comments: []
    //     }
    // ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setEnergyGenerated(prev => prev + Math.random() * 0.1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };



    const handleCreatePost = async () => {
        if (newPostContent.trim() || newPostImage.trim()) {
            const newPost = {
                _id: new Date().getTime().toString(), // Temporary ID
                user: user._id,
                time: new Date().toISOString(),
                content: newPostContent,
                image: newPostImage,
                likes: 0,
                comments: [],
            };
            // setPosts([newPost, ...posts]);

            try {
                const response = await axios.post("api/community/createPost", { newPostContent, newPostImage })
                    .catch(err => { console.log(err) });
            } catch (err) {
                console.log(err);
            }

            setNewPostContent('');
            setNewPostImage('');
            setShowImageInput(false);

            // console.log("Content", newPostContent);
            // console.log("Image", newPostImage);
        }
    };

    const handleLikePost = async (postId) => {
        // setPosts(posts.map(post =>
        //     post._id.toString() === postId.toString() ? { ...post, likes: post.likes + 1 } : post
        // ));

        try {
            const response = await axios.post("api/community/addLikePost", { postId })
                .catch(err => { console.log(err) });
        } catch (err) {
            console.log(err);
        }
    };

    const handleAddComment = async (postId) => {
        // if (newComments[postId]?.trim()) {
        //     setPosts(posts.map(post =>
        //         post._id.toString() === postId.toString() ? {
        //             ...post,
        //             comments: [...(post.comments || []), {
        //                 _id: new Date().getTime().toString(), // Temporary ID
        //                 user: user._id,
        //                 content: newComments[postId],
        //                 likes: 0,
        //                 replies: [],
        //                 time: new Date().toISOString()
        //             }]
        //         } : post
        //     ));
        //     setNewComments({ ...newComments, [postId]: '' });
        // }

        try {
            const response = await axios.post("api/community/addComment", { postId, newComments })
                .catch(err => { console.log(err) });
        } catch (err) {
            console.log(err);
        }

        setNewComments("");
    };

    const handleLikeComment = async (postId, commentId) => {
        // setPosts(posts.map(post =>
        //     post._id.toString() === postId.toString() ? {
        //         ...post,
        //         comments: post.comments.map(comment =>
        //             comment._id.toString() === commentId.toString() ? { ...comment, likes: comment.likes + 1 } : comment
        //         )
        //     } : post
        // ));

        try {
            const response = await axios.post("api/community/addLikeComment", { postId, commentId })
                .catch(err => { console.log(err) });
        } catch (err) {
            console.log(err);
        }
    };

    const handleAddReply = async (postId, commentId) => {
        // if (newReplies[`${postId}-${commentId}`]?.trim()) {
        //     setPosts(posts.map(post =>
        //         post._id.toString() === postId.toString() ? {
        //             ...post,
        //             comments: post.comments.map(comment =>
        //                 comment._id.toString() === commentId.toString() ? {
        //                     ...comment,
        //                     replies: [...(comment.replies || []), {
        //                         _id: new Date().getTime().toString(), // Temporary ID
        //                         user: user._id,
        //                         content: newReplies[`${postId}-${commentId}`],
        //                         likes: 0,
        //                         time: new Date().toISOString()
        //                     }]
        //                 } : comment
        //             )
        //         } : post
        //     ));
        //     setNewReplies({ ...newReplies, [`${postId}-${commentId}`]: '' });
        // }

        try {
            const response = await axios.post("api/community/addReply", { postId, commentId, newReplies })
                .catch(err => { console.log(err) });
        } catch (err) {
            console.log(err);
        }

    };

    const handleLikeReply = async (postId, commentId, replyId) => {
        // setPosts(posts.map(post =>
        //     post._id.toString() === postId.toString() ? {
        //         ...post,
        //         comments: post.comments.map(comment =>
        //             comment._id.toString() === commentId.toString() ? {
        //                 ...comment,
        //                 replies: comment.replies.map(reply =>
        //                     reply._id.toString() === replyId.toString() ? { ...reply, likes: reply.likes + 1 } : reply
        //                 )
        //             } : comment
        //         )
        //     } : post
        // ));

        try {
            const response = await axios.post("api/community/addLikeReply", { postId, commentId, replyId })
                .catch(err => { console.log(err) });
        } catch (err) {
            console.log(err);
        }
    };


    React.useEffect(() => {
        const interval = setInterval(() => {
            setEnergyGenerated(prev => prev + Math.random() * 0.1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`commuinty min-h-screen mt-20 flex flex-col`}>

            <div className="container mx-auto p-4 flex flex-col md:flex-row gap-4">

                {/* Left Sidebar */}
                <div className="w-full md:w-1/4 space-y-4">
                    {/* Profile Card */}
                    <div className=" rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 animate-fade-in">
                        <div className="h-20 bg-gradient-to-r from-[#fdb713] to-blue-500 relative">
                            <img src={user.profileImage || "https://www.transparentpng.com/thumb/user/gray-user-profile-icon-png-fP8Q1P.png"} alt="Profile background" className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4 relative">
                            <img src={user.picture} alt={`${user.firstName} ${user.lastName}`} className="w-20 h-20 rounded-full absolute -top-10 left-1/2 transform -translate-x-1/2 border-4 border-[#FAF8ED] shadow-lg" />
                            <h2 className="text-xl font-bold mt-12 text-center text-[#2D3134]">{`${user.firstName} ${user.lastName}`}</h2>
                            <p className="text-sm text-gray-600 text-center">Fitness Enthusiast & Green Energy Champion</p>
                            <p className="text-sm text-gray-500 text-center">New York, USA</p>
                            <div className="mt-4 flex justify-center items-center space-x-2">
                                <Battery className="text-[#fdb713]" />
                                <span className="text-lg font-semibold text-[#fdb713]">{user.totalEnergyGenerated} kWh</span>
                            </div>
                            <p className="text-xs text-center mt-1 text-gray-500">Power Saved This Session</p>
                        </div>
                    </div>

                    {/* Achievement Badges */}
                    <div className=" rounded-lg shadow-lg p-4 transform hover:scale-105 transition-transform duration-300 animate-fade-in delay-200">
                        <h3 className="font-bold text-lg mb-2 text-[#2D3134]">Achievement Badges</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {user.badges.map((badge) => (
                                <div key={badge} className="flex flex-col items-center">
                                    <Award className="text-[#fdb713]" size={32} />
                                    <span className="text-xs mt-1 text-[#2D3134]">{badge}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>



                {/* Main Feed */}
                <div className="w-full md:w-1/2 space-y-6">
                    {/* Create Post Section */}
                    <div className={` rounded-lg shadow-lg p-4`}>
                        <div className="flex items-center space-x-2 mb-4">
                            <img src={user.picture} alt="User" className="w-12 h-12 rounded-full" />
                            <textarea
                                value={newPostContent}
                                onChange={(e) => setNewPostContent(e.target.value)}
                                placeholder="Share your eco-fitness journey..."
                                className={`w-full p-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#fdb713]`}
                                rows="3"
                            />
                        </div>
                        {showImageInput && (
                            <div className="mb-4">
                                <input
                                    type="text"
                                    value={newPostImage}
                                    onChange={(e) => setNewPostImage(e.target.value)}
                                    placeholder="Enter image URL..."
                                    className={`w-full p-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#fdb713]`}
                                />
                            </div>
                        )}
                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => setShowImageInput(!showImageInput)}
                                className="flex items-center space-x-2 text-gray-500 hover:text-[#fdb713] transition-colors duration-300"
                            >
                                <ImageIcon size={20} />
                                <span>{showImageInput ? 'Remove Image' : 'Add Image'}</span>
                            </button>
                            <button
                                onClick={handleCreatePost}
                                className="px-4 py-2 bg-[#fdb713] text-white rounded-lg hover:bg-[#fd9b13] transition-colors duration-300"
                            >
                                Post
                            </button>
                        </div>
                    </div>

                    {/* Posts */}
                    {posts.map(post => (
                        <div key={post._id} className={` rounded-lg shadow-lg overflow-hidden`}>
                            <div className="p-4">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center space-x-2">
                                        <img src={post.user.picture} alt="User" className="w-10 h-10 rounded-full" />
                                        <div>
                                            <h4 className="font-bold">{`${post.user.firstName} ${post.user.lastName}`}</h4>
                                            <p className="text-xs text-gray-400">{new Date(post.time).toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <MoreHorizontal size={20} />
                                    </button>
                                </div>
                                <p className="mb-4">{post.content}</p>
                                {post.image && <img src={post.image} alt="Post content" className="w-full rounded-lg mb-4" />}
                                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                                    <span>{post.likes} likes</span>
                                    <span>{post.comments.length} comments</span>
                                </div>
                                <div className="flex justify-between border-t pt-4">
                                    <button
                                        onClick={() => handleLikePost(post._id)}
                                        className="flex items-center space-x-1 text-gray-500 hover:text-[#fdb713] transition-colors duration-300"
                                    >
                                        <ThumbsUp size={20} />
                                        <span>Like</span>
                                    </button>
                                    <button className="flex items-center space-x-1 text-gray-500 hover:text-[#fdb713] transition-colors duration-300">
                                        <MessageSquare size={20} />
                                        <span>Comment</span>
                                    </button>
                                    <button className="flex items-center space-x-1 text-gray-500 hover:text-[#fdb713] transition-colors duration-300">
                                        <Share2 size={20} />
                                        <span>Share</span>
                                    </button>
                                </div>
                            </div>

                            {/* Comments */}
                            <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} p-4`}>
                                {post.comments.map(comment => (
                                    <div key={comment._id} className="mb-4">
                                        <div className="flex items-start space-x-2">
                                            <img src={comment.user.picture} alt="User" className="w-8 h-8 rounded-full" />
                                            <div className={`flex-grow ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-3 rounded-lg`}>
                                                <h5 className="font-semibold">{`${comment.user.firstName} ${comment.user.lastName}`}</h5>
                                                <p className="text-sm">{comment.content}</p>
                                                <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                                                    <button
                                                        onClick={() => handleLikeComment(post._id, comment._id)}
                                                        className="hover:text-[#fdb713] transition-colors duration-300"
                                                    >
                                                        Like
                                                    </button>
                                                    <span>{comment.likes} likes</span>
                                                    <button
                                                        onClick={() => {
                                                            const replyInput = document.getElementById(`reply-input-${post._id}-${comment._id}`);
                                                            if (replyInput) {
                                                                replyInput.focus();
                                                            }
                                                        }}
                                                        className="hover:text-[#fdb713] transition-colors duration-300"
                                                    >
                                                        Reply
                                                    </button>
                                                </div>

                                                {/* Replies */}
                                                {comment.replies && comment.replies.map(reply => (
                                                    <div key={reply._id} className="mt-2 ml-4 flex items-start space-x-2">
                                                        <CornerDownRight size={16} className="text-gray-400 mt-1" />
                                                        <div className={`flex-grow ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} p-2 rounded-lg`}>
                                                            <h6 className="font-semibold text-xs">{`${reply.author.firstName} ${reply.author.lastName}`}</h6>
                                                            <p className="text-xs">{reply.content}</p>
                                                            <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                                                                <button
                                                                    onClick={() => handleLikeReply(post._id, comment._id, reply._id)}
                                                                    className="hover:text-[#fdb713] transition-colors duration-300"
                                                                >
                                                                    Like
                                                                </button>
                                                                <span>{reply.likes} likes</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}

                                                {/* Reply input */}
                                                <div className="flex items-center space-x-2 mt-2">
                                                    <input
                                                        id={`reply-input-${post._id}-${comment._id}`}
                                                        type="text"
                                                        // value={newReplies[`${post._id}-${comment._id}`] || ''}
                                                        onChange={(e) => setNewReplies(e.target.value)}
                                                        placeholder="Write a reply..."
                                                        className={`flex-grow p-2 rounded-lg text-sm ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} focus:outline-none focus:ring-2 focus:ring-[#fdb713]`}
                                                    />
                                                    <button
                                                        onClick={() => handleAddReply(post._id, comment._id)}
                                                        className="p-2 bg-[#fdb713] text-white rounded-full hover:bg-[#fd9b13] transition-colors duration-300"
                                                    >
                                                        <Send size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="flex items-center space-x-2 mt-4">
                                    <img src={user.picture} alt="User" className="w-8 h-8 rounded-full" />
                                    <input
                                        type="text"
                                        // value={newComments[post._id] || ''}
                                        onChange={(e) => setNewComments(e.target.value)}
                                        placeholder="Write a comment..."
                                        className={`flex-grow p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} focus:outline-none focus:ring-2 focus:ring-[#fdb713]`}
                                    />
                                    <button
                                        onClick={() => handleAddComment(post._id)}
                                        className="p-2 bg-[#fdb713] text-white rounded-full hover:bg-[#fd9b13] transition-colors duration-300"
                                    >
                                        <Send size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>



                {/* Right Sidebar */}
                <div className="w-full md:w-1/4 space-y-6">
                    {/* User Information */}
                    <div className=" rounded-lg shadow-lg p-4 transform hover:scale-105 transition-transform duration-300 animate-fade-in delay-300">
                        <h3 className="font-bold text-lg mb-4 text-[#2D3134]">User Information</h3>
                        <ul className="space-y-3">
                            <li className="flex justify-between items-center">
                                <span className="text-sm text-[#2D3134]">Followers</span>
                                <span className="font-semibold text-[#fdb713]">{user.followers.length}</span>
                            </li>
                            <li className="flex justify-between items-center">
                                <span className="text-sm text-[#2D3134]">Posts</span>
                                <span className="font-semibold text-[#fdb713]">{user.posts.length}</span>
                            </li>
                            <li className="flex justify-between items-center">
                                <span className="text-sm text-[#2D3134]">Goals Completed</span>
                                <span className="font-semibold text-[#fdb713]">{user.completedChallenges.length}</span>
                            </li>
                            <li className="flex justify-between items-center">
                                <span className="text-sm text-[#2D3134]">Badges Earned</span>
                                <span className="font-semibold text-[#fdb713]">{user.badges.length}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Goals Achieved */}
                    <div className=" rounded-lg shadow-lg p-4 transform hover:scale-105 transition-transform duration-300 animate-fade-in delay-400">
                        <h3 className="font-bold text-lg mb-2 text-[#2D3134]">Goals Achieved</h3>
                        <ul className="space-y-2">
                            <li className="flex justify-between items-center">
                                <span className="text-sm text-[#2D3134]">Power Saved</span>
                                <span className="font-semibold text-[#fdb713]">{user.totalEnergyGenerated} kWh</span>
                            </li>
                            <li className="flex justify-between items-center">
                                <span className="text-sm text-[#2D3134]">CO2 Reduced</span>
                                <span className="font-semibold text-[#fdb713]">{user.totalCO2Reduction} kg</span>
                            </li>
                        </ul>
                    </div>

                    {/* Trending Topics */}
                    <div className="rounded-lg shadow-lg p-4 transform hover:scale-105 transition-transform duration-300 animate-fade-in delay-500">
                        <h3 className="font-bold text-lg mb-2 text-[#2D3134]">Trending Topics</h3>
                        <ul className="space-y-2">
                            {['#EcoFitness', '#GreenEnergy', '#SustainableLiving', '#KineticPower', '#CleanTech'].map((topic, index) => (
                                <li key={index} className="text-sm text-[#2D3134] hover:text-[#fdb713] cursor-pointer transition-colors duration-300">
                                    {topic}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>


            </div>

            {/* Scroll to Top Button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-4 right-4 bg-[#fdb713] text-white p-2 rounded-full shadow-lg hover:bg-[#fd9b13] transition-colors duration-300"
            >
                <ChevronUp size={24} />
            </button>
        </div >
    );
};

export default EcoGymEnergyPage;
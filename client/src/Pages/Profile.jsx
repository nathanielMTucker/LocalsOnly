import React, {useState, useEffect} from 'react'
import { withUser } from '../User'
import {compose} from 'recompose';
import axios from 'axios';
import Picture from '../Components/Picture';
import {Link} from 'react-router-dom';
import { CloudinaryContext} from 'cloudinary-react'
import UserTag from "../Components/UserTag";

const Profile = ({user}) => {
    
   
    const [userSearch, setUserSearch] = useState();

    useEffect(()=>{
        const getUser = async ()=>{
            await axios.get(`/api/v1/users?id=${user.ownerID}`)
            .then(res=>{
                console.dir(res.data);
                setUserSearch(res.data)
            }).catch(err=>{
                console.error(500)
            })
        }
        getUser();
    },[user.ownerID])

    
    const formatLocal = ()=>{
        let [state, city] = user.localTo.split(':');
        return `${city.charAt(0).toUpperCase() + city.slice(1)}, ${state.toUpperCase()}`
    }
    
    return (
        <main id="profile-page" className="section container">
            
                <article className="columns">
                <section id="profile-details" className="column">
                    <div className="media">
                        <figure className="media-left">
                            <div className="image is-128x128">
                                <Link to={`/dashboard/edit`}>
                                <div className="profile-avatar">
                                    {
                                        user.avatar === null ? <img src="https://bulma.io/images/placeholders/128x128.png" alt="User"/>:
                                        <CloudinaryContext cloudName={"dpjlvg7ql"} secure={false} upload_preset="avatar_images">
                                            <Picture id={user.avatar} preset="avatar_images"/>
                                        </CloudinaryContext>
                                    }
                                    <div className="edit-avatar">edit</div>
                                </div>
                                </Link>
                            </div>
                        </figure>
                        <div className="media-content">
                            <h1 className="title my-0 py-0">{user.name} <span></span>
                            <UserTag/>
                            </h1>
                            
                            <h2 className="subtitle mt-0 pt-0">@{user.handler}</h2>
                            
                            <p>Email: {user.email}</p>
                            <p>Local: {formatLocal()}</p>
                        </div>
                    </div>
                   
                    
                </section>
                <section className="column level">
                    <div className="level-right">
                    <Link className="button pt-1 level-item" to={`/dashboard/edit`}>Edit Profile</Link>
                    </div>
                </section>
                
            </article>     
            <section className="my-4 profile-local-section">
                <h1 className="title">Locals</h1>
                <ul className="is-flex is-flex-direction-column is-flex-shrink-4">
                    {
                        userSearch ? userSearch.published.data.map(pub=>

                        <li className="box">
                            <h1 className="title">{pub.name}</h1>
                            { 
                                pub.images.data && pub.images.data[0]?
                                <CloudinaryContext cloudName={"dpjlvg7ql"} secure={false} upload_preset="local_images">
                                    <Picture id={pub.images.data[0].url} preset="local_images"/>
                                </CloudinaryContext> :
                                null
                            }
                            <article className="content">{pub.description}</article>
                            <Link to={`local?id=${pub._id}`}>Go to Local</Link>
                        </li>
                        
                        ) : <h1>Loading...</h1>
                    }
                </ul>
            </section>
        </main>
    )
}

export default compose(withUser)(Profile);

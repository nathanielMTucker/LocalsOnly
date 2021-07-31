import React, {useState, useEffect} from 'react'
import { withUser } from '../User'
import {withFirebase} from '../Authentication';
import {compose} from 'recompose';
import axios from 'axios';
import useToggle from '../Components/useHooks/useToggle';
import ImageForm from "../Components/ImageForm";
import Picture from '../Components/Picture';
import queryString from 'query-string'
import FourOFour from './FourOFour';
import {Link} from 'react-router-dom';
import { CloudinaryContext} from 'cloudinary-react'
import {CEOTag, DevTag, PremiumTag, BetaTag} from "../Components/UserTag";

const Profile = ({user , firebase}) => {
    
    const [edit, setEdit] = useToggle();
    const [editAvatar, setEditAvatar] = useToggle();
    const [userSearch, setUserSearch] = useState();

    const getUser = async ()=>{
        await axios.get(`/api/v1/users?id=${user.ownerID}`)
        .then(res=>{
            console.dir(res.data);
            setUserSearch(res.data)
        }).catch(err=>{
            console.error(500)
        })
        // .then(user=>setUserSearch(user))
    }

    useEffect(()=>{
        getUser();
    },[])

    const uploadURLs = ()=>{}
    
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
                            <p className="image is-128x128">
                                <Link to={`/dashboard/edit`}>
                                <div className="profile-avatar">
                                    {
                                        user.avatar === null ? <img src="https://bulma.io/images/placeholders/128x128.png"/>:
                                        <CloudinaryContext cloudName={"dpjlvg7ql"} secure={false} upload_preset="avatar_images">
                                        <Picture id={user.avatar} preset="avatar_images"/>
                                        </CloudinaryContext>
                                    }
                                    <div className="edit-avatar">edit</div>
                                </div>
                                </Link>
                            </p>
                        </figure>
                        <div className="media-content">
                            <h1 className="title">{user.name} <span></span>
                            <CEOTag/><DevTag/> <PremiumTag/> <BetaTag/>
                            <br/>
                            <h2 className="subtitle">@{user.handler}</h2></h1>
                            
                            <p>Email: {user.email}</p>
                            <p>Local: {formatLocal()}</p>
                        </div>
                    </div>
                    <Link className="button" to={`/dashboard/edit`}>Edit Profile</Link>
                </section>
                <section className="column">
                    <div id="locals-posted">
                        {

                        }
                    </div>
                </section>
                
            </article>     
            
        </main>
    )
}

export default compose(withFirebase, withUser)(Profile);

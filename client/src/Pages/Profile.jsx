import React, {useState, useEffect, useCallback} from 'react'
import { withUser } from '../User'
import axios from 'axios';
import Picture from '../Components/Picture';
import {Link} from 'react-router-dom';
import { CloudinaryContext} from 'cloudinary-react'
import UserCard from '../Components/UserCard';

const Profile = withUser(({user}) => {
    useEffect(() =>{
        document.title = document.title + " - Dashboard";
        return function cleanup(){
            document.title = "LocalsOnly"
        }
    })
   
    const [locals, setLocals] = useState([]);
    // const [loading, setLoading] = useState(true)
    const [offset, setOffset] = useState(null);
    const [limit] = useState(10);

    const getLocals = useCallback(async ()=>{
        await axios.get(`/api/v1/users/locals?id=${user.getID()}&limit=${limit}${offset ? `&offset=${offset}` : ''}`)
        .then(({data:{data, after}})=>{
           console.log(data);
            setLocals(currentItems=>[...currentItems, ...data] || null)
            setOffset(after)
        })
        .catch(err=>{
            console.error(err)
            setLocals([{
                message : "Unable to connect"
            }])
        })

        // setLoading(false);
    },[limit, offset, user])

    useEffect(()=>{
        getLocals();
    },[getLocals, user])

    
    const DisplayLocals = () =>{
        return locals ? (locals.length ? locals.map(pub=>

            <li className="box">
                <h1 className="title">{pub.name}</h1>
                { 
                    pub.images && pub.images.data[0] &&
                    <CloudinaryContext cloudName={"dpjlvg7ql"} secure={false} upload_preset="local_images">
                        <Picture id={pub.images.data[0].url} preset="local_images"/>
                    </CloudinaryContext> 
                }
                <article className="content">{pub.description}</article>
                <Link to={`local?id=${pub._id}`}>Go to Local</Link>
            </li>
            
            ):(
                <div className="box is-info">You don't have any locals!</div>
            )) : <h1>Loading...</h1>
    }
    const onClickShowMore = e =>{
        e.preventDefault();
        getLocals();
    }
    const formatLocal = ()=>{
        let [state, city] = user.getLocalTo().split(':');
        return city && state ? `${city.charAt(0).toUpperCase() + city.slice(1)}, ${state.toUpperCase()}` : "unavailable"
    }
    
    return (
        <main id="profile-page" className="section container">
            
                <article className="columns">
                <section id="profile-details" className="column">
                    <UserCard
                        lg
                        name={user.getName()}
                        avatar={user.getAvatar()}
                        handle={user.getHandler()}
                        role={user.getRole()}
                    >
                        <p>Email: {user.getEmail()}</p>
                        <p>Local: {formatLocal()}</p>
                    </UserCard>
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
                    <DisplayLocals/> 
                    {offset && <div className="text-has-line my-5 is-clickable" onClick={onClickShowMore}><span>show more</span></div>}
                </ul>
            </section>
        </main>
    )
})

export default Profile;

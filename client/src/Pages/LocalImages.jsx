import React, {useState, useEffect} from "react";
import { withUser } from "../User";
import axios from 'axios';
import queryString from 'query-string';
import {Link} from 'react-router-dom';
import { CloudinaryContext} from 'cloudinary-react'
import Picture from '../Components/Picture';

const LocalImages = withUser(({user, location : {search}})=>{

  const [local, setLocal] = useState(null);

  return <main id="local-page">
    <section className="section columns">
      Hello from Local Images
      {
          user.isLocalTo(local) && (
          <div className="buttons">
              <Link className="button" to={`/local/upload-image?id=${queryString.parse(search).id}&name=${local.name}`}>Upload images</Link>
              {/* <Link className="button" to={`/local/edit?id=${queryString.parse(search).id}`}>Edit</Link> */}
          </div>
          )
      }
    </section>
  </main>
})

export default LocalImages;
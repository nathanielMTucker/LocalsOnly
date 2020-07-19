import React, { Component} from 'react'
import { withRouter } from "react-router";
import './Search.scss';
import S from './Search';
import {LogoLinkButton, LocalizeLinkButton, LogoutButton} from '../Buttons';
import {SearchDropdown} from '../Dropdowns';




class Nav extends Component {
    state = {width: window.innerWidth, user:{}};

    updateDimensions = ()=>{this.setState({width:window.innerWidth})}

    componentWillUnmount = ()=>{window.removeEventListener('resize', this.updateDimensions)}

    componentDidMount = async ()=>{
      this.setState({user:this.user})
      window.addEventListener('resize', this.updateDimensions)
      console.log(this.props.loc);
      
    }
    
    isMobile = () => (this.state.width < 769)

    render() {
      
      return (
          <nav 
            id="main-nav"
            className={`navbar level design ${this.isMobile() ? 'is-mobile' : '' } pr-2 pl-2 pt-0 is-fixed-top ivory`} 
            role="navigation"
          >
              <div className="level-left">
                <div className="level-item">
                  <LogoLinkButton/>
                </div>
                {this.isMobile() ? <div className="level-item">
                <SearchDropdown loc={this.props.loc}/>
                  </div>:''}
              </div>
              {!this.isMobile() ? (<div className="level-item">
                <S click={null} loc={this.props.loc}/>
              </div>):''}
              <div className="level-right">
                
                
                  <div className="level-item">
                  <LocalizeLinkButton/>
                </div>
                
                <div className="level-item">
                  
                    <LogoutButton/>
                  
                </div>
              </div>
          </nav>
      )
    }
}

export default withRouter(Nav)

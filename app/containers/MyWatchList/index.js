/**********************
Name - MyWatchList
Author - Nasir Ansari
Description: Manage my watch list
***********************/

import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../Header';
import MovieCard from '../../components/MoviewCard'
import './style.css'

class MyWatchList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myWatchList: ''
    }
  }

  componentDidMount() {
    let data = localStorage.getItem('currUser')
    if (data) {
      let watchList = JSON.parse(localStorage.getItem(data))
      if (watchList.length === 0) {
        this.setState({
          myWatchList: ''
        })
      }
      else {
        this.setState({
          myWatchList: watchList
        })
      }
    }
  }

  isMovieHasRemoved = () => {
    let currUser = localStorage.getItem('currUser')
    // update watch list
    if (JSON.parse(localStorage.getItem(currUser)).length != 0) {
      this.setState({
        myWatchList: JSON.parse(localStorage.getItem(currUser))
      })
    }
    else {
      this.setState({
        myWatchList: ''
      })
    }
  }

  render() {
    return (
      <div style={{ border: '1px solid transparent' }}>
        <Header />
        <Helmet>
          <title>MyWatchList</title>
          <meta name="description" content="Description of MyWatchList" />
        </Helmet>
        <div className='common '>
          <div className='my-watch-list'>
            <div className='go-back'>
              <span>
                <a href='/'>
                  <i className='fa fa-arrow-left' />
                  Back
                </a>
              </span>
            </div>
            <div className='tab-title'>
              My Watch List
            </div>
            <br />

            <div className='tab-title-1' >
              {
                this.state.myWatchList ?
                  this.state.myWatchList.map((data, ind) =>
                    <MovieCard
                      key={ind}
                      data={data}
                      isRemoved={true}
                      isMovieHasRemoved={this.isMovieHasRemoved}
                    />
                  )
                  :
                  <div>
                    {"Sorry you have not any movie in your watch list"}
                    <br/>
                    <a style={{textDecoration:'underline'}} href='/'> Click here to add movies in your watch list </a>
                  </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MyWatchList;


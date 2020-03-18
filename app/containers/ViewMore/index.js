/**********************
Name - Viewmore
Author - Nasir Ansari
Description: Manage viewmore and infinite scrolling
***********************/

import React from 'react';
import { Helmet } from 'react-helmet';
import MovieCard from '../../components/MoviewCard';
import Header from '../Header';
import '../MyWatchList/style.css';
import axios from 'axios';
import OnLoadingAndFetching from '../../components/Loders/LodersAndPleasewait';
import {
  BackgrounColorCard
} from '../../utils/constants';
import OnClickButton from '../../components/Buttons/OnClickButton';
import InfiniteScroll from "react-infinite-scroll-component";

class ViewMore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesList: '',
      totalPage: '',
      totalResult: '',
      currentPage: 1
    }
  }

  componentDidMount() {
    this.fnGetMovies();
  }

  fnGetMovies = () => {
    axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=key&language=en-US&page=' + this.state.currentPage)
      .then(res => {
        if (res.status === 200) {
          let tempData = []
          for (let i = 0; i < res.data.results.length; i++) {
            tempData.push(res.data.results[i])
          }
          let prevData = this.state.moviesList
          if (prevData.length != 0) {
            prevData.push(...tempData)
            this.setState({
              moviesList: prevData,
            })
          }
          else {
            this.setState({
              moviesList: tempData,
            })
          }
        }
      })
      .catch(er => {
        console.error('er--', er)
      })
  }

  handleLoadMore = () => {
    this.setState({
      currentPage: parseInt(this.state.currentPage) + 1
    }, () => { this.fnGetMovies() })
  }

  render() {
    return (
      <div style={{ border: '1px solid transparent' }}>
        <Header />
        <Helmet>
          <title>ViewMore</title>
          <meta name="description" content="Description of ViewMore" />
        </Helmet>
        <div className='common '>
          <div className='my-watch-list'>
            <div className='go-back'>
              <span>
                <a href='/'>
                  <i className='fa fa-arrow-left' />
                  Back
                </a>

                <div style={{ float: 'right' }}>
                  <span style={{ marginTop: '10px', fontWeight: 600 }}>Total Loaded Movies = {this.state.moviesList.length}</span>
                  &nbsp;&nbsp;&nbsp;
                  <OnClickButton
                    name='Load More Movies'
                    handleClick={this.handleLoadMore}
                    className='ButtonStyleWithOrange'
                    title='Click to load more movies'
                    icon='plus'
                  />
                </div>
              </span>
            </div>
            <div className='tab-title'>
              Movies Listing
            </div>
            <br />
            {
              this.state.moviesList ?
                <InfiniteScroll
                  dataLength={this.state.moviesList.length}
                  next={this.handleLoadMore}
                  hasMore={true}
                  loader={
                    <OnLoadingAndFetching
                      L_MarginTop='50px' PL_Color={BackgrounColorCard} L_Height={50} L_Width={50}
                      P_Heading={'Fetching movies...'} P_MarginLeft='5px' P_FontSize='16px' P_MarginTop='5px'
                      background='transparent'
                    />
                  }
                >
                  {
                    this.state.moviesList.map((data, ind) =>
                      <MovieCard
                        key={ind}
                        data={data}
                        isRemoved={false}
                      />
                    )
                  }
                </InfiniteScroll>
                :
                ''
            }
          </div>
        </div>
      </div>
    );
  }
}
export default ViewMore;


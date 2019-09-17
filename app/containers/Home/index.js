/**
 *
 * Home
 *
 */

import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { MDBRow, MDBCol } from 'mdbreact';
import InputMdb from '../../components/InputTypes/TextInput';
import { NA, BackgrounColorCard } from '../../utils/constants';
import OnLoadingAndFetching from '../../components/Loders/LodersAndPleasewait';
import axios from 'axios';
import './style.css';
import MovieCard from '../../components/MoviewCard';
import Header from '../Header/Loadable';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterByList: [
        { name:'Movies Name', value: 'title' }, {name:'Release Date', value: 'release_date' }, {name:'Overview', value: 'overview' }
      ],
      filterBy: 'title', search: '', filterByName:'Movies Name',

      selectedTab: 'Recently Released',
      selectedTabData: '',
      recentlyReleased: '',
      topRated: '',

      moviesData: [
        {
          tab: 'Recently Released',
          data: []
        },
        {
          tab: 'Top Rated',
          data: []
        },
        {
          tab: 'View More',
          data: []
        }
      ]
    }
  }


  fnGetRecentlyReleased = () => {
    axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=d0e017a26eb15e7a7c0bd8749da5fdde&language=en-IN&sort_by=release_date.desc')
      .then(res => {
        if (res.status === 200) {
          let tempData = []
          for (let i = 0; i < res.data.results.length; i++) {
            if (i < 10) {
              tempData.push(res.data.results[i])
            }
          }
          console.log(tempData)
          this.setState({
            recentlyReleased: tempData,
            selectedTabData: tempData
          })
        }
      })
      .catch(er => {
        console.error('er--', er)
      })
  }

  fnGetTopRated = () => {
    axios.get('  https://api.themoviedb.org/3/movie/top_rated?api_key=d0e017a26eb15e7a7c0bd8749da5fdde&language=en-IN&sort_by=release_date.desc&limit=10')
      .then(res => {
        if (res.status === 200) {
          let tempData = []
          for (let i = 0; i < res.data.results.length; i++) {
            if (i < 10) {
              tempData.push(res.data.results[i])
            }
          }
          this.setState({
            topRated: tempData,
          })
        }
      })
      .catch(er => {
        console.error('er--', er)
      })
  }
  componentDidMount() {
    this.fnGetRecentlyReleased();
    this.fnGetTopRated();
  }

  handleDropDown = (e, data) => {
    const { target } = e;
    const val = target.value;
    if (data === 'filterBy') {
      this.setState({
        filterBy: JSON.parse(val).value,
        filterByName: JSON.parse(val).name
      });
    }
  };

  handleChange = (e) => {
    const { target } = e;
    const { id, name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value
    })
  }

  handleSelectedTab = (data) => {
    if (data.tab === 'View More') {
      this.props.history.push('/view-more')
    }
    else {
      if (data.tab === 'Recently Released') {
        this.setState({
          selectedTab: data.tab,
          selectedTabData: this.state.recentlyReleased
        })
      }
      else {
        this.setState({
          selectedTab: data.tab,
          selectedTabData: this.state.topRated
        })
      }
    }
  }

  render() {
    console.log('abc---', this.state.filterBy, this.state.filterByName, this.state.search);
    return (
      <div style={{ border: '1px solid transparent' }}>
        <Header />
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Description of Home" />
        </Helmet>

        <div className='common'>
          <div className='searchDiv'>
            <MDBRow className='search-row-1'>
              <MDBCol className='search-col-1' xs='2' sm='2' md='2' lg='2'>
                FilterBy
              </MDBCol>
              <MDBCol xs='2' sm='2' md='2' lg='2' >
                <select style={{ height: '35px' }}
                  className="browser-default custom-select"
                  onChange={e => {
                    this.handleDropDown(e, 'filterBy');
                  }}
                >
                  {this.state.filterBy ? (
                    <option hidden>{this.state.filterByName}</option>
                  ) : (
                      <option hidden>---Select---</option>
                    )}
                  {this.state.filterByList
                    ? this.state.filterByList.map((t, i) => (
                      <option key={i} value={JSON.stringify(t)}>
                        {t.name}
                      </option>
                    ))
                    : ''}
                </select>
              </MDBCol>

              <MDBCol>
                <InputMdb
                  type="search"
                  name="search"
                  id='search'
                  value={this.state.search}
                  autoFocus
                  placeholder='search...'
                  handleChange={this.handleChange}
                />
              </MDBCol>
            </MDBRow>
          </div>

          <div className='search-div-2'>
            <div className='anchor-section' >
              <div className='anchor-tab'>
                {this.state.moviesData
                  ? this.state.moviesData.map(
                    (retrieveData, ind) =>
                      this.state.selectedTab != retrieveData.tab ? (
                        <div
                          key={ind}
                          onClick={e => {
                            this.handleSelectedTab(retrieveData);
                          }}
                          className={
                            this.state.selectedTab ===
                              retrieveData.tab
                              ? 'tabSelected'
                              : 'tabUnSelected'
                          }
                        >
                          {retrieveData.tab
                            ? retrieveData.tab
                            : NA}
                        </div>
                      ) : (
                          <div
                            key={ind}
                            className={
                              this.state.selectedTab ===
                                retrieveData.tab
                                ? 'tabSelected'
                                : 'tabUnSelected'
                            }
                          >
                            {retrieveData.tab
                              ? retrieveData.tab
                              : NA}
                          </div>
                        )
                  )
                  :
                  ''
                }
              </div>
            </div>
            <br />
            <div className='tab-title'>
              {this.state.selectedTab === 'Top Rated' ?
                'Top Rated movies'
                :
                'Recently Released Movies in Theaters'
              }
            </div>
            <br />
            
            {
              this.state.selectedTabData ?
              this.state.selectedTabData.filter(item => item[this.state.filterBy].toLowerCase().includes(this.state.search.toLowerCase())).map((data, ind) =>
                  <MovieCard
                    key={ind}
                    data={data}
                    isRemoved={false}
                  />
                )
                :
                <OnLoadingAndFetching
                  L_MarginTop='50px' PL_Color={BackgrounColorCard} L_Height={50} L_Width={50}
                  P_Heading={this.state.selectedTab === 'Recently Released' ? 'Fetching recently released movies...' : 'Fetching top rated movies...'} P_MarginLeft='5px' P_FontSize='16px' P_MarginTop='5px'
                  background='transparent'
                />
            }
            <br />
          </div>
        </div>
        <br />
      </div>
    );
  }
}

export default Home;


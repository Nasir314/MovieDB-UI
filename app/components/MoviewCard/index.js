import React, { Fragment } from 'react';
import { NA } from '../../utils/constants';
import { MDBCard, MDBRow, MDBCol } from 'mdbreact';
import OnClickButton from '../../components/Buttons/onClickButton';
import CustomSnackbar from '../../components/snackBar';
import './style.css';

class MovieCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSnackbar: false,
            snackbarVariant: '',
            snakBarMessage: '',
            position: '',
        }
    }

    handleWatchList = (dataForWatchList) => {
        if (this.props.isRemoved) {
            let data = localStorage.getItem('currUser');
            let watchList = JSON.parse(localStorage.getItem(data))
            let checkMoviewAlreadyExist = 0;
            for (let i = 0; i < watchList.length; i++) {
                if (watchList[i].id === dataForWatchList.id) {
                    checkMoviewAlreadyExist = 1;
                    watchList.splice(i, 1);
                    break;
                }
            }
            if (checkMoviewAlreadyExist === 1) {
                localStorage.setItem(data, JSON.stringify(watchList));
                this.setState({
                    showSnackbar: true,
                    snackbarVariant: 'success',
                    snakBarMessage: dataForWatchList.title + ' movie has removed successfully from your watch list.',
                    position: 'center',
                });
                this.props.isMovieHasRemoved();
            }
        }
        else {
            let data = localStorage.getItem('currUser');
            let watchList = JSON.parse(localStorage.getItem(data))
            let checkMoviewAlreadyExist = 0;
            for (let i = 0; i < watchList.length; i++) {
                if (watchList[i].id === dataForWatchList.id) {
                    checkMoviewAlreadyExist = 1;
                    break;
                }
            }
            if (checkMoviewAlreadyExist === 1) {
                this.setState({
                    showSnackbar: true,
                    snackbarVariant: 'error',
                    snakBarMessage: 'You can not add duplicate movie in yuor watch list.',
                    position: 'center',
                });
            }
            else {
                watchList.push(dataForWatchList);
                localStorage.setItem(data, JSON.stringify(watchList));
                this.setState({
                    showSnackbar: true,
                    snackbarVariant: 'success',
                    snakBarMessage: dataForWatchList.title + ' movie successfully added in your watch list',
                    position: 'center',
                });
            }
        }
    }

    handleSnackBarClose = () => {
        this.setState({
            finalMessage: '',
            showSnackbar: false,
            // position:''
        });
    };

    render() {
        return (
            <Fragment>
                <CustomSnackbar
                    showSnackbar={this.state.showSnackbar}
                    variant={this.state.snackbarVariant}
                    message={this.state.snakBarMessage}
                    onClose={this.handleSnackBarClose}
                    position={this.state.position}
                />
                <MDBCard className='custom-card'>
                    <MDBRow className='custom-card-row-1'>
                        <MDBCol xs='4' sm='4' md='4' lg='4' xl='3' style={{}}>
                            <img style={{ width: '200px' }}
                                src={'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + this.props.data.poster_path}
                                alt='Poster image'
                            />
                        </MDBCol>
                        <MDBCol className='moview-card-col-1'>
                            <a className='a-movie-title'
                                href=""
                                title="The Goldfinch (2019)"
                            >
                                {this.props.data.title ? this.props.data.title : NA}
                            </a>

                            <p className="cert-runtime-genre">
                                <img title="R"
                                    alt="Certificate R"
                                    src="https://m.media-amazon.com/images/G/01/imdb/images/certificates/us/r-2493392566._CB484113634_.png"
                                />
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <time dateTime="PT149M"
                                >
                                    {this.props.data.time ? this.props.data.time : NA}
                                </time>
                                &nbsp;&nbsp;-&nbsp;&nbsp;
                                    <span>
                                    {this.props.data.type ? this.props.data.type : NA}
                                </span>
                            </p>

                            <div className="cert-runtime-genre" >
                                <span className="metascore  mixed" > {this.props.data.popularity ? this.props.data.popularity : NA} </span> &nbsp;&nbsp;
                                Metascore
                            </div>

                            <div className="outline cert-runtime-genre" >
                                {this.props.data.overview ? this.props.data.overview : NA}
                            </div>

                            <div className="txt-block cert-runtime-genre" >
                                <span className="inline" style={{ fontWeight: 600 }}>
                                    Director:
                                </span> &nbsp;&nbsp;
                                <span >
                                    <a href="" >
                                        {this.props.data.director ? this.props.data.director : NA}
                                    </a>
                                </span>
                            </div>

                            <div className="txt-block cert-runtime-genre" >
                                <span className="inline" style={{ fontWeight: 600 }} >Stars:</span> &nbsp;&nbsp;
                                <a href="" > {this.props.data.stars ? this.props.data.stars : NA} </a>
                            </div>

                            <div className="txt-block cert-runtime-genre" >
                                <span className="inline" style={{ fontWeight: 600 }} >Release_date:</span> &nbsp;&nbsp;
                                <a href="" > {this.props.data.release_date ? this.props.data.release_date : NA} </a>
                            </div>

                            <div className="txt-block cert-runtime-genre" >
                                <span className="inline" style={{ fontWeight: 600 }} >Vote Count:</span> &nbsp;&nbsp;
                                <a href="" > {this.props.data.vote_count ? this.props.data.vote_count : NA} </a>
                            </div>

                            <div className="txt-block cert-runtime-genre" >
                                <span className="inline" style={{ fontWeight: 600 }} >Vote Average:</span> &nbsp;&nbsp;
                                <a href="" > {this.props.data.vote_average ? this.props.data.vote_average : NA} </a>
                            </div>

                            <br />

                            <OnClickButton
                                className={this.props.isRemoved ? 'ButtonStyleWithRed' : 'ButtonStyleWithBlue'}
                                name={this.props.isRemoved ? 'Remove From Watch List' : 'Add to Watch list'}
                                handleClick={(e) => { this.handleWatchList(this.props.data) }}
                            />
                        </MDBCol>
                        <br />
                    </MDBRow>
                </MDBCard>
            </Fragment>
        )
    }
}

export default MovieCard;

import './photobooth.css';
import React, { Component } from 'react';
import webcam from '../webcam';
import { connect } from 'react-redux';
import { postImage } from '../actions';

export class Photobooth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasSnaps: false,
            confirmMessage: ''
        }; 
    }
    componentDidMount() {
        this.webcam = webcam(this.photobooth, {
            onSnapClick: this.postSnap
        });
        this.webcam.render(); 
    }

    cleanSnaps = e => {
        this.webcam.cleanSnaps();
        this.setState({ hasSnaps: false });
    }

    onTakePhotoClick = e => {
        this.setState({ hasSnaps: true });
    }

    postSnap = snap => e => {
        e.preventDefault();
        const image = snap.getAttribute('href');
        const name = snap.getAttribute('download');
        this.props.postImage({image,name});
        this.setState({ confirmMessage: 'Nice snap 😎'})
        this.cleanSnaps();

        setTimeout(
            () => this.setState({ confirmMessage: '' }), 
            1500
        );
    }

    render() {
        return (
            <div 
                className="photobooth" 
                ref={node => { this.photobooth = node; }} 
            >
                <canvas className="photo"></canvas>
                <div className="controls">
                    <button className="js-photo-btn" onClick={this.onTakePhotoClick}>Take Photo</button>
                    <select className="filter">
                        <option value>Select effect</option>
                        <option value="redEffect">Red Filter</option>
                        <option value="blueEffect">Blue Filter</option>
                        <option value="greenEffect">Green Filter</option>
                        <option value="rgbSplit">RGB Split</option>
                        <option value="ghostEffect">Ghost effect</option>
                        <option value="blackAndWhite">Black And White</option>
                        <option value="sephia">Sephia</option>
                    </select>
                </div>
                <video className="player"></video>
                <div className="bottom-content">
                    {this.state.hasSnaps && <div className="choose-message">Choose one:</div>}
                    <div className="strip"></div>
                    {this.state.hasSnaps && <button className="clear-snaps" onClick={this.cleanSnaps}>cleanSnaps</button>}
                    <div>{this.state.confirmMessage}</div>
                </div>
            </div>
        );
    }
}

export default connect(null, { postImage })(Photobooth);
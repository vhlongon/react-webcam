import './imageslist.css';
import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import Scroll from 'react-scroll';
import { Loader } from './Loader';
import { getImages } from '../actions';
import { connect } from 'react-redux';

const Image = ({image, name, ...props}) => (
  <div className="images-item">
    <img className="images-image" src={image} alt={name} />
  </div>
);

const scroller = Scroll.animateScroll;

export class ImagesList extends Component {

  constructor(props) {
      super(props);
      this.masonryOptions = { 
          transitionDuration: 400, 
          percentPosition: true 
      }
  }

  componentDidMount() {
    this.props.getImages();
  }
  
  render() {
    const {images, error } = this.props;
    const imagesData = images.map(image => image);
    const hasImages = imagesData.length;
    return (
      <div className="images-list">
        { error ? 
            <div>{error.message}</div> :
            hasImages ?
              <Masonry
                  ref={node => { this.masonry = this.masonry || node.masonry }}
                  className='images-list-masonry'
                  elementType='div'
                  options={this.masonryOptions}
              >
                {images.map(image => <Image {...image} />)}
              </Masonry> :
              <div>
                <Loader text="Waiting for images..." />
              </div>
        }
      </div>
    );
  }
}

function mapStateToProps({images}) {
  return { 
    images: images.data, 
    error: images.error 
  };
}

//UPDATE no more export default connect(null, {fetchPosts})(PostIndex),
// since now we have indded a piece of redux state to map to your component props, thus:

export default connect(mapStateToProps, { getImages })(ImagesList);
import React, { Component } from 'react';
import { routes } from  '../../config.js';
import '../../css/grid-square.css';
import '../../css/pages/page-shop.css';

//Components
import Header from '../Header';
import Footer from '../Footer';
import BasicBlock from '../blocks/BasicBlock';
import Loading from '../../icons/Loading';


class Shoppage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      fetchFailed: false
    }
  }

  componentDidMount() {
    this.fetchItems();
  }

  buildFetchUrl = () => {
    let url = routes.get_items_category;
    const category = this.props.match.params.categories;
    if(category) {
      switch (category) {
        case 'accessories':
          url += 'socks,glasses,watches,hats';
          break;
      case 'tops':
        url += 'cardigans,shirts,tshirts,tops';
        break;
      case 'bottoms':
        url += 'jeans,skirts,shorts';
        break;
        default:
          url += category;
      }
    }
    return url;
  }

  fetchItems = (callback) => {
    const url = this.buildFetchUrl();
    fetch(url)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        if (json.message) {
          this.setState({fetchFailed: true})
        } else {
          this.setState({items: json});
        }

      })
      .catch(err => console.log(err))
  }

  render() {

    const items = this.state.items;

    const renderItems = () => {
        if (items) {

          const itemsDom =  items.map(item => {
            return (<BasicBlock
                      href={`/item/${item._id}`}
                      title={item.name}
                      image={item.image_url}
                      secondary={`${item.price} USD`}
                      key={item._id}
                      additionalClasses={`
                        block-size-s
                        cursor-style-pointer
                        transition-scale
                      `}
                    />)
          })

          return (
                  <div className='grid-square'>
                    {itemsDom}
                  </div>
                )

        }
    }

    const renderMessage = () => {
      let inner;
      if (this.state.fetchFailed) {
        inner = <p>No items found</p>
      } else {
        inner = <Loading classes='loading social-icons'/>
      }

      return (
        <div className='message'>
          {inner}
        </div>
      )
    }

    return (
      <div className='page'>
        <Header />
        <main id='content-main' className='container'>
          <div className='wrapper-shop'>
            <header>
              <h1>Our 2017 Collection</h1>
              <div className='wrapper-category-selection'>
                <nav>
                  {/* Link router won't re-mount the component and call the fetch
                      method sp it won't update the list with new items,
                      hence the use of <a> */}
                  <a href='/shop/tops'>Tops</a>
                  <a href='/shop/bottoms'>Bottoms</a>
                  <a href='/shop/shoes'>Shoes</a>
                  <a href='/shop/bags'>Bags</a>
                  <a href='/shop/accessories'>Accessories</a>
                </nav>
              </div>
            </header>
              { items.length ? renderItems() : renderMessage()}
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Shoppage;

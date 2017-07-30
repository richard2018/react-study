/**
 * OF2019
 * 2016-06-06 21:04:49
 */
import React from "react";
import {msg as Msg, connectToStore} from "iflux";
import {Link, withRouter} from "react-router";
import AppStore from "./store";

class Home extends React.Component {

  componentDidMount() {
      //图片轮播
      $(function(){
          if($('.swiper-container').get(0)){
              var mySwiper = new Swiper('.swiper-container',{
                  autoHeight:'auto',
                  pagination : '.swiper-pagination',
              })
          }
      })
  }

  render() {
    var that = this;
    return (
        <div>
          <section className="m-container g-gap-b">
            <div className="swiper-container">
              <div className="swiper-wrapper">
                <div className="swiper-slide"><img src="http://pic.qianmi.com/elife/bm_app/img/slide/banner01.png" alt="" width="100%"/></div>
                <div className="swiper-slide"><img src="http://pic.qianmi.com/elife/bm_app/img/slide/banner01.png" alt="" width="100%"/></div>
              </div>
              <div className="swiper-pagination"></div>
            </div>

            <ul className="m-menu-lists">
              <li>
                <a id="mobilecharge" onClick={this.orderMobileCharge.bind(that)}>
                  <i className="iconfont icon-shouji z-set-icon"></i>
                  <span>话费充值</span>
                </a>
              </li>
            </ul>
          </section>
        </div>
    )
  }

  orderMobileCharge(){
    var that = this;
    that.props.router.push("/order/mobilerecharge");
  }

  orderMobileFlow(){
    var that = this;
//    that.props.router.push("/order/mobileflow");
  }

  _qcoinCharge(){
    var that = this;
//    that.props.router.push("/order/qcoin");
  }

}

export default withRouter(connectToStore(AppStore,true)(Home));
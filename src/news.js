import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'

class News extends Component {
  constructor(){
    super()
    this.state={
      datas:{}
    }
  }
  componentDidMount(){
    $.ajax({
      url:"http://localhost:8200/exam/new",
      type:"post",
      data:{
      	id: this.props.match.params.id.split(":")[1]
      },
      success:function (e){
        console.log(e)
        this.setState({
          datas:e[0]
        })
      }.bind(this)
    })
  }
  render() {
  	return <div className="news_con">
          {this.state.datas.content}
    </div>
  }
}


export default News
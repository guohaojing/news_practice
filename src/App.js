
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import As from './news'
import $ from 'jquery';
import {BrowserRouter as Router, Route,Link} from 'react-router-dom'

class App extends Component {
  constructor(){
    super()
    this.state={
      news:[]
    }
  }
  componentDidMount(){
    $.ajax({
      url:"http://localhost:8200/exam/news",
      type:"post",
      success:function (e){
        this.setState({
          news:e
        })
      }.bind(this)
    })
  }
  amend=function(event){
      var aa=event.target.parentElement.firstElementChild.innerHTML
      this.setState({
        id:aa
      })
      $('.alert').css({
      'display':"block"
      })
      $('.wrap_news').css({
        'display':"none"
      })
  }.bind(this);
  remove=function(event){
    var aa=event.target
      var  id=aa.parentElement.firstElementChild.innerHTML
      $.ajax({
        type:"post",
        url:"http://localhost:8200/exam/test2",
        data:{"id":id},
        success:function(e){        
        for(var i in this.state.news){
            if(this.state.news[i].id==id){
              var aa=this.state.news.splice(i,1)
              this.setState({
                news:this.state.news
              })
            }
          }
        console.log(this.state.news)
          }.bind(this),
          error:function(){
            alert("失败了")
          }
      });
    }.bind(this);
  ok=function(){
        $('.alert').css({
            'display':'none'
        })
        $('.wrap_news').css({
            'display':"block"
        })
         $.ajax({
            type:"post",
            url:"http://localhost:8200/exam/test3",
            async:"true",
            data:{'id':this.state.id,"title":$("#tit").val(),"content":$("#con").val()},
            success:function(pp){
                console.log(pp)
            }.bind(this),
            error:function(){
                alert('失败了');
            }
        });
    }.bind(this);
  render() {
    return (
      <Router>
        <div className="App">  
          <Link to="/"></Link>
          <Route exact path='/' render={() => (
            <div>
                <div>
                  {
                    this.state.news.map(function (v,i){
                      return (
                       <div className="wrap_news">
                          <Link key={i} to={`/id:${v.id}`}>
                            <div className="news_title">
                                <p>{v.title}</p>
                             </div>
                          </Link>
                          <div className="btn">
                              <button className="amend" id="amend" onClick={this.amend}>修改</button>
                              <button className="remove"  id="remove" onClick={this.remove}>删除</button>
                          </div>
                      </div>
                      )
                    }.bind(this))}
                </div> 
                <div className="alert">
                    <div className="tit">title:<input type="text" id="tit"/></div>
                    <div className="con">content:<input type="text" id="con"/></div>
                    <button onClick={this.ok} className="ok">确定</button>
                </div>         
            </div>
          )} />
          <Route path="/:id" component={As} />
        </div>
      </Router>
    );
  }
}

export default App;
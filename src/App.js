import React, { Component } from 'react';
import resolvePath from './resolvePath.js';
import Idea from './idea/Idea.js';
import Connection from './connection/Connection.js';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    response: '',
    ideas: [
      {
        id:"1", 
        title:"erste Idee"
      },
      { 
        id: "2", 
        title:"zweite Idee"
      }
    ],
    connections: [
      {
        id:"1", 
        from:"1", 
        to:"2"
      }, 
      {
        id:"2", 
        from:"2", 
        to:"1"
      }
    ],
    nextIdea: {
      id: 3,
      title: ""
    },
    nextConnection: {
      id: 3, 
      from: 1, 
      to: 2
    },
    test: {
      a: "initial",
      b: "initial"
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          { this.state.response }
        </p>
  
        <div>
          Ideas: 
        {this.state.ideas.map((idea, i) => <Idea key={i} id={idea.id} title={idea.title} />)}
          Add a new idea
          <form onSubmit={evt => this.addIdea(evt)}>
            <label> 
              Title
              <input 
                value={this.state.nextIdea.title} 
                onChange={evt => this.updateNewIdeaTitle(evt)} />
            </label>
            <input type="submit" value="Add Idea" />
          </form>
        </div>

        <div>
          Connections: 
        {this.state.connections.map((connection, i) => <Connection key={i} id={connection.id} from={connection.from} to={connection.to} />)}
          Add a new connection 
          <form onSubmit={evt => this.newConnection(evt)}>
            {this.renderIdeaIdSelect("From", ["nextConnection", "from"], this.updateNewConnectionFrom.bind(this))}
            {this.renderIdeaIdSelect("To", ["nextConnection", "to"], this.updateNewConnectionFrom.bind(this))}
            <input type="submit" value="Add Connection" />
          </form>
        </div>
        Test: 
        <div onClick={evt => {this.setState({test:{a: 1, b:2}})}}>div 1</div>
        <div onClick={evt => {this.setState(ps => ({test:{...ps.test, a: 4}}))}}>div 2</div>
        <div>
          test.a = {this.state.test.a}
          <br/>
          test.b = {this.state.test.b}
        </div>
      </div>
    );
  }
  
  renderIdeaIdSelect(label, statePath, evtHandler) {
    return ( 
      <label>
        {label}
        <select 
          value={resolvePath(this.state, statePath)} 
          onChange={evtHandler}
        >
          {this.state.ideas.map((idea, i) => 
            <option value={idea.id}>{idea.id}: {idea.title}</option>
          )}
        </select>
      </label>
    )
  }

  updateNewConnectionTo(evt) {
    this.setState({
      nextConnection: {
        to: evt.target.value
      }
    })
  }

  updateNewConnectionFrom(evt) {
    this.setState({
      nextConnection: {
        from: evt.target.value
      }
    })
  }

  updateNewIdeaTitle(evt) {
    //TODO: mal ein kurzes beispiel schreiben irgendwie zwei Buttons oder so um herauszufinden, was react macht, wenn man einen Teil des states nicht mit angibt. Was passiert, wenn es nested ist? 
    this.setState({
      nextIdea: {
        title: evt.target.value
      }
    })
  }
  
  addIdea(evt) {
    this.setState((ps) => {
      var idea = {
        id: ps.nextIdea.id, 
        title: ps.nextIdea.title
      }
      return {
        ideas: ps.ideas.concat(idea),
        nextIdea: {
          title: "", 
          id: ps.nextIdea.id + 1
        }
      }
    })
    evt.preventDefault()
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.message }))
      .catch(err => console.log(err))
  }

  callApi = async () => {
    var response = await fetch('/api/test')
    var body = await response.json()

    if(response.status !== 200){
       throw Error(body.message)
    }

	return body
  }
}

export default App;

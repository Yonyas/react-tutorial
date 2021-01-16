import React, { Component } from "react";

class Title extends Component {
  render() {
    return (
      <div>
        <h1>
          <a
            href="/"
            onClick={function (e) {
              e.preventDefault();
              this.props.onChangePage();
            }.bind(this)}
          >
            WEB
          </a>
        </h1>
        <p>I'm Web Developer</p>
      </div>
    );
  }
}

class TOC extends Component {
  shouldComponentUpdate(newProps, newState) {
    // render이전에 실행돼서 render 를 실행할지 안할지 결정하는 함수.
    // false 리턴하면 render()실행 안함
    console.log("TOC render", newProps.data, this.props.data);
    if (this.props.data === newProps.data) {
      return false;
    } else {
      return true;
    }
  }
  render() {
    console.log("TOC render");
    var lists = [];
    var data = this.props.data;
    for (var i = 0; i < data.length; i++) {
      lists.push(
        <li key={data[i].id}>
          <a
            href="/"
            data-id={data[i].id}
            onClick={function (e) {
              e.preventDefault();
              this.props.onChangePage(e.target.dataset.id);
            }.bind(this)}
          >
            {data[i].title}
          </a>
        </li>
      );
    }

    return <ul>{lists}</ul>;
  }
}
class Control extends Component {
  render() {
    return (
      <ul>
        <li>
          <a
            href="/create"
            onClick={function (e) {
              e.preventDefault();
              this.props.onChangeMode("create");
            }.bind(this)}
          >
            create
          </a>
        </li>
        <li>
          <a
            href="/update"
            onClick={function (e) {
              e.preventDefault();
              this.props.onChangeMode("update");
            }.bind(this)}
          >
            update
          </a>
        </li>
        <li>
          <input
            type="button"
            value="delete"
            onClick={function (e) {
              e.preventDefault();
              this.props.onChangeMode("delete");
            }.bind(this)}
          ></input>
        </li>
      </ul>
    );
  }
}

class CreateContents extends Component {
  render() {
    return (
      <div>
        <h2>Create</h2>
        <form
          onSubmit={function (e) {
            e.preventDefault();
            this.props.onSubmit(e.target.title.value, e.target.desc.value);
          }.bind(this)}
        >
          <p>
            <input type="text" name="title" placeholder="title"></input>
          </p>
          <p>
            <textarea name="desc" placeholder="description"></textarea>
          </p>
          <p>
            <input type="submit" />
          </p>
        </form>
      </div>
    );
  }
}

class ReadContents extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <p>{this.props.desc}</p>
      </div>
    );
  }
}

class UpdateContents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.data.id,
      title: this.props.data.title,
      desc: this.props.data.desc,
    };
    this.inputFormHandler = this.inputFormHandler.bind(this);
  }
  inputFormHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  render() {
    console.log("UpdateContent render");
    console.log(this.props.data);
    return (
      <div>
        <h2>Update</h2>
        <form
          onSubmit={function (e) {
            e.preventDefault();
            this.props.onSubmit(
              this.state.id,
              this.state.title,
              this.state.desc
            );
          }.bind(this)}
        >
          <input type="hidden" name="id" value={this.state.id} />
          <p>
            <input
              type="text"
              name="title"
              placeholder="title"
              value={this.state.title}
              onChange={this.inputFormHandler}
            ></input>
          </p>
          <p>
            <textarea
              name="desc"
              placeholder="description"
              value={this.state.desc}
              onChange={this.inputFormHandler}
            ></textarea>
          </p>
          <p>
            <input type="submit" />
          </p>
        </form>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;

    this.state = {
      mode: "create",
      selected_id: 1,
      welcome: { title: "Welcome", desc: "Hello, React!" },
      subject: { title: "web", sub: "web developer" },
      contents: [
        { id: 1, title: "HTML", desc: "HTML is fun?" },
        { id: 2, title: "CSS", desc: "CSS is about display" },
        { id: 3, title: "JS", desc: "JS was difficult" },
      ],
    };
  }
  //contents 배열 중 내가 클릭한 id와 같은 부분을 리턴
  getReadContent() {
    var i = 0;
    while (i < this.state.contents.length) {
      var data = this.state.contents[i];
      if (data.id === this.state.selected_id) {
        return data;
        break;
      }
      i = i + 1;
    }
  }
  getContent() {
    var _title,
      _desc,
      _article = null;
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContents title={_title} desc={_desc} />;
    } else if (this.state.mode === "read") {
      var _content = this.getReadContent();
      _article = <ReadContents title={_content.title} desc={_content.desc} />;
    } else if (this.state.mode === "create") {
      _article = (
        <CreateContents
          onSubmit={function (_title, _desc) {
            this.max_content_id++;
            var _contents = this.state.contents.concat({
              id: this.max_content_id,
              title: _title,
              desc: _desc,
            });
            this.setState({
              contents: _contents,
              selected_id: this.max_content_id,
              mode: "read",
            });
          }.bind(this)}
        />
      );
    } else if (this.state.mode === "update") {
      _content = this.getReadContent();
      _article = (
        <UpdateContents
          data={_content}
          onSubmit={function (_id, _title, _desc) {
            var _contents = Array.from(this.state.contents);
            var i = 0;
            while (i < _contents.length) {
              if (_contents[i].id === _id) {
                _contents[i] = { id: _id, title: _title, desc: _desc };
                break;
              }
              i++;
            }
            this.setState({
              contents: _contents,
              mode: "read",
            });
          }.bind(this)}
        />
      );
    }
    return _article;
  }
  render() {
    return (
      <div>
        <Title
          onChangePage={function () {
            this.setState({
              mode: "welcome",
            });
          }.bind(this)}
        />
        <TOC
          data={this.state.contents}
          onChangePage={function (id) {
            this.setState({
              mode: "read",
              selected_id: Number(id),
            });
          }.bind(this)}
        />
        <Control
          onChangeMode={function (_mode) {
            if (_mode === "delete") {
              if (window.confirm("really?")) {
                var i = 0;
                var _contents = Array.from(this.state.contents);
                while (i < _contents.length) {
                  if (_contents[i].id === this.state.selected_id) {
                    _contents.splice(i, 1);
                    break;
                  }
                  i++;
                }
                this.setState({
                  mode: "welcome",
                  contents: _contents,
                });
                alert("deleted!");
              }
            } else {
              this.setState({
                mode: _mode,
              });
            }
          }.bind(this)}
        />
        {this.getContent()}
      </div>
    );
  }
}

export default App;

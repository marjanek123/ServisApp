import React, { Component } from "react";
import { connect } from "react-redux";
import { getChatList, getChatMessages, sendMessage } from "../actions/chat";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";


const useStyles = {
  // appBarShift: {
  //   marginTop: theme.spacing(5),
  //   width: `calc(100% - ${drawerWidth}px)`,
  //   marginLeft: drawerWidth,
  //   transition: theme.transitions.create(["margin", "width"], {
  //     easing: theme.transitions.easing.easeOut,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  // },
  // scrolling: {
  //   overflowY: 'scroll'
  // }
  divStyle: {
    overflowY: "auto",
    display: "flex",
    flexDirection: "column-reverse",
    height: "500px",
    border: "1px solid black",
  },
  mes: {
    textAlign: "left",
    wordWrap: "break-word",
  },
};

class Chat extends Component {
  state = {
    message: "",
    image:"",
  };

  static propTypes = {
    chatList: PropTypes.array.isRequired,
    getChatList: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    getChatMessages: PropTypes.func.isRequired,
    receiver: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
    sendMessage: PropTypes.func.isRequired,
  };
  handleFileChange = e => {
    this.setState({
      [e.target.name]: e.target.files[0],
    })
  }
  onSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData
    // for (let name in this.state) {
    //   formdata.append(name, this.state[name]); 
    formdata.append("message", this.state.message);
    formdata.append("image", this.state.image);
    // data.append('message', this.state.message);
    // formdata.append('sender', JSON.stringify(this.props.user));
    // formdata.append('receiver',  JSON.stringify(this.props.receiver));

    // }
    console.log({formdata})
    this.props.sendMessage(
      this.props.user,
      this.props.receiver,
      formdata
    );
    this.setState({
      message: "",
      image: "",

    });
  };
  // imgChange =(e) =>{ this.setState({ [e.target.name]: e.target.value }) }
  componentDidMount() {
    this.props.getChatList();
  }
  Change = (e) => {
    console.log(e);
    console.log(e.target.key);
    e.preventDefault();
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  render() {
    const {message, image } = this.state;
    const { classes } = this.props;
    const receiver = this.props.receiver;
    const user = this.props.user;
    return (
      <div class="row align-items-start">
        <div class="col-4">
          <table className="table table-striped table-hover table table-bordered">
            <thead>
              <tr>
                <th>Lista Użytkowników:</th>
              </tr>
            </thead>
            <tbody>
              {this.props.chatList.map((item) => (
                <tr>
                  <td
                    onClick={this.props.getChatMessages.bind(
                      this,
                      this.props.user,
                      item.person.id
                    )}
                    class={item.new_message ? "table-primary" : "table-light"}
                  >
                    {item.person.username}
                  </td>
                  {/* <td><button type="button" class="btn btn-success" onClick={this.props.acceptInviteDetail.bind(this, item.id)}>Primary</button></td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div class="col-8">
          <form onSubmit={this.onSubmit}>
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th>{receiver ? `${receiver.username}:` : " "}</th>
                </tr>
              </thead>
            </table>
            <div class={classes.divStyle}>
              {this.props.messages.map((mess) => (
                <div className="card">
                  <div
                    class={
                      mess.sender == user.id
                        ? "card-body bg-primary"
                        : "card-body bg-secondary"
                    }
                  >
                    {mess.image ? (
                      <tr>
                        <img src={mess.image}></img>
                      </tr>
                    ) : (
                      <></>
                    )}
                    <tr class={classes.mes}>
                      <p>{mess.message}</p>
                    </tr>
                    <tr class={classes.mes}>
                      <small>
                        {mess.timestamp.substring(11, 19)}{" "}
                        {mess.is_read ? "odczytane" : "nieodczytane"}
                      </small>
                    </tr>
                  </div>
                </div>
              ))}
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>
                    <input
                      type="text"
                      className="form-control"
                      name="message"
                      onChange={this.onChange}
                      value={message}
                    />
                  </th>
                  <th>
                    <input
                      type="file"
                      name="image" 
                      onChange={this.handleFileChange}
                    />
                </th>
                  <th>
                    <button className="btn btn-primary" type="submit">
                      Wyślij
                    </button>
                  </th>
                </tr>
              </thead>
            </table>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  chatList: state.chat.chatList,
  user: state.auth.user,
  receiver: state.chat.receiver,
  messages: state.chat.messages,
});

export default connect(mapStateToProps, {
  getChatList,
  getChatMessages,
  sendMessage,
})(withStyles(useStyles)(Chat));

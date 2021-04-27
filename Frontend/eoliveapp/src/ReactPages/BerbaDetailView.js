  
import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import Berba from './Tables/Tableberba';

class BerbaDetail extends React.Component {
  state = {
    berba: {}
  };

  componentDidMount() {
    const berbaID = this.props.match.params.berbaID;
    axios.get(`http://127.0.0.1:8000/api/${berbaID}`).then(res => {
      console.log(res);
      this.setState({
        berba: res.data
      });
    });
  }

  handleDelete = event => {
    event.preventDefault();
    const berbaID = this.props.match.params.berbaID;
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`
    };
    axios.delete(`http://127.0.0.1:8000/api/${berbaID}/delete/`)
    .then(res => {
      if (res.status === 200) {
        this.props.history.push(`/`);
      }
    })
  };

  render() {
    return (
      <div>

        <Berba
          {...this.props}
          token={this.props.token}
          requestType="put"
          berbaID={this.props.match.params.berbaID}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token
  };
};

export default connect(mapStateToProps)(BerbaDetail);
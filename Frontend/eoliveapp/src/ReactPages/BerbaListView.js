import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import axios from "axios";

class BerbaList extends Component {
  constructor(props) {
    super(props);
    //Initial data from API
    this.state = {
      data: []
    };
    axios.get("https://jsonplaceholder.typicode.com/posts").then(res => {
      // Update react-table
      this.setState({
        posts: res.data,
        data: res.data.slice(0, 5),
        pages: res.data.length / 5,
        loading: false
      });
    });
  }
  render() {
    const columns = [
      {
        Header: "User ID",
        accessor: "id",
        style: {
          textAlign: "right"
        },
        width: 100,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "ID",
        accessor: "userId",
        style: {
          textAlign: "right"
        },
        width: 100,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "Title",
        accessor: "title",
        sortable: false,
        filterable: false
      },
      {
        Header: "Content",
        accessor: "body",
        sortable: false,
        filterable: false
      }
    ];
    return (
      <div className="Table1">
        <ReactTable
          columns={columns}
          data={this.state.data}
          pages={this.state.pages}
          loading={this.state.loading}
          filterable
          onPageChange={pageIndex => {
            let pagesize = 5;
            let low = pageIndex * pagesize;
            let high = pageIndex * pagesize + pagesize;
            axios.get("https://jsonplaceholder.typicode.com/posts").then(res => {
              // Update react-table
              this.setState({
                posts: res.data,
                data: res.data.slice(low, high),
                pages: res.data.pages,
                loading: false
              });
            });
          }}
          defaultPageSize={5}
          noDataText={"Loading..."}
          manual // informs React Table that you'll be handling sorting and pagination server-side
        />
      </div>
    );
  }
}

export default BerbaList;
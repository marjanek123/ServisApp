import React, { Component } from 'react'

export class SiteBarHeader extends Component {
  render() {
    return (
        <div className="flex-shrink-0 p-3 bg-white" style="width: 280px;">
        <a href="/" className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
          <svg className="bi me-2" width="30" height="24"></svg>
          <span className="fs-5 fw-semibold">Collapsible</span>
        </a>
        <ul className="list-unstyled ps-0">
          <li className="mb-1">
            <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
              Home
            </button>
            <div className="collapse show" id="home-collapse">
              
            </div>
          </li>
          <li className="mb-1">
            <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
              Dashboard
            </button>
            <div className="collapse" id="dashboard-collapse">
              
            </div>
          </li>
          <li className="mb-1">
            <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
              Orders
            </button>
            <div className="collapse" id="orders-collapse">
              
            </div>
          </li>
          <li className="border-top my-3"></li>
          <li className="mb-1">
            <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
              Account
            </button>
            <div className="collapse" id="account-collapse">
              
            </div>
          </li>
        </ul>
      </div>
    )
  }
}

export default SiteBarHeader
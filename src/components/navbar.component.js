import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from "../img/brlogo_sm.png";
import '../css/custom.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/theme.css';




export default class Navbar extends Component {
    render() {
        return (
        <div className="nav-container hidden-print">
			<div className="bar bar--xs visible-xs">
				<div className="container">
					<div className="row">
						<div className="col-xs-3 col-sm-2">
							<a href="index.php">
								<img class="logo" alt="logo" src={logo} />
							</a>
						</div>
					    <div class="col-xs-9 col-sm-10 text-right">
						    <a href="#" class="hamburger-toggle" data-toggle-class="#menu1;hidden-xs">
							    <i class="icon icon--sm stack-interface stack-menu"></i>
						    </a>
					    </div>
				    </div>
			    </div>
		    </div>
            <nav id="menu1" className="lawnavbg bar bar--xs bar-1 hidden-xs bar--absolute pos-fixed">
			    <div className="container">
				    <div className="row">
					    <div className="col-md-1 col-sm-2 hidden-xs">
						    <div className="bar__module">
							    <img className="logo" alt="logo" src={logo} />
						    </div>
					    </div>
					    <div className="col-md-11 col-sm-12 text-right text-left-xs text-left-sm">
						    <div className="bar__module">
							    <ul className="menu-horizontal text-left">
								    <li><a href="http://www.bellripper.com/">Home</a></li>
								    <li><a href="http://www.bellripper.com/aboutus.html">About Us</a></li>
                                    <li className="dropdown">
									    <span className="dropdown__trigger">Services</span>
									    <div className="dropdown__container">
										    <div className="container">
											    <div className="row">
												    <div className="dropdown__content col-md-3 col-sm-6">
													    <ul className="menu-vertical">
														    <li><a href="http://www.bellripper.com/lifeandestateplanning.html">Life and Estate Planning</a></li>
														    <li><a href="http://www.bellripper.com/mediation.html">Mediation</a></li>
														    <li><a href="http://www.bellripper.com/familylaw.html">Family Law</a></li>
													    </ul>
												    </div>
											    </div>
										    </div>
									    </div>
								    </li>
								    <li><a href="http://www.bellripper.com/new-clients.html">New Clients</a></li>
								    <li><a href="http://www.bellripper.com/resources.html">Resources</a></li>
								    <li><a href="http://www.bellripper.com/contact-us.html">Contact Us</a></li>
									<li>
										<a className="btn btn--sm btn--primary type--uppercase" href="signin.php">
											<span class="btn__text">
												User Portal
											</span>
										</a>
									</li>
							    </ul>
						    </div>
					    </div>
				    </div>
			    </div>
		    </nav>
        </div>
        );
    }
}
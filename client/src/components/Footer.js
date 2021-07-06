import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

export default class Footer extends Component {
    render() {
        return (
        <Container>    
            <p>
                <a href="mailto:alejandro@satxconsultants.com?subject=Bug/App Feedback">Send Feedback/report bugs</a>
                <br></br><br></br>
                Disclaimers:
                <br></br>
                Bell Ripper PLLC is responsible for the content of this website.  The principal place of business for Bell Ripper PLLC is 1002 N. Flores St., San Antonio, Texas 78212.  Unless otherwise indicated, attorneys are not Board Certified.
                <br></br><br></br>
                ​The materials on this website are made available by Bell Ripper PLLC for informational purposes only and do not constitute legal advice.  The receipt of information contained on this website does not create an attorney-client relationship.
            </p>
        </Container>        
        );
    }
}
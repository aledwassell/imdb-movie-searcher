import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faStar, faPlus, faBell, faSlidersH  } from '@fortawesome/free-solid-svg-icons';

class Nav extends Component {
    state = {
        navIcons: [
            {id: 1,icon:'faSearch'}, {id: 2,icon:'faStar'}, {id: 3,icon:'faPlus'}, {id: 4,icon:'faBell'}, {id: 5,icon:'faSlidersH'}
        ]
    };
    render() {
        console.log('props ', this.props);
        return (
            //I wanted to map over the list of icons and add each font icon through it's attribute but wasn't sure how to add icon={i.icon}
            <div className="nav">
                {/*{this.state.navIcons.map(i => <FontAwesomeIcon key={i.id} icon={i.icon} iconName={i.icon} />)}*/}
                <FontAwesomeIcon icon={faSearch} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faPlus} />
                <FontAwesomeIcon icon={faBell} />
                <FontAwesomeIcon icon={faSlidersH} />
                {/*<button onClick={this.handleGetMovies} className={this.getBtnClass()}>GET DATA</button>*/}
            </div>
        );
    }
    //Grab classes to style elements, I was going to include a button to get the data, but I removed it
    // getBtnClass() {
    //     let classes = "white br-pill pa3 bn bg-";
    //     classes += (this.state.count === 0) ? 'yellow' : 'green';
    //     return classes;
    // }
}

export default Nav;
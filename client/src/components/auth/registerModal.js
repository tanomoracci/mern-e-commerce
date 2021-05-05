import { Component } from 'react';
import {
    Button, 
    Modal, 
    ModalHeader,
    ModalBody,
    Form, 
    FormGroup, 
    Label, 
    Input, 
    NavLink, 
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class RegisterModal extends Component {
    state = {
        modal: false, 
        name: '',
        email: '',
        password: '',
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if(error !== prevProps.error) {
            //check for register error
            if(error === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg});
            } else {
                this.setState({ msg: null})
            }    
        }

        // If authenticated close Modal
        if(this.state.modal) {
            if(isAuthenticated) {
                this.toggle();
            }
        }
    }

    toggle = () => {
        //Clear errors
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = (e) => {
        this.setState({[e.target.name] : e.target.value })
    };

    onSubmit = (e) => {
        e.preventDefault();

        const { name, email, password } = this.state;

        //Create user Object
        const newUser = { name, email, password};

        //Attempt to register
        this.props.register(newUser);
    }
}
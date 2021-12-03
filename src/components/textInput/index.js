import React from 'react';
import { Text, TextInput, Pressable, View } from 'react-native';
import { connect } from 'react-redux';
import { inputField } from '../../redux/actions';
import styles from './styles';

class TextInputField extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            editable: !this.props.editButton
        }
    }

    componentDidMount = () => {
    }

    render() {
        return (
            <Pressable
                disabled={this.props.editButton}
                onPress={() => this.input.focus()}
                style={styles.inputFieldContainer}>
                {this.props.errorMessage || this.props.errorMessage2 ?
                    <Text style={styles.errorMessage}>{this.props.errorMessage}{this.props.errorMessage2}</Text> : null}
                {this.props.input !== "" ?
                    <Text style={styles.smallPlaceholder}>{this.props.placeholder}</Text> : null}

                <TextInput
                    editable={this.state.editable}
                    ref={(input) => { this.input = input; }}
                    maxLength={this.props.max}
                    keyboardType={this.props.type}
                    secureTextEntry={this.props.secure}
                    placeholder={this.props.placeholder}
                    placeholderTextColor="#9B9B9B"
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={this.props.input}
                    onChangeText={input => {
                        if (this.props.update) {
                            this.props.updateFunc(this.props.state, input);
                        } else
                            this.props.inputField(this.props.state, input)
                    }}
                    style={[styles.inputField, { paddingRight: this.props.paddingRight ? 20 : 0 }]} />
                {this.props.editButton ?
                    <View style={styles.editButtonContainer}>
                        <Pressable onPress={() => {
                            if (!this.props.changeButton) {
                                this.setState({ editable: !this.state.editable }, () => {
                                    if (this.state.editable)
                                        this.input.focus();
                                    else
                                        this.input.blur();
                                });
                            }
                        }}>
                            <Text style={styles.editButtonText}>{this.state.editable ? "Save" : this.props.changeButton ? "Change" : "Edit"}</Text>
                        </Pressable>
                    </View> : null}
            </Pressable>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
}

export default connect(mapStateToProps, { inputField })(TextInputField);
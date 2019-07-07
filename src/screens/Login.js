import React, { Component } from 'react';
import {
    View,Text,
    StyleSheet, 
    TouchableOpacity,
    TextInput
} from 'react-native';
import { connect } from 'react-redux'
import { login } from '../store/actions/user'


//import keyLogin from 'react-native-login-keycloak';

// const config = {
//     url: 'http://192.168.1.15:8080/auth',
//     realm: 'MyRealm',
//     clientId: 'my-api-client',
//     redirectUri: 'http://192.168.232.2/success.html',
//     appsiteUri: 'http://<APPSITE HOST>/app.html',
//     kcIdpHint: 'facebook', // *optional*
//   };


 class Login extends Component {
    state = {
       name: 'Temporario', 
       email: '',
       password: '' 
    }

    // O componete acabou de ser atualizado
    componentDidUpdate = prevProps =>  {
        if (prevProps.isLoading && !this.props.isLoading) {
            this.props.navigation.navigate('Profile')
        }

    }
  
    
    login = () => {
       this.props.onLogin({ ...this.state }) 
       // this.props.navigation.navigate('Profile');
    //    this.keyLogin.startLoginProcess(config).then(tokens => {
    //        console.log(tokens);
    }

     
    face = () => {
        this.console.log("Entrou no face");
    }

    render() {
        return (
            <View style={StyleSheet.container}>
                <TextInput placeholder='Email' style={styles.input} 
                 autoFocus={true} keyboardType='email-address'
                 value={this.state.email} 
                 onChangeText={email => this.setState({ email })} />
                 <TextInput placeholder='password' style={styles.input} 
                  secureTextEntry={true}
                  value={this.state.password} 
                  onChangeText={password => this.setState({ password })} /> 
                  <TouchableOpacity onPress={this.login} style={styles.buttom}>
                      <Text style={styles.buttomText}>Login</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                      this.props.navigation.navigate('Register')
                  }} style={styles.buttom}>
                      <Text style={styles.buttomText}>Criar nova conta...</Text>
                  </TouchableOpacity>
            </View>
           
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center' ,
        justifyContent: 'center',
    },
    buttom: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4'
    },
    buttomText: {
        fontSize: 10,
        color: '#FFF'
    },
    input: {
       marginTop: 10,
       marginLeft: 10,
       width: '90%',
       backgroundColor: '#EEE',
       height: 35,
       borderWidth: 1,
       borderColor: '#333',
       paddingLeft: 15  
    }
})
const mapStateToProps = ({ user }) => {
    return {
        isLoading: user.isLoading  
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: user => dispatch(login(user))
    }
}

//Connect -> conecta meu componente Login com redux
export default connect(mapStateToProps,mapDispatchToProps)(Login)

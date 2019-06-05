import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Gravatar } from 'react-native-gravatar'
import { connect } from 'react-redux'
//import { login } from '../store/actions/user'
import { logout } from '../store/actions/user'


class Profile extends Component {
    logout = () => {
      this.props.onLogout()  
      this.props.navigation.navigate('Auth')
    }

    render() {
        const options = { email: this.props.email, secure: true }
        return (
            <View style={styles.container}>
                <Gravatar options={options} style={styles.avatar} />
                <Text style={styles.nickname}>{this.props.name}</Text>
                {/* {} siginifica interpolar */}
                <Text style={styles.email}>{this.props.email}</Text>
                <TouchableOpacity onPress={this.logout}
                    style={styles.buttom}>
                    <Text style={styles.buttomText}>Sair</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 75,
        marginTop: 100
    },
    nickname: {
        marginTop: 30,
        fontSize: 15,
        fontWeight: 'bold'
    },
    email: {
        marginTop: 20,
        fontSize: 15
    },
    buttom: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4'
    },
    buttomText: {
        fontSize: 15,
        color: '#FFF'
    }
})
// destrocter faz parte do estado do reduce use
const mapStateToProps = ({ user }) => {
  return {
     email: user.email,
     name: user.name
  }   
}


const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile)
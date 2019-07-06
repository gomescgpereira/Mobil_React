import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Image, Dimensions } from 'react-native'
import Author from './Author'
import Comments from './Comments'
import AddComment from './AddComment'
import { addComment } from '../store/actions/post';

class Post extends Component {
    render() {
        const addComment = this.props.name ?
        <AddComment postId={this.props.id} /> : null
        return (
            <View style={styles.container}>
                <Image source={{uri: this.props.image }} style={styles.image} />
                <Author email='gomescpereira@gmail.com' nickname='Eduardo' /> 
                <Comments comments={this.props.comments} /> 
                {addComment}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 3 / 4,
        resizeMode: 'contain'
    }
})

const mapStateToProps = ({ user }) => {
    return {
      // user: user
       
       name: user.name
    }  
} 

export default connect(mapStateToProps)(Post)
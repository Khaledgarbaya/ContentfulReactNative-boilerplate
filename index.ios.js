/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
	View,
	ListView
} from 'react-native';
import {createClient} from 'contentful'
class ContentfulProject extends Component {
	constructor(){
		super();
		this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {dataSource:this.ds.cloneWithRows(["row1", "row2"])};
	}
	componentDidMount(){
		this.getContentFromcontentful();
	}
	getContentFromcontentful(){
		const client = createClient({
			accessToken: '0e3ec801b5af550c8a1257e8623b1c77ac9b3d8fcfc1b2b7494e3cb77878f92a',
			space: 'wl1z0pal05vy'
		});
		client.getEntries({content_type: '2PqfXUJwE8qSYKuM0U6w8M'}).then((response)=>{
			this.setState({dataSource: this.ds.cloneWithRows(response.items.map(function(product){
				return product.fields.productName
			}))})
		}).catch(function(error){
			console.log(error)
		});
	}
	render() {
		return (
			<ListView
			style={styles.container}
			dataSource={this.state.dataSource}
			renderRow={(rowData) => <Text style={styles.title}>{rowData}</Text>}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
		flex: 1,
		marginTop: 50,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
		textAlign: 'center',
		padding: 20
  }
});

AppRegistry.registerComponent('ContentfulProject', () => ContentfulProject);

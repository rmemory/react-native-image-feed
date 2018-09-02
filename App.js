import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Constants } from 'expo';

import Card from './components/Card';

export default class App extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Card
					fullname={'First Last'}
					linkText={'Comments'}
					onPressLinkText={() => {
						console.log('Pressed link!');
					}}
					image={{ uri: 'https://unsplash.it/600/600' }}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: Constants.statusBarHeight,
		flex: 1,
		backgroundColor: '#fff',
	},
});
	


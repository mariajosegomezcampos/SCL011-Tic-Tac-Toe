/* eslint-disable no-undef */
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      gameStates: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],

      currentPlayer: 1,
    }
  }

  componentDidMount() {
    this.initializeGame();
  }

  initializeGame = () => {
    this.setState({
      gameStates: [
          [1, -1, 0],
          [0, 0, 0],
          [0, 0, 0]
        ]

    })
  }

  renderPosition = (row, col) => {
    var value= this.state.gameStates[row][col];
    switch (value) {
      case 1: return <View><Image source={require('./assets/33.jpg')} style={styles.icon}/></View>;
      case -1: return <View><Image source={require('./assets/ryder.jpg')} style={styles.icon}/></View>;
      default: return <View/>;
        
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Image source={require('./assets/logo.png')} style={styles.imgtitle} />
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]} />
          {this.renderPosition(0, 0)}
          <View style={[styles.tile, { borderTopWidth: 0 }]} />
          {this.renderPosition(0, 1)}
          <View style={[styles.tile, { borderTopWidth: 0, borderRightWidth: 0 }]} />
          {this.renderPosition(0, 2)}
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={[styles.tile, { borderLeftWidth: 0 }]} />
          <View style={[styles.tile, {}]} />
          <View style={[styles.tile, { borderRightWidth: 0 }]} />
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={[styles.tile, { borderBottomWidth: 0, borderLeftWidth: 0, }]} />
          <View style={[styles.tile, { borderBottomWidth: 0 }]} />
          <View style={[styles.tile, { borderBottomWidth: 0, borderRightWidth: 0, }]} />
        </View>

        <View>
          <Text style={{ color: 'white', fontSize: 20, marginTop: 20 }}>Historial de victorias</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Image source={require('./assets/skye.jpg')} style={styles.playerWins} /><Text style={styles.wins}> </Text>
          <Image source={require('./assets/ryder.jpg')} style={styles.playerWins} /><Text style={styles.wins}> </Text>
        </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6495ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile: {
    borderWidth: 2,
    width: 100,
    height: 100,
    borderColor: '#ffffff',
  },
   player: {
    width: 30,
    height: 30,
    marginBottom: 20,
    paddingBottom: 20
   }[
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]
,
  icon: {
  width: 70, 
  height: 70,
  marginLeft: 12,
  marginTop: 12
   },

  imgtitle: {
    flex: 0,
    width: 300,
    height: 200,
    resizeMode: 'contain'
  },
  wins: {
    color: 'white',
    fontSize: 30,
    marginTop: 3
  },
  playerWins: {
    width: 30,
    height: 30,
    marginTop: 7
  }

});



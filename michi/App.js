/* eslint-disable no-undef */
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';

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
    this.setState({gameStates:
        [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ],

   currentPlayer: 1,

    });
  }

//obtener el ganador
checkWinner = () => {
  const MM_TILES = 3;
  var arr = this.state.gameStates;
  var sum;

  //fila de verificacion
  for (var i = 0; 1 < MM_TILES; i++) {
    sum = arr[i][0] + arr[0][1] + arr[i][2];
    if (sum == 3) { return 1; }
    else if (sum == -3) { return -1 }
  }
  //fila de columnas
  for (var i = 0; 1 < MM_TILES; i++) {
    sum = arr[0][i] + arr[1][i] + arr[2][i];
    if (sum == 3) { return 1; }
    else if (sum == -3) { return -1 }
  }
  //filas diagonales
  sum = arr[0][0] + arr[1][1] + arr[2][2];
  if (sum == 3) { return 1; }
  else if (sum == -3) { return -1 }

  sum = arr[2][0] + arr[1][1] + arr[0][2];
  if (sum == 3) { return 1; }
  else if (sum == -3) { return -1 }

  //no hay ganadores
  var winner = this.getWinner();
  if (winner == 1) {
    Alert.alert("El jugador  1 es ganador"),
      this.initializeGame();
  }
  else if (winner == 1) {
    Alert.alert("El jugador 2 es ganador"),
      this.initializeGame();
  }
}


  onTilePress = (row, col) => {

    // no permita que cambie
    var value = this.state.gameStates[row][col];
    if (value !== 0) { return; }

    //agarrar jugador actual
    var currentPlayer = this.state.currentPlayer;

    //marca un solo icocono 
    var arr = this.state.gameStates.slice();
    arr[row][col] = currentPlayer;
    this.setState({ gameStates: arr });

    // cambiar al otro jugador
    var nextplayer = (currentPlayer == 1) ? -1 : 1;
    this.setState({ currentPlayer: nextplayer });
  }

  renderPosition = (row, col) => {
    var value = this.state.gameStates[row][col];
    switch (value) {
      case 1: return <View><Image source={require('./assets/33.jpg')} style={styles.icon} /></View>;
      case -1: return <View><Image source={require('./assets/ryder.jpg')} style={styles.icon} /></View>;
      default: return <View />;
    }
  }
  render(){
    return(
      <View style={styles.container}>

        <View style={styles.titleContainer}>
          <Image source={require('./assets/logo.png')} style={styles.imgtitle} />
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => { this.onTilePress(0, 0) }} style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}>
            {this.renderPosition(0, 0)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { this.onTilePress(0, 1) }} style={[styles.tile, { borderTopWidth: 0 }]}>
            {this.renderPosition(0, 1)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { this.onTilePress(0, 2) }} style={[styles.tile, { borderRightWidth: 0, borderTopWidth: 0 }]}>
            {this.renderPosition(0, 2)}
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => { this.onTilePress(1, 0) }} style={[styles.tile, { borderLeftWidth: 0 }]}>
            {this.renderPosition(1, 0)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { this.onTilePress(1, 1) }} style={styles.tile}>
            {this.renderPosition(1, 1)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { this.onTilePress(1, 2) }} style={[styles.tile, { borderRightWidth: 0 }]}>
            {this.renderPosition(1, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => { this.onTilePress(2, 0) }} style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }]}>
            {this.renderPosition(2, 0)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { this.onTilePress(2, 1) }} style={[styles.tile, { borderBottomWidth: 0 }]}>
            {this.renderPosition(2, 1)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { this.onTilePress(2, 2) }} style={[styles.tile, { borderRightWidth: 0, borderBottomWidth: 0 }]}>
            {this.renderPosition(2, 2)}
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{ color: 'white', fontSize: 20, marginTop: 20 }}>Historial de victorias</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Image source={require('./assets/skye.jpg')} style={styles.playerWins} /><Text style={styles.wins}> </Text>
          <Image source={require('./assets/ryder.jpg')} style={styles.playerWins} /><Text style={styles.wins}> </Text>
        </View>
        {/* <View style= {{paddingTop:50}}/>
       <button title ="Nuevo Juego" onPress= {this.onNewGameOnpress}/>  */}
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

  titleContainer: {
    width: 300,
    height: 150
  },
  imgtitle: {
    flex: 1,
    width: 300,
    height: 200,
    resizeMode: 'contain'
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
  },

  icon: {
    width: 70,
    height: 70,
    marginLeft: 12,
    marginTop: 12
  },


  playerTurn: {
    fontSize: 30,
    color: '#ffffff',
    marginBottom: 20,
    paddingBottom: 20
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




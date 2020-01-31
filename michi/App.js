// /* eslint-disable no-undef */
import React , { useState }from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert,} from 'react-native';

// export default class App extends React.Component {
  export default function App() {

  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [gameStates, setGameState] = useState([

        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]

      ]);
  
  const [playerSkyeWins, setPlayerSkyeWins] = useState(0)
  const [playerRyderWins, setplayerRyderWins] = useState(0)

 const initializeGame = () => {
    setGameState([

          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]

    ]);

   setCurrentPlayer(1)  
  }

  const renderPosition = (row, col) => {
    let position = gameStates[row][col];
    if(position == 1){
      return <View><Image source={require('./assets/skye.png')} style={styles.icon}/></View>
    }
    else if(position == -1){
      return <View><Image source={require('./assets/ryder.png')} style={styles.icon}/></View>
    }
    else{
      return <View></View>
    }
  }

  const getWinner = () => {
    //checking rows
    if((gameStates[0][0] == gameStates[0][1] && gameStates[0][0] == gameStates[0][2]) && gameStates[0][0] != 0){
      if(gameStates[0][0] == 1){
        return 1
      }
      else {
        return -1
      }
    }
    if((gameStates[1][0] == gameStates[1][1] && gameStates[1][0] == gameStates[1][2]) && gameStates[1][0] != 0){
      if(gameStates[1][0] == 1){
        return 1
      }
      else {
        return -1
      }
    }
    if((gameStates[2][0] == gameStates[2][1] && gameStates[2][0] == gameStates[2][2]) && gameStates[2][0] != 0){
      if(gameStates[2][0] == 1){
        return 1
      }
      else {
        return -1
      }
    }
    //checking cols
    if((gameStates[0][0] == gameStates[1][0] && gameStates[0][0] == gameStates[2][0]) && gameStates[0][0] != 0){
      if(gameStates[0][0] == 1){
        return 1
      }
      else {
        return -1
      }
    }
    if((gameStates[0][1] == gameStates[1][1] && gameStates[0][1] == gameStates[2][1]) && gameStates[0][1] != 0){
      if(gameStates[0][1] == 1){
        return 1
      }
      else {
        return -1
      }
    }
    if((gameStates[0][2] == gameStates[1][2] && gameStates[0][2] == gameStates[2][2]) && gameStates[0][2] != 0){
      if(gameStates[0][2] == 1){
        return 1
      }
      else {
        return -1
      }
    }
    //checking diagolans
    if((gameStates[0][0] == gameStates[1][1] && gameStates[0][0] == gameStates[2][2]) && gameStates[0][0] != 0){
      if(gameStates[0][0] == 1){
        return 1
      }
      else {
        return -1
      }
    }
    if((gameStates[0][2] == gameStates[1][1] && gameStates[0][2] == gameStates[2][0]) && gameStates[0][2] != 0){
      if(gameStates[0][2] == 1){
        return 1
      }
      else {
        return -1
      }
    }
    return 0
  }

  const showPlayer = (currentUser) => {
    if(currentUser == 1){
      return <View><Image source={require('./assets/skye.png')} style={styles.player}/></View>
    }
    else if (currentUser == -1) {
      return <View><Image source={require('./assets/ryder.png')} style={styles.player}/></View>
    }
    else {
      return
    }
  }
  
  const onTilePress = (row, col) => {
  if (gameStates[row][col]!== 0) {// no permita que cambie la imagen en la cajita
     return;
     }

    let newGrid = gameStates.slice();
   newGrid[row][col] = currentPlayer;
   setGameState(newGrid);
   setCurrentPlayer(currentPlayer * -1);

//     //verifica ganador
  let  winner = getWinner();
 if (winner == 1) {
 Alert.alert("El jugador skyl es ganador"),
 setPlayerSkyeWins(playerSkyeWins + 1)
      initializeGame();
  }
 else if (winner == -1) {
   Alert.alert("El jugador ryder es ganador"),
   setplayerRyderWins(playerRyderWins + 1) 
      initializeGame();
  }
   
   if(winner==0){
     let isFull=true;
    for(let i = 0; i < 3; i++){
   for(let j = 0; j < 3; j++){
     if (gameStates[i][j] == 0) {
        isFull= false;
          }
         }
       } 
       if (isFull){
       Alert.alert('Empate vuelve a intentar!');
       initializeGame();
     }
  }
};
 
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Image source={require('./assets/logo.png')} style={styles.imgtitle}/>
        </View>
        <View style={{flexDirection: "row"}}><Text style={styles.playerTurn}>Turno de: </Text>{showPlayer(currentPlayer)}</View>
        {/* <View style={styles.playerTurnIcon}>{showPlayer(currentUser)}</View> */}
        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => {onTilePress(0,0)}} style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}>
            {renderPosition(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {onTilePress(0,1)}} style={[styles.tile, { borderTopWidth: 0 }]}>
            {renderPosition(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {onTilePress(0,2)}} style={[styles.tile, { borderRightWidth: 0, borderTopWidth: 0 }]}>
            {renderPosition(0, 2)}
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => {onTilePress(1,0)}} style={[styles.tile, { borderLeftWidth: 0 }]}>
            {renderPosition(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {onTilePress(1,1)}} style={styles.tile}>
            {renderPosition(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {onTilePress(1,2)}} style={[styles.tile, { borderRightWidth: 0 }]}>
            {renderPosition(1, 2)}
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => {onTilePress(2,0)}} style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }]}>
            {renderPosition(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {onTilePress(2,1)}} style={[styles.tile, { borderBottomWidth: 0 }]}>
            {renderPosition(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {onTilePress(2,2)}} style={[styles.tile, { borderRightWidth: 0, borderBottomWidth: 0 }]}>
            {renderPosition(2, 2)}
          </TouchableOpacity>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={() => {initializeGame()}}> 
            <Text style={styles.resetButton}>
              Reiniciar juego
            </Text>
          </TouchableOpacity >
        </View>
        <View>
          <Text style={{color: 'white', fontSize: 20, marginTop: 20}}>Historial de victorias</Text>
        </View>
        <View style={{flexDirection: "row"}}>
          <Image source={require('./assets/skye.png')} style={styles.playerWins}/><Text style={styles.wins}>  :  {playerSkyeWins}  /  </Text>
          <Image source={require('./assets/ryder.png')} style={styles.playerWins}/><Text style={styles.wins}>  :  {playerRyderWins}</Text>
        </View>
      </View>
    );
  };


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
  btnContainer: {
    marginTop: 10,
    color: '#000000'
  },
  imgtitle: {
    flex: 1,
    width: 300,
    height: 300,
    resizeMode: 'contain'
  },

  playerTurn: {
    fontSize: 20,
    color: '#ffffff',
    marginBottom: 5,
    paddingBottom: 5
  },

  tile: {
    borderWidth: 2,
    width: 90,
    height: 80,
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

  resetButton: {
    backgroundColor: '#DAA520',
    borderRadius: 8,
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    width: 180,
    height: 40,
    paddingVertical: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
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
  },

});




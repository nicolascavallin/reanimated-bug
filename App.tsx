import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState} from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';

function Screen1({navigation: {navigate}}) {
  const [items, setItems] = useState(['item0']);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 16,
        }}>
        <TouchableOpacity
          onPress={() =>
            setItems(_items => {
              return [..._items, `item${new Date().toISOString()}`];
            })
          }
          style={{
            backgroundColor: '#7d94df',
            padding: 16,
            alignItems: 'center',
            flex: 1,
          }}>
          <Text>Add item</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate('Screen2')}
          style={{
            backgroundColor: '#7ddf8c',
            padding: 16,
            alignItems: 'center',
            flex: 1,
          }}>
          <Text>Navigate to next screen</Text>
        </TouchableOpacity>
      </View>
      <Animated.View
        layout={LinearTransition}
        style={{flex: 1, backgroundColor: 'white'}}>
        {items.map(item => (
          <Animated.View
            layout={LinearTransition}
            entering={FadeIn}
            exiting={FadeOut}
            key={item}>
            <TouchableOpacity
              style={{
                marginVertical: 8,
                backgroundColor: '#dfbb7d',
                padding: 8,
              }}
              onPress={() =>
                setItems(_items => {
                  return _items.filter(_item => _item !== item);
                })
              }>
              <Text>{item}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </Animated.View>
    </View>
  );
}
function Screen2({navigation: {goBack}}) {
  return (
    <View>
      <TouchableOpacity
        onPress={goBack}
        style={{
          backgroundColor: '#7d94df',
          padding: 16,
          alignItems: 'center',
        }}>
        <Text>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Screen1" component={Screen1} />
        <Stack.Screen name="Screen2" component={Screen2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

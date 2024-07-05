import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Home from './src/screens/Home';
import OnboardingScreen from './src/screens/OnBording';
import {Text} from 'react-native';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState<any>(null);

  React.useEffect(() => {
    const init = async () => {
      const appData = await AsyncStorage.getItem('isAppFirstLaunched');
      console.log(appData);
      if (appData == 'false') {
        setIsAppFirstLaunched(false);
      } else {
        setIsAppFirstLaunched(true);
      }
    };

    init();
  }, []);

  console.log(isAppFirstLaunched);
  return (
    <>
      {isAppFirstLaunched != null && (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {isAppFirstLaunched && (
              <Stack.Screen name="onBording" component={OnboardingScreen} />
            )}
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
}

export default App;

import * as React from 'react';
import { View, StyleSheet , Text, Button} from 'react-native';
import Constants from 'expo-constants';
import * as SMS from 'expo-sms';

// You can import from local files


// or any pure javascript modules available in npm


export default  App = (PHONES) => {
  const [smsAvailable, setSmsAvailable] = React.useState(false);

  const onComposeSms = React.useCallback(async () => {
    if (smsAvailable) {
      console.log('going for it!');
      await SMS.sendSMSAsync(
        PHONES,
        'mess',
      );
    }
  }, [smsAvailable]);

  React.useEffect(() => {
    SMS.isAvailableAsync().then(setSmsAvailable);
  }, []);

  return (
    <View style={styles.container}>
 
      <Button onPress={onComposeSms} disabled={!smsAvailable} title={"Wyślij SMS do WSZYSTKICH w TYm dniu"}>
    
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
	  flex:1,
	  marginTop:10,
  }
});
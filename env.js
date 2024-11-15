import { Platform } from 'react-native';
import Constants from 'expo-constants';

const ENV = {
  dev: {
    GROQ_API_KEY: "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",
  },
  prod: {
    GROQ_API_KEY: "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",
  }
};

const getEnvVars = (env = Constants.expoConfig.releaseChannel) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__) {
    return ENV.dev;
  } else// if (env === 'prod') 
  {
    return ENV.prod;
  }

  /*
      if (Platform.OS === 'web') {
        return ENV.prod; // or ENV.dev based on your requirement
    }
  */
};

export default getEnvVars;
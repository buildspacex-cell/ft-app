import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'co.fundamentallytrue.app',
  appName: 'Fundamentally True',
  webDir: 'out',
  server: {
    // For development: point to your local/Vercel URL
    // For production: remove this and use webDir
    // url: 'https://fundamentallytrue.co',
    // androidScheme: 'https',
  },
  ios: {
    contentInset: 'automatic',
    scrollEnabled: false,
  },
  android: {
    backgroundColor: '#f6f3ec',
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
    SplashScreen: {
      launchShowDuration: 800,
      launchAutoHide: true,
      backgroundColor: '#f6f3ec',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
    },
    StatusBar: {
      style: 'Default',
      backgroundColor: '#f6f3ec',
    },
  },
};

export default config;

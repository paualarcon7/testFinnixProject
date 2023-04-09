import 'dotenv/config'
export default {
  "expo": {
    "name": "testProject",
    "slug": "testProject",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "config": {
        "googleMaps": {
          "apiKey": "AIzaSyCL-5tRfLYV84QcI0Sx3WlYdyj9FDyaH84"
        }
      },
       "permissions": [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "android.permission.BATTERY_STATS"
      ],
      "package": "com.testProject.testProject",
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "apiKey": "sk_1310e99b2d294229a10e22817899bb20",
      "merchantId": "mqv9dbsh26houzesz5fg",
      "eas": {
        "projectId": "64b02efc-803c-49eb-b0d3-f9477c0636a1"
      },
      "googleMaps": {
        "apiKey": "AIzaSyCL-5tRfLYV84QcI0Sx3WlYdyj9FDyaH84"
      }
    }
  }
}


To release:

Android
1. Set key.jks at android/app
2. Set at android/gradlew.properties:
MYAPP_UPLOAD_STORE_FILE=key.jks
MYAPP_UPLOAD_KEY_ALIAS=key0
MYAPP_UPLOAD_STORE_PASSWORD=xxxxxxxxxx
MYAPP_UPLOAD_KEY_PASSWORD=xxxxxxxxxx
3. Download google-services.json and put at android/app/
4. Set webClientId at sr/global/keys/googleSignInId.ts

iOS:
1. Download GoogleService-Info.plist and put at ios/myproject
2. Get REVERSED_CLIENT_ID on GoogleService-Info.plist and set it at URLSchema on Info tab;

# DelivaryApp

Plantilla para delivery React Native.

## Installación

Para instalar la plantilla se deben ejecutar los siguientes comandos:
```bash
npx jetify
react-native-rename "Delivery App" -b com.loginweb.deliveryapp
react-native run-android
or
react-native run-ios
```

Para publicar tu appa en la Playstore debes seguir los siguientes pasos de la [documentación](https://reactnative.dev/docs/signed-apk-android), para lo cual previamente debes cambiar el nombre del paquete de la app con el siguiente comando:
```bash
react-native-rename "Delivery App" -b com.loginweb.deliveryapp
```
Además debes registrar tu app en [Firebase](https://console.firebase.google.com/u/0/) para poder usar la autenticación mediante sms.

<!-- ## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/) -->
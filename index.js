/**
 * @format
 */


import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { enableScreens } from 'react-native-screens';
enableScreens(); // желательно, но если web глючит — можно отключить

AppRegistry.registerComponent(appName, () => App);

if(Platform.OS === 'web'){
    {AppRegistry.runApplication(appName, {
    initialProps: {},
    rootTag: document.getElementById('app'),
    });}}

//     function requireAllModules() {
//         // Автоматически находим и инициализируем все модули
//         const context = require.context('./', true, /\.js$/);
//         context.keys().forEach((modulePath) => {
//           const module = context(modulePath);
//           if (module.default) {
//             module.default();
//           }
//         });
//       }
//       if (module.hot) {
//   module.hot.accept(context.id, () => {
//     console.log('Модуль обновлен, перезапуск всех модулей...');
//     requireAllModules();
//   });
// }
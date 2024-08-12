Al momento de crear el state y el store, se debe importar el provider de react-redux y llamar al store
creado en el index antes de llamar al componente app para crear un contexto del redux.

import { Provider } from 'react-redux';
import { store } from './redux/store';

<Provider store={store}> // ← provider con el store
  <ThemeProvider>
    <LanguageProvider>
    <App />             // ← llamada del componente app
    </LanguageProvider>
  </ThemeProvider>
</Provider>             // ← fin del provider
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { fileTrayFullSharp, peopleSharp } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

// import Good from './pages/GoodMemories';
// import Bad from './pages/BadMemories';
// import New from './pages/NewMemory';
import MemoriesContextProvider from './data/MemoriesContextProvider';
import { useContext, useEffect } from 'react';
import MemoriesContext from './data/memories-context';
import Tabs from './components/Tabs';
import Students from './pages/Students';
import NewStudents from './pages/NewStudents';

setupIonicReact();

const App: React.FC = () => {
  const memoriesCtx = useContext(MemoriesContext);
  const {initContext} = memoriesCtx;
  // localStorage.clear();
  // indexedDB.deleteDatabase("Disc");
  useEffect(() => {
    initContext();
  }, [initContext]);
  return (
    <IonApp>
        <IonReactRouter>
          <IonMenu contentId="main" side='start' type='reveal'>
            <IonHeader>
              <IonToolbar color="secondary">
                <IonTitle>Menu</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonList>
                <IonMenuToggle>
                  <IonItem button routerLink={"/tabs/good"}>
                    <IonIcon slot="start" icon={fileTrayFullSharp}/>
                    <IonLabel>Memories</IonLabel>
                  </IonItem>
                  <IonItem button routerLink={"/students"}>
                    <IonIcon slot="start" icon={peopleSharp}/>
                    <IonLabel>Students</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              </IonList>
            </IonContent>
          </IonMenu>
          <MemoriesContextProvider>
            <IonRouterOutlet id='main'>
              <Route exact path="/tabs/good" component={Tabs}/>
              <Route exact path="/tabs/bad" component={Tabs}/>
              <Route exact path="/tabs/new" component={Tabs}/>
              <Route exact path="/students" component={Students}/>
              <Route exact path="/newstudents" component={NewStudents}/>
              <Route exact path="/tabs" component={Tabs}/>
              <Redirect exact from="/" to="/tabs"/>
            </IonRouterOutlet>
          </MemoriesContextProvider>
            {/* <IonTabs>
              <IonRouterOutlet>
                <Route exact path="/good" component={Good}/>
                <Route exact path="/bad" component={Bad}/>
                <Route exact path="/new" component={New}/>
                <Redirect exact from="/" to="/good"/>
              </IonRouterOutlet>
              <IonTabBar slot="bottom" color="secondary">
                <IonTabButton tab="good" href="/good">
                    <IonIcon icon={happySharp}/>
                    <IonLabel>Good Memories</IonLabel>
                </IonTabButton>
                <IonTabButton tab="bad" href="/bad">
                    <IonIcon icon={sadSharp}/>
                    <IonLabel>Bad Memories</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </MemoriesContextProvider> */}
        </IonReactRouter>
      </IonApp>
  );
};
export default App;

import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react"
import { happySharp, sadSharp } from "ionicons/icons";
import { Redirect, Route } from "react-router"

import Good from '../pages/GoodMemories';
import Bad from '../pages/BadMemories';
import New from '../pages/NewMemory';

const Tabs: React.FC = () => {
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Redirect exact path="/tabs" to="/tabs/good"/>
                <Route exact path="/tabs/good" component={Good}/>
                <Route exact path="/tabs/bad" component={Bad}/>
                <Route exact path="/tabs/new" component={New}/>
            </IonRouterOutlet>
            <IonTabBar slot="bottom" color="secondary">
                <IonTabButton tab="good" href="/tabs/good">
                    <IonIcon icon={happySharp}/>
                    <IonLabel>Good Memories</IonLabel>
                </IonTabButton>
                <IonTabButton tab="bad" href="/tabs/bad">
                    <IonIcon icon={sadSharp}/>
                    <IonLabel>Bad Memories</IonLabel>
                </IonTabButton>
              </IonTabBar>
        </IonTabs>
    );
};

export default Tabs;
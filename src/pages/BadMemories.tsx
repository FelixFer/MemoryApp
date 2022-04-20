import { IonButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar, isPlatform } from "@ionic/react";
// import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { addOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
// import MemoriesContext from "../data/memories-context";
// import { Base } from "../data/UrlDatabase";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore"
import { getFirestore } from "firebase/firestore";
import "../firebaseConfig";

// interface Memory {
//     id: string;
//     title: string;
//     type: string;
//     photo: string;
// }

const BadMemories: React.FC = () => {
    // const memoriesCtx = useContext(MemoriesContext);
    // const BadMemories = memoriesCtx.memories.filter(memory => memory.type === "bad");
    // const foto = Base;
    // const urlSelect = Base + "select_all_bad_memory.php";
    // const [memories, setMemories] = useState<Memory[]>([]);
    const [memories, setMemories] = useState<Array<any>>([]);
    const db = getFirestore();
    // useEffect(() => {
    //     setInterval(() => {
    //       fetch(urlSelect)
    //         .then((response) => response.json())
    //         .then((data) => {
    //           data.memories === undefined
    //             ? setMemories([])
    //             : setMemories(data.memories);
    //         });
    //     }, 1000);
    // }, []);
    // const containerStyle = {
    //     width: "100%",
    //     height: "250px",
    // };

    const q = query(collection(db, "memory"), where("type", "==", "bad"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
    });
    useEffect(() => {
        async function getData() {
            const querySnapshot = await getDocs(q);
            console.log('querySnapshot', querySnapshot);
            setMemories(querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id})));
      
            querySnapshot.forEach((doc) => {
              console.log(`${doc.id} => ${doc.data()}`);
              console.log('doc:', doc);
            });
          }
          getData();
    }, [unsubscribe]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="secondary">
                    <IonButtons slot="start">
                        <IonMenuButton/>
                    </IonButtons>
                    {!isPlatform('android') && (
                        <IonButtons slot="end">
                            <IonButton routerLink="/tabs/new">
                                <IonIcon icon={addOutline}/>
                            </IonButton>
                        </IonButtons>
                    )}
                    <IonTitle>Bad Memories</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    {memories.length === 0 && (
                        <IonRow>
                            <IonCol className="ion-text-center">
                                <h2>No bad memories found.</h2>
                            </IonCol>
                        </IonRow>
                    )}
                    {memories.map(memory => (
                        <IonRow key={memory.id}>
                            <IonCol>
                                <IonCard>
                                    <img src={memory.fotoUrl ? memory.fotoUrl : "https://firebasestorage.googleapis.com/v0/b/memory-451a4.appspot.com/o/transparent-picture.png?alt=media&token=db01f9b7-dfc7-46d0-be53-92ae8e71a9cf"}/>
                                    {/* <img src={foto + (memory.photo ? memory.photo : "uploads/n.jpg")}/> */}
                                    {/* <LoadScript googleMapsApiKey="AIzaSyA-vwf4eSemxNQeo0iCWiMYHuQSr2dhVWI">
                                        <GoogleMap
                                        mapContainerStyle={containerStyle}
                                        center={{ lat: memory.lat, lng: memory.lng }}
                                        zoom={18}
                                        >
                                        <></>
                                        <Marker position={{ lat: memory.lat, lng: memory.lng }} />
                                        </GoogleMap>
                                    </LoadScript> */}
                                    <IonCardHeader>
                                        <IonCardTitle>{memory.titleRef}</IonCardTitle>
                                    </IonCardHeader>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    ))}
                </IonGrid>
                {isPlatform('android') && (
                    <IonFab horizontal="end" vertical="bottom" slot="fixed">
                        <IonFabButton color="secondary" routerLink="/tabs/new">
                            <IonIcon icon={addOutline}/>
                        </IonFabButton>
                    </IonFab>
                )}
            </IonContent>
        </IonPage>
    );
};

export default BadMemories;
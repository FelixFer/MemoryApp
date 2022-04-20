import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonLabel, IonPage, IonRow, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar, useIonAlert } from "@ionic/react";
import { arrowBackOutline, camera } from "ionicons/icons";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { useRef, useState } from "react";
// import { Directory, Filesystem } from "@capacitor/filesystem";
// import { base64FromPath } from "@capacitor-community/filesystem-react";
import './NewMemory.css';
import { useHistory } from "react-router";
// import MemoriesContext from "../data/memories-context";
// import { Geolocation } from "@capacitor/geolocation";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
// import { Base } from "../data/UrlDatabase";

import { collection, addDoc } from "firebase/firestore"
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "../firebaseConfig";

const NewMemory: React.FC = () => {
    // const urlInsert = Base + "insert_new_memory.php";
    // const memoriesCtx = useContext(MemoriesContext);
    // const [lat, setLat] = useState<number>(-6.257386862450975);
    // const [lng, setLng] = useState<number>(106.61825929826999);
    const history = useHistory();
    const [chosenMemoryType, setChosenMemoryType] = useState<'good' | 'bad'>('good');
    const [present] = useIonAlert();
    const titleRef = useRef<HTMLIonInputElement>(null);

    const [selectedFile, setSelectedFile] = useState<File>();
    const [fileName, setFileName] = useState('');
    const storage = getStorage();
    const db = getFirestore();


    const [takenPhoto, setTakenPhoto] = useState<{
        path: string | undefined; // will store original URL
        preview: string // will store preview URL for web
    }>();

    const selectMemoryTypeHandler = (event: CustomEvent) => {
        const selectedMemoryType = event.detail.value;
        setChosenMemoryType(selectedMemoryType);
    };

    const addData = async (url: string, title: string) => {
        try {
            const docRef = await addDoc(collection(db, "memory"), {
                titleRef: title,
                type: chosenMemoryType,
                foto: fileName,
                fotoUrl: url
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const addMemoryHandler = async () => {
        const enteredTitle = titleRef.current?.value;
        if (enteredTitle?.toString().length === 0 || !enteredTitle || !takenPhoto) {
            present({
                message: "Memory Title still empty <br> OR <br> Photo not loaded",
                header: "Warning",
                buttons: [{ text: "OK" }],
            });
            return;
        }

        // const formData = new FormData();

        // const title = titleRef?.current.value as string;
        // const type = chosenMemoryType as string;
        // const photoName = (new Date().getTime() + ".jpeg") as string;
        // formData.append("title", title);
        // formData.append("type", type);
        // formData.append("photo", selectedFile as File);
        // formData.append("photoName", photoName);
        
        // fetch(urlInsert, {
            //     method: "post",
            //     body: formData,
            // })
            // .then((response) => response.text())
            // .then((data) => {
                //     const dataObj = JSON.parse(data);
                //     present({
                    //     message: dataObj["message"],
                    //     header: dataObj["success"] === 1 ? "Success" : "Failed",
                    //     buttons: ["Ok"],
                    //     });
                    // });
        const title = titleRef.current!.value as string;

        const storageRef = ref(storage, fileName);
        uploadBytes(storageRef, selectedFile as Blob).then(() => {
            console.log('upload file success');
            getDownloadURL(ref(storage, fileName)).then((url) => {
                addData(url, title);
            })
        })
        history.length > 0 ? history.goBack() : history.replace('good-memories');
    };

    const takePhotoHandler = async () => {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 80,
            width: 500
        });
        // console.log(photo);
        // getCurrentPosition();
        const response = await fetch(photo.webPath!);
        const blob = await response.blob();
        setSelectedFile(blob as File);
        const photoName = (new Date().getTime() + ".jpeg") as string;
        setFileName(photoName);
        
        if(!photo || /*!photo.path ||*/ !photo.webPath) {
            return;
        }

        setTakenPhoto({
            path: photo.path ? photo.path : "",
            preview: photo.webPath
        });
    };

    // const getCurrentPosition = async () => {
    //     const coordinates = await Geolocation.getCurrentPosition({enableHighAccuracy:true});

    //     console.log('Current position: ', coordinates);
    //     console.log('Lat:', coordinates.coords.latitude);
    //     console.log('Lng:', coordinates.coords.longitude);
    //     setLat(coordinates.coords.latitude);
    //     setLng(coordinates.coords.longitude);
    // };

    // const containerStyle = {
    //     width: '100%',
    //     height: '100%'
    // };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="secondary">
                    <IonButtons slot="start">
                        <IonButton routerLink="/tabs/good">
                            <IonIcon slot="start" icon={arrowBackOutline}/>
                        </IonButton>
                        {/* <IonBackButton /> */}
                    </IonButtons>
                    <IonTitle>Add New Memories</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonRow class="ion-margin">
                        <IonText>Memory Title</IonText>
                    </IonRow>
                    <IonRow class="ion-margin">
                        <IonInput type="text" ref={titleRef}></IonInput>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonSelect onIonChange={selectMemoryTypeHandler} value={chosenMemoryType}>
                                <IonSelectOption value="good">Good Memory</IonSelectOption>
                                <IonSelectOption value="bad">Bad Memory</IonSelectOption>
                            </IonSelect>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className="content">
                            <div className="image-preview">
                                {!takenPhoto && <h3>No photo chosen.</h3>}
                                {takenPhoto && <img src={takenPhoto.preview} alt="Preview" />}
                            </div>
                            <IonButton fill="clear" onClick={takePhotoHandler}>
                                <IonIcon color="secondary" slot="start" icon={camera}/>
                                <IonLabel color="secondary">Take Photo</IonLabel>
                            </IonButton>
                        </IonCol>
                    </IonRow>

                    {/* <LoadScript googleMapsApiKey="AIzaSyBke9MqzcZa0IjuTERqxqWWN007lI9DIbs">
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={{lat:-6.13431511616, lng:106.24645743743}}
                            zoom={18}>
                            <></>
                            <Marker position={{ lat: lat, lng: lng}}/>
                        </GoogleMap>
                    </LoadScript> */}

                    <IonRow className="ion-margin-top">
                        <IonCol className="ion-text-center">
                            <IonButton onClick={addMemoryHandler} color="secondary">Add Memory</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default NewMemory;
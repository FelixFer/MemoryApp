import { IonPage, IonHeader, IonToolbar, IonButtons, IonTitle, IonContent, IonItem, IonInput, IonButton, IonLabel, IonIcon } from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import React, { ChangeEvent, useRef, useState } from "react";
// import { Redirect } from "react-router";
// import { Base } from "../data/UrlDatabase";
import { collection, addDoc } from "firebase/firestore"
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "../firebaseConfig";

const NewStudents: React.FC = () => {
    // const [data, setData] = useState('');
    // const url = Base + "insert_new_student.php";
    const nim = useRef<HTMLIonInputElement>(null);
    const nama = useRef<HTMLIonInputElement>(null);
    const prodi = useRef<HTMLIonInputElement>(null);

    const [selectedFile, setSelectedFile] = useState<File>();
    const [fileName, setFileName] = useState('');
    const storage = getStorage();
    const db = getFirestore();

    const fileChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedFile(event.target!.files![0]);
        setFileName(event.target!.files![0].name);
    };

    const addData = async (url: string) => {
        try {
            const docRef = await addDoc(collection(db, "students"), {
                nim: nim.current!.value,
                nama: nama.current!.value,
                prodi: prodi.current!.value,
                foto: fileName,
                fotoUrl: url
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const insertHandler = async() => {
        // const formData = new FormData();
        // const inNim = nim.current?.value as string;
        // const inNama = nama.current?.value as string;
        // const inProdi = prodi.current?.value as string;

        // formData.append("nim", inNim);
        // formData.append("nama", inNama);
        // formData.append("prodi", inProdi);
        // formData.append("foto", selectedFile as File);

        // fetch(url, {
        //     method: "POST",
        //     body: formData
        // }).then(response => response.text()).then((data)=>{
        //     setData(data);
        // })
        const storageRef = ref(storage, fileName);
        uploadBytes(storageRef, selectedFile as Blob).then(() => {
            console.log('upload file success');
            getDownloadURL(ref(storage, fileName)).then((url) => {
                addData(url);
            })
        })
    }
    return (
        <IonPage>
        <IonHeader>
            <IonToolbar color="secondary">
                <IonButtons slot="start">
                    <IonButton routerLink="/students">
                        <IonIcon slot="start" icon={arrowBackOutline}/>
                    </IonButton>
                    {/* <IonBackButton /> */}
                </IonButtons>
                <IonTitle>Add New Students</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonItem>
                <IonLabel position="floating">NIM</IonLabel>
                <IonInput ref={nim}></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Nama</IonLabel>
                <IonInput ref={nama}></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Prodi</IonLabel>
                <IonInput ref={prodi}></IonInput>
            </IonItem>
            <IonItem>
                <input type="file" onChange={fileChangeHandler}></input>
            </IonItem>
            <IonButton color="success" className="ion-margin" routerLink="/students" onClick={insertHandler}>Simpan</IonButton>
        </IonContent>
        </IonPage>
    );
};

export default NewStudents;

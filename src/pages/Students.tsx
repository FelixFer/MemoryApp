import { IonAvatar, IonButton, IonButtons, IonContent, IonIcon, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
// import { Base } from "../data/UrlDatabase";
import { collection, getDocs } from "firebase/firestore"
import { getFirestore } from "firebase/firestore";
import "../firebaseConfig";

const Students: React.FC = () => {
  // const [data, setData] = useState<Response>();
  // const url = Base + "select_all_students.php";
  // type Student = any;
  // const foto = Base;
  const [students, setStudents] = useState<Array<any>>([]);
  const db = getFirestore();

  useEffect(() => {
    async function getData() {
      const querySnapshot = await getDocs(collection(db, "students"));
      console.log('querySnapshot', querySnapshot);
      setStudents(querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id})));

      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        console.log('doc:', doc);
      });
    }
    getData();
  });

  // useEffect(() => {
  //   setInterval(() => {
  //     fetch(url)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data);
  //       setStudents(data.students);
  //     });
  //   },500)
  // }, []);
  return (
    <IonPage>
      <IonToolbar color="secondary">
        <IonButtons slot="primary">
          <IonButton routerLink="/newstudents" onClick={() => {}}>
            <IonIcon slot="icon-only" icon={addOutline} />
          </IonButton>
        </IonButtons>
        <IonButtons slot="start">
          <IonMenuButton/>
        </IonButtons>
        <IonTitle>Students</IonTitle>
      </IonToolbar>
      <IonContent>
        <IonList>
          {students.map((student) => (
            <IonItem key={student.id}>
              <IonAvatar slot="start">
                <img src={student.fotoUrl ? student.fotoUrl : "https://firebasestorage.googleapis.com/v0/b/memory-451a4.appspot.com/o/n.jpg?alt=media&token=85170e96-534c-4400-872e-cb80e646a4d3"}/>
              </IonAvatar>
              <IonLabel>
                {student.nim} <br />
                {student.nama} <br />
                {student.prodi}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Students;

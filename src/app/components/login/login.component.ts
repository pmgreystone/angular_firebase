import { Component, OnInit } from '@angular/core';
import { LoginService, Profile } from '../../services/login.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StringReversePipe } from '../../pipes/string-reverse.pipe';

import initializedFirebaseApp from '../../../firebaseapp';
import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { Firestore, collection, getDocs, getFirestore } from "firebase/firestore"; // firebase db


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,StringReversePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  firestoreDB: Firestore | null = null // firestore related
  email: String | null = "user" // firebase related
  // docs:
  // https://firebase.google.com/docs/auth/web/start
  // https://firebase.google.com/docs/auth/web/custom-auth
  // https://console.firebase.google.com/project/project_id_here/settings/general/web

  username: FormControl = new FormControl('')
  password: FormControl = new FormControl('')

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.loginService.loadProfiles()

    this.setupFbListeners()
    this.firestoreDB = getFirestore() // firebase db
  }

  isValid(value: String): Boolean {
    return value != null && value.length > 0
  }

  tryLogin() {
    if(this.isValid(this.username.value) && this.isValid(this.password.value)) {
      const profile: Profile | null = this.loginService.tryLogin(this.username.value, this.password.value)
      if(profile?.isAdmin) {
        this.router.navigateByUrl('/admin')
      } else {
        this.router.navigateByUrl('/home')
      }
    } else {
      alert("invalid username or password")
    }
  }

  // firebase related
  setupFbListeners() {
    const auth = getAuth(initializedFirebaseApp)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.email = user.email
        console.log(`${this.email!} is logged in`)
      } else {
        console.log(`${this.email!} is logged out`)
      }
    })
  }

  tryFbSignUp() {
    const auth = getAuth(initializedFirebaseApp)
    const email = "ian@test.com"
    const password = "password"
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user
      console.log(user)
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log("error")
      console.log(errorCode,errorMessage)
    })
  }

  tryFbLogin() {
    const auth = getAuth(initializedFirebaseApp)
    const email = "ian@test.com"
    const password = "password"
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log("error")
        console.log(errorCode,errorMessage)
      })
  }

  tryFbLogout() {
    const auth = getAuth(initializedFirebaseApp)
    signOut(auth)
      .then(() => {
        console.log("signed-out")
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log("error")
        console.log(errorCode,errorMessage)
      })
  }

  // firestore related
  // https://firebase.google.com/docs/firestore/security/get-started
  // https://firebase.google.com/docs/firestore/quickstart
  // https://console.firebase.google.com/project/project_id_here/firestore/databases/-default-/rules
  // https://console.firebase.google.com/project/project_id_here/firestore/databases/-default-/data/
  async tryFbReadData() {
    const querySnapshot = await getDocs(collection(this.firestoreDB!, "/rentals"))
    querySnapshot.forEach((doc) => {
      // access the data as a map
      const rental = doc.data()
      console.log(`${doc.id} ${rental['city']}`)
    })
  }
}

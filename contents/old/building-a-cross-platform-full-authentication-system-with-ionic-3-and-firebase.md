---
author: Razvan Tomegea
description: Guide to Hybrid apps
imageAuthor: Farzad Nazifi
imageCredit: https://unsplash.com/collections/765594/technology?photo=p-xSl33Wxyc
imageDescription: Office, desk, workspace, business, and computer
imageUrl: "/images/Office, desk, workspace, business, and computer.jpg"
title: Building a cross-platform full authentication system with Ionic 3 and Firebase
date: 2017-10-14 13:09:36
categories: Web development
tags:
- Angular
---

Many developers run away from ECMAScript - a.k.a. JavaScript - but I have been loving it from the first sight. As I have been studying it I discovered more and more features and API's which give me full potential of building any kind of software application. I really don't see the need of knowing other languages. I believe the major reasons for why I enjoy coding in ECMAScript are:

- Simplicity;
- Freedom.

All I need is a file, a text editor, and a browser, and BOOM! It's alive! I don't need all the clutter Java and C++ need. I also believe that nowadays you can't learn something - especially code - only if you don't want to with all the resources online.

Nevertheless, this post will give you a little taste of the power of ECMAScript 2017, Ionic Framework, and Firebase framework.
<!-- more -->

# Prerequisites
Before we begin, though, it would be easier for you to grasp if you have a little knowledge of [ECMAScript](https://github.com/getify/You-Dont-Know-JS/blob/master/README.md#you-dont-know-js-book-series), [Angular](https://angular.io/), [Ionic](http://ionicframework.com/docs/), and [Firebase](http://firebase.google.com/).

Ionic is an open source mobile SDK for building web, mobile, and progressive apps. It's super easy (if you understand and get used to it), super fun, and super fast.

The biggest advantage is **reusability**. In other words, code once, compile anywhere.

Do I need a web app? Sure, why not? One terminal command and voila! Running web app!
Do I need a mobile app? Sure, why not? One terminal command and voila! Running mobile app!
Do I need a desktop app? Sure, why not? One additional library, one terminal command, and voila! Running desktop app!

# Getting started
First things first, we need to install the core of not just an Ionic app, but any current day web app. I am talking about [Node.js](https://nodejs.org/). Node.js is the kernel of any modern web app. It also makes ECMAScript possible without a browser. You may think of Node.js as the heart of Chrome browser.

So, download the latest version of Node.js and install it. To test if the installation has completed successfully, open a terminal and type:

```
$ node -v
```

You should immediately see the version number of Node.js.
Now, we need to install Ionic and Cordova. Cordova is what makes mobile apps possible. Cordova lets us access the device features, such as network, camera, file system, geolocation, accelerometer, better, and so on. For more details on Cordova, you can check [their website](https://cordova.apache.org/).

Now, we will continue with the Ionic installation, as presented in the [Ionic Docs](http://ionicframework.com/docs/intro/installation/).

```
$ npm install -g ionic cordova
```

NPM stands for Node Package Manager. It helps us organize all the libraries we need in a hierarchical fashion so that all dependencies are respected. Ionic, Cordova, Angular, Firebase, and so on are all packages that require further packages on their own to properly work, hence, dependencies. NPM ensures all dependencies with the precise versions are respected. You can read more about NPM [here](https://www.npmjs.com/).

To test that the installation is completed successfully, type in the terminal:

```
$ ionic -v
$ cordova -v
```

You should see the current versions of Ionic and Cordova.

# Project setup
Now that we installed our tools, we are ready to create our project. Just type in the terminal

```
$ ionic start PROJECT_NAME
```

Ionic will offer you a list of templates to choose from, For our project, we will choose blank. You will then see how the template is downloaded and npm installing all dependencies.

Before we begin, you will need a good text editor. I suggest using Visual Studio Code. I use and the majority of web developers, because it's lightweight, easy to use, and has a log of plugins. C++ developers also find it better than Visual Studio Community or older versions. You can download it and read more about it [here](https://code.visualstudio.com/)

# Building the app

Let's start coding. Right-click on the project created by ionic and click on *Open with Code*. You will see the project available in the Project Explorer (left side). The structure of an Ionic project is presented better in the [ionic framework v1 docs](http://ionicframework.com/docs/v1/concepts/structure.html). We will focus our time most in the *src* directory because that is where all our sources stand.

For our authentication system, we will first need a registration page. Thus, open the VSCode terminal by clicking `View > Integrated terminal` and type:

```
$ ionic g page Registration
```

If you expand the pages directory, you will see a new directory named *registration* containing 4 files. The special file here is, the *registration.module.ts*. Ionic has a big performance boost by lazy loading modules on demand. Hence, each page, provider, pipe, and component has its own module file so that it is loaded only if it's required.

Now, that we have our page is time to get coding. In my opinion, the philosophy of Angular is very familiar with Java and ASP.
- each component has a template and stylesheet;
- each component has lifecycles;
- each component has imports and dependency injections;
- each component has annotations.

It's very familiar with the standard Android development, in my opinion. At the beginning, it's a little bit confusing and it takes a while to get used to the flow, the language, the best practices, but, after you get the feeling, it will be very fun and easy. It took me 1-2 months to get into it, but it was worth it. Again, there are many useful resources on the Ionic and Angular website, on Github, on Youtube, and hundreds of tutorials on Egghead, Udemy, Scotch, and Ionic apps made by [Josh Morony](https://www.joshmorony.com/). You can't learn Software development only if you don't want to.

In our registration app, we need a way to validate the user inputs on the client side. That is where [Angular Reactive Forms](https://angular.io/guide/reactive-forms) come into place. In order to use any module/feature, we need to import it. Becuase we will be using Reactive forms throughout our app, we will be importing ReactiveFormsModule in our root module. We will also import all CommonModule, which offers the Angular common directives and remove the *Home* import because we will lazy load it after authentication success.

`src/app/app.modules.ts`
```
// Angular
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorHandler, NgModule } from '@angular/core';

// Ionic
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

// Ionic Native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// App
import { MyApp } from './app.component';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule,
    CommonModule,
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

```

We also need to install an additional validation library for password confirmation field, and we need to setup Firebase. Thus, we will use [ng2-validation](https://github.com/yuyang041060120/ng2-validation) and [angularfire2](https://github.com/angular/angularfire2), an angular wrapper for Firebase API, that lets us work easier.
Just type

```
$ npm install firebase angularfire2 ng2-validation --save
```

The `--save` argument tells npm to save the libraries as dependencies in our *packages.json* file from our root directory.

Now, we need to create a firebase project, so we will navigate to [Google Firebase Console](https://console.firebase.google.com/) and create a new project.

<amp-img src="/images/firebase-create.jpg" layout="responsive" height="100" width="100" alt="Firebase project creation"></amp-img>

After creation, click on the *Add Firebase to your Web app* button to see your project credentials. We will need them when we import angularfire in our app.

`src/app/app.modules.ts`
```
...
// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import 'firebase/storage';

const FIREBASE_CONFIG = {
  apiKey: 'API_KEY',
  authDomain: 'AUTH_DOMAIN',
  databaseURL: 'DATABASE_URL',
  projectId: 'PROJECT_ID',
  storageBucket: 'STORAGE_BUCKET',
  messagingSenderId: 'MESSAGING_SENDER_ID'
};
...

...
imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG, 'APP_NAME'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserModule,
    CommonModule,
    ReactiveFormsModule
  ],
...
```

And now, we are completely ready with our API setup. All that's left is our own implementations. Su, let's go back to our registration page. And create our forms.

`src/pages/registration/registration.ts`
```
// Angular
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

// Ionic
import {
  AlertController,
  IonicPage,
  Loading,
  LoadingController,
  NavController,
  NavParams
} from 'ionic-angular';

// Firebase
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@IonicPage({
  name: 'registration'
})
@Component({
  templateUrl: 'registration.html'
})
export class RegistrationPage {
  public email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  public name: FormControl = new FormControl('', [Validators.required, Validators.pattern(/[A-Za-z]+(\s[A-Za-z]+)?$/)]);
  public password: FormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  public passwordConfirm: FormControl = new FormControl('', [Validators.required, CustomValidators.equalTo(this.password)]);
  public registrationForm: FormGroup;
  constructor(
    private _afAuth: AngularFireAuth,
    private _alertCtrl: AlertController,
    private _loadCtrl: LoadingController,
    private _navCtrl: NavController,
    private _params: NavParams
  ) {
    this.registrationForm = new FormGroup({
      email: this.email,
      name: this.name,
      password: this.password,
      passwordConfirm: this.passwordConfirm
    });
  }
}

```

So what we are doing here? First, we are making all required our Angular, Ionic, and Firebase imports. Second, we are making the dependency injections in our constructor and creating our form. Our registration form contains the user's name, email, and confirmation password. The reason why declare these fields as public members inside our component is we will access them from out HTML template to inform the user if there are any errors. For instance, if the entered email is not valid, the user will know. You can also observe that we used Angular's validators in our email, name, and password.

Again, you will better understand if you read more about Angular concepts.

Now, we will set up our template.

`src/pages/registration/registration.html`
```
<ion-content>
  <div class="auth-page">
      <form class="auth-form" [formGroup]="registrationForm" (ngSubmit)="register()" novalidate role="form">
          <img class="auth-form__image" src="assets/icon/favicon.ico" role="img" />
          <h1 class="auth-form__title">Create account</h1>
          <ion-list no-lines>
            <ion-item class="auth-form__group">
              <ion-label floating for="name" id="nameLabel">Name *</ion-label>
              <ion-input aria-live="assertive" aria-autocomplete="false" aria-labelledby="nameLabel" aria-required="true" formControlName="name"
                id="name" required type="text"></ion-input>
            </ion-item>
            <div class="form__message" *ngIf="registrationForm.invalid && name.touched && name.errors?.required">Please enter your name.</div>
            <div class="form__message" *ngIf="name.dirty && name.errors?.pattern">Please enter a valid name.</div>
            <ion-item class="auth-form__group">
              <ion-label floating for="email" id="emailLabel">Email *</ion-label>
              <ion-input aria-live="assertive" aria-autocomplete="false" aria-labelledby="emailLabel" aria-required="true" formControlName="email"
                id="email" required type="email"></ion-input>
            </ion-item>
            <div class="form__message" *ngIf="registrationForm.invalid && email.touched && email.errors?.required">Please enter your email.</div>
            <div class="form__message" *ngIf="email.dirty && email.errors?.email">Please enter a valid email address.</div>
            <ion-item class="auth-form__group">
              <ion-label floating for="password" id="passwordLabel">Password *</ion-label>
              <ion-input aria-live="assertive" aria-autocomplete="false" aria-labelledby="passwordLabel" aria-required="true" formControlName="password"
                id="password" required type="password"></ion-input>
            </ion-item>
            <div class="form__message" *ngIf="registrationForm.invalid && password.touched && password.errors?.required">Please enter your password.</div>
            <div class="form__message" *ngIf="password.dirty && password.errors?.minlength">Password must be at least 8 characters long.</div>
            <ion-item class="auth-form__group">
              <ion-label floating for="password" id="passwordConfirmLabel">Confirm password *</ion-label>
              <ion-input aria-live="assertive" aria-autocomplete="false" aria-labelledby="passwordConfirmLabel" aria-required="true" formControlName="passwordConfirm"
                id="passwordConfirm" required type="password"></ion-input>
            </ion-item>
            <div class="form__message" *ngIf="registrationForm.invalid && passwordConfirm.touched && passwordConfirm.errors?.required">Please confirm your password.</div>
            <div class="form__message" *ngIf="passwordConfirm.dirty && passwordConfirm.errors?.equalTo">Passwords don't match.</div>
            <br>
            <button block [disabled]="registrationForm.invalid" ion-button role="button" type="submit">Sign Up</button>
            <div class="auth-form__links">
              Already have an account? <a (click)="login()">Log in</a>
            </div>
          </ion-list>
        </form>
  </div>
</ion-content>
```

what we have here is a form with input fields. Each input field is an Ionic ion-item component. First, we added the ionic logo, then a title, and then the four form fields, each followed by a warning message, shown only if the corresponding form control has a validation error specified previously. For instance, the username is required and must contain only letters, hence, we have two possible warnings.

I am using the *BEM (Block Element Modifier)* methodology for my CSS classes. You can read about it [here](http://getbem.com/). It's very useful for keeping your stylesheets clean and organized.

I put the CSS in the main stylesheet file, because we will use it in our login page, and password reset page.

`src/app/app.scss`
```
.auth-page {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    width: 100%;
}

.auth-form {
    max-width: 50rem;
}

.auth-form__group {
    padding: 0;
    width: 100%;
}

.auth-form__image {
    display: block;
    margin: auto;
}

.auth-form__links {
    margin-top: 3rem;
    text-align: center;
    a {
        cursor: pointer;
        outline: none;
        text-decoration: none;
    }
}

.auth-form__title {
    text-align: center;
}

.form__message {
    color: color($colors, danger);
    padding: 1rem 0 0 1rem;
}
```

Now, all that is left are our methods for registration and navigation to a login page if the user already has an account. We will also need the login page, of course.

`src/pages/registration/registration.ts`
```
...
  public login(): void {
    this._navCtrl.setRoot('login');
  }

  public register(): void {
    const loader: Loading = this._loadCtrl.create({
      content: 'Please wait...',
      duration: 30000,
      spinner: 'crescent'
    });
    loader.present();
    this._afAuth.auth.createUserWithEmailAndPassword(this.registrationForm.get('email').value.trim(), this.registrationForm.get('password').value.trim())
      .then((user: firebase.User) => {
        user.updateProfile({
          displayName: this.registrationForm.get('name').value.trim(),
          photoURL: ''
        }).then(() => {
          loader.dismiss();
          this._navCtrl.setRoot('home');
        }).catch((err: firebase.FirebaseError) => {
          loader.dismiss();
          this._alertCtrl.create({
            title: 'Uhh ohh...',
            subTitle: 'Something went wrong',
            message: err.message,
            buttons: ['OK']
          }).present();
        });
      }).catch((err: firebase.FirebaseError) => {
        loader.dismiss();
        this._alertCtrl.create({
          title: 'Uhh ohh...',
          subTitle: 'Something went wrong',
          message: err.message,
          buttons: ['OK']
        }).present();
      });
  }
}
```

In our registration, we first create a loading dialog, then call the firebase *createUserWithEmailAndPassword* method. By the way, make sure to activate this authentication method by going back to your firebase console, click Authentication, select the Sign-in method tab, and enable Email/Password provider.

And this is it! The login and forgot password is analogous to this one.

Step one

```
$ ionic g page Login
$ ionic g page ForgotPassword
```

Step two
`src/pages/login/login.ts`
```
// Angular
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Ionic
import {
  AlertController,
  IonicPage,
  Loading,
  LoadingController,
  NavController,
  NavParams
} from 'ionic-angular';

// Firebase
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@IonicPage({
  name: 'login'
})
@Component({
  templateUrl: 'login.html'
})
export class LoginPage {
  public email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  public loginForm: FormGroup;
  public password: FormControl = new FormControl('', Validators.required);
  constructor(
    private _afAuth: AngularFireAuth,
    private _alertCtrl: AlertController,
    private _loadCtrl: LoadingController,
    private _navCtrl: NavController,
    private _params: NavParams
  ) {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  public forgotPassword(): void {
    this._navCtrl.setRoot('forgot-password');
  }

  public login(): void {
    const loader: Loading = this._loadCtrl.create({
      content: 'Please wait...',
      duration: 30000,
      spinner: 'crescent'
    });
    loader.present();
    this._afAuth.auth.signInWithEmailAndPassword(this.loginForm.get('email').value.trim(), this.loginForm.get('password').value.trim())
      .then((user: firebase.User) => {
        loader.dismiss();
        this._navCtrl.setRoot('home');
      }).catch((err: firebase.FirebaseError) => {
        loader.dismiss();
        this._alertCtrl.create({
          title: 'Uhh ohh...',
          subTitle: 'Something went wrong',
          message: err.message,
          buttons: ['OK']
        }).present();
      });
  }

  public register(): void {
    this._navCtrl.setRoot('registration');
  }
}
```

`src/pages/login/login.html`
```
<ion-content>
    <div class="auth-page">
        <form class="auth-form" [formGroup]="loginForm" (ngSubmit)="login()" novalidate role="form">
            <img class="auth-form__image" src="assets/icon/favicon.ico" role="img" />
            <h1 class="auth-form__title">Log in</h1>
            <ion-list no-lines>
              <ion-item class="auth-form__group">
                <ion-label floating for="email" id="emailLabel">Email *</ion-label>
                <ion-input aria-live="assertive" aria-autocomplete="false" aria-labelledby="emailLabel" aria-required="true" formControlName="email"
                  id="email" required type="email"></ion-input>
              </ion-item>
              <div class="form__message" *ngIf="loginForm.invalid && email.touched && email.errors?.required">Please enter your email.</div>
              <div class="form__message" *ngIf="email.dirty && email.errors?.email">Please enter a valid email address.</div>
              <ion-item class="auth-form__group">
                <ion-label floating for="password" id="passwordLabel">Password *</ion-label>
                <ion-input aria-live="assertive" aria-autocomplete="false" aria-labelledby="passwordLabel" aria-required="true" formControlName="password"
                  id="password" required type="password"></ion-input>
              </ion-item>
              <div class="form__message" *ngIf="loginForm.invalid && password.touched && password.errors?.required">Please enter your password.</div>
              <br>
              <button block [disabled]="loginForm.invalid" ion-button role="button" type="submit">Login</button>
              <div class="auth-form__links">
                <button clear (click)="register()" ion-button role="button" type="button">Sign Up</button>
                <button clear (click)="forgotPassword()" ion-button role="button" type="button">Forgot Password?</button>
              </div>
            </ion-list>
          </form>
    </div>
  </ion-content>
```

`src/pages/forgot-password/forgot-password.ts`
```
// Angular
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Ionic
import {
  AlertController,
  IonicPage,
  Loading,
  LoadingController,
  NavController,
  NavParams
} from 'ionic-angular';

// Firebase
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@IonicPage({
  name: 'forgot-password'
})
@Component({
  templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage {
  public forgotPasswordForm: FormGroup;
  public email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  constructor(
    private _afAuth: AngularFireAuth,
    private _alertCtrl: AlertController,
    private _loadCtrl: LoadingController,
    private _navCtrl: NavController,
    private _params: NavParams
  ) {
    this.forgotPasswordForm = new FormGroup({
      email: this.email
    });
  }

  public login(): void {
    this._navCtrl.setRoot('login');
  }

  public reqestReset(): void {
    const loader: Loading = this._loadCtrl.create({
      content: 'Please wait...',
      duration: 30000,
      spinner: 'crescent'
    });
    loader.present();
    this._afAuth.auth.sendPasswordResetEmail(this.forgotPasswordForm.get('email').value.trim())
      .then(() => {
        loader.dismiss();
        this._alertCtrl.create({
          title: 'Request sent',
          subTitle: 'An email with a password reset link has been sent',
          message: 'Go to your email inbox, follow the instructions, and change the password of your account.',
          buttons: [{
            text: 'OK',
            handler: () => {
              this._navCtrl.push('login');
            }
          }]
        }).present();
      })
      .catch((err: firebase.FirebaseError) => {
        loader.dismiss();
        this._alertCtrl.create({
          title: 'Uhh ohh...',
          subTitle: 'Something went wrong',
          message: err.message,
          buttons: ['OK']
        }).present();
      });
  }
}
```

`src/pages/forgot-password/forgot-password.html`
```
<ion-content>
  <div class="auth-page">
    <form class="auth-form" [formGroup]="forgotPasswordForm" (ngSubmit)="reqestReset()" novalidate role="form">
      <img class="auth-form__image" src="assets/icon/favicon.ico" role="img" />
      <h1 class="auth-form__title">Request password reset</h1>
      <ion-list no-lines>
        <ion-item class="auth-form__group">
          <ion-label floating for="email" id="emailLabel">Email *</ion-label>
          <ion-input aria-live="assertive" aria-autocomplete="false" aria-labelledby="emailLabel" aria-required="true" formControlName="email"
            id="email" required type="email"></ion-input>
        </ion-item>
        <div class="form__message" *ngIf="forgotPasswordForm.invalid && email.touched && email.errors?.required">Please enter your email.</div>
        <div class="form__message" *ngIf="email.dirty && email.errors?.email">Please enter a valid email address.</div>
        <br>
        <button block [disabled]="forgotPasswordForm.invalid" ion-button role="button" type="submit">Send request</button>
        <div class="auth-form__links">
          <button clear (click)="login()" ion-button role="button" type="button">Cancel</button>
        </div>
      </ion-list>
    </form>
  </div>
</ion-content>
```

One last thing, we need to add a *home.module.ts* file for lazy loading, and name our page *home* so that the Navcontroller would find it.

`src/pages/home/home.module.ts`
```
import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';

import { HomePage } from './home';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
  ],
})
export class HomePageModule {}
```

`src/pages/home/home.ts`
```
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage({
  name: 'home'
})
@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  constructor() {}
}
```
Now, we can remove the *HomePage* import from *app.components.ts* file and just specify the home page as *'registration'*.

`src/app/app.component.ts`
```
// Angular
import { Component } from '@angular/core';

// Ionic
import { Platform } from 'ionic-angular';

// Ionic-Native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public rootPage: string = 'registration';
  constructor(
    private _platform: Platform,
    private _splashScreen: SplashScreen,
    private _statusBar: StatusBar
  ) {
    this._initializeApp();
  }

  private _initializeApp(): void {
    this._platform.ready().then(() => {
      this._statusBar.styleDefault();
      this._splashScreen.hide();
    });
  }
}
```

And that's all folks! We are now ready to launch! Type in the terminal
```
$ ionic serve
```

Evrika! It's alive!

<amp-img src="/images/registration.jpg" layout="responsive" height="100" width="100" alt="Firebase project creation"></amp-img>

What it's left, is a navigation guard for our home page. We don't want anyone who is no logged in to access our home now, do we? We also need our login, registration, and forgot-password pages to now the history, a.k.a. the page we are coming from. Thus, we will use the ionic navigation parameters

`src/pages/home/home.ts`
```
// Angular
import { Component } from '@angular/core';

// Rxjs
import { Subscription } from 'rxjs/Subscription';

// Ionic
import {
  AlertController,
  IonicPage,
  Loading,
  LoadingController,
  NavController,
} from 'ionic-angular';

// Firebase
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@IonicPage({
  name: 'home'
})
@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  private _authSubscription: Subscription;
  private _loader: Loading;
  public authName: string = '';
  constructor(
    private _afAuth: AngularFireAuth,
    private _alertCtrl: AlertController,
    private _loadCtrl: LoadingController,
    private _navCtrl: NavController
  ) { }

  ionViewCanEnter(): void {
    this._authSubscription = this._afAuth.authState.subscribe((auth: firebase.User) => {
      if (!auth) {
        if (this._loader) {
          this._loader.dismiss();
          this._loader = null;
        }
        this._navCtrl.setRoot('registration', {
          history: 'home'
        });
      };
    }, (err: firebase.FirebaseError) => {
      if (this._loader) {
        this._loader.dismiss();
        this._loader = null;
      }
      this._alertCtrl.create({
        title: 'Uhh ohh...',
        subTitle: 'Something went wrong',
        message: err.message,
        buttons: ['OK']
      }).present();
    });
  }

  ionViewWillEnter(): void {
    this._loader = this._loadCtrl.create({
      content: 'Loading...',
      duration: 30000,
      spinner: 'crescent'
    });
    this._loader.present();
    this._authSubscription = this._afAuth.authState.subscribe((auth: firebase.User) => {
      if (!!auth) {
        this.authName = auth.displayName;
        if (this._loader) {
          this._loader.dismiss();
          this._loader = null;
        }
      }
    }, (err: firebase.FirebaseError) => {
      if (this._loader) {
        this._loader.dismiss();
        this._loader = null;
      }
      this._alertCtrl.create({
        title: 'Uhh ohh...',
        subTitle: 'Something went wrong',
        message: err.message,
        buttons: ['OK']
      }).present();
    });
  }

  ionViewWillLeave(): void {
    this._authSubscription && this._authSubscription.unsubscribe();
  }
}
```

We are using the ionic page lifecycle. First, we subscribe to the firebase authentication state. If the state is null, then we are not authenticated, and navigating to the registration page with the history set. Otherwise, we are saving the authentication state username and showing it on our home page. You might also notice, we are verifying the loading is not null and saving it as a component member. This is because in case we are switching pages, we don't want anything to be hanging around. Also, we want all our subscriptions to be closed on the page left.

`src/pages/home/home.html`
```
<ion-header>
  <ion-navbar>
    <ion-title>
      Home
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding>
  Welcome, {{ authName }}
</ion-content>
```

<amp-img src="/images/auth-home.jpg" layout="responsive" height="1" width="1" alt="Firebase project creation"></amp-img>

Now, we need to add the history verification to our authentication pages. We need to get the history parameters on initialization and check on registration/login success if any history exists.

```
...

private _history: string;
...

  constructor(
    private _afAuth: AngularFireAuth,
    private _alertCtrl: AlertController,
    private _loadCtrl: LoadingController,
    private _navCtrl: NavController,
    private _params: NavParams
  ) {
    this._history = this._params.get('history');
...

```

`src/pages/registration/registration.ts`
```
...
  public login(): void {
    this._navCtrl.setRoot('login', {
      history: this._history
    })
  }

  public register(): void {
    const loader: Loading = this._loadCtrl.create({
      content: 'Please wait...',
      duration: 30000,
      spinner: 'crescent'
    });
    loader.present();
    this._afAuth.auth.createUserWithEmailAndPassword(this.registrationForm.get('email').value.trim(), this.registrationForm.get('password').value.trim())
      .then((user: firebase.User) => {
        user.updateProfile({
          displayName: this.registrationForm.get('name').value.trim(),
          photoURL: ''
        }).then(() => {
          loader.dismiss();
          if (!!this._history) {
            this._navCtrl.setRoot(this._history);
          } else {
            this._navCtrl.setRoot('home');
          }
...

```

`src/pages/login/login.ts`
```
...
  public forgotPassword(): void {
    this._navCtrl.setRoot('forgot-password', {
      history: this._history
    });
  }

  public login(): void {
    const loader: Loading = this._loadCtrl.create({
      content: 'Please wait...',
      duration: 30000,
      spinner: 'crescent'
    });
    loader.present();
    this._afAuth.auth.signInWithEmailAndPassword(this.loginForm.get('email').value.trim(), this.loginForm.get('password').value.trim())
      .then((user: firebase.User) => {
        loader.dismiss();
        if (!!this._history) {
          this._navCtrl.setRoot(this._history);
        } else {
          this._navCtrl.setRoot('home');
        }
...
```

`src/pages/forgot-password/forgot-password.ts`
```
...
  public login(): void {
    this._navCtrl.setRoot('login', {
      history: this._history
    })
  }
...
```

And we're done! Our authentication system is ready... for the web at least! But didn't I say cross-platform app? Yes, I did! Thus, it's time to run our app on mobile as well. For that, we need a mobile device or emulator. If you don't have a smartphone or tablet - I doubt it - you may use an emulator, like [Genymotion](https://www.genymotion.com/). It's faster than the default Android emulator (I am an Android user and have Windows OS, so I apologize Mac users). You need to install [Android Studio](https://developer.android.com/studio/index.html) anyway because we need Android SDK to build the app on Android OS.

Thus, download and install Android Studio and Genymotion + VirtualBox (you may need to setup ANDROID_HOME environment variable and restart you're PC). When you finish, open the terminal and type
```
$ android
```
If the installation completed successfully, you should see Android SDK Manager running. Select and install Android SDK Build-tools, Android SDK Platforms-tools, and Android 6.0 (API 23) packages (this is going to take a while). You may also select any Android API you prefer or is compatible with your device.

When the installation completes, open Genymotion and add an android device with the corresponding API. I am using *Custom phone - 6.0.0 - API 23*. After finishing, run the device (I hope you don't encounter any problems like I did, because of VirtualBox problems).

If the device is running, open the terminal in the project directory and type
```
$ cordova platform add android
```
After the platform is added successfully, type
```
$ cordova run android --device
```
The `--device` argument tells cordova not to open the emulator.

<amp-img src="/images/auth-app-android.jpg" layout="responsive" height="100" width="100" alt="Firebase project creation"></amp-img>

Look at that! Same source code, mobile, and web! What about the desktop? Cross-platform means desktop as well, doesn't it? Yes, it does and yes, we can! [Electron.js](https://electron.atom.io/) to the rescue! Electron lets us build a native desktop app from a web app. 

```
$ npm install electron-prebuilt electron-packager cash-rm cash-cp --save-dev
```
We are also installing some libraries that wrap the Unix `rm` and `cp` commands on Windows. Electron packager creates a production build for the desktop. `--save-dev` tells npm to save these packages as devDependencies, because we are using them only during development.

Now, we need to add some jobs in or *package.json* file. The jobs are actually a sequence of node commands called from a single command. These jobs go inside the `scripts`. There are already some jobs there, as you may observe.

`package.json`
```
...
"scripts": {
    ...

    "clear:osx": "rm -r platforms/simple-auth-darwin-x64 && rm -r platforms/simple-auth-mas-x64",
    "clear:win": "rm -r platforms/simple-auth-win32-x64 && rm -r platforms/simple-auth-win32-ia32",
    "clear:nix": "rm -r platforms/simple-auth-linux-x64 && rm -r platforms/simple-auth-linux-ia32",
    "pack:osx": "npm run clear:osx && cp -r electron-main.js www && cp -r package.json www && electron-packager ./www/ --platform=darwin,mas --arch=x64 --asar --out=platforms",
    "pack:win": "npm run clear:win && cp -r electron-main.js www && cp -r package.json www && electron-packager ./www --platform=win32 --arch=ia32,x64 --asar --out=platforms",
    "pack:nix": "npm run clear:nix && cp -r electron-main.js www && cp -r package.json www && electron-packager ./www/ --platform=linux --arch=ia32,x64 --asar --out=platforms"
  },
...
```
What we are doing is a packaging and a cleaning for each platform (Windows, Linux, and Mac). You can read more about electron-packager [here](https://github.com/electron-userland/electron-packager). First, we are cleaning the current build from the platforms directory (if there is any) and then packaging a new one.

One last thing, we need to add a *main.js* file in our root directory and specify this file in the *package.json*. This file is required by Electron. It is actually a template, not something specific to our app.

`electron-main.js`
```
'use strict';
const electron = require('electron');
// Module to control application life.
const {
    app
} = electron;
// Module to create native browser window.
const {
    BrowserWindow
} = electron;

let win;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600
    });

    var url = 'file://' + __dirname + '/index.html'

    // and load the index.html of the app.
    win.loadURL(url);

    // Open the DevTools.
    //win.webContents.openDevTools();

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});
```

`package.json`
```
...
"main": "electron-main.js",
...
```

And we're done. We can now run our job (`npm run SCRIPT_NAME`). Just type
```
$ npm run pack:win
```

And you can see each job running in the terminal. In the end, if we look at our *platforms* directory, we can see our packaged app on every architecture (x86 and x64).

<amp-img src="/images/auth-app-windows.jpg" layout="responsive" height="100" width="100" alt="Firebase project creation"></amp-img>

And there you have it! Same code deployment on all platforms! I hope you enjoyed this post and I hope I triggered a curiosity within for learning and playing with ECMAScript.

You can check out the full project on [Github](https://github.com/razvantomegea/ionic-angular-firebase-authentication)

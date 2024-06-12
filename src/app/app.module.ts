import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

//Mat Modules
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

//Components
import { AppComponent } from './app.component';
import { HelloComponent, DemoBottomSheet } from './hello.component';



@NgModule({
  imports:      [ BrowserModule, FormsModule, BrowserAnimationsModule, MatButtonModule, MatBottomSheetModule ],
  declarations: [ AppComponent, HelloComponent, DemoBottomSheet ],
  entryComponents: [HelloComponent, DemoBottomSheet],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
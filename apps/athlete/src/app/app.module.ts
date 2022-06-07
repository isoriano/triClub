import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { AthleteModule } from './feature/athlete.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking'  }),
    AthleteModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ClipboardModule } from 'ngx-clipboard';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS} from '@angular/common/http'
import { AuthInterceptor } from './auth/services/auth.interceptor';
import { AppComponent } from './app.component';
import { AuthService } from './auth/services/auth.service';
import { SplashScreenModule } from './theme/partials/layout/splash-screen/splash-screen.module';
import { SharedModule } from './shared/shared.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DiagnosisContainer } from './planning-scenarios/diagnosis/containers/diagnosis-list/diagnosis.container';
import { DndDirective } from './directives/dnd.directive';

function appInitializer(authService: AuthService) {
  return () => {
    return authService.getUserByToken();
    
  };
}


@NgModule({
  declarations: [AppComponent, DndDirective],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SplashScreenModule,
    SharedModule,
    HttpClientModule,
    ClipboardModule,
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

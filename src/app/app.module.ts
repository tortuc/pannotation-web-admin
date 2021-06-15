import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ToasterModule } from 'angular2-toaster';
import { ModalModule } from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { NotificationService } from './services/notification.service';
import { ModalsModule } from './components/modals/modals.module';
import { BreadcrumbModule} from 'angular-crumbs';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ModalsModule,
        ModalModule.forRoot(),
        ToasterModule.forRoot(),
        FormlyModule.forRoot(),
        FormlyBootstrapModule,
        CoreModule,
        BreadcrumbModule
    ],
    providers: [NotificationService],
    bootstrap: [AppComponent]
})
export class AppModule { }

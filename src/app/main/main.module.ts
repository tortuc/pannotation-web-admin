import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main/main.component';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../guards/auth-guard';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';
import { ModalsModule } from '../components/modals/modals.module';

@NgModule({
    declarations: [
        MainComponent,
        SideNavigationComponent,
        TopNavigationComponent
    ],
    imports: [
        CommonModule,
        ModalsModule,
        ReactiveFormsModule,
        BsDropdownModule.forRoot(),
        MainRoutingModule
    ],
    providers: [
        AuthService,
        AuthGuard
    ]
})
export class MainModule {
}

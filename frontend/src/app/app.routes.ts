import { RouterModule, Routes } from '@angular/router'
import { MenuComponent } from './components/menu/menu.component';
import { RegistroComponent } from "./components/registro/registro.component";
import { ContactoComponent } from "./components/bodycontacto/body.component";
import { LoginComponent } from "./components/login/login.component";
import { InicioComponent } from "./components/inicio/inicio.component" ;

const APP_ROUTES: Routes =[
    { path: 'menu', component: MenuComponent},
    { path: 'registro', component: RegistroComponent },
    { path: 'contacto', component: ContactoComponent },  
    { path: 'login', component: LoginComponent },
    { path: 'inicio', component: InicioComponent},  
    { path: '**', pathMatch: 'full', redirectTo:'inicio'} 

];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
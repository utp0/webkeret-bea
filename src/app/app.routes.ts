import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ContactpageComponent } from './contactpage/contactpage.component';

export const routes: Routes = [
    { path: "", component: HomepageComponent },
    { path: "contact", component: ContactpageComponent },
];

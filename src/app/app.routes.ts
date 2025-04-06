import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ContactpageComponent } from './contactpage/contactpage.component';

export const routes: Routes = [
    {
        path: "",
        component: HomepageComponent,
        data: { niceTitle: "Kezdőlap" }
    },
    {
        path: "contact",
        component: ContactpageComponent,
        data: { niceTitle: "Kapcsolat" }
    },
];

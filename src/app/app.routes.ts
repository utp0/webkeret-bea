import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ContactpageComponent } from './contactpage/contactpage.component';
import { VideoCommentsComponent } from './video-comments/video-comments.component';
import { ViewHistoryComponent } from './view-history/view-history.component';

export const routes: Routes = [
    {
        path: "",
        component: HomepageComponent,
        data: { niceTitle: "Kezdőlap", },
    },
    {
        path: "contact",
        component: ContactpageComponent,
        data: { niceTitle: "Kapcsolat", },
    },
    {
        path: 'video-comments/:id',
        component: VideoCommentsComponent,
        data: { niceTitle: "Kommentek", hide: true, },
    },
    {
        path: "history",
        component: ViewHistoryComponent,
        data: { niceTitle: "Előzmények" },
    },
];

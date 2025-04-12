import { Comment } from "./model/Comment";
import { ViewHistory } from "./model/History";
import { User } from "./model/User";
import { Video } from "./model/Video";

export let Users: User[] = [
    {
        id: "1",
        email: "user@example.com",
        registrationDate: 1743879316000,
        username: "user",
    },
    {
        id: "2",
        email: "danika@example.com",
        registrationDate: 1743879317000,
        username: "danika09",
    },
    {
        id: "3",
        email: "throwaway@example.com",
        registrationDate: 1743879318000,
        username: "gamingtoilet007",
    },
];

export let Videos: Video[] = [
    {
        id: "1",
        length: 254,
        originalUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
        shareDate: 1743879532365,
        shareDescription: "ez egy felettéb vicces zenei videó ;DDDDDDDDDDDDD",
        sharerId: "3",
        title: "gangnam stiló",
    },
    {
        id: "2",
        length: 57,
        originalUrl: "https://youtu.be/MVyM2GO5EXE",
        shareDate: 1743879539365,
        shareDescription: "hak tua h",
        sharerId: "3",
        title: "Bolondos Galambok",
    },
    {
        id: "3",
        length: 1181,
        originalUrl: "https://www.youtube.com/watch?v=av1eTzsu0wA",
        shareDate: 1743879856681,
        shareDescription: "informatív videó a deepseek-r1 otthoni futtatásáról komoly érdeklődők számára",
        sharerId: "1",
        title: "DeepSeek-R1 otthon",
    },
];

export let Comments: Comment[] = [
    {
        id: "1",
        videoId: "3",
        userId: "1",
        content: "Nagyon jó nagyon tetszik, hatalmas!",
        timestamp: 1743880059496,
    },
    {
        id: "2",
        videoId: "3",
        userId: "3",
        content: "ez mi, kinek kell ez hiha hihi",
        timestamp: 1743880059496,
    },
    {
        id: "3",
        videoId: "2",
        userId: "2",
        content: "áh, egy klasszikus ... ;)",
        timestamp: 1743880059496,
    },
];

export let History: ViewHistory[] = [
    {
        userId: "3",
        timestamp: 1743880057496,
        videoId: "2",
    },
    {
        userId: "2",
        timestamp: 1743880055496,
        videoId: "3",
    },
    {
        userId: "1",
        timestamp: 1743880054496,
        videoId: "3",
    },
];

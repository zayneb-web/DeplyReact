import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import themeSlice from "./theme";
import postSlice from "./postSlice";
import notificationsSlice from "./notificationsSlice";

import eventSlice from "./eventSlice";

import chatSlice  from "./chatSlice";
import chapterSlice  from "./chapterSlice";
import SidebarSlice from "./SideBarSlice";
import onlineSlice from "./onlineSlice"




const rootReducer = combineReducers({
  user: userSlice,
  theme: themeSlice,
  posts: postSlice,
  chapter: chapterSlice,
  sidebar:SidebarSlice,
  online: onlineSlice,





  notifications:notificationsSlice,


  event: eventSlice,

  chat: chatSlice,

});

export { rootReducer };
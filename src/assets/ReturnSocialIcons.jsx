// import contact icons

import call from "./socialLink/phone.png";
import text from "./socialLink/text.png";
import whatsapp from "./socialLink/whatsapp.png";
import email from "./socialLink/email.png";
import telegram from "./socialLink/telegram.png";
import skype from "./socialLink/skype.png";
import gmail from "./socialLink/gmail.png";
import line from "./socialLink/line.png";
import facetime from "./socialLink/facetime.png";
import viber from "./socialLink/viber.png";
import zoom from "./socialLink/zoom.png";
import messenger from "./socialLink/messenger.png";

// import social icons

import instagram from "./socialLink/instagram.png";
import facebook from "./socialLink/facebook.png";
import tiktok from "./socialLink/tiktok.png";
import twitter from "./socialLink/x.png";
import threads from "./socialLink/threads.png";

import linkedin from "./socialLink/linkedin.png";
import twitch from "./socialLink/twitch.png";
import pinterest from "./socialLink/pinterest.png";
import youtube from "./socialLink/youtube.png";

import snapchat from "./socialLink/snapchat.png";
import reddit from "./socialLink/reddit.png";

import discord from "./socialLink/discord.png";
import tumblr from "./socialLink/tumblr.png";

// import music icons
import spotify from "./socialLink/spotify.png";

import applemusic from "./socialLink/applemusic.png";
import soundcloud from "./socialLink/soundcloud.png";
import deezer from "./socialLink/deezer.png";
import vimeo from "./socialLink/vimeo.png";
import ytmusic from "./socialLink/ytmusic.png";
import podcasts from "./socialLink/podcasts.png";

// import payment icons

import cashapp from "./socialLink/cash.svg";
import paypal from "./socialLink/paypal.png";

// import payment icons

import website from "./socialLink/website.png";
import calendly from "./socialLink/calendly.png";
import custom from "./socialLink/customlink.png";
import store from "./socialLink/store.png";
import menu from "./socialLink/menu.png";
import googlemaps from "./socialLink/googlemaps.png";
import carousell from "./socialLink/carousell.png";
import greview from "./socialLink/greview.png";
import appstore from "./socialLink/appstore.png";
import playstore from "./socialLink/playstore.png";
import amazone from "./socialLink/amazon.png";
import photo from "./socialLink/photoConnex.png";
import video from "./socialLink/videoConnex.png";

// import pinterest from './socialLink/pinterest.png'
// import youtube from './socialLink/twitter.png'

export const contactIcons = [
  {
    name: "Phone",
    title: "Phone",
    img: call,
    placeholder: "Phone Number",
    linkID: 10,
    baseUrl: "tel:",
  },

  {
    name: "Whatsapp",
    title: "Whatsapp",
    img: whatsapp,
    placeholder: "Phone Number",
    linkID: 6,
    baseUrl: "https://wa.me/",
  },
  {
    name: "Skype",
    title: "Skype",
    img: skype,
    placeholder: "Skype Url",
    linkID: 12,
    baseUrl: "",
  },

  {
    name: "Telegram",
    title: "Telegram",
    img: telegram,
    placeholder: "Telegram Number",
    linkID: 9,
    baseUrl: "https://t.me/",
  },
  {
    name: "Facetime",
    title: "Facetime",
    img: facetime,
    placeholder: "Facetime Username",
    linkID: 13,
    baseUrl: "https://www.facetime.com/",
  },
  {
    name: "Line",
    title: "Line",
    img: line,
    placeholder: "Line Username",
    linkID: 17,
    baseUrl: "https://line.me/en/",
  },
  {
    name: "Gmail",
    title: "Gmail",
    img: gmail,
    placeholder: "Gmail",
    linkID: 20,
    baseUrl: "mailto:",
  },
  {
    name: "Email",
    title: "Email",
    img: email,
    placeholder: "Email",
    linkID: 11,
    baseUrl: "mailto:",
  },
  {
    name: "Viber",
    title: "Viber",
    img: viber,
    placeholder: "Viber Username",
    linkID: 15,
    baseUrl: "https://www.viber.com/en/",
  },
  {
    name: "Zoom",
    title: "Zoom",
    img: zoom,
    placeholder: "Zoom Meeting Id",
    linkID: 19,
    baseUrl: "https://zoom.us/j/",
  },
];

export const socialIcons = [
  {
    name: "Instagram",
    title: "Instagram",
    img: instagram,
    placeholder: "Instagram Username",
    linkID: 1,
    baseUrl: "https://www.Instagram.com/",
  },
  {
    name: "Facebook",
    title: "Facebook",
    img: facebook,
    placeholder: "Facebook Profile Link",
    linkID: 8,
    baseUrl: "",
  },
  {
    name: "Tiktok",
    title: "Tiktok",
    img: tiktok,
    placeholder: "Tiktok Username",
    linkID: 3,
    baseUrl: "https://tiktok.com/@",
  },
  {
    name: "X",
    title: "X",
    img: twitter,
    placeholder: "X Username",
    linkID: 2,
    baseUrl: "https://www.Twitter.com/",
  },
  {
    name: "Linkedin",
    title: "Linkedin",
    img: linkedin,
    placeholder: "Linkedin Profile Link",
    linkID: 24,
    baseUrl: "",
  },
  {
    name: "Twitch",
    title: "Twitch",
    img: twitch,
    placeholder: "Twitch Url",
    linkID: 48,
    baseUrl: "",
  },
  {
    name: "Pinterest",
    title: "Pinterest",
    img: pinterest,
    placeholder: "Pinterest Username",
    linkID: 22,
    baseUrl: "https://pin.it/",
  },

  {
    name: "Snapchat",
    title: "Snapchat",
    img: snapchat,
    placeholder: "Snapchat Username",
    linkID: 4,
    baseUrl: "https://www.snapchat.com/add/",
  },

  {
    name: "Threads",
    title: "Threads",
    img: threads,
    placeholder: "Threads Url",
    linkID: 65,
    baseUrl: "",
  },
  {
    name: "Discord",
    title: "Discord",
    img: discord,
    placeholder: "Discord Url",
    linkID: 14,
    baseUrl: "",
  },
  {
    name: "Tumblr",
    title: "Tumblr",
    img: tumblr,
    placeholder: "Tumblr Username",
    linkID: 23,
    baseUrl: "https://www.tumblr.com/",
  },
  {
    name: "Messenger",
    title: "Messenger",
    img: messenger,
    placeholder: "Messenger Username",
    linkID: 7,
    baseUrl: "https://m.me/",
  },
];

export const media = [
  {
    name: "Spotify",
    title: "Spotify",
    img: spotify,
    placeholder: "Spotify link",
    linkID: 29,
    baseUrl: "",
  },
  {
    name: "Apple Music",
    title: "AppleMusic",
    img: applemusic,
    placeholder: "Link to Apple Music",
    linkID: 32,
    baseUrl: "",
  },
  {
    name: "Sound Cloud",
    title: "Sound Cloud",
    img: soundcloud,
    placeholder: "Link to SoundCloud",
    linkID: 28,
    baseUrl: "",
  },
  {
    name: "Youtube",
    title: "Youtube",
    img: youtube,
    placeholder: "Youtube Url",
    linkID: 27,
    baseUrl: "",
  },

  {
    name: "Y Music",
    title: "Y Music",
    img: ytmusic,
    placeholder: "Link to Youtube Music",
    linkID: 33,
    baseUrl: "",
  },
  {
    name: "Podcasts",
    title: "Podcasts",
    img: podcasts,
    placeholder: "Podcast Url",
    linkID: 34,
    baseUrl: "",
  },
  {
    name: "Deezer",
    title: "Deezer",
    img: deezer,
    placeholder: "Deezer Url",
    linkID: 31,
    baseUrl: "",
  },
  {
    name: "Vimeo",
    title: "Vimeo",
    img: vimeo,
    placeholder: "Vimeo Username",
    linkID: 30,
    baseUrl: "https://vimeo.com/",
  },
];

export const payment = [
  {
    name: "Cash App",
    title: "CashApp",
    img: cashapp,
    placeholder: "Cash App username",
    linkID: 46,
    baseUrl: "https://cash.app/",
  },
  {
    name: "PayPal",
    title: "PayPal",
    img: paypal,
    placeholder: "paypal.me link",
    linkID: 35,
    baseUrl: "",
  },
];

export const more = [
  {
    name: "Calendly",
    title: "Calendly",
    img: calendly,
    placeholder: "Calendly link",
    linkID: 38,
    baseUrl: "",
  },

  {
    name: "Store",
    title: "Store",
    img: store,
    placeholder: "Store link",
    linkID: 36,
    baseUrl: "",
  },
  {
    name: "Menu",
    title: "Menu",
    img: menu,
    placeholder: "Menu link",
    linkID: 37,
    baseUrl: "",
  },
  {
    name: "Google Maps",
    title: "Google Maps",
    img: googlemaps,
    placeholder: "Google Map link",
    linkID: 39,
    baseUrl: "",
  },
  {
    name: "G review",
    title: "G review",
    img: greview,
    placeholder: "G review link",
    linkID: 40,
    baseUrl: "",
  },
  {
    name: "Play Store",
    title: "Play Store",
    img: playstore,
    placeholder: "Play Store link",
    linkID: 42,
    baseUrl: "",
  },
  {
    name: "Appstore",
    title: "AppStore",
    img: appstore,
    placeholder: "AppStore link",
    linkID: 41,
    baseUrl: "",
  },
  {
    name: "Amazon",
    title: "Amazon",
    img: amazone,
    placeholder: "Amazon link",
    linkID: 43,
    baseUrl: "",
  },
  {
    name: "Website",
    title: "Website",
    img: website,
    placeholder: "web link",
    linkID: 49,
    baseUrl: "",
  },
  {
    name: "Website 1",
    title: "Custom",
    img: custom,
    placeholder: "Custom link",
    linkID: 50,
    baseUrl: "",
  },
  {
    name: "Website 2",
    title: "Custom",
    img: custom,
    placeholder: "Custom link",
    linkID: 51,
    baseUrl: "",
  },
  {
    name: "Website 3",
    title: "Custom",
    img: custom,
    placeholder: "Custom link",
    linkID: 52,
    baseUrl: "",
  },
  {
    name: "Website 4",
    title: "Custom",
    img: custom,
    placeholder: "Custom link",
    linkID: 53,
    baseUrl: "",
  },
  {
    name: "Website 5",
    title: "Custom",
    img: custom,
    placeholder: "Custom link",
    linkID: 54,
    baseUrl: "",
  },
  {
    name: "Website 5",
    title: "Custom",
    img: custom,
    placeholder: "Custom link",
    linkID: 54,
    baseUrl: "",
  },
  {
    name: "Website 6",
    title: "Custom",
    img: custom,
    placeholder: "Custom link",
    linkID: 55,
    baseUrl: "",
  },
  {
    name: "Website 7",
    title: "Custom",
    img: custom,
    placeholder: "Custom link",
    linkID: 56,
    baseUrl: "",
  },
  {
    name: "Website 8",
    title: "Custom",
    img: custom,
    placeholder: "Custom link",
    linkID: 57,
    baseUrl: "",
  },
  {
    name: "Website 9",
    title: "Custom",
    img: custom,
    placeholder: "Custom link",
    linkID: 58,
    baseUrl: "",
  },
  {
    name: "Website 10",
    title: "Custom",
    img: custom,
    placeholder: "Custom link",
    linkID: 59,
    baseUrl: "",
  },
];

export const photos = [
  {
    name: "Photo 1",
    title: "Photo 1",
    image: photo,
    id: 63,
  },
  {
    name: "Photo 2",
    title: "Photo 2",
    image: photo,
    id: 64,
  },
  {
    name: "Photo 3",
    title: "Photo 3",
    image: photo,
    id: 60,
  },
  {
    name: "Photo 4",
    title: "Photo 4",
    image: photo,
    id: 61,
  },
];

export const Video = [
  {
    name: "Video",
    title: "Video",
    image: video,
    id: 71,
  },
];

export const returnIconsByArray = (name) => {
  const findImg = (arr) => {
    const ifExist = arr?.find((elm) => {
      return elm?.name === name;
    });
    return ifExist;
  };

  if (findImg(contactIcons)) {
    return findImg(contactIcons)?.img;
  } else if (findImg(socialIcons)) {
    return findImg(socialIcons)?.img;
  } else if (findImg(media)) {
    return findImg(media)?.img;
  } else if (findImg(payment)) {
    return findImg(payment)?.img;
  } else if (findImg(payment)) {
    return findImg(payment)?.img;
  } else if (findImg(more)) {
    return findImg(more)?.img;
  }
};

// export let returnIcons = (name) => {
//   if (name === "Call") {
//     return call;
//   } else if (name === "Text") {
//     return text;
//   } else if (name === "Whatsapp") {
//     return whatsapp;
//   } else if (name === "Email") {
//     return email;
//   } else if (name === "Snapchat") {
//     return snapchat;
//   } else if (name === "Facebook") {
//     return facebook;
//   } else if (name === "Instagram") {
//     return instagram;
//   } else if (name === "Twitter") {
//     return twitter;
//   } else if (name === "Twitch") {
//     return twitch;
//   } else if (name === "Youtube") {
//     return youtube;
//   } else if (name === "Telegram") {
//     return telegram;
//   } else if (name === "Pinterest") {
//     return pinterest;
//   } else if (name === "Tiktok") {
//     return tiktok;
//   } else if (name === "Linkedin") {
//     return linkedin;
//   } else if (name === "Reddit") {
//     return reddit;
//   } else if (name === "Discord") {
//     return discord;
//   } else if (name === "Tumblr") {
//     return tumblr;
//   } else if (name === "Spotify") {
//     return spotify;
//   } else if (name === "Apple Music") {
//     return applemusic;
//   } else if (name === "SoundCloud") {
//     return soundcloud;
//   } else if (name === "Cash App") {
//     return applemusic;
//   } else if (name === "PayPal") {
//     return paypal;
//   } else if (name === "Calendly") {
//     return calendly;
//   } else if (name === "Website") {
//     return website;
//   } else if (name === "Custom") {
//     return custom;
//   } else if (name === "CashApp") {
//     return cashapp;
//   } else if (name === "AppleMusic") {
//     return applemusic;
//   }
// };

export const returnIcons = (linkid) => {
  const linkID = parseInt(linkid);
  if (linkID === 10) {
    return call;
  } else if (linkID === 6) {
    return whatsapp;
  } else if (linkID === 12) {
    return skype;
  } else if (linkID === 9) {
    return telegram;
  } else if (linkID === 13) {
    return facetime;
  } else if (linkID === 17) {
    return line;
  } else if (linkID === 20) {
    return gmail;
  } else if (linkID === 11) {
    return email;
  } else if (linkID === 15) {
    return viber;
  } else if (linkID === 19) {
    return zoom;
  } else if (linkID === 1) {
    return instagram;
  } else if (linkID === 8) {
    return facebook;
  } else if (linkID === 3) {
    return tiktok;
  } else if (linkID === 2) {
    return twitter;
  } else if (linkID === 24) {
    return linkedin;
  } else if (linkID === 48) {
    return twitch;
  } else if (linkID === 22) {
    return pinterest;
  } else if (linkID === 4) {
    return snapchat;
  } else if (linkID === 14) {
    return discord;
  } else if (linkID === 23) {
    return tumblr;
  } else if (linkID === 7) {
    return messenger;
  } else if (linkID === 29) {
    return spotify;
  } else if (linkID === 32) {
    return applemusic;
  } else if (linkID === 28) {
    return soundcloud;
  } else if (linkID === 27) {
    return youtube;
  } else if (linkID === 33) {
    return ytmusic;
  } else if (linkID === 34) {
    return podcasts;
  } else if (linkID === 31) {
    return deezer;
  } else if (linkID === 30) {
    return vimeo;
  } else if (linkID === 39) {
    return googlemaps;
  } else if (linkID === 46) {
    return cashapp;
  } else if (linkID === 35) {
    return paypal;
  } else if (linkID === 38) {
    return calendly;
  } else if (linkID === 50 || linkID === 51 || linkID === 52 || linkID === 53 || linkID === 54
    || linkID === 55 || linkID === 56 || linkID === 57 || linkID === 58 || linkID === 59) {
    return custom;
  } else if (linkID === 36) {
    return store;
  } else if (linkID === 37) {
    return menu;
  } else if (linkID === 39) {
    return googlemaps;
  } else if (linkID === 40) {
    return greview;
  } else if (linkID === 42) {
    return playstore;
  } else if (linkID === 41) {
    return appstore;
  } else if (linkID === 43) {
    return amazone;
  } else if (linkID === 65) {
    return threads;
  } else if (linkID === 49) {
    return website;
  }
};

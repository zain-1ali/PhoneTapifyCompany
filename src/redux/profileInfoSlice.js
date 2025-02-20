import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  name: "",
  email: "",
  bio: "",
  address: "",
  designation: "",
  profileUrl: "",
  logoUrl: "",
  coverUrl: "",
  phone: "",
  color: "",
  links: [],
  visibleMembers: [],
  leadDropOptions: [],
  featuredImages: [],
  featuredVideos: [],
  direct: {
    name: "",
    value: "",
    linkID: "",
    image: "",
  },
  profilePictureLock: false,
  logoLock: false,
  coverLock: false,
  nameLock: false,
  phoneLock: false,
  locationLock: false,
  bioLock: false,
  directMode: false,
  shareLinkToggle: false,
  walletReferel: false,
  formHeader: "",
  leadDropLabel: "",
  leadTextLabel: "",
  nameVisible: false,
  emailVisible: false,
  companyVisible: false,
  jobVisible: false,
  noteVisible: false,
  dateVisible: false,
  dropdownVisible: false,
  fileVisible: false,
  shortTextVisible: false,
  phoneVisible: false,
  qrLogo: "",
  qrColor: "#000000",
  textColor: "",
  shareBtnColor: "black",
  btnColor: "black",
  linkBgColor: "black",
  linkColor: "white",
  poweredVizz: 1,
  leadMode: 0,
  darkTheme: 0,
  organizationProfile: "",
  organizationLogo: "",
  organizationCover: "",
  orgColor: "#DEA527",
  orgTextColor: "",
  orgBtnColor: "black",
  orgShareBtnColor: "black",
  orgLinkBgColor: "black",
  orgLinkColor: "white",
  photoValue: {
    detail: "",
    image: "",
    title: "",
    id: "",
  },
};

export const profileInfoSlice = createSlice({
  name: "profileInfoSlice",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },

    setEmail: (state, action) => {
      state.email = action.payload;
    },

    setBio: (state, action) => {
      state.bio = action.payload;
    },

    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setDesignation: (state, action) => {
      state.designation = action.payload;
    },
    setProfileurl: (state, action) => {
      state.profileUrl = action.payload;
    },
    setCoverUrl: (state, action) => {
      state.coverUrl = action.payload;
    },
    setLogoUrl: (state, action) => {
      state.logoUrl = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setColor: (state, action) => {
      state.color = action.payload;
    },
    setLinks: (state, action) => {
      state.links = action.payload;
    },
    setVisibleMembers: (state, action) => {
      state.visibleMembers = action.payload;
    },
    setLeadDropOptions: (state, action) => {
      state.leadDropOptions = action.payload;
    },
    setFeaturedImages: (state, action) => {
      state.featuredImages = action.payload;
    },
    setFeaturedVideos: (state, action) => {
      state.featuredVideos = action.payload;
    },
    setPhotoValue: (state, action) => {
      state.photoValue = {
        title: action.payload?.title,
        image: action.payload?.image,
        detail: action.payload?.detail,
        id: action.payload?.id,
      };
    },
    setDirect: (state, action) => {
      state.direct = {
        name: action.payload?.name,
        value: action.payload?.value,
        linkID: action.payload?.linkID,
        image: action.payload?.image,
      };
    },
    setDirectMode: (state, action) => {
      state.directMode = action.payload;
    },

    setFormHeader: (state, action) => {
      state.formHeader = action.payload;
    },
    setLeadDropLabel: (state, action) => {
      state.leadDropLabel = action.payload;
    },
    setLeadTextLabel: (state, action) => {
      state.leadTextLabel = action.payload;
    },
    setNameVisible: (state, action) => {
      state.nameVisible = action.payload;
    },
    setEmailVisible: (state, action) => {
      state.emailVisible = action.payload;
    },
    setCompanyVisible: (state, action) => {
      state.companyVisible = action.payload;
    },
    setNoteVisible: (state, action) => {
      state.noteVisible = action.payload;
    },
    setDateVisible: (state, action) => {
      state.dateVisible = action.payload;
    },
    setFileVisible: (state, action) => {
      state.fileVisible = action.payload;
    },
    setDropdownVisible: (state, action) => {
      state.dropdownVisible = action.payload;
    },
    setShortTextVisible: (state, action) => {
      state.shortTextVisible = action.payload;
    },
    setJobVisible: (state, action) => {
      state.jobVisible = action.payload;
    },
    setPhoneVisible: (state, action) => {
      state.phoneVisible = action.payload;
    },
    setQrLogo: (state, action) => {
      state.qrLogo = action.payload;
    },
    setQrColor: (state, action) => {
      state.qrColor = action.payload;
    },
    setTextColor: (state, action) => {
      state.textColor = action.payload;
    },
    setbtnColor: (state, action) => {
      state.btnColor = action.payload;
    },
    setShareBtnColor: (state, action) => {
      state.shareBtnColor = action.payload;
    },
    setlinkBgColor: (state, action) => {
      state.linkBgColor = action.payload;
    },
    setlinkColor: (state, action) => {
      state.linkColor = action.payload;
    },
    setLead: (state, action) => {
      state.leadMode = action.payload;
    },
    setShareToggle: (state, action) => {
      state.shareLinkToggle = action.payload;
    },
    setWalletReferel: (state, action) => {
      state.walletReferel = action.payload;
    },
    setDark: (state, action) => {
      state.darkTheme = action.payload;
    },
    setPoweredVizz: (state, action) => {
      state.poweredVizz = action.payload;
    },

    // ------------------------------------org  methods---------------------------------------

    setOrgTextColor: (state, action) => {
      state.orgTextColor = action.payload;
    },
    setOrgbtnColor: (state, action) => {
      state.orgBtnColor = action.payload;
    },
    setOrgSharebtnColor: (state, action) => {
      state.orgShareBtnColor = action.payload;
    },
    setOrglinkBgColor: (state, action) => {
      state.orgLinkBgColor = action.payload;
    },
    setOrglinkColor: (state, action) => {
      state.orgLinkColor = action.payload;
    },
    setOrgColor: (state, action) => {
      state.orgColor = action.payload;
    },
    setOrganizationCover: (state, action) => {
      state.organizationCover = action.payload;
    },
    setOrganizationProfile: (state, action) => {
      state.organizationProfile = action.payload;
    },
    setOrgLogo: (state, action) => {
      state.organizationLogo = action.payload;
    },

    setProfilePictureLock: (state, action) => {
      state.profilePictureLock = action.payload;
    },
    setlogoLock: (state, action) => {
      state.logoLock = action.payload;
    },
    setcoverLock: (state, action) => {
      state.coverLock = action.payload;
    },
    setnameLock: (state, action) => {
      state.nameLock = action.payload;
    },
    setphoneLock: (state, action) => {
      state.phoneLock = action.payload;
    },

    setlocationLock: (state, action) => {
      state.locationLock = action.payload;
    },
    setbioLock: (state, action) => {
      state.bioLock = action.payload;
    },

    // ----------------------------------------------------

    setAllNull: (state) => {
      state.name = "";
      state.email = "";
      state.bio = "";
      state.address = "";
      state.designation = "";
      state.profileUrl = "";
      state.coverUrl = "";
      state.phone = "";
      state.color = "";
      state.links = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setName,
  setEmail,
  setColor,
  setPhone,
  setCoverUrl,
  setProfileurl,
  setLogoUrl,
  setDesignation,
  setAddress,
  setBio,
  setLinks,
  setVisibleMembers,
  setLeadDropOptions,
  setFeaturedImages,
  setFeaturedVideos,
  setAllNull,
  setDirect,
  setDirectMode,
  setFormHeader,
  setLeadDropLabel,
  setLeadTextLabel,
  setNameVisible,
  setEmailVisible,
  setCompanyVisible,
  setNoteVisible,
  setShortTextVisible,
  setDateVisible,
  setFileVisible,
  setDropdownVisible,
  setJobVisible,
  setPhoneVisible,
  setQrColor,
  setQrLogo,
  setLead,
  setDark,
  setOrgLogo,
  setPoweredVizz,
  setTextColor,
  setbtnColor,
  setShareBtnColor,
  setlinkColor,
  setlinkBgColor,
  setOrgColor,
  setOrglinkColor,
  setOrglinkBgColor,
  setOrgbtnColor,
  setOrgSharebtnColor,
  setOrgTextColor,
  setOrganizationCover,
  setOrganizationProfile,
  setProfilePictureLock,
  setlogoLock,
  setcoverLock,
  setnameLock,
  setphoneLock,
  setbioLock,
  setlocationLock,
  setWalletReferel,
  setShareToggle
} = profileInfoSlice.actions;

export default profileInfoSlice.reducer;

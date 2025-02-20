import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db, storage } from "./firebase";
import { toast } from "react-toastify";
import {
  equalTo,
  onValue,
  orderByChild,
  push,
  query,
  ref,
  remove,
  set,
  get,
  update,
} from "firebase/database";
import {
  getDownloadURL,
  uploadString,
  ref as sRef,
  uploadBytes,
  uploadBytesResumable,
  deleteObject
} from "firebase/storage";
import axios from "axios";
// import { useTranslation } from "react-i18next";
let cnxUid = localStorage.getItem("connexUid");
let conexParent = localStorage.getItem("conexParent");

let cnxId = conexParent ? conexParent : cnxUid;
// let baseUrl = "http://localhost:8000/api/";
let baseUrl = import.meta.env.VITE_APP_API_URL;
let appUrl = import.meta.env.VITE_APP_PROFILE_URL
// const { t } = useTranslation();
// ---------------------------Function to generate the timestamp in seconds for the current date-------------------
const getCurrentTimestampInSeconds = () => {
  return Math.floor(Date.now() / 1000);
};

// ------------------------Function to generate the timestamp in seconds for one year after the current date--------------
const getOneYearAfterTimestampInSeconds = () => {
  const oneYearAfter = new Date();
  oneYearAfter.setFullYear(oneYearAfter.getFullYear() + 1);
  return Math.floor(oneYearAfter.getTime() / 1000);
};

// ------------------------------------------------Login User-----------------------------------------------

export const handleLogin = async (data, navigate) => {
  console.log(4)
  if (data?.email && data?.password) {
    // console.log(1)
    // const starCountRef = ref(db, `/Admin`);
    // console.log(starCountRef);
    // onValue(starCountRef, async (snapshot) => {
    //   const admin = await snapshot.val();
    //   console.log(admin)
    //   if (data?.email === admin?.email && data?.password === admin?.password) {
    //     console.log(2)
    //     localStorage.setItem("connexUid", "superAdmin");
    //     localStorage.setItem("conexParent", "superAdmin");
    //     navigate("/home");
    //     window.location.reload();
    //   } 
    //   else {
        console.log(3)
        signInWithEmailAndPassword(auth, data.email, data.password)
          .then((userCredential) => {
           
            const user =  userCredential.user;
            console.log("user", user);
            if (user) {

              if (data?.email === "admin@phonetapify.com") {
                    console.log(2)
                    localStorage.setItem("connexUid", "superAdmin");
                    localStorage.setItem("conexParent", "superAdmin");
                    localStorage.setItem("loginBy", "admin");
                    navigate("/home");
                    window.location.reload();
                  } 
                  else {

              const starCountRef = query(
                ref(db, "/Users"),
                orderByChild("id"),
                equalTo(user?.uid)
              );
              onValue(starCountRef, async (snapshot) => {
                const data = await snapshot.val();
                console.log("data", data);
                let dataArray = Object.values(data)?.[0];
             
                  localStorage.setItem("proStatus", dataArray?.isActiveCompany);
                if (dataArray?.isAdmin === true) {
                  localStorage.setItem("connexUid", user?.uid);
                  localStorage.setItem("conexParent", dataArray?.parentID);
                  localStorage.setItem("loginBy", "company");
                  navigate("/home");
                  window.location.reload();
                } else {
                  toast.warn("Access Denied!");
                }
               
                MediaKeyStatusMap;
        
              });
            }
          }
     
          })
          .catch((error) => {
            console.log(error.message);

            if (error.message === "Firebase: Error (auth/user-not-found).") {
              toast.error("User not Found !");
            } else if (
              error.message === "Firebase: Error (auth/wrong-password)."
            ) {
              toast.error("Wrong Password !");
            }
            else if (
              error.message === "Firebase: Error (auth/invalid-credential)."
            ) {
              toast.error("Invalid Crendetials !");
            }
          });
      // }
    // });
  } else {
    toast.error("Email and password should not be empty!");
  }
};

export const loginAsTeam = (companyId, navigate) => {
  console.log(companyId);

  const starCountRef = query(
    ref(db, "/Users"),
    orderByChild("id"),
    equalTo(companyId)
  );
  onValue(starCountRef, async (snapshot) => {
    const data = await snapshot.val();
    console.log("data", data);
    let dataArray = Object.values(data)?.[0];
 
      localStorage.setItem("proStatus", dataArray?.isActiveCompany);
      localStorage.setItem("connexUid", companyId);
      localStorage.setItem("conexParent", dataArray?.parentID);
      localStorage.setItem("loginBy", "admin");
      navigate("/home");
      window.location.reload();
    MediaKeyStatusMap;

  });
};

export const existToAdmin = (navigate) => {

      localStorage.setItem("connexUid", "superAdmin");
      localStorage.setItem("conexParent", "superAdmin");
      localStorage.setItem("loginBy", "admin");
      navigate("/home");
      window.location.reload();

};

// ------------------------------------------------Forget Password-----------------------------------------------

export const forgetPassword = (email, setEmail, navigate) => {
  if (!email) {
    toast.error("Email is required");
  } else {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setEmail("");
        toast.success(
          "An email have been sent to you, please verify to change password"
        );
        navigate("/signin");
        // ..
      })
      .catch((error) => {
        console.log(error.message);
        if (error.message === "Firebase: Error (auth/user-not-found).") {
          toast.error("User not found!");
          setEmail("");
        }
      });
  }
};

let randNum = () => {
  let val = Math.floor(1000 + Math.random() * 9000);
  return val;
};

export const AddSubscription = (fDate, SDate, id, cb) => {
  if (!fDate | !SDate) {
    toast.error("Both dates are required");
    return;
  }

  if (fDate > SDate) {
    toast.error("Start date should be less then End date");
    return;
  }

  // if (
  //   fDate < getCurrentTimestampInSeconds() ||
  //   SDate < getCurrentTimestampInSeconds()
  // ) {
  //   toast.error("Date should not be from past");
  //   return;
  // }

  update(ref(db, `Users/${id}`), {
    isActiveCompany: true,
    subscription: {
      isTrialPeriod: false,
      packageName: "",
      platform: "web",
      proVersionExpireyDate: SDate,
      proVersionPurchaseDate: fDate,
      transactionId: "",
    },
  }).then(() => {
    toast.success("Added to pro version");
    cb();
  });
};
export const updateSignLinks = (id, links, signIndex, cb) => {
  const linkIds = links.map(link => link.linkID); // Get linkID of each link

  update(ref(db, `Users/${id}/signatureLinkIds`), {
   
      [signIndex]: linkIds, 
    
  }).then(() => {
    // toast.success("Links updated");
    cb();
  });
};


export const removeSubscription = (id, cb) => {
  update(ref(db, `Users/${id}`), {
    isActiveCompany: false,
    subscription: {
      isTrialPeriod: false,
      packageName: "",
      platform: "web",
      transactionId: "",
    },
  }).then(() => {
    toast.success("Pro version is disabled");
    cb();
  });
};

// ----------------------------------------- generate unique api key -----------------------------------------------
const generateRandomKey = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const length = 50; // Desired length of the key
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Function to check if the key already exists in Firebase
const checkKeyExistsInFirebase = async (key) => {
  const usersRef = ref(db, 'Users');
  const snapshot = await get(usersRef);

  if (snapshot.exists()) {
    const users = snapshot.val();
    // Loop through users to see if the apiKey already exists
    for (let userId in users) {
      if (users[userId].apiKey === key) {
        return true; // Key exists
      }
    }
  }
  return false; // Key does not exist
};

export const generateNewApiKey = async (uid) => {
  try {
    const newApiKey = await generateUniqueKey();
    await update(ref(db, `Users/${uid}`), { apiKey: newApiKey });
    toast.success("New key generated");
  } catch (error) {
    console.error("Error generating new API key:", error);
    toast.error("Failed to generate new API key");
  }
}

// Function to generate a unique key
const generateUniqueKey = async () => {
  let uniqueKey;
  let keyExists = true;

  // Keep generating a key until a unique one is found
  while (keyExists) {
    uniqueKey = generateRandomKey(); // Generate a random key
    keyExists = await checkKeyExistsInFirebase(uniqueKey); // Check if it exists in Firebase
  }

  return uniqueKey; // Return the unique key
};
// ------------------------------------------------Create new card-----------------------------------------------

export const createNewCard = async (data, callBack, companyProfile) => {
  if (data.name && data.email && data.password && (data.tagId || data.newTag)) {
    try {

      if (data.newTag) {
        const tagsRef = ref(db, `Tag`);
        const snapshot = await get(tagsRef);
        const allTags = snapshot.val();
        console.log(allTags);
        const isDuplicate = Object.values(allTags || {}).some(
          (tag) => tag.tagId === data.newTag
        );
        console.log(isDuplicate);
        if (isDuplicate) {
          toast.error("Tag with this name already exists");
          return;
        }

        const newTagRef = push(tagsRef, {
          tagId: data.newTag,
          type: "Digital Card",
          status: false,
        });
        const tagPushKey = newTagRef.key;

        await update(ref(db, `Tag/${tagPushKey}`), {
          tagId: data.newTag,
          type: "Digital Card",
          status: false,
          id: tagPushKey,
        });

        data.tagId = tagPushKey;
      }

// return;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      // Generate a unique API key
      const newApiKey = await generateUniqueKey();
      // console.log("Generated API key:", newApiKey);

      let cnxId = localStorage.getItem("connexUid");
      let conexParent = localStorage.getItem("conexParent");
      if (conexParent != "superAdmin") {
        const companyLinks =
          typeof companyProfile?.links === "object"
            ? Object.values(companyProfile?.links)
            : null;

        // get tag and find type
        let tagType = "Digital Card";
        let tag = ref(db, `Tag/${data.tagId}`);
        onValue(tag, (snapshot) => {
          const tagData = snapshot.val();
          if (tagData) {
            tagType = tagData.type ?? "Digital Card";
          }
        });

        let newAccountData = {
          platform: "web",
          address: "",
          backgroundColor: "#3fb621",
          bio: "",
          city: "",
          coverUrl: "",
          darkTheme: "0",
          directMode: false,
          dob: "",
          email: data.email,
          fcmToken: "",
          gender: "",
          apiKey: newApiKey,
          id: user.uid,
          accountID: user.uid,
          isActivateTag: false,
          isCover: false,
          isCustomLink: false,
          isDeleted: false,
          isEmail: true,
          isFirstLink: false,
          isProVersion: false,
          isProfile: false,
          isProfilePhoto: false,
          isReqByMe: false,
          isReqByOther: false,
          isShareProfile: false,
          isSubscribe: false,
          job: "",
          language: "en",
          logoUrl: "",
          name: data?.name,
          parentID: cnxId,
          parentId: "",
          phone: "",
          profileOn: 1,
          profileUrl: "",
          socialTextColor: "#FF000000",
          title: "",
          totalViews: 0,
          username: data?.name + randNum(),
          workPlace: "",
          formHeader: "Contact me!",
          leadForm: {
            Fname: true,
            company: true,
            email: true,
            job: true,
            note: true,
            phone: true,
          },
          isAdmin: false,
          companyId: cnxId,
          isCompany: false,
          qrLogoUrl: "",
          qrColor: "#000000",
          leadMode: false,
          textColor: "",
          profilePictureLock: false,
          logoLock: false,
          nameLock: false,
          phoneLock: false,
          bioLock: false,
          locationLock: false,
          coverLock: false,
          subscribed: false,
          profileType: tagType,
        };

        if (companyLinks) {
          newAccountData.links = companyLinks;
        }

        if (tagType === "Open House") {
          newAccountData.openHouseDetail = {
            listingAddress: "",
            askingPrice: "",
            beds: "",
            offer: 0,
            offerScript: "",
            questionScript: "",
          };
          newAccountData.botScript = "";
        }

        if (tagType === "Google Review") {
          newAccountData.reviewDetail = {
            reviewLink: "",
            businessPageLink: "",
            businessAddress: "",
            businessName: "",
            phoneNum: "",
            email: "",
          };
          newAccountData.reviewType = "direct";
        }

        if (tagType === "Office Assist") {
          newAccountData.callActionDetail = [
            { type: "url", value: "", title: "Ask Question" },
            { type: "url", value: "", title: "Enter Giveaway" },
            { type: "url", value: "", title: "Register Event" },
            { type: "url", value: "", title: "Give Us Feedback" },
          ];
          newAccountData.submitReq = {
            type: "url",
            value: "",
          };
          newAccountData.activeCallAction = "Ask Question";
          newAccountData.botScript = "";
        }

        update(ref(db, `Users/${user.uid}`), newAccountData).then(() => {
          update(ref(db, `Tag/${data.tagId}`), {
            profileID: user.uid,
            status: true,
          });

          axios
            .post(`${baseUrl}createAccount`, {
              companyId: cnxId,
              email: data?.email,
              password: data?.password,
              pkgStartDate: data?.firstDate ?? "N/A",
              pkgExpDate: data?.secondDate ?? "N/A",
              token: "12f3g4hj2j3h4g54h3juyt5j4k3jngbfvkg43hj",
            })
            .then((res) => {
              // console.log("the response", res);
            })
            .catch((err) => {
              console.log(err);
            });

          toast.success("New user created successfully");
          handleTeamModal();
        });
      } 
      else {
          let tagType = "Digital Card";
         
          let tag = ref(db, `Tag/${data.tagId}`);
          onValue(tag, (snapshot) => {
            const tagData = snapshot.val();
            if (tagData) {
              tagType = tagData.type ?? "Digital Card";
            }
          });


        let newAccountData = {
          platform: "web",
          address: "",
          backgroundColor: "#000000",
          bio: "",
          city: "",
          color: "#000000",
          coverUrl: "",
          darkTheme: "0",
          directMode: false,
          dob: "",
          email: data.email,
          fcmToken: "",
          gender: "",
          apiKey: newApiKey,
          id: user.uid,
          isActivateTag: false,
          isCover: false,
          isCustomLink: false,
          isDeleted: false,
          isEmail: true,
          isFirstLink: false,
          isProVersion: true,
          isProfile: false,
          isProfilePhoto: false,
          isReqByMe: false,
          isReqByOther: false,
          isShareProfile: false,
          isSubscribe: false,
          job: "",
          language: "en",
          logoUrl: "",
          name: data?.name,
          parentID: "",
          parentId: "",
          phone: "",
          profileOn: 1,
          profileUrl: "",
          socialTextColor: "#FF000000",
          title: "",
          totalViews: 0,
          username: data?.name + randNum(),
          website: "",
          workPlace: "",
          formHeader: "Contact me!",
          leadForm: {
            Fname: true,
            company: true,
            email: true,
            job: true,
            note: true,
            phone: true,
          },
          isAdmin: true,
          companyId: user.uid,
          isCompany: true,
          qrLogoUrl: "",
          qrColor: "#000000",
          leadMode: false,
          profilePictureLock: false,
          logoLock: false,
          nameLock: false,
          phoneLock: false,
          bioLock: false,
          locationLock: false,
          coverLock: false,
          subscribed: false,
          isActiveCompany: true,
          subscription: {
            isTrialPeriod: false,
            packageName: "",
            platform: "web",
            proVersionExpireyDate: data?.firstDate ?? "N/A",
            proVersionPurchaseDate: data?.secondDate ?? "N/A",
            transactionId: "",
          },
        };

        if (tagType === "Open House") {
          newAccountData.openHouseDetail = {
            listingAddress: "",
            askingPrice: "",
            beds: "",
            offer: 0,
            offerScript: "",
            questionScript: "",
          };
          newAccountData.botScript = "";
        }

        if (tagType === "Google Review") {
          newAccountData.reviewDetail = {
            reviewLink: "",
            businessPageLink: "",
            businessAddress: "",
            businessName: "",
            phoneNum: "",
            email: "",
          };
          newAccountData.reviewType = "direct";
        }

        if (tagType === "Office Assist") {
          newAccountData.callActionDetail = [
            { type: "url", value: "", title: "Ask Question" },
            { type: "url", value: "", title: "Enter Giveaway" },
            { type: "url", value: "", title: "Register Event" },
            { type: "url", value: "", title: "Give Us Feedback" },
          ];
          newAccountData.submitReq = {
            type: "url",
            value: "",
          };
          newAccountData.activeCallAction = "Ask Question";
          newAccountData.botScript = "";
        }

        update(ref(db, `Users/${user.uid}`), newAccountData).then(() => {
          update(ref(db, `Tag/${data.tagId}`), {
            profileID: user.uid,
            status: true,
          });

          axios
            .post(`${baseUrl}createAccount`, {
              email: data?.email,
              password: data?.password,
              pkgStartDate: data?.firstDate ?? "N/A",
              pkgExpDate: data?.secondDate ?? "N/A",
              token: "12f3g4hj2j3h4g54h3juyt5j4k3jngbfvkg43hj",
            })
            .then((res) => {
              console.log("response", res);
            })
            .catch((err) => {
              console.log(err);
            });

          toast.success("Company created successfully");
          // handleTeamModal();
        });
      }
    } catch (error) {
      const errorCode = error.code;
        //   const errorMessage = error.message;
        console.log(error.message);
        if (error.message === "Firebase: Error (auth/invalid-email).") {
          toast.error("Please enter valid email");
        } else if (
          error.message === "Firebase: Error (auth/email-already-in-use)."
        ) {
          toast.error("Email already exits");
        } else if (
          error.message ===
          "Firebase: Password should be at least 6 characters (auth/weak-password)."
        ) {
          toast.error("Password must be at least 6 characters");
        }

        // ..
      }

    callBack();
  } else {
    toast.error("Please fill required fields");
  }
};

// ------------------------------------------------Get all child profiles-----------------------------------------------
export const fetchCompanyTags = async (callBackFunc, setloading, cb) => {
  // setloading(true);

  if (conexParent != "superAdmin") {
    var starCountRef = query(
      ref(db, "/Tag"),
      orderByChild("companyId"),
      equalTo(cnxId)
    );
  }
  else
  {
    var starCountRef = query(
      ref(db, "/Tag"),
    );
  }
  onValue(starCountRef, async (snapshot) => {
    const data = await snapshot.val();
    if (data) {
      callBackFunc(data);
      // console.log(data);
      // setloading(false);
      // console.log("testing data");
    } else {
      // setloading(false);
    }

    MediaKeyStatusMap;
    // setmylist(Object.values(data));

    // setfiltered(Object.values(data));

    // updateStarCount(postElement, data);
  });
};
// ------------------------------------------------Get all child profiles-----------------------------------------------

export const getAllChilds = async (callBackFunc, setloading, parentId) => { // parentId is optional
  // setloading(true);
  try {
    // console.log(cnxId);
    // console.log(parentId);
    let starCountRef = [];
    // Fetch users based on parentID
    if(parentId){
     starCountRef = query(
        ref(db, "/Users"),
        orderByChild("parentID"),
        equalTo(parentId)
      );
    }
   else{
   starCountRef = query(
      ref(db, "/Users"),
      orderByChild("parentID"),
      equalTo(cnxId)
    );
   }

    const snapshot = await get(starCountRef);

    if (snapshot.exists()) {
      const users = snapshot.val();
      const userList = Object.keys(users).map((key) => ({
        id: key,
        ...users[key]
      }));

      // Create a list to hold the updated users with their sub-users
      const updatedUserList = await Promise.all(userList.map(async (user) => {
        // Initialize otherTags as an array to store tagTypes
        user.otherTags = [];
   
        if (user.profileType && !user.otherTags.includes(user.profileType)) {
          user.otherTags.push(user.profileType);
        }

        // Fetch sub-users for each user based on accountID
        const subUsersRef = query(
          ref(db, "/Users"),
          orderByChild("accountID"),
          equalTo(user.id)
        );
      
        const subUsersSnapshot = await get(subUsersRef);
      
        if (subUsersSnapshot.exists()) {
          const subUsersData = subUsersSnapshot.val();
          // console.log(subUsersData);
      
          for (const key in subUsersData) {
            if (subUsersData.hasOwnProperty(key)) {
              const subUser = subUsersData[key];
              // console.log("Tag Type:", subUser.profileType); // Accessing tagType
      
              if (subUser.profileType && !user.otherTags.includes(subUser.profileType)) {
                user.otherTags.push(subUser.profileType);
              }
            }
          }
        } 
        return user;
      }));
      
      // Execute the callback function with the updated users
      callBackFunc(updatedUserList);
      // console.log(updatedUserList);
    } else {
      console.log("No users found.");
    }
  } catch (error) {
    console.error("Error fetching users or sub-users:", error);
  } finally {
    setloading(false);
  }
};
export const getChildProfiles = async (parentId, callBackFunc) => {
  try {
    console.log(parentId);
    
    // Fetch users based on parentID
    const starCountRef = query(
      ref(db, "/Users"),
      orderByChild("accountID"),
      equalTo(parentId)
    );

    const snapshot = await get(starCountRef);

    if (snapshot.exists()) {
      const childs = snapshot.val();

      // Filter out records where accountID is equal to the record ID
      const filteredUserList = Object.keys(childs)
        // .filter(key => key !== childs[key]?.accountID)  // Correct comparison
        .map(key => ({
          id: key,
          ...childs[key]
        }));
      callBackFunc(filteredUserList);
    }  else {
      callBackFunc([]);
    }
  } catch (error) {
    console.error("Error fetching users or sub-users:", error);
  } finally {
    // setloading(false);
  }
};



// export const getAllChilds = async (callBackFunc, setloading, cb) => {
//   setloading(true);
//   const starCountRef = query(
//     ref(db, "/Users"),
//     orderByChild("parentID"),
//     equalTo(cnxId)
//   );
//   onValue(starCountRef, async (snapshot) => {
//     const data = await snapshot.val();
//     if (data) {
//       callBackFunc(data);
//       console.log(data);
//       setloading(false);
//       console.log("testing data");
//     } else {
//       setloading(false);
//     }

//     MediaKeyStatusMap;
//     // setmylist(Object.values(data));

//     // setfiltered(Object.values(data));

//     // updateStarCount(postElement, data);
//   });
// };
// ------------------------------------------------Get all companies-----------------------------------------------
export const getAllCompanies = async (callBackFunc, setloading) => {
  setloading(true);
  const starCountRef = query(
    ref(db, "/Users"),
    orderByChild("isCompany"),
    equalTo(true)
  );
  onValue(starCountRef, async (snapshot) => {
    const data = await snapshot.val();
    if (data) {
      callBackFunc(data);
      console.log(data);
      setloading(false);
      console.log("testing data");
    } else {
      setloading(false);
    }

    MediaKeyStatusMap;
  });
};

// ------------------------------------------------Get profile tag-----------------------------------------------
export const FetchProfileTag = (id, callBackFunc) => { 
  const starCountRef = query(
    ref(db, "/Tag"),
    orderByChild("profileID"),
    equalTo(id)
  );
  onValue(starCountRef, async (snapshot) => {
    const data = await snapshot.val();
    callBackFunc(data);
    MediaKeyStatusMap;
  });
};
// ------------------------------------------------Get single child profile-----------------------------------------------
export const getSingleChild = (id, callBackFunc) => {
  const starCountRef = query(
    ref(db, "/Users"),
    orderByChild("id"),
    equalTo(id)
  );
  onValue(starCountRef, async (snapshot) => {
    const data = await snapshot.val();
    callBackFunc(data);
    // console.log(data);
    // console.log("testing data");
    MediaKeyStatusMap;
    // setmylist(Object.values(data));

    // setfiltered(Object.values(data));

    // updateStarCount(postElement, data);
  });
};
// ------------------------------------------------delete single child profile-----------------------------------------------
export const deleteSingleChild = (id, teams, callback) => {
  console.log("api start working......");
  // toast.error("Api not added yet");
  axios
    .post(`${baseUrl}deleteAccount`, {
      id,
      token: "12f3g4hj2j3h4g54h3juyt5j4k3jngbfvkg43hj",
    })
    .then((res) => {
      console.log("the response", res);

      if (teams && typeof teams === "object") {
        const userPromise = Object.values(teams)?.map((elm) => {
          const starCountRef = query(
            ref(db, "/Teams"),
            orderByChild("teamId"),
            equalTo(elm)
          );
          onValue(starCountRef, async (snapshot) => {
            const data = await snapshot.val();
            if (data) {
              const theData = Object.values(data)?.[0];

              const arrayWithoutDeletedUser = Object.values(
                theData?.members
              )?.filter((elm) => {
                return elm != id;
              });

              update(ref(db, `Teams/${elm}`), {
                members: arrayWithoutDeletedUser,
              });
            } else {
              setloading(false);
            }

            MediaKeyStatusMap;
            // setmylist(Object.values(data));

            // setfiltered(Object.values(data));

            // updateStarCount(postElement, data);
          });
        });

        try {
          Promise.all(userPromise).then(() => {
            console.log("user deleted");
          });
        } catch (error) {
          toast.error("Some error. Please try again")
         }
      }

      // const starCountRef = query(
      //   ref(db, "/Teams"),
      //   orderByChild("companyId"),
      //   equalTo(cnxId)
      // );
      // onValue(starCountRef, async (snapshot) => {
      //   const data = await snapshot.val();
      //   if (data) {
      //     callBackFunc(data);
      //     setloading(false);
      //   } else {
      //     setloading(false);
      //   }

      //   console.log(data);
      //   console.log("testing data");
      //   MediaKeyStatusMap;
      // });
      toast.success("Card deleted sucessfuly");
      callback();
    })
    .catch((err) => {
      console.log(err);
    });
  console.log("api end working......");
};

// ------------------------------------------------Update About Data-----------------------------------------------

let returnIfHttps = (string) => {
  console.log("the string", string?.slice(0, 4));
  if (string != "" && string) {
    if (
      (string?.slice(0, 4) === "http") |
      (string?.slice(0, 3) === "gs:") |
      (string?.slice(0, 4) === "/src") |
      (string?.slice(0, 7) === "/assets") |
      (string?.slice(0, 15) === "gs://connexcard")
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};

export const updataAbout = async (id, data, t) => {
  let {
    name,
    email,
    job,
    address,
    coverUrl,
    phone,
    bio,
    profileUrl,
    logoUrl,
    backgroundColor,
    textColor,
    leadMode,
    darkTheme,
  } = data;
  // if (name || location || job || company || bio || colorCode) {
  const colorOfText = textColor ? textColor : "#000000";

  axios
  .post(`${baseUrl}changeEmail`, {
    id: id,
    email: data?.email,
    token: "12f3g4hj2j3h4g54h3juyt5j4k3jngbfvkg43hj",
  })
  .then((res) => {
    console.log("the response", res);
  })
  .catch((err) => {
    console.log(err);
  });


  update(ref(db, `Users/${id}`), {
    name,
    email,
    job,
    address,
    phone,
    // colorCode,
    // job,
    // company,
    darkTheme,
    leadMode,
    bio,
    profileUrl,
    logoUrl,
    coverUrl,
    backgroundColor,
    textColor: colorOfText,
  }).then(() => {
    if (returnIfHttps(profileUrl) === false) {
      let name = new Date().getTime() + id;
      const storageRef1 = sRef(storage, name);
      uploadString(storageRef1, profileUrl.slice(23), "base64", {
        contentType: "image/png",
      })
        .then(() => {
          console.log("img testing");
          getDownloadURL(storageRef1)
            .then((URL) => {
              // console.log(URL)
              update(ref(db, `Users/${id}`), { profileUrl: URL });
              // setprflimg("");
              // window.location.reload();
            })
            .catch((error) => {
              console.log(error);
            });
          // setimg(null)
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (returnIfHttps(coverUrl) === false) {
      let name = new Date().getTime() + id;
      const storageRef2 = sRef(storage, name);
      uploadString(storageRef2, coverUrl.slice(23), "base64", {
        contentType: "image/png",
      })
        .then(() => {
          console.log("img testing");
          getDownloadURL(storageRef2)
            .then((URL) => {
              // console.log(URL)
              update(ref(db, `Users/${id}`), { coverUrl: URL });
              // setBgImg("");
              // window.location.reload();
            })
            .catch((error) => {
              console.log(error);
            });
          // setimg(null)
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (returnIfHttps(logoUrl) === false) {
      let name = new Date().getTime() + id;
      const storageRef3 = sRef(storage, name);
      uploadString(storageRef3, logoUrl.slice(23), "base64", {
        contentType: "image/png",
      })
        .then(() => {
          console.log("img testing");
          getDownloadURL(storageRef3)
            .then((URL) => {
              // console.log(URL)
              update(ref(db, `Users/${id}`), { logoUrl: URL });
              // setlogoImg("");
              // window.location.reload();
            })
            .catch((error) => {
              console.log(error);
            });
          // setimg(null)
        })
        .catch((error) => {
          console.log(error);
        });
    }
    toast.success("Information updated sucessfuly");
  });
  // }
};

// ------------------------------------------------Update Qr Data-----------------------------------------------

export const updateQrInfo = async (id, qrColor, logoimg, success) => {
  // if (qrColor || qrLogo) {
  // toast.success("Information updated successfuly");
  console.log("qr testing", logoimg);
  console.log("qrlogo", logoimg);
  const colorOfQr = qrColor ? qrColor : "#000000";
  update(ref(db, `Users/${id}`), {
    qrColor: colorOfQr,
    qrLogoUrl: logoimg,
  }).then(() => {
    if (returnIfHttps(logoimg) === false) {
      let name = new Date().getTime() + id;
      const storageRef = sRef(storage, name);
      uploadString(storageRef, logoimg.slice(23), "base64", {
        contentType: "image/png",
      })
        .then(() => {
          console.log("img testing");
          getDownloadURL(storageRef)
            .then((URL) => {
              // console.log(URL)
              update(ref(db, `Users/${id}`), { qrLogoUrl: URL });
              // setlogoimg("");
              // window.location.reload();
            })
            .catch((error) => {
              console.log(error);
            });
          // setimg(null)
        })
        .catch((error) => {
          console.log(error);
        });
    }
    toast.success(success);
  });
  // console.log("qrrrrr");

  // }
};

// ------------------------------------------------Update Qr Data-----------------------------------------------

export const updateCompanyToken = async (companyId, userId) => {
  console.log("editUser");
  console.log(companyId)
  console.log(userId)
  const tokenLength = 20;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  const charactersLength = characters.length;

  for (let i = 0; i < tokenLength; i++) {
    token += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  // const editUrl = 'http://localhost:8000/editUser/';
  const editUrl = `${appUrl}editUser/`;
  update(ref(db, `Users/${companyId}`), {
    token: token,
  }).then(() => {
    window.open(`${editUrl}?id=${userId}&companyId=${companyId}&token=${token}`, '_blank');
    console.log("token updated")
  }).catch((error) => {
    console.error("Error updating user");
  });
};

// ------------------------------------------------Append bucket path-----------------------------------------------
export const appendBucketPath = (path) => {
  if (path.startsWith("gs://")) {
    const filterUrl = path.replace("gs://phonetapify-c6c06.appspot.com/", "");
    return `https://firebasestorage.googleapis.com/v0/b/phonetapify-c6c06.appspot.com/o/${encodeURIComponent(filterUrl)}?alt=media`;
  } 
  return path; 
};

// ------------------------------------------------Update lead Data-----------------------------------------------

export const updateLead = async (id, formHeader, leadDropLabel, leadTextLabel, leadForm, leadDropOptions, success) => {


    update(ref(db, `Users/${id}`), { formHeader, leadDropLabel, leadTextLabel, leadForm, leadDropOptions }).then(() => {
      toast.success(success ?? "");
    });
  
};

// ------------------------------------------------Create New Team-----------------------------------------------

export const createTeam = async (
  data,
  callBack,
  setapiWorking,
  success,
  er
) => {
  setapiWorking(true);
  if (data?.name) {
    // toast.success("Information updated successfuly");
    let pushKey = push(ref(db, `Teams/`), {
      teamName: data?.name,
      companyId: cnxId,
    }).key;

    update(ref(db, `Teams/${pushKey}`), { teamId: pushKey }).then(() => {
      if (returnIfHttps(data?.img) === false) {
        let name = new Date().getTime() + pushKey;
        const storageRef = sRef(storage, name);
        uploadString(storageRef, data?.img.slice(23), "base64", {
          contentType: "image/png",
        })
          .then(() => {
            console.log("img testing");
            getDownloadURL(storageRef)
              .then((URL) => {
                // console.log(URL)
                update(ref(db, `Teams/${pushKey}`), { image: URL }).then(() => {
                  toast.success(success);
                  callBack();
                  setapiWorking(false);
                });
                // setlogoimg("");
                // window.location.reload();
              })
              .catch((error) => {
                console.log(error);
              });
            // setimg(null)
          })
          .catch((error) => {
            console.log(error);
            callBack();
          });
      } else {
        toast.success(success);
        callBack();
        setapiWorking(false);
      }
    });
    // console.log("qrrrrr");
  } else {
    setapiWorking(false);
    toast.error(er);
  }
};

// ------------------------------------------------Get all teams-----------------------------------------------

export const getAllTeams = async (callBackFunc, setloading) => {
  setloading(true);
  const starCountRef = query(
    ref(db, "/Teams"),
    orderByChild("companyId"),
    equalTo(cnxId)
  );
  onValue(starCountRef, async (snapshot) => {
    const data = await snapshot.val();
    if (data) {
      callBackFunc(data);
      setloading(false);
    } else {
      setloading(false);
    }

    // console.log(data);
    // console.log("testing data");
    MediaKeyStatusMap;
    // setmylist(Object.values(data));

    // setfiltered(Object.values(data));

    // updateStarCount(postElement, data);
  });
};

// ------------------------------------------------Add team member-----------------------------------------------

export const addTeamMember = async (
  team,
  membersId,
  cb,
  setMemberIds,
  members,
  setMembers
) => {
  console.log("test.....", members);
  if (membersId.length > 0) {
    if (team?.members) {
      let memberArray = Object.values(team?.members);
      await set(ref(db, `Teams/${team?.teamId}/members/`), [
        ...memberArray,
        ...membersId,
      ]).then(async () => {
        const updatePromises = members?.map(async (elm) => {
          console.log("testing...");
          if (elm?.teams && typeof elm?.teams === "object") {
            await set(ref(db, `Users/${elm?.id}/teams/`), [
              ...Object.values(elm?.teams),
              team?.teamId,
            ]);
          } else {
            await set(ref(db, `Users/${elm?.id}/teams/`), [team?.teamId]);
          }
        });

        try {
          const updatedIds = await Promise.all(updatePromises);
          console.log("Updated IDs:", updatedIds);
          // Handle success, show success message, etc.
          toast.success("Team updated successfuly");
          cb();
          setMemberIds([]);
          setMembers([]);
        } catch (error) {
          console.error("Error updating objects:", error);
          // Handle error, show error message, etc.
          // toast.error("Error updating objects");
        }
      });
    } else {
      set(ref(db, `Teams/${team?.teamId}/members/`), [...membersId]).then(
        async () => {
          const updatePromises = members?.map(async (elm) => {
            console.log("testing...");
            if (elm?.teams && typeof elm?.teams === "object") {
              await set(ref(db, `Users/${elm?.id}/teams/`), [
                ...Object.values(elm?.teams),
                team?.teamId,
              ]);
            } else {
              await set(ref(db, `Users/${elm?.id}/teams/`), [team?.teamId]);
            }
          });

          try {
            const updatedIds = await Promise.all(updatePromises);
            console.log("Updated IDs:", updatedIds);
            // Handle success, show success message, etc.
            toast.success("Team updated successfuly");
            cb();
            setMemberIds([]);
            setMembers([]);
          } catch (error) {
            console.error("Error updating objects:", error);
            // Handle error, show error message, etc.
            // toast.error("Error updating objects");
          }
        }
      );
    }
  } else {
    toast.error("Please add atleast 1 member");
  }
};

// ------------------------------------------------Get single child profile-----------------------------------------------

export const getAllTeamMembers = (arr, callBack, members) => {
  callBack([]); // Reset the callback on each call

  if (arr) {
    const fetchedMembers = new Set(); // Use a set to track unique members

    arr.forEach((elm) => {
      const starCountRef = query(
        ref(db, "/Users"),
        orderByChild("id"),
        equalTo(elm)
      );

      onValue(starCountRef, async (snapshot) => {
        const data = await snapshot.val();

        if (data) {
          const newMembers = Object.values(data).filter((member) => {
            return !fetchedMembers.has(member.id); // Check if the member is already in the set
          });

          newMembers.forEach((member) => fetchedMembers.add(member.id)); // Add new members to the set

          if (newMembers.length > 0) {
            callBack((prev) => [...prev, ...newMembers]); // Only update callback with unique members
          }
        }
      });
    });
  }
};


export const getAllTeamMembersLength = (arr) => {
  if (arr) {
    console.log(arr);
    let membersArray = [];
    Object.values(arr)?.map((elm) => {
      const starCountRef = query(
        ref(db, "/Users"),
        orderByChild("id"),
        equalTo(elm)
      );
      onValue(starCountRef, async (snapshot) => {
        const data = await snapshot.val();
        if (data) {
          membersArray?.push(Object.values(data));
        }

        console.log(data);
        console.log("testing data");
        MediaKeyStatusMap;
      });
    });
  }
};

// ----------------------------------------------------Add link to database---------------------------------------------


export const addNewLink = async (
  linkData,
  id,
  allLinks,
  handleLinkEditModal,
  ifCompany,
  allMembers,
  success
) => {
  console.log("add working.........");
  // console.log(linkData);

  // Ensure linkData has a value before proceeding
  if (linkData?.value) {
    const isImageHttps = returnIfHttps(linkData?.image);
    let imageUrl = "";

    // Handle image upload if it's not an HTTPS URL
    if (!isImageHttps) {
      console.log("Uploading image...");
      const name = new Date().getTime() + id;
      const storageRef = sRef(storage, name);
      
      try {
        await uploadString(storageRef, linkData?.image.slice(23), "base64", {
          contentType: "image/png",
        });
        imageUrl = await getDownloadURL(storageRef);
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error(t("Error uploading image"));
        return; // Exit the function if there's an error
      }
    }

    // Prepare the new link data
    const newLinkData = {
      image: isImageHttps ? linkData?.image : imageUrl,
      linkID: linkData?.linkID,
      name: linkData?.name,
      value: linkData?.value,
      shareable: linkData?.shareable,
    };

    // Add the new link to the user's links in Firebase
    try {
      await set(ref(db, `Users/${id}/links/`), [...(allLinks || []), newLinkData]);

      if (ifCompany(id)) {
        // Fetch all members of the company from Firebase
        const starCountRef = query(ref(db, "/Users"), orderByChild("parentID"), equalTo(id));
        const snapshot = await get(starCountRef);

        if (snapshot.exists()) {
          const users = snapshot.val();
          const allMembers = Object.keys(users).map((key) => ({
            id: key,
            ...users[key],
          }));

          if (allMembers?.length > 0) {
            await Promise.all(allMembers.map(async (elm) => {
              if (elm?.links) {
                const valueExists = Object.values(elm?.links)?.some(obj => obj.linkID === linkData?.linkID);
                if (!valueExists) {
                  const nextIndex = Object.values(elm?.links).length;
                  await set(ref(db, `Users/${elm?.id}/links/${nextIndex}`), newLinkData);
                }
              } else {
                await set(ref(db, `Users/${elm?.id}/links/0`), newLinkData);
              }
            }));
            toast.success("Link added successfully");
          } else {
            toast.error(t("No members found for this company"));
          }
        } else {
          toast.error(t("No members found in Firebase"));
        }
      } else {
        toast.success(success);
      }
      
      handleLinkEditModal();
    } catch (error) {
      console.error("Error adding link:", error);
      toast.error(t("Error adding link"));
    }
  }
};


// ----------------------------------------------------Add featured img---------------------------------------------

export const addFeaturedImg = (
  id,
  imgData,
  allImgs,
  ifadded,
  handlePhotoEditModal
) => {
  const returnImgNum = (id) => {
    if (id === 58) {
      return 1;
    } else if (id === 59) {
      return 2;
    } else if (id === 60) {
      return 3;
    } else if (id === 61) {
      return 4;
    }
  };
  if (!imgData?.image) {
    toast.error("Please add image");
    return;
  }
  if (!imgData?.title) {
    toast.error("Title should not be empty");
    return;
  }
  if (ifadded) {
    let index = allImgs?.findIndex((elm) => {
      return elm?.id === imgData?.id;
    });
    if (returnIfHttps(imgData?.image) === false) {
      let name = `gs://phonetapify-c6c06.appspot.com/image${returnImgNum(
        imgData?.id
      )}:${id}.png`;
      const storageRef = sRef(storage, name);
      uploadString(storageRef, imgData?.image.slice(23), "base64", {
        contentType: "image/png",
      }).then(() => {
        update(ref(db, `Users/${id}/featuredImages/${index}`), {
          detail: imgData?.detail,
          id: imgData?.id,
          title: imgData?.title,
          imageUrl: name,
        })
          .then(() => {
            toast.success("Image added successfuly");
            handlePhotoEditModal();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } else {
      update(ref(db, `Users/${id}/featuredImages/${index}`), {
        detail: imgData?.detail,
        id: imgData?.id,
        title: imgData?.title,
      })
        .then(() => {
          toast.success("Image added successfuly");
          handlePhotoEditModal();
        })
        .catch((err) => {
          console.log(err);
          handlePhotoEditModal();
        });
    }
  } else {
    if (returnIfHttps(imgData.image) === false) {
      let name = `gs://phonetapify-c6c06.appspot.com/image${returnImgNum(
        imgData?.id
      )}:${id}.png`;
      const storageRef = sRef(storage, name);
      uploadString(storageRef, imgData?.image.slice(23), "base64", {
        contentType: "image/png",
      }).then(() => {
        set(ref(db, `Users/${id}/featuredImages/`), [
          ...allImgs,
          {
            detail: imgData?.detail ? imgData?.detail : "",
            id: imgData?.id,
            title: imgData?.title,
            imageUrl: name,
          },
        ])
          .then(() => {
            handlePhotoEditModal();
            toast.success("Image added successfuly");
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  }
};

// ----------------------------------------------------Add featured video---------------------------------------------

export const addFeaturedVideo = (
  id,
  videoData,
  allVideos,
  ifadded,
  handleVideoEditModal,
  setloading
) => {
  if (!videoData?.video) {
    toast.error("Please add video");
    return;
  }
  if (!videoData?.title) {
    toast.error("Title should not be empty");
    return;
  }
  setloading(true);
  if (ifadded) {
    let index = allVideos?.findIndex((elm) => {
      return elm?.id === videoData?.id;
    });
    if (returnIfHttps(videoData?.video) === false) {
      let name = `gs://phonetapify-c6c06.appspot.com/video:${id}.mp4`;
      const storageRef = sRef(storage, name);
      uploadBytesResumable(storageRef, videoData?.video).then(() => {
        update(ref(db, `Users/${id}/featuredVideos/${index}`), {
          detail: videoData?.detail,
          id: videoData?.id,
          title: videoData?.title,
          videoUrl: name,
        })
          .then(() => {
            toast.success("Video updated successfuly");
            setloading(false);
            handleVideoEditModal();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } else {
      update(ref(db, `Users/${id}/featuredVideos/${index}`), {
        detail: videoData?.detail,
        id: videoData?.id,
        title: videoData?.title,
      })
        .then(() => {
          toast.success("Video updated successfuly");
          setloading(false);
          handleVideoEditModal();
        })
        .catch((err) => {
          console.log(err);
          handleVideoEditModal();
        });
    }
  } else {
    if (returnIfHttps(videoData.video) === false) {
      let name = `gs://phonetapify-c6c06.appspot.com/video:${id}.mp4`;
      const storageRef = sRef(storage, name);
      uploadBytesResumable(storageRef, videoData?.video).then(() => {
        set(ref(db, `Users/${id}/featuredVideos/`), [
          ...allVideos,
          {
            detail: videoData?.detail ? videoData?.detail : "",
            id: videoData?.id,
            title: videoData?.title,
            videoUrl: name,
          },
        ])
          .then(() => {
            handleVideoEditModal();
            setloading(false);
            toast.success("Video added successfuly");
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  }
};

// ----------------------------------------------------Update link to database---------------------------------------------

export const updateNewLink = async (
  linkData,
  id,
  allLinks,
  handleLinkEditModal,
  ifCompany,
  allChilds,
  success
) => {
  if (ifCompany(id)) {
    const starCountRef = query(ref(db, "/Users"), orderByChild("parentID"), equalTo(id));
    const snapshot = await get(starCountRef);

    if (snapshot.exists()) {
      const users = snapshot.val();
      allChilds = Object.keys(users).map((key) => ({
        id: key,
        ...users[key],
      }));
    }

    if (!returnIfHttps(linkData?.image)) {
      const name = `${new Date().getTime()}_${id}`;
      const storageRef = sRef(storage, name);

      try {
        await uploadString(storageRef, linkData?.image.slice(23), "base64", { contentType: "image/png" });
        const URL = await getDownloadURL(storageRef);

        if (allLinks) {
          const index = allLinks.findIndex((elm) => elm.linkID === linkData.linkID);

          await update(ref(db, `Users/${id}/links/${index}`), {
            image: URL,
            linkID: linkData.linkID,
            name: linkData.name,
            value: linkData.value,
            shareable: linkData.shareable,
          });

          const promiseUpdatingLinkToChilds = allChilds.map(async (elm) => {
            if (elm.links) {
              const childIndex = Object.values(elm.links).findIndex((elem) => elem.linkID === linkData.linkID);

              await update(ref(db, `Users/${elm.id}/links/${childIndex}`), {
                image: URL,
                linkID: linkData.linkID,
                name: linkData.name,
                value: linkData.value,
                shareable: linkData.shareable,
              });
            }
          });

          await Promise.all(promiseUpdatingLinkToChilds);
          handleLinkEditModal();
          toast.success(success);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      if (allLinks) {
        const index = allLinks.findIndex((elm) => elm.linkID === linkData.linkID);

        await update(ref(db, `Users/${id}/links/${index}`), {
          image: linkData.image.startsWith("http") ? linkData.image : "",
          linkID: linkData.linkID,
          name: linkData.name,
          value: linkData.value,
          shareable: linkData.shareable,
        });

        const promiseUpdatingLinkToChilds = allChilds.map(async (elm) => {
          if (elm.links) {
            const childIndex = Object.values(elm.links).findIndex((elem) => elem.linkID === linkData.linkID);

            await update(ref(db, `Users/${elm.id}/links/${childIndex}`), {
              image: linkData.image.startsWith("http") ? linkData.image : "",
              linkID: linkData.linkID,
              name: linkData.name,
              value: linkData.value,
              shareable: linkData.shareable,
            });
          }
        });

        await Promise.all(promiseUpdatingLinkToChilds);
        handleLinkEditModal();
        toast.success(success);
      }
    }
  } else {
    if (!returnIfHttps(linkData?.image)) {
      const name = `${new Date().getTime()}_${id}`;
      const storageRef = sRef(storage, name);

      try {
        await uploadString(storageRef, linkData?.image.slice(23), "base64", { contentType: "image/png" });
        const URL = await getDownloadURL(storageRef);

        if (allLinks) {
          const index = allLinks.findIndex((elm) => elm.linkID === linkData.linkID);

          await update(ref(db, `Users/${id}/links/${index}`), {
            image: URL,
            linkID: linkData.linkID,
            name: linkData.name,
            value: linkData.value,
            shareable: linkData.shareable,
          });

          handleLinkEditModal();
          toast.success(success);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      if (allLinks) {
        const index = allLinks.findIndex((elm) => elm.linkID === linkData.linkID);

        await update(ref(db, `Users/${id}/links/${index}`), {
          image: linkData.image,
          linkID: linkData.linkID,
          name: linkData.name,
          value: linkData.value,
          shareable: linkData.shareable,
        });

        handleLinkEditModal();
        toast.success(success);
      }
    }
  }
};


// ----------------------------------------------------Remove link from database---------------------------------------------

export const renoveLink = async (
  linkData,
  id,
  allLinks,
  cb,
  ifCompany,
  allChilds
) => {
  if (ifCompany(id)) {
    try {
      const starCountRef = query(
        ref(db, "/Users"),
        orderByChild("parentID"),
        equalTo(id)
      );
      const snapshot = await get(starCountRef);

      if (snapshot.exists()) {
        const users = snapshot.val();
        allChilds = Object.keys(users).map((key) => ({
          id: key,
          ...users[key],
        }));
      }

      if (allLinks) {
        let remainingLinks = allLinks.filter((elm) => elm.linkID !== linkData.linkID);
        console.log(remainingLinks);

        if (remainingLinks.length === 0) {
          await remove(ref(db, `Users/${id}/links/`));
          await Promise.all(
            allChilds.map(async (elm) => {
              if (typeof elm.links === "object") {
                let remainingUserLinks = Object.values(elm.links).filter(
                  (userElm) => userElm.linkID !== linkData.linkID
                );

                if (remainingUserLinks.length === 0) {
                  await remove(ref(db, `Users/${elm.id}/links/`));
                } else {
                  await set(ref(db, `Users/${elm.id}/links/`), remainingUserLinks);
                }
              }
            })
          );
          console.log("All user links deleted");
          cb();
        } else {
          await set(ref(db, `Users/${id}/links/`), remainingLinks);
          await Promise.all(
            allChilds.map(async (elm) => {
              let remainingUserLinks = Object.values(elm.links).filter(
                (userElm) => userElm.linkID !== linkData.linkID
              );

              if (remainingUserLinks.length === 0) {
                await remove(ref(db, `Users/${elm.id}/links/`));
              } else {
                await set(ref(db, `Users/${elm.id}/links/`), remainingUserLinks);
              }
            })
          );
          console.log("All user links updated");
          cb();
        }
      }
    } catch (error) {
      console.error("Error updating objects:", error);
      // toast.error("Error updating objects");
    }
  } else {
    if (allLinks) {
      let remainingLinks = allLinks.filter((elm) => elm.linkID !== linkData.linkID);
      console.log(remainingLinks);

      if (remainingLinks.length === 0) {
        await remove(ref(db, `Users/${id}/links/`));
        cb();
        // toast.success("Link deleted successfully");
      } else {
        await set(ref(db, `Users/${id}/links/`), remainingLinks);
        cb();
        // toast.success("Link deleted successfully");
      }
    }
  }
};


// ----------------------------------------------------Remove link from database---------------------------------------------
export const removeImage = (id, allImages, imgData, cb) => {
  if (allImages) {
    let remainingImgs = allImages?.filter((elm) => {
      return elm?.id != imgData?.id;
    });
    console.log(remainingImgs);
    if (remainingImgs?.length === 0) {
      remove(ref(db, `Users/${id}/featuredImages/`)).then(() => {
        cb();
        // toast.success("Link deleted successfuly");
      });
    } else {
      set(ref(db, `Users/${id}/featuredImages/`), [...remainingImgs]).then(
        () => {
          cb();
          // toast.success("Link deleted successfuly");
        }
      );
    }
  }
};

// ----------------------------------------------------Remove video from database---------------------------------------------
export const removeVideo = (id, allImages, imgData, cb) => {
  if (allImages) {
    let remainingImgs = allImages?.filter((elm) => {
      return elm?.id != imgData?.id;
    });
    console.log(remainingImgs);
    if (remainingImgs?.length === 0) {
      remove(ref(db, `Users/${id}/featuredVideos/`)).then(() => {
        cb();
      });
    } else {
      set(ref(db, `Users/${id}/featuredVideos/`), [...remainingImgs]).then(
        () => {
          cb();
        }
      );
    }
  }
};

// ----------------------------------------------------Handle to change lead mode---------------------------------------------

export const updateLeadMode = (leadMode, id) => {
  
  update(ref(db, `Users/${id}/`), { leadMode: !leadMode });
};
export const updateShareLinkToggle = (shareLinkToggle, id) => {
  
  update(ref(db, `Users/${id}/`), { shareLinkToggle: !shareLinkToggle });
};
export const updateWalletReferel = (walletReferel, id) => {
  
  update(ref(db, `Users/${id}/`), { walletReferel: !walletReferel });
};
export const updateVisibleMembers = (updatedMembers, id) => {
  
  update(ref(db, `Users/${id}/`), { visibleMembers: updatedMembers });
};

export const handleChangeDarkMode = (darkTheme, id) => {
  console.log(darkTheme,id)
  update(ref(db, `Users/${id}/`), {
     darkTheme: darkTheme,
     textColor: darkTheme ? "#ffffff" : "#000000",
    });
};

// ---------------------------------------Handle to change direct mode----------------------------------

export const handleChangeDirect = (directMode, id, link) => {
  // e.preventDefault()
  if (directMode) {
    update(ref(db, `Users/${id}`), {
      directMode: false,
      direct: { name: "", value: "", title: "" },
    }).then(() => {
      // navigate('/profileedit')
    });
  } else {
    update(ref(db, `Users/${id}`), {
      directMode: true,
      direct: {
        name: link[0]?.name,
        value: link[0]?.value,
        linkID: link[0]?.linkID,
      },
    }).then(() => {
      // navigate('/profileedit')
    });
  }
};

export const addtoDirect = (name, linkID, value, id, image) => {
  console.log(name);
  console.log(linkID);
  console.log(value);
  console.log(id);
  console.log(image);
  update(ref(db, `Users/${id}/`), {
    direct: { name, linkID, value, image },
  });
};

// ---------------------------------------Handle delete company----------------------------------
export const deleteCompany = (team, callBack) => {
  remove(ref(db, `Teams/${team?.teamId}`)).then(async () => {
    if (team?.members && typeof team?.members === "object") {
      const membersPromises = Object.values(team?.members)?.map((elm) => {
        const starCountRef = query(
          ref(db, "/Users"),
          orderByChild("id"),
          equalTo(elm)
        );
        onValue(starCountRef, async (snapshot) => {
          const data = await snapshot.val();
          if (Object.values(data)?.[0]) {
            console.log(data);
            if (
              Object.values(data)?.[0]?.teams &&
              typeof Object.values(data)?.[0]?.teams === "object"
            ) {
              const remainingTeams = Object.values(
                Object.values(data)?.[0]?.teams
              )?.filter((elem) => {
                return elem != team?.teamId;
              });
              set(ref(db, `Users/${Object.values(data)?.[0]?.id}/teams/`), [
                ...remainingTeams,
              ]);
            }
          }

          console.log(data);
          console.log("testing data");
          MediaKeyStatusMap;
        });
      });

      try {
        const updatedIds = await Promise.all(membersPromises);
        console.log("Updated IDs:", updatedIds);
        // Handle success, show success message, etc.
        callBack();
        toast.success("Team deleted successfuly");
      } catch (error) {
        console.error("Error updating objects:", error);
        // Handle error, show error message, etc.
        // toast.error("Error updating objects");
      }
    }
  });
};

// ---------------------------------------Handle change Profile Status----------------------------------
export const changeProfileStatus = (status, id) => {
  if (status === 1) {
    update(ref(db, `Users/${id}/`), { profileOn: 0 });
  } else {
    update(ref(db, `Users/${id}/`), { profileOn: 1 });
  }
};

// ------------------------------------------------Get single child profile-----------------------------------------------

export const getContacts = (id, cb) => {
  const starCountRef = query(
    ref(db, "/Contacts"),
    orderByChild("parentId"),
    equalTo(id)
  );

  onValue(starCountRef, async (snapshot) => {
    const data = await snapshot.val();
    
    if (data) {
      const sortedContacts = Object.values(data).sort(
        (a, b) => (b.timestamp || 0) - (a.timestamp || 0) // Sort latest first
      );
      cb(sortedContacts);
    } else {
      cb([]); // Return empty array if no data
    }
  });
};


// ------------------------------------------------delete contact file-----------------------------------------------

export const deleteContactFileDb = (id, path, cb) => {
  
  const fileRef = sRef(storage, path);
  const contactRef = ref(db, "/Contacts/" + id);
  
  deleteObject(fileRef).then(() => {
    console.log("File deleted from Firebase Storage");
    update(contactRef, {
      file: "",
      fileSizeKb: ""
    }).catch((error) => {
      console.error("Error updating Realtime Database: ", error);
    });

  }).catch((error) => {
    console.error("Error deleting file from Firebase Storage: ", error);
  });

  cb();
};


// ------------------------------------------------Get single child reviews-----------------------------------------------

export const getReviews = (id, cb) => {
  console.log(id);
  const starCountRef = query(
    ref(db, "/Reviews"),
    orderByChild("parentId"),
    equalTo(id)
  );
  onValue(starCountRef, async (snapshot) => {
    const data = await snapshot.val();
    console.log(data);
    cb(Object.values(data));
    console.log("my data", data);

    MediaKeyStatusMap;
  });
};

// ---------------------------------------Handle delete contact----------------------------------
export const deleteContact = (id, cb) => {
  remove(ref(db, `Contacts/${id}`)).then(() => {
    cb();
    toast.success("Contact deleted successfuly");
  });
};
export const deleteReview = (id, cb) => {
  remove(ref(db, `Reviews/${id}`)).then(() => {
    cb();
    toast.success("Review deleted successfuly");
  });
};

export const updataCompanyAbout = async (id, data, duplicateCallback) => {
  let {
    name,
    email,
    address,
    phone,
    bio,
    nameLock,
    phoneLock,
    locationLock,
    bioLock,
  } = data;

  const emailQuery = query(ref(db, "Users"), orderByChild("email"), equalTo(email));
    const snapshot = await get(emailQuery);

    // If email exists and doesn't belong to the current user, throw an error
    if (snapshot.exists()) {
      const existingUser = Object.keys(snapshot.val())[0];
      if (existingUser !== id) {
        duplicateCallback(true);
        toast.error("Email already in use by another user.");
        return;
      }
    }

  update(ref(db, `Users/${id}`), {
    name,
    email,
    address,
    phone,
    nameLock,
    phoneLock,
    locationLock,
    bioLock,
    bio,
  }).then(() => {
    // const starCountRef = query(
    //   ref(db, "/Users"),
    //   orderByChild("parentID"),
    //   equalTo(id)
    // );
    // onValue(starCountRef, async (snapshot) => {
    //   const thedata = await snapshot.val();
    //   if (thedata) {
    //     // let allChilds = Object.keys(thedata);
    //     Object.keys(thedata)?.forEach(async (elm) => {
    //       await update(ref(db, `Users/${elm}`), {
    //         nameLock,
    //         phoneLock,
    //         locationLock,
    //         bioLock,
    //       });
    //     });
    //   }

    //   toast.success("Information updated sucessfuly");

    //   // console.log(data);
    //   // MediaKeyStatusMap;
    // });
    // updateBulkData(id, nameLock, phoneLock, locationLock, bioLock);

    axios
    .post(`${baseUrl}changeEmail`, {
      id: id,
      email: email,
      token: "12f3g4hj2j3h4g54h3juyt5j4k3jngbfvkg43hj",
    })
    .then((res) => {
      // console.log("the response", res);
    })
    .catch((err) => {
      console.log(err);
    });

    duplicateCallback(false);
    // toast.success(success);
  });

  // }
};

// ------------------------------------------------update Company Profile-----------------------------------------------

export const updateCompanyProfile = async (id, data, success) => {
  let {
    coverUrl,
    profileUrl,
    logoUrl,
    color,
    textColor,
    coverLock,
    logoLock,
    profilePictureLock,
  } = data;
  // if (name || location || job || company || bio || colorCode) {
  const coloroftext = textColor ? textColor : "#000000";
  update(ref(db, `Users/${id}`), {
    color,
    textColor: coloroftext,
    profileUrl,
    logoUrl,
    coverUrl,
    coverLock,
    logoLock,
    profilePictureLock,
  }).then(() => {
    if (returnIfHttps(profileUrl) === false) {
      let name = new Date().getTime() + id;
      const storageRef = sRef(storage, name);
      uploadString(storageRef, profileUrl.slice(23), "base64", {
        contentType: "image/png",
      })
        .then(() => {
          console.log("img testing");
          getDownloadURL(storageRef)
            .then((URL) => {
              // console.log(URL)
              update(ref(db, `Users/${id}`), { profileUrl: URL });
              // setprflimg("");
              // window.location.reload();
            })
            .catch((error) => {
              console.log(error);
            });
          // setimg(null)
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (returnIfHttps(coverUrl) === false) {
      let name = new Date().getTime() + id;
      const storageRef = sRef(storage, name);
      uploadString(storageRef, coverUrl.slice(23), "base64", {
        contentType: "image/png",
      })
        .then(() => {
          console.log("img testing");
          getDownloadURL(storageRef)
            .then((URL) => {
              // console.log(URL)
              update(ref(db, `Users/${id}`), { coverUrl: URL });
              // setBgImg("");
              // window.location.reload();
            })
            .catch((error) => {
              console.log(error);
            });
          // setimg(null)
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (returnIfHttps(logoUrl) === false) {
      let name = new Date().getTime() + id;
      const storageRef = sRef(storage, name);
      uploadString(storageRef, logoUrl.slice(23), "base64", {
        contentType: "image/png",
      })
        .then(() => {
          console.log("img testing");
          getDownloadURL(storageRef)
            .then((URL) => {
              // console.log(URL)
              update(ref(db, `Users/${id}`), { logoUrl: URL });
              // setlogoImg("");
              // window.location.reload();
            })
            .catch((error) => {
              console.log(error);
            });
          // setimg(null)
        })
        .catch((error) => {
          console.log(error);
        });
    }
    toast.success(success);
  });
  // }
};

// ------------------------------------------------update Team-----------------------------------------------

export const updateTeam = async (
  data,
  callBack,
  teamId,
  setapiWorking,
  success,
  err
) => {
  setapiWorking(true);
  if (data?.name) {
    const dataToUpdate = data?.img
      ? { teamName: data?.name }
      : { teamName: data?.name, image: "" };
    update(ref(db, `Teams/${teamId}`), dataToUpdate).then(() => {
      if (returnIfHttps(data?.img) === false) {
        let name = new Date().getTime() + teamId;
        const storageRef = sRef(storage, name);
        uploadString(storageRef, data?.img.slice(23), "base64", {
          contentType: "image/png",
        })
          .then(() => {
            console.log("img testing");
            getDownloadURL(storageRef)
              .then((URL) => {
                // console.log(URL)
                update(ref(db, `Teams/${teamId}`), { image: URL }).then(() => {
                  setapiWorking(false);
                });
                // setlogoimg("");
                // window.location.reload();
              })
              .catch((error) => {
                console.log(error);
                setapiWorking(false);
              });
            // setimg(null)
          })
          .catch((error) => {
            console.log(error);
            callBack();
          });
      }
      toast.success(success);
      callBack();
      setapiWorking(false);
    });
    // console.log("qrrrrr");
  } else {
    toast.error(err);
    setapiWorking(false);
  }
};

// ----------------------------------------------------Remove Team Member---------------------------------------------

export const removeTeamMember = (user, userId, teamId, allMembers, cb) => {
  // if (linkData?.value) {
  if (allMembers) {
    let remainingMembers = allMembers?.filter((elm) => {
      return elm != userId;
    });

    console.log("remainingMembers", remainingMembers);

    set(ref(db, `Teams/${teamId}/members/`), [...remainingMembers]).then(() => {
      if (typeof user?.teams === "object") {
        let userTeams = Object.values(user?.teams);
        let remainingTeams = userTeams?.filter((elm) => {
          return elm != teamId;
        });
        set(ref(db, `Users/${userId}/teams/`), [...remainingTeams]).then(() => {
          cb(userId);
          toast.success("Team member deleted successfuly");
        });
      }
    });
  }
  // }
};

// ----------------------------------------------------Split String---------------------------------------------

export const splitString = (str, num) => {
  if (str) {
    if (str?.length > num) {
      let endStr = str?.slice(0, num);
      return endStr + "...";
    } else {
      return str;
    }
  }
};

// ----------------------------------------------------Split String---------------------------------------------

export const updateLinkShareAble = async (
  id,
  linkID,
  shareable,
  link,
  allChilds
) => {
  // shareable,allLinks
  // Find the index of the object with the given ID
  const objectIndex = link?.findIndex((obj) => obj.linkID === linkID);

  // Check if the object exists
  if (objectIndex !== -1) {
    // Create a copy of the object
    const updatedObject = { ...link[objectIndex] };

    // Update the value of the desired property
    updatedObject.shareable = !shareable;

    // Create a new array with the updated object
    const updatedArray = [...link];
    updatedArray[objectIndex] = updatedObject;
    set(ref(db, `Users/${id}/links/`), [...updatedArray]).then(async () => {
      const updatelinkpromise = allChilds?.map((elm) => {
        if (typeof elm?.links === "object") {
          const objectIndex = elm?.links?.findIndex(
            (obj) => obj.linkID === linkID
          );

          // Check if the object exists
          if (objectIndex !== -1) {
            // Create a copy of the object
            const updatedObject = { ...elm?.links[objectIndex] };

            // Update the value of the desired property
            updatedObject.shareable = !shareable;

            // Create a new array with the updated object
            const updatedArray = [...elm?.links];
            updatedArray[objectIndex] = updatedObject;
            set(ref(db, `Users/${elm?.id}/links/`), [...updatedArray]);
          }
        }
      });

      try {
        const deleteUserlinks = await Promise.all(updatelinkpromise);
      } catch (error) {
        console.error("Error updating objects:", error);
        // toast.error("Error updating objects");
      }
    });
  }

  // const starCountRef = query(
  //   ref(db, `/Users/${id}/links`),
  //   orderByChild("linkID"),
  //   equalTo(linkID)
  // );
  // onValue(starCountRef, async (snapshot) => {
  //   const data = await snapshot.val();
  //   // cb(Object.values(data));
  //   console.log(data);
  //   console.log(Object.keys(data)[0]);
  //   if (data) {
  //     let index = Object.keys(data)[0];

  //     update(ref(db, `Users/${id}/links/${index}`), {
  //       shareable: !shareable,
  //     }).then(() => {
  //       // toast.success("Link deleted successfuly");
  //       // cb();
  //     });
  //   }
  //   MediaKeyStatusMap;
  // });
};

// ------------------------------------------------Get single child analytics-----------------------------------------------

export const getSingleChildAnalytics = (id, callBackFunc, setloading) => {
  console.log(id);
  setloading(true);
  const starCountRef = query(
    ref(db, "/Analytic"),
    orderByChild("userid"),
    equalTo(id)
  );
  onValue(starCountRef, async (snapshot) => {
    const data = await snapshot.val();
    console.log(data);
    callBackFunc(data);
    setloading(false);
    // console.log("analyticsdata", data);
    // console.log("testing data");
    MediaKeyStatusMap;
    // setmylist(Object.values(data));

    // setfiltered(Object.values(data));

    // updateStarCount(postElement, data);
  });
};

// ------------------------------------------------Get team analytics-----------------------------------------------

// export const getTeamAnalytics = async (Ids, callBackFunc, setloading) => {
//   setloading(true);
//   console.log(Ids);
//   if (typeof Ids === "object") {
//     console.log("working...");
//     const userIds = Object.values(Ids);
//     if (userIds && userIds?.length > 0) {
//       console.log("working2...");
//       console.log("yes");
//       let membersArray = [];
//       const teamAnalyticsPromise = userIds?.map((elm) => {
//         const starCountRef = query(
//           ref(db, "/Analytic"),
//           orderByChild("userid"),
//           equalTo(elm)
//         );
//         onValue(starCountRef, async (snapshot) => {
//           const data = await snapshot.val();
//           if (data) {
//             membersArray?.push(Object.values(data)?.[0]);
//           }

//           // callBackFunc(prev=>[...prev,Object.values(data)]);
//         });
//       });
//       try {
//         const updated = await Promise.all(teamAnalyticsPromise);

//         if (membersArray?.length > 0) {
//           console.log("working3");
//           const summedData = {};
//           console.log(membersArray);
//           membersArray?.forEach((obj) => {
//             // Iterate over each key in the object
//             for (let key in obj) {
//               // Add the value to the summedData object, initializing if necessary
//               if (summedData[key] === undefined && key != "links") {
//                 summedData[key] = 0;
//               }

//               if (summedData[key] === undefined && key === "links") {
//                 summedData[key] = [];
//               }
//               if (key != "links") {
//                 summedData[key] += obj[key];
//               } else {
//                 summedData[key] = [
//                   ...Object.values(summedData[key]),
//                   Object.values(obj[key]),
//                 ];
//               }
//             }
//           });

//           callBackFunc({
//             analyticsObject: {
//               ...summedData,
//               links: summedData?.links?.flat(),
//             },
//           });
//           setloading(false);
//         } else {
//           callBackFunc({
//             analyticsObject: {
//               currentDay: 0,
//               currentMonth: 0,
//               linksEngCrntMnth: 0,
//               linksEngCrntWk: 0,
//               linksEngCrntYear: 0,
//               linksEngPastWk: 0,
//               linksEngToday: 0,
//               overallClicks: 0,
//               overallContactsMe: 0,
//               overallLinksEng: 0,
//               tContactsMeCrntMnth: 0,
//               tContactsMeCrntWk: 0,
//               tContactsMeCrntYear: 0,
//               tContactsMePastWk: 0,
//               tContactsMeToday: 0,
//               totalClicks: 0,
//               totalClicksCrntMnth: 0,
//               totalClicksCrntYear: 0,
//               totalClicksToday: 0,
//             },
//           });
//           setloading(false);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     } else {
//       console.log("no");
//       callBackFunc({
//         analyticsObject: {
//           currentDay: 0,
//           currentMonth: 0,
//           linksEngCrntMnth: 0,
//           linksEngCrntWk: 0,
//           linksEngCrntYear: 0,
//           linksEngPastWk: 0,
//           linksEngToday: 0,
//           overallClicks: 0,
//           overallContactsMe: 0,
//           overallLinksEng: 0,
//           tContactsMeCrntMnth: 0,
//           tContactsMeCrntWk: 0,
//           tContactsMeCrntYear: 0,
//           tContactsMePastWk: 0,
//           tContactsMeToday: 0,
//           totalClicks: 0,
//           totalClicksCrntMnth: 0,
//           totalClicksCrntYear: 0,
//           totalClicksToday: 0,
//         },
//       });
//       setloading(false);
//     }
//   } else {
//     callBackFunc({
//       analyticsObject: {
//         currentDay: 0,
//         currentMonth: 0,
//         linksEngCrntMnth: 0,
//         linksEngCrntWk: 0,
//         linksEngCrntYear: 0,
//         linksEngPastWk: 0,
//         linksEngToday: 0,
//         overallClicks: 0,
//         overallContactsMe: 0,
//         overallLinksEng: 0,
//         tContactsMeCrntMnth: 0,
//         tContactsMeCrntWk: 0,
//         tContactsMeCrntYear: 0,
//         tContactsMePastWk: 0,
//         tContactsMeToday: 0,
//         totalClicks: 0,
//         totalClicksCrntMnth: 0,
//         totalClicksCrntYear: 0,
//         totalClicksToday: 0,
//       },
//     });
//     setloading(false);
//   }
// };

export const getTeamAnalytics = async (Ids, callBackFunc, setloading) => {
  setloading(true);

  if (typeof Ids === "object") {
    const userIds = Object.values(Ids);

    if (userIds && userIds.length > 0) {
      let membersArray = [];

      const fetchAnalytics = (elm) => {
        return new Promise((resolve, reject) => {
          const starCountRef = query(
            ref(db, "/Analytic"),
            orderByChild("userid"),
            equalTo(elm)
          );

          onValue(
            starCountRef,
            (snapshot) => {
              const data = snapshot.val();
              if (data) {
                membersArray.push(Object.values(data)[0]);
              }
              resolve();
            },
            (error) => {
              reject(error);
            }
          );
        });
      };

      try {
        await Promise.all(userIds.map(fetchAnalytics));

        if (membersArray.length > 0) {
          const summedData = {};

          membersArray.forEach((obj) => {
            for (let key in obj) {
              if (summedData[key] === undefined && key !== "links" && key !== "reviewOptions") {
                summedData[key] = 0;
              }

              if (summedData[key] === undefined && (key === "links" || key === "reviewOptions")) {
                summedData[key] = [];
              }

              if (key !== "links" && key !== "reviewOptions") {
                summedData[key] += obj[key];
              } else {
                summedData[key] = [...summedData[key], ...obj[key]];
              }
            }
          });

          callBackFunc({
            analyticsObject: {
              ...summedData,
              links: summedData?.links?.flat(),
              reviewOptions: summedData?.reviewOptions?.flat(),
            },
          });
        } else {
          callBackFunc({
            analyticsObject: {
              currentDay: 0,
              currentMonth: 0,
              linksEngCrntMnth: 0,
              linksEngCrntWk: 0,
              linksEngCrntYear: 0,
              linksEngPastWk: 0,
              linksEngToday: 0,
              overallClicks: 0,
              overallContactsMe: 0,
              overallLinksEng: 0,
              overallReviews: 0,
              tContactsMeCrntMnth: 0,
              tContactsMeCrntWk: 0,
              tContactsMeCrntYear: 0,
              tContactsMePastWk: 0,
              tContactsMeToday: 0,
              tReviewsToday: 0,
              tReviewsCrntWk: 0,
              tReviewsCrntMnth: 0,
              tReviewsCrntYear: 0,
              totalClicks: 0,
              totalClicksCrntMnth: 0,
              totalClicksCrntYear: 0,
              totalClicksToday: 0,
            },
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setloading(false);
      }
    } 
    else {
      callBackFunc({
        analyticsObject: {
          currentDay: 0,
          currentMonth: 0,
          linksEngCrntMnth: 0,
          linksEngCrntWk: 0,
          linksEngCrntYear: 0,
          linksEngPastWk: 0,
          linksEngToday: 0,
          overallClicks: 0,
          overallContactsMe: 0,
          overallLinksEng: 0,
          overallReviews: 0,
          tContactsMeCrntMnth: 0,
          tContactsMeCrntWk: 0,
          tContactsMeCrntYear: 0,
          tContactsMePastWk: 0,
          tContactsMeToday: 0,
          tReviewsToday: 0,
          tReviewsCrntWk: 0,
          tReviewsCrntMnth: 0,
          tReviewsCrntYear: 0,
          totalClicks: 0,
          totalClicksCrntMnth: 0,
          totalClicksCrntYear: 0,
          totalClicksToday: 0,
        },
      });
      setloading(false);
    }
  } else {
    callBackFunc({
      analyticsObject: {
        currentDay: 0,
        currentMonth: 0,
        linksEngCrntMnth: 0,
        linksEngCrntWk: 0,
        linksEngCrntYear: 0,
        linksEngPastWk: 0,
        linksEngToday: 0,
        overallClicks: 0,
        overallContactsMe: 0,
        overallLinksEng: 0,
        overallReviews: 0,
        tContactsMeCrntMnth: 0,
        tContactsMeCrntWk: 0,
        tContactsMeCrntYear: 0,
        tContactsMePastWk: 0,
        tContactsMeToday: 0,
        tReviewsToday: 0,
        tReviewsCrntWk: 0,
        tReviewsCrntMnth: 0,
        tReviewsCrntYear: 0,
        totalClicks: 0,
        totalClicksCrntMnth: 0,
        totalClicksCrntYear: 0,
        totalClicksToday: 0,
      },
    });
    setloading(false);
  }
};

// ------------------------------------------------Get single child profile-----------------------------------------------

export const adminAccess = (companyId, email, cb, translator) => {
  if (email) {
    axios
      .post(`${baseUrl}adminAccess`, {
        companyId,
        token: "12f3g4hj2j3h4g54h3juyt5j4k3jngbfvkg43hj",
        email,
      })
      .then((res) => {
        toast.success(res?.data?.message);
        console.log("the response", res);
        cb("");
      })
      .catch((err) => {
        toast.error(translator(err?.response?.data?.message));
        console.log(err?.response?.data?.message);
      });
  } else {
    toast.success(translator("Email is required"));
  }
};

//------------------------------------------------Remove Admin-----------------------------------------------

export const removeAdmin = (id) => {
  update(ref(db, `Users/${id}/`), {
    isAdmin: false,
  });
};

export const changeLanguage = (id, mylanguage, cb) => {
  update(ref(db, `Users/${id}/`), {
    language: mylanguage,
  }).then(() => {
    localStorage.setItem("connexLanguage", mylanguage);
    cb(mylanguage);
  });
};

export const handleLogout = (cb) => {
  localStorage.removeItem("connexUid");
  localStorage.removeItem("conexParent");
  cb();
};

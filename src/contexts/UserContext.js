import { useState, useEffect, createContext } from "react";

const UserContext = createContext();

export function UserContextProvider(props) {
    const { children } = props;

    const [userToken, setUserToken] = useState("");
    const [userProfilePicture, setUserProfilePicture] = useState("");
    const [dailyProgress, setDailyProgress] = useState(0);

    const locallyStoredToken = localStorage.getItem("token");
    const locallyStoredProfilePicture = localStorage.getItem("picture");

    console.log(userToken);
    console.log(userProfilePicture);

    if ((locallyStoredToken === null && locallyStoredProfilePicture === null) && (userToken !== "" && userProfilePicture !== "")) {
        localStorage.setItem("token", userToken);
        localStorage.setItem("picture", userProfilePicture);
    } else if ((locallyStoredToken !== null && locallyStoredProfilePicture !== null) && (userToken === "" && userProfilePicture === "")) {
        setUserToken(locallyStoredToken);
        setUserProfilePicture(locallyStoredProfilePicture);
    }


    return (
        <UserContext.Provider value={{userToken, userProfilePicture, dailyProgress, setUserToken, setUserProfilePicture, setDailyProgress}}>
            { children }
        </UserContext.Provider>
    )
}

export default UserContext;
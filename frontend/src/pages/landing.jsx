import { useState } from "react";
import { LoginButton } from "../components/button";

export const LandingPage = ()=>{

    const [theme, setTheme] = useState("yellow-theme");

    const changeThemePink = ()=>{

        setTheme("pink-theme");

    }
    const changeThemeYellow = ()=>{

        setTheme("yellow-theme");

    }

    return (
        <div className="landing_page">
            <LoginButton theme={theme}/>
            <h4 className={theme}>Hello this is landing page</h4>
            <ul>
                change theme
                <li id='yellow_btn' onClick={changeThemeYellow}></li>
                <li id='pink_btn' onClick={changeThemePink}></li>
            </ul>
        </div>
    );

}
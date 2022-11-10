import React, { useEffect, useState } from "react";
import "./styles.scss";
import loader from "../../assets/loader.gif";
import axios from "axios";
import { ApiRoutes } from "../../utils/ApiRoutes";
import { Buffer } from "buffer";
import { routeToLogin, Toaster } from "../../utils/service/shared.service";
import { Toast } from "../../utils/enums/toast.enum";
import { validateRequired } from "../../utils/service/validation.service";
function SetAvatar() {
  const [avatars, setAvatars] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState<number>(NaN);

  const getRandomAvatar = async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      try {
        let image = await axios.get(
          ApiRoutes.getRandomAvatar + `/${Math.round(Math.random() * 1000)}`
        );

        let buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      } catch (error: any) {}
    }
    setAvatars(data);
    setIsLoading(false);
  };

  const setProfilePicture = async () => {
    try {
      let _data = {
        avatar: avatars[selectedAvatar],
      };
      await validateRequired([["avatar", "Avatar"]], _data);
      const { data } = await axios.post(ApiRoutes.setUserAvatar, _data);
      console.log(data);

      if (!data.Succeed) {
        Toaster(data.message ?? Toast.NO_RESOURCE, Toast.DANGER);
        routeToLogin(data);
      }
    } catch (error: any) {
      Toaster(error.message ?? Toast.NO_RESOURCE, Toast.DANGER);
      routeToLogin(error.response.data);
    }
  };

  useEffect(() => {
    getRandomAvatar();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="main_container">
          <img src={loader} className="loader" alt="loader" />
        </div>
      ) : (
        <div className="main_container">
          <div className="title">
            <h1>Pick an avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar: string, index: number) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected_avatar" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button className="submit_btn" onClick={setProfilePicture}>
            Set as profile picture
          </button>
        </div>
      )}
    </>
  );
}

export default SetAvatar;

/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import UserContext from "../context/UserContext";

const useStyles = makeStyles(() => ({
  contentContainer: {
    display: "flex",
    width: "100%",
    flexFlow: "row wrap",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const PostButtons = (props) => {
  const { postData } = props;
  const classes = useStyles();
  const router = useRouter();
  const { userData } = useContext(UserContext);
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    if (!userData.user) {
      setUserId(0);
    } else {
      setUserId(userData.user.id);
    }
  }, [userData.user]);

  async function DeletePost() {
    try {
      await axios.delete(
        `https://cookbook-db.herokuapp.com/posts/${postData._id}`,
        {
          headers: {
            "x-auth-token": userData.token,
          },
        }
      );
      router.push("/profile/library");
    } catch (error) {
      console.log(`THIS MESSAGE:${error}`);
    }
  }

  return (
    <div className={classes.contentContainer}>
      {userId === postData.userId && (
        <>
          <button className="blue-button alt-blue-button" type="button">
            ClipBoard <FileCopyIcon color="action" />
          </button>
          <button className="blue-button alt-blue-button" type="button">
            Edit
          </button>
          <button
            className="blue-button alt-blue-button"
            onClick={DeletePost}
            type="submit"
          >
            Delete
          </button>
        </>
      )}
      {userId !== postData.userId && userData.token && (
        <>
          <button className="blue-button alt-blue-button" type="button">
            ClipBoard <FileCopyIcon color="action" />
          </button>
          <button className="blue-button alt-blue-button" type="button">
            Follow
          </button>
        </>
      )}
      {!userData.token && (
        <button className="blue-button alt-blue-button" type="button">
          Clipboard <FileCopyIcon color="action" />
        </button>
      )}
    </div>
  );
};

export default PostButtons;

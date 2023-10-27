import React, { useEffect } from "react";
import PlaylistComponent from "./PlaylistComponent";
import "../../../assets/styles/modules/videoPlayer.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function VideoPlayer() {
	const currentMedia = useSelector((state) => state.mediaState.currentMedia);
	const userHasAccess = useSelector(
		(state) => state.userState.user.user.accessDetails.hasAccess
	);

	const navigate = useNavigate();

	useEffect(() => {}, []);

	if (!currentMedia) {
		return navigate("/");
	}

	if (!userHasAccess) {
		return (
			<div style={{ margin: "4rem" }}>
				You don't have access yet. Please contact our admin.
			</div>
		);
	}

	return (
		<div className="videoPlayer__container">
			<div className="videoPlayer__playerContainer">
				<video
					src={currentMedia.links.mediaPath}
					controls
					className="videoPlayer__player"
				/>
				<div className="videoPlayer__meta">
					<h4>{currentMedia.meta.title}</h4>
					<p style={{ width: "100%" }}>{currentMedia.meta.desc}</p>
				</div>
			</div>
			<div className="videoPlayer__playlistComponent">
				<PlaylistComponent p={currentMedia.playlist} />
			</div>
		</div>
	);
}

export default VideoPlayer;
